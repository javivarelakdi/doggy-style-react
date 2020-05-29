import axios from "axios";

class ApiClient {
  constructor() {
    this.apiClient = axios.create({
      baseURL: "http://localhost:5000",
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

  signup(body) {
    return this.apiClient.post("/signup", body);
  }

  getUsers() {
    return this.apiClient.get("/users");
  }

  getUser(userId) {
    return this.apiClient.get(`/users/${userId}`);
  }

  editUser(userId, body) {
    return this.apiClient.post(`/users/${userId}`, body);
  }

  postUserFav(targetId, body) {
    return this.apiClient.post(`/users/favs/${targetId}`, body);
  }

  getEvents() {
    return this.apiClient.get("/events");
  }

  getEvent(eventId) {
    return this.apiClient.get(`/events/${eventId}`);
  }

  deleteEvent(eventId) {
    return this.apiClient.delete(`/events/${eventId}`);
  }

  postEventAttendee(eventId, body) {
    return this.apiClient.post(`/events/${eventId}/attendee`, body);
  }

  editEvent(eventId, body) {
    return this.apiClient.post(`/events/${eventId}`, body);
  }

  createEvent(body) {
    return this.apiClient.post("/events/new", body);
  }

  getChats() {
    return this.apiClient.get("/chats");
  }

  createChat(body) {
    return this.apiClient.post("/chats/new", body)
  }

  updateChat(chatId, body) {
    return this.apiClient.post(`/chats/${chatId}`, body)
  }

  
}

const apiClient = new ApiClient();
export default apiClient;
