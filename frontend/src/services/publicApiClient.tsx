import axios from "axios";
import { CreateUserDto } from "./dto";

export const publicApiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const authService = {
  login(credentials: { email: string; password: string }) {
    return publicApiClient.post("/auth/login", credentials);
  },
  createUser(createUserDto: CreateUserDto) {
    return publicApiClient.post("/users", createUserDto);
  },
};
