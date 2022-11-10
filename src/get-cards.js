import axios from "axios";

export class PixabayApi{
    #BASE_URL = 'https://pixabay.com/api/';
    #API_KEY ='31210662-8b396391b135a1b3bec6a0b8b';

    page = 1;
    q = null;
    per_page = 40;
    fetchImages(){
        return axios.get(`${this.#BASE_URL}`, {
            params: {
                q: this.q,
                page: this.page,
                per_page: this.per_page,
                key: this.#API_KEY,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: "true",
            }
        })
    }
}