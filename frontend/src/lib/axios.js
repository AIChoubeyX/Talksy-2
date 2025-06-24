import axios from "axios";

;

export const axiosInstance = axios.create({
  baseURL: "https://talksy-2-backend.vercel.app/api", // replace with your backend URL
  withCredentials: true, // send cookies with the request
});