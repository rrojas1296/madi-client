import Button from "@/features/shared/components/Button/Button";
import { useDialog } from "@/features/shared/hooks/useDialog";
import { useTranslations } from "next-intl";
import LoadingIcon from "@/features/shared/components/Icons/LoadingIcon";
import useDeleteMultipleApartments from "../../hooks/useDeleteMultipleApartments";
import { Dispatch, SetStateAction } from "react";

interface Props {
  ids: string[];
  setRowSelection: Dispatch<SetStateAction<object>>;
}
const DeleteMultipleApartments = ({ ids, setRowSelection }: Props) => {
  const t = useTranslations("Apartments");
  const { isPending, mutate } = useDeleteMultipleApartments();
  const { setOpen } = useDialog();
  return (
    <>
      <h1 className="text-xl font-semibold">
        {t("deleteDialogs.multiple.title")}
      </h1>
      <p className="text-sm text-text-2 mt-2">
        {t("deleteDialogs.multiple.description")}
      </p>
      <div className="flex gap-3 mt-4 justify-end">
        <Button
          variant="outline"
          onClick={() => setOpen(false)}
          className="w-fit"
        >
          {t("deleteDialogs.multiple.cancel")}
        </Button>
        <Button
          variant="filled"
          onClick={() => {
            mutate(ids, {
              onSuccess: () => {
                setRowSelection({});
              },
            });
          }}
          className="w-fit bg-danger hover:bg-danger/80"
        >
          {isPending && (
            <LoadingIcon className="w-5 h-5 animate-spin text-text-3" />
          )}
          {t("deleteDialogs.multiple.delete")}
        </Button>
      </div>
    </>
  );
};

export default DeleteMultipleApartments;
