import axios from "axios";

;

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api", // replace with your backend URL
  withCredentials: true, // send cookies with the request
});