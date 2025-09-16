import { NEXT_PUBLIC_API_URL } from "@/constants/environments";
import axios from "axios";

export const instance = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
  withCredentials: true,
});
