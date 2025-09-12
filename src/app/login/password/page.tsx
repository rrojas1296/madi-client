"use client";
import {
  schema,
  SchemaType,
} from "@/features/auth/schemas/enterPassword.schema";
import { loginUser } from "@/features/auth/services/login/loginUser";
import AlertMessage from "@/features/shared/components/alertMessage/AlertMessage";
import Button from "@/features/shared/components/button/button";
import FormField from "@/features/shared/components/formfield/FormField";
import ArrowLeftIcon from "@/features/shared/components/icons/ArrowLeftIcon";
import CloseEyeIcon from "@/features/shared/components/icons/CloseEyeIcon";
import LoadingIcon from "@/features/shared/components/icons/LoadingIcon";
import OpenEyeIcon from "@/features/shared/components/icons/OpenEyeIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

let timeout: NodeJS.Timeout;

const Page = () => {
  const t = useTranslations("EnterPassword");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const params = useSearchParams();
  const router = useRouter();
  const email = params.get("email") || ("" as string);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleLogin = async (data: SchemaType) => {
    try {
      clearTimeout(timeout);
      setLoading(true);
      await loginUser({ email, password: data.password });
      router.push("/dashboard");
    } catch (err: any) {
      const code = err.response.data.message || "server_error";
      setErrorMessage(t(`errors.${code}`));
      timeout = setTimeout(() => setErrorMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };
  if (!email) return redirect("/login");
  return (
    <div className="h-screen w-screen bg-bg-1 lg:bg-bg-2 lg:grid lg:place-items-center overflow-hidden">
      <Button
        className="hidden lg:absolute lg:flex lg:top-14 lg:left-14 animate-fade-in"
        onClick={() => router.push("/login")}
        variant="icon"
      >
        <ArrowLeftIcon className="w-5 h-5 text-text-1 stroke-current" />
      </Button>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-transparent lg:bg-bg-1 rounded-lg py-10 px-7 w-full max-w-md m-auto lg:max-w-[400px] grid gap-6 lg:border lg:border-border-2 animate-bottom-in lg:animate-right-in"
      >
        <Button
          onClick={() => router.push("/login")}
          className="mb-8 lg:hidden"
          variant="icon"
        >
          <ArrowLeftIcon className="w-5 h-5 text-text-1 stroke-current" />
        </Button>
        <div className="grid gap-2">
          <h1 className="text-xl lg:text-center font-semibold">{t("title")}</h1>
          <p className="text-text-2 text-sm lg:text-center">
            {t("description")}
          </p>
        </div>
        <FormField
          label={t("field.label")}
          placeholder={t("field.placeholder")}
          autoFocus
          type={showPassword ? "text" : "password"}
          error={errors.password && t(errors.password.message!)}
          Icon={
            <button
              className="outline-none cursor-pointer bg-transparent border-none"
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <OpenEyeIcon className="w-5 h-5 stroke-current text-text-2" />
              ) : (
                <CloseEyeIcon className="w-5 h-5 stroke-current text-text-2" />
              )}
            </button>
          }
          {...register("password")}
        />
        {errorMessage && <AlertMessage text={errorMessage} />}
        <Button type="submit">
          {loading && (
            <LoadingIcon className="w-5 h-5 text-text-3 animate-spin" />
          )}
          {t("submit")}
        </Button>
      </form>
    </div>
  );
};

export default Page;
