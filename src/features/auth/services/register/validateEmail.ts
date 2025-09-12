import { instance } from "@/api/instance";
import { ValidateEmailResponse } from "../../types/services/validateEmailResponse";

export const validateEmail = async (email: string) => {
  const response = await instance.post<ValidateEmailResponse>(
    `/register/validateEmail/${email}`,
  );
  return response.data;
};
