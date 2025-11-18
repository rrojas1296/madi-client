"use client";
import {
  ApartmentCondition,
  ApartmentCurrencies,
  ApartmentStatus,
  createApartmentSchema,
  createApartmentSections,
  SchemaInformation,
} from "@/features/apartments/schemas/createApartment.schema";
import { createApartmentService } from "@/features/apartments/services/createAapartment.service";
import Button from "@/features/shared/components/button/button";
import FormField from "@/features/shared/components/formfield/FormField";
import ArrowLeftIcon from "@/features/shared/components/icons/ArrowLeftIcon";
import LoadingIcon from "@/features/shared/components/icons/LoadingIcon";
import SaveIcon from "@/features/shared/components/icons/SaveIcon";
import SnackBar from "@/features/shared/components/snackBar/SnackBar";
import { useURLSearchParams } from "@/features/shared/hooks/useURLSearchParams";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
  const t = useTranslations("CreateApartment");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createApartmentSchema),
    defaultValues: {
      status: ApartmentStatus.AVAILABLE,
      condition: ApartmentCondition.NEW,
      currency: ApartmentCurrencies.PEN,
    },
  });

  const handleCreateApartment = async (data: SchemaInformation) => {
    setIsLoading(true);
    try {
      await createApartmentService(data);
      router.push("/apartments");
    } catch (err: any) {
      const code = err.code || "SERVER_ERROR";
      const message = t(`form.errors.${code}`);
      toast.custom(() => <SnackBar text={t(message)} type="error" />, {
        duration: 3000,
        position: "bottom-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreateApartment)}
      className="max-w-container-width m-auto pb-8 lg:pb-16 animate-fade-in"
    >
      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center gap-4 font-medium text-xl">
          <Link href="/apartments">
            <Button variant="icon">
              <ArrowLeftIcon className="h-5 w-5 text-text-2 stroke-current" />
            </Button>
          </Link>
          <h1>{t("title")}</h1>
        </div>
        <Button type="submit" className="hidden lg:flex w-36">
          {isLoading ? (
            <LoadingIcon className="h-5 w-5 animate-spin text-text-3 stroke-current" />
          ) : (
            <SaveIcon className="w-5 h-5 text-text-3 stroke-current" />
          )}
          {t("headerButton.create")}
        </Button>
      </div>
      <div className="mt-6 grid gap-10 lg:gap-12">
        {createApartmentSections.map((section) => {
          return (
            <div
              key={section.id}
              className="grid gap-6 md:grid-cols-2 lg:border lg:border-border-2 lg:rounded-md lg:p-6"
            >
              <div className="grid gap-2 md:col-span-2">
                <h1 className="font-medium text-xl">{t(section.title)}</h1>
                <p className="text-sm text-text-2">{t(section.description)}</p>
              </div>
              {section.controls.map((ctrl) => {
                const error = errors[ctrl.name]?.message;
                const options =
                  ctrl.options?.map((opt) => ({
                    ...opt,
                    label: t(opt.label),
                  })) || [];
                return (
                  <FormField
                    key={ctrl.name}
                    type={ctrl.type}
                    isFloat={ctrl.isFloat}
                    control={control}
                    options={options}
                    required={ctrl.required}
                    label={t(ctrl.label)}
                    placeholder={ctrl.placeholder && t(ctrl.placeholder)}
                    error={error && t(error)}
                    {...register(ctrl.name, {
                      valueAsNumber: ctrl.type === "number",
                    })}
                  />
                );
              })}
            </div>
          );
        })}
        <div className="hidden lg:flex justify-between items-center">
          <div className="flex items-center gap-4 font-medium text-xl">
            <Link href="/apartments">
              <Button variant="outline" className="px-4 text-text-2">
                <ArrowLeftIcon className="h-5 w-5 text-text-2 stroke-current" />
                {t("headerButton.back")}
              </Button>
            </Link>
          </div>
          <Button type="submit" className="lg:flex px-10 w-fit">
            {isLoading ? (
              <LoadingIcon className="h-5 w-5 animate-spin text-text-3 stroke-current" />
            ) : (
              <SaveIcon className="w-5 h-5 text-text-3 stroke-current" />
            )}
            {t("headerButton.create")}
          </Button>
        </div>
        <Button type="submit" className="lg:hidden">
          {isLoading ? (
            <LoadingIcon className="h-5 w-5 animate-spin text-text-3 stroke-current" />
          ) : (
            <SaveIcon className="w-5 h-5 text-text-3 stroke-current" />
          )}
          {t("headerButton.create")}
        </Button>
      </div>
    </form>
  );
};

export default Page;
