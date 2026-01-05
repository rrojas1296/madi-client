"use client";
import useGetApartmentsList from "@/features/apartments/hooks/useGetApartmentsList";
import Button from "@/features/shared/components/Button/Button";
import FormField from "@/features/shared/components/FormField/FormField";
import ArrowLeftIcon from "@/features/shared/components/Icons/ArrowLeftIcon";
import LoadingIcon from "@/features/shared/components/Icons/LoadingIcon";
import SaveIcon from "@/features/shared/components/Icons/SaveIcon";
import useCreateTenant from "@/features/tenants/hooks/useCreateTenant";
import {
  CreateTenantSchema,
  createTenantSchema,
  createTenantSections,
} from "@/features/tenants/schemas/createTenant.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useForm } from "react-hook-form";

const Page = () => {
  const t = useTranslations("Tenants");
  const { data } = useGetApartmentsList();
  const { mutate, isPending } = useCreateTenant();
  const apartments = data?.apartments || [];

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(createTenantSchema),
    defaultValues: {
      emergencyPhone: "+51",
      primaryPhone: "+51",
    },
  });

  const createTenantHandler = async (data: CreateTenantSchema) => mutate(data);

  return (
    <form
      onSubmit={handleSubmit(createTenantHandler)}
      className="max-w-container-width m-auto animate-fade-in"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 font-medium text-xl">
          <Link href="/tenants">
            <Button variant="ghost" isIcon>
              <ArrowLeftIcon className="h-5 w-5 text-text-2 stroke-current shrink-0" />
            </Button>
          </Link>
          <h1>{t("create.title")}</h1>
        </div>
        <Button type="submit" className="hidden lg:flex w-fit">
          {isPending ? (
            <LoadingIcon className="h-5 w-5 animate-spin text-text-3 stroke-current" />
          ) : (
            <SaveIcon className="w-5 h-5 text-text-3 stroke-current" />
          )}
          {t("create.button")}
        </Button>
      </div>

      <div className="mt-8 grid gap-10">
        {createTenantSections.map((section) => {
          const { title, description, id, controls } = section;
          return (
            <div
              key={id}
              className="grid gap-6 md:grid-cols-2 lg:border lg:border-border-2 lg:rounded-md lg:p-6"
            >
              <div className="grid gap-1 md:col-span-2">
                <h1 className="text-xl font-medium">{t(title)}</h1>
                <p className="text-text-2 text-sm">{t(description)}</p>
              </div>
              <div className="flex flex-col gap-6 md:grid md:col-span-2 md:grid-cols-2">
                {controls.map(
                  ({ name, type, options, required, label, placeholder }) => {
                    const error = errors[name]?.message;

                    const opts =
                      name === "apartmentId"
                        ? apartments.map((a) => ({
                            label: a.name,
                            value: a.id,
                          }))
                        : options?.map((o) => ({
                            ...o,
                            label: t(o.label),
                          }));
                    return (
                      <FormField
                        key={name}
                        type={type}
                        error={error && t(error)}
                        required={required}
                        label={label && t(label)}
                        options={opts}
                        placeholder={placeholder && t(placeholder)}
                        control={control}
                        {...register(name, {
                          valueAsNumber: type === "number",
                        })}
                      />
                    );
                  },
                )}
              </div>
            </div>
          );
        })}
        <div className="hidden lg:flex justify-between items-center">
          <div className="flex items-center gap-4 font-medium text-xl">
            <Link href="/tenants">
              <Button variant="ghost">
                <ArrowLeftIcon className="h-5 w-5 text-text-2 stroke-current shrink-0" />
                {t("create.back")}
              </Button>
            </Link>
          </div>
          <Button type="submit" className="hidden lg:flex w-fit">
            {isPending ? (
              <LoadingIcon className="h-5 w-5 animate-spin text-text-3 stroke-current" />
            ) : (
              <SaveIcon className="w-5 h-5 text-text-3 stroke-current" />
            )}
            {t("create.button")}
          </Button>
        </div>
        <Button type="submit" className="lg:hidden">
          {isPending ? (
            <LoadingIcon className="h-5 w-5 animate-spin text-text-3 stroke-current" />
          ) : (
            <SaveIcon className="w-5 h-5 text-text-3 stroke-current" />
          )}
          {t("create.button")}
        </Button>
      </div>
    </form>
  );
};

export default Page;
