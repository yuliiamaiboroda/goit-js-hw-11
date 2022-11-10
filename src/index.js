import './css/styles.css'
import { PixabayApi, PixabayApi } from "./js/get-cards";
import { createElementsOfGallery } from "./js/markup";
import { Notify } from "notiflix";
import simpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    form: document.querySelector('#search-form'),
    divGalLery: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.load-more'),
}
let lightbox = null;
const PixabayAPI = new PixabayApi();


const  handleSearchPhotoOnSubmit =async  event=>{
    event.preventDefault();
    
    const seachQuery = event.currentTarget.elements.searchQuery.value.trim();
    PixabayAPI.q = seachQuery;

    try{
        const {data} = await PixabayAPI.fetchImages();
          if(!data.hits.length){
            refs.divGalLery.innerHTML ='';
            Notify.failure('"Sorry, there are no images matching your search query. Please try again."');
            refs.btnLoadMore.classList.add('is-hidden');
            return;
        }
        Notify.success(`Hooray! We found ${data.totalHits} images.`)
        refs.divGalLery.innerHTML = createElementsOfGallery(data.hits);
    
       lightbox =  new simpleLightbox('.gallery a').refresh();
       refs.btnLoadMore.classList.remove('is-hidden');
       btnIsHidden();
    }

    catch{ Notify.failure('"Sorry, there are no images matching your search query. Please try again."')}
    finally{refs.form.reset()}
}


const btnIsHidden = async()=>{
    try{ const {data} = await PixabayAPI.fetchImages();
    
     const pages = Math.ceil(data.totalHits / PixabayAPI.per_page);   
        if(PixabayAPI.page >= pages){
            refs.btnLoadMore.classList.add('is-hidden');
            Notify.info("We're sorry, but you've reached the end of search results.");
            return;}
        } 
    catch{console.log()}
}


const  handleClickOnLoadMore = async () =>{
   PixabayAPI.page +=1;

   try{const {data} = await PixabayAPI.fetchImages();
   btnIsHidden()
        refs.divGalLery.innerHTML += createElementsOfGallery(data.hits);   
        lightbox.refresh();
   }
    catch{console.log}
}



refs.form.addEventListener('submit', handleSearchPhotoOnSubmit);
refs.btnLoadMore.addEventListener('click', handleClickOnLoadMore);