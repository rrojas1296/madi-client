import { instance } from "@/api/instance";
import { LoginUserDto } from "../../types/services/loginUser.dto";

export const loginUser = async (data: LoginUserDto) => {
  const r = await instance.post("/login", data);
  return r.data;
};
