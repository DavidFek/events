import axios from "axios";
import {
  CreateAuthorDto,
  CreateEventDto,
  UpdateAuthorDto,
  UpdateEventDto,
  UpdateUserDto,
} from "./dto";

function getAuthToken() {
  return localStorage.getItem("token");
}

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authorsService = {
  create(createAuthorDto: CreateAuthorDto) {
    return apiClient.post("/authors", createAuthorDto);
  },
  findAll() {
    return apiClient.get("/authors");
  },
  findOne(id: number) {
    return apiClient.get(`/authors/${id}`);
  },
  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return apiClient.patch(`/authors/${id}`, updateAuthorDto);
  },
  delete(id: number) {
    return apiClient.delete(`/authors/${id}`);
  },

  addEvent(authorId: number, eventId: number) {
    return apiClient.put(`/authors/${authorId}/event/${eventId}`);
  },

  removeEvent(authorId: number, eventId: number) {
    return apiClient.delete(`/authors/${authorId}/event/${eventId}`);
  },
};

export const eventsService = {
  create(createEventDto: CreateEventDto) {
    return apiClient.post("/events", createEventDto);
  },
  findAll() {
    return apiClient.get("/events");
  },
  findOne(id: number) {
    return apiClient.get(`/events/${id}`);
  },
  update(id: number, updateEventDto: UpdateEventDto) {
    return apiClient.patch(`/events/${id}`, updateEventDto);
  },
  delete(id: number) {
    return apiClient.delete(`/events/${id}`);
  },

  addAuthor(eventId: number, authorId: number) {
    return apiClient.put(`/events/${eventId}/author/${authorId}`);
  },

  removeAuthor(eventId: number, authorId: number) {
    return apiClient.delete(`/events/${eventId}/author/${authorId}`);
  },

  likeEvent(eventId: number) {
    return apiClient.patch(`/events/${eventId}/like`);
  },

  dislikeEvent(eventId: number) {
    return apiClient.patch(`/events/${eventId}/dislike`);
  },
};

export const usersService = {
  findAll() {
    return apiClient.get("/users");
  },
  findOne(id: number) {
    return apiClient.get(`/users/${id}`);
  },
  update(id: number, updateUserDto: UpdateUserDto) {
    return apiClient.patch(`/users/${id}`, updateUserDto);
  },
  delete(id: number) {
    return apiClient.delete(`/users/${id}`);
  },
};
