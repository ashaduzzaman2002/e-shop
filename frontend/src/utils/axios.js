import axios from "axios";

export const baseURL = "http://localhost:5000/api/v2";
export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL,
});
