import axios from "axios";
import { getAuthToken } from "./authTokenStore";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

API.interceptors.request.use((req) => {
  const token = getAuthToken();
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;