import Button from "@/features/shared/components/Button/Button";
import { useDialog } from "@/features/shared/hooks/useDialog";
import { useTranslations } from "next-intl";
import useDeleteApartment from "../../hooks/useDeleteApartment";
import LoadingIcon from "@/features/shared/components/Icons/LoadingIcon";

interface Props {
  name: string;
  id: string;
}
const DeleteSingleApartment = ({ name, id }: Props) => {
  const t = useTranslations("Apartments");
  const { mutate, isPending } = useDeleteApartment();
  const { setOpen } = useDialog();
  return (
    <>
      <h1 className="text-xl font-semibold">
        {t("deleteDialogs.single.title")}
      </h1>
      <p className="text-sm text-text-2 mt-2">
        {t("deleteDialogs.single.description")}
      </p>
      <ul className="mt-4 text-sm">
        <li>{name}</li>
      </ul>
      <div className="flex gap-3 mt-4 justify-end">
        <Button
          variant="outline"
          onClick={() => setOpen(false)}
          className="w-fit"
        >
          {t("deleteDialogs.single.cancel")}
        </Button>
        <Button
          variant="filled"
          onClick={() => mutate(id)}
          className="w-fit bg-danger hover:bg-danger/80"
        >
          {isPending && (
            <LoadingIcon className="w-5 h-5 animate-spin text-text-3" />
          )}
          {t("deleteDialogs.single.delete")}
        </Button>
      </div>
    </>
  );
};

export default DeleteSingleApartment;
