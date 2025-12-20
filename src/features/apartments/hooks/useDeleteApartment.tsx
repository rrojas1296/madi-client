import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteApartmentService } from "../services/deleteApartment.service";
import { useDialog } from "@/features/shared/hooks/useDialog";

const useDeleteApartment = () => {
  const queryClient = useQueryClient();
  const { setOpen } = useDialog();
  return useMutation({
    mutationKey: ["apartments"],
    mutationFn: async (id: string) => deleteApartmentService(id),
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["apartments"],
      });
    },
  });
};

export default useDeleteApartment;
