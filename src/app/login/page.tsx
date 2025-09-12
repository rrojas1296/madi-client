"use client";
import GoogleIcon from "@/features/shared/components/icons/GoogleIcon";
import Button from "@/features/shared/components/button/button";
import EmailIcon from "@/features/shared/components/icons/EmailIcon";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, SchemaType } from "@/features/auth/schemas/loginEmail.schema";
import { useState } from "react";
import LoadingIcon from "@/features/shared/components/icons/LoadingIcon";
import Link from "next/link";
import { useTranslations } from "next-intl";
import FormField from "@/features/shared/components/formfield/FormField";
import { useRouter } from "next/navigation";
import AlertMessage from "@/features/shared/components/alertMessage/AlertMessage";
import { validateEmail } from "@/features/auth/services/login/validateEmail";

let timeout: NodeJS.Timeout;

const LoginPage = () => {
  const t = useTranslations("Login");
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const error = errors["email"]?.message;

  const handleForm = async (data: SchemaType) => {
    clearTimeout(timeout);
    try {
      setLoading(true);
      await validateEmail(data.email);
      router.push(`/login/password?email=${encodeURIComponent(data.email)}`);
    } catch (err: any) {
      const code = err.response.data.message || "server_error";
      setErrorMessage(t(`form.errors.${code}`));
      timeout = setTimeout(() => setErrorMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-screen w-screen bg-bg-1 lg:bg-bg-2 lg:grid lg:place-items-center overflow-hidden">
      <form
        onSubmit={handleSubmit(handleForm)}
        className="bg-transparent lg:bg-bg-1 rounded-lg py-10 px-7 w-full max-w-md m-auto lg:max-w-[400px] grid gap-6 lg:border lg:border-border-2 animate-bottom-in"
      >
        <div className="grid gap-2">
          <h1 className="text-xl lg:text-center font-semibold">
            {t("title.text")}
          </h1>
          <p className="text-text-2 text-sm lg:text-center">
            {t("title.description")}
          </p>
        </div>
        <Button type="button" variant="outline">
          <GoogleIcon className="h-5 w-5" />
          {t("social.google")}
        </Button>
        <div className="flex items-center justify-center relative">
          <span className="text-text-2 text-sm bg-bg-1 px-4 z-10 relative">
            {t("or")}
          </span>
          <div className="w-full absolute h-[1px] bg-border-2 m-auto" />
        </div>
        <FormField
          label={t("form.fields.email.label")}
          placeholder={t("form.fields.email.placeholder")}
          error={error && t(error)}
          Icon={<EmailIcon className="w-5 h-5 stroke-current text-text-2" />}
          {...register("email")}
        />
        {errorMessage && <AlertMessage text={errorMessage} />}
        <Button type="submit">
          {loading && (
            <LoadingIcon className="w-5 h-5 text-text-3 animate-spin" />
          )}
          {t("form.submit")}
        </Button>
        <p className="text-sm lg:text-center">
          {t("form.register.text")}
          <Link href="/register" className="text-primary font-semibold">
            {t("form.register.link")}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
