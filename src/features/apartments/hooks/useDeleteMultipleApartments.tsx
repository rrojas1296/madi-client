import { useDialog } from "@/features/shared/hooks/useDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMultipleApartmentsService } from "../services/deleteMultipleApartments.service";

const useDeleteMultipleApartments = () => {
  const queryClient = useQueryClient();
  const { setOpen } = useDialog();
  return useMutation({
    mutationKey: ["apartments"],
    mutationFn: async (ids: string[]) => deleteMultipleApartmentsService(ids),
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["apartments"],
      });
    },
  });
};

export default useDeleteMultipleApartments;
