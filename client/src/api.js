import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const register = (data) => API.post("/users/register", data);
export const login = (data) => API.post("/auth/login", data);
export const logout = () => API.post("auth/logout");
