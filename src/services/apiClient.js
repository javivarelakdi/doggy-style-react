import axios from "axios";

class ApiClient {
  constructor() {
    this.apiClient = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URI,
      withCredentials: true,
    });
  }

  whoami() {
    return this.apiClient.get("/whoami");
  }

  login(body) {
    return this.apiClient.post("/login", body);
  }

  getUsers() {
    return this.apiClient.get("/users");
  }

  getUser(userId) {
    return this.apiClient.get(`/users/${userId}`);
  }

  getEvents() {
    return this.apiClient.get("/events");
  }
}

const apiClient = new ApiClient();
export default apiClient;
