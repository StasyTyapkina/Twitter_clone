import axios from "axios";
import { API_URL } from "./url";

const customAxios = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

customAxios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default customAxios;
