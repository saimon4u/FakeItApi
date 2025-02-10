import axios from "axios";

const API_BASE_URL = "http://localhost:3000/";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const AuthService = {
  signup: (data: { email: string; username: string; password: string }) =>
    api.post("/auth/register", data),

  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data),
};
