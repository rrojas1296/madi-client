"use client";
import Button from "@/features/shared/components/Button/Button";
import FormField from "@/features/shared/components/FormField/FormField";
import ArrowLeftIcon from "@/features/shared/components/Icons/ArrowLeftIcon";
import {
  CreateTenantSchema,
  createTenantSchema,
  createTenantSections,
} from "@/features/tenants/schemas/createTenant.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

const Page = () => {
  const t = useTranslations("Tenants");
  const {
    register,
    control,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(createTenantSchema),
    defaultValues: {
      emergencyPhone: "+51",
      primaryPhone: "+51",
    },
  });
  console.log({ form: watch(), errors });

  const createTenantHandler = (data: CreateTenantSchema) => {
    console.log({ data });
  };
  return (
    <form onSubmit={handleSubmit(createTenantHandler)}>
      <div className="flex gap-3 items-center">
        <Button variant="ghost" isIcon>
          <ArrowLeftIcon className="stroke-current w-5 h-5 shrink-0" />
        </Button>
        <h1 className="font-medium text-xl">{t("create.title")}</h1>
      </div>

      <div className="mt-8">
        {createTenantSections.map((section) => {
          const { title, description, id, controls } = section;
          return (
            <div key={id}>
              <div>
                <h1 className="text-xl font-medium">{t(title)}</h1>
                <p className="text-text-2 text-sm mt-1">{t(description)}</p>
              </div>
              <div className="flex flex-col gap-6 mt-5 md:grid md:grid-cols-2">
                {controls.map(
                  ({ name, type, options, required, label, placeholder }) => {
                    const error = errors[name]?.message;

                    const opts = options?.map((o) => ({
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
                        {...register(name)}
                      />
                    );
                  },
                )}
                <Button type="submit">Crear</Button>
              </div>
            </div>
          );
        })}
      </div>
    </form>
  );
};

export default Page;
