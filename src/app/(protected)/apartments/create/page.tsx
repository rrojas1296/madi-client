"use client";
import {
  createApartmentSchema,
  createApartmentSections,
  SchemaInformation,
} from "@/features/apartments/schemas/createApartment.schema";
import Button from "@/features/shared/components/button/button";
import FormField from "@/features/shared/components/formfield/FormField";
import ArrowLeftIcon from "@/features/shared/components/icons/ArrowLeftIcon";
import SaveIcon from "@/features/shared/components/icons/SaveIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useForm } from "react-hook-form";

const Page = () => {
  const t = useTranslations("CreateApartment");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createApartmentSchema),
  });

  const handleCreateApartment = (data: SchemaInformation) => {
    console.log({ data });
  };
  return (
    <form
      onSubmit={handleSubmit(handleCreateApartment)}
      className="max-w-container-width m-auto pb-8 lg:pb-16"
    >
      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center gap-4 font-medium text-xl">
          <Link href="/apartments">
            <Button variant="icon">
              <ArrowLeftIcon className="h-5 w-5 text-text-1 stroke-current" />
            </Button>
          </Link>
          <h1>{t("title")}</h1>
        </div>
        <Button type="submit" className="hidden lg:flex w-36">
          <SaveIcon className="w-5 h-5 text-text-3 stroke-current" />{" "}
          {t("headerButton")}
        </Button>
      </div>
      <div className="mt-6 grid gap-10">
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
        <Button type="submit" className="lg:hidden">
          {t("form.create")}
        </Button>
      </div>
    </form>
  );
};

export default Page;
