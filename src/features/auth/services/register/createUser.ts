import { instance } from "@/api/instance";
import { CreateUserDto } from "../../types/services/createUserDto";

export const createUser = async (data: CreateUserDto) => {
  const response = await instance.post("/register/registerUser", data);
  return response.data;
};
