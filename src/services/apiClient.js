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

  logout() {
    return this.apiClient.get("/logout");
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

  getEvent(eventId) {
    return this.apiClient.get(`/events/${eventId}`);
  }

  postEventAttendee(eventId, body) {
    return this.apiClient.post(`/events/${eventId}/attendee`, body);
  }

  postEvent(eventId, body) {
    return this.apiClient.post(`/events/${eventId}`, body);
  }

  
}

const apiClient = new ApiClient();
export default apiClient;
