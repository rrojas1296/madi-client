import { instance } from "@/api/instance";

export const validateEmail = async (email: string) => {
  const response = await instance.post("/login/validateEmail/" + email);
  return response;
};
