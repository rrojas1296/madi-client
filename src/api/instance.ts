import { API_URL } from "@/constants/environments";
import axios from "axios";

export const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
