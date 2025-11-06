import { useMutation } from "@tanstack/react-query";
import { createApartmentService } from "../apartments/services/createAapartment.service";
import { CreateApartmentBody } from "../apartments/types/api/createApartment";

const useCreateApartment = () => {
  return useMutation({
    mutationKey: ["createApartment"],
    mutationFn: async (data: CreateApartmentBody) =>
      createApartmentService(data),
  });
};

export default useCreateApartment;
