import Button from "@/features/shared/components/button/button";
import FormField from "@/features/shared/components/formfield/FormField";
import CloseEyeIcon from "@/features/shared/components/icons/CloseEyeIcon";
import EmailIcon from "@/features/shared/components/icons/EmailIcon";
import LoadingIcon from "@/features/shared/components/icons/LoadingIcon";
import OpenEyeIcon from "@/features/shared/components/icons/OpenEyeIcon";
import { cn } from "@/features/shared/lib/shadcn";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

const PasswordView = () => {
  const t = useTranslations("PasswordView");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useForm();
  const error = "";
  return (
    <>
      <div className="grid gap-2">
        <h1 className="text-xl lg:text-center font-semibold">{t("title")}</h1>
        <p className="text-text-2 text-sm lg:text-center">{t("description")}</p>
      </div>
      <FormField
        label={t("field.label")}
        placeholder={t("field.placeholder")}
        type={showPassword ? "text" : "password"}
        Icon={
          <button
            onClick={() => setShowPassword((prev) => !prev)}
            className="outline-none bg-transparent border-none cursor-pointer"
          >
            {showPassword ? (
              <OpenEyeIcon className="w-5 h-5 text-text-2 stroke-current" />
            ) : (
              <CloseEyeIcon className="w-5 h-5 text-text-2 stroke-current" />
            )}
          </button>
        }
      />
      <Button type="submit">
        {loading && (
          <LoadingIcon className="w-5 h-5 text-text-3 animate-spin" />
        )}
        {t("submit")}
      </Button>
    </>
  );
};

export default PasswordView;
