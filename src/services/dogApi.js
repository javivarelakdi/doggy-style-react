import axios from "axios";

class DogApi {
  constructor() {
    this.dogApi = axios.create({
      baseURL: "https://dog.ceo/api",
      withCredentials: false
    });
  }

  listAll() {
    return this.dogApi.get("/breeds/list/all");
  }

  getRandomImage(breed) {
    return this.dogApi.get(`/breed/${breed}/images/random`);
  }

}

const dogApi = new DogApi();
export default dogApi;
