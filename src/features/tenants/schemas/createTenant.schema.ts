import { IControl } from "@/features/shared/types/formfield";
import z from "zod";

enum DocumentType {
  DNI = "DNI",
  PASSPORT = "PASSPORT",
}

enum Nationality {
  PERU = "PERU",
  VENEZUELA = "VENEZUELA",
  ARGENTINA = "ARGENTINA",
  CHILE = "CHILE",
  COLOMBIA = "COLOMBIA",
  MEXICO = "MEXICO",
  OTHER = "OTHER",
}

export const createTenantSchema = z.object({
  name: z.string().min(1, {
    error: "create.form.basicInformation.fields.name.errors.required",
  }),
  lastName: z.string().min(1, {
    error: "create.form.basicInformation.fields.lastName.errors.required",
  }),
  primaryPhone: z
    .string({
      error: "create.form.basicInformation.fields.primaryPhone.errors.required",
    })
    .refine(
      (value) => {
        const phone = value.split(" ")[1];
        return phone?.length > 0;
      },
      {
        message:
          "create.form.basicInformation.fields.primaryPhone.errors.required",
      },
    ),
  email: z.email({
    error: "create.form.basicInformation.fields.email.errors.required",
  }),
  documentType: z.enum(DocumentType, {
    error: "create.form.basicInformation.fields.documentType.errors.required",
  }),
  numberDocument: z.string().min(1, {
    error: "create.form.basicInformation.fields.numberDocument.errors.required",
  }),
  nationality: z.enum(Nationality, {
    error: "create.form.basicInformation.fields.nationality.errors.required",
  }),
  birthDate: z.string({
    error: "create.form.basicInformation.fields.birthDate.errors.required",
  }),
  emergencyPhone: z
    .string({
      error:
        "create.form.basicInformation.fields.emergencyPhone.errors.required",
    })
    .optional(),
  entryDate: z.string({
    error: "create.form.contractInformation.fields.entryDate.errors.required",
  }),
  outDate: z
    .string({
      error: "create.form.contractInformation.fields.outDate.errors.required",
    })
    .optional(),
  apartment: z.uuid({
    error: "create.form.contractInformation.fields.apartment.errors.required",
  }),
  paymentDay: z
    .number({
      error:
        "create.form.contractInformation.fields.paymentDay.errors.required",
    })
    .min(1, {
      error: "create.form.contractInformation.fields.paymentDay.errors.min",
    })
    .max(31, {
      error: "create.form.contractInformation.fields.paymentDay.errors.max",
    }),
});

export type CreateTenantSchema = z.infer<typeof createTenantSchema>;
export type CreateTenantFields = keyof CreateTenantSchema;

const basicInformation: IControl<CreateTenantFields>[] = [
  {
    label: "create.form.basicInformation.fields.name.label",
    placeholder: "create.form.basicInformation.fields.name.placeholder",
    type: "text",
    name: "name",
    required: true,
  },
  {
    label: "create.form.basicInformation.fields.lastName.label",
    placeholder: "create.form.basicInformation.fields.lastName.placeholder",
    type: "text",
    name: "lastName",
    required: true,
  },
  {
    placeholder: "create.form.basicInformation.fields.primaryPhone.placeholder",
    label: "create.form.basicInformation.fields.primaryPhone.label",
    type: "phone",
    name: "primaryPhone",
    required: true,
  },
  {
    label: "create.form.basicInformation.fields.email.label",
    placeholder: "create.form.basicInformation.fields.email.placeholder",
    type: "email",
    name: "email",
    required: true,
  },
  {
    label: "create.form.basicInformation.fields.documentType.label",
    placeholder: "create.form.basicInformation.fields.documentType.placeholder",
    type: "select",
    name: "documentType",
    required: true,
    options: [
      {
        label: "create.form.basicInformation.fields.documentType.options.DNI",
        value: DocumentType.DNI,
      },
      {
        label:
          "create.form.basicInformation.fields.documentType.options.PASSPORT",
        value: DocumentType.PASSPORT,
      },
    ],
  },
  {
    label: "create.form.basicInformation.fields.numberDocument.label",
    placeholder:
      "create.form.basicInformation.fields.numberDocument.placeholder",
    type: "text",
    name: "numberDocument",
    required: true,
  },
  {
    label: "create.form.basicInformation.fields.nationality.label",
    placeholder: "create.form.basicInformation.fields.nationality.placeholder",
    type: "select",
    name: "nationality",
    required: true,
    options: [
      {
        label: "create.form.basicInformation.fields.nationality.options.PERU",
        value: Nationality.PERU,
      },
      {
        label:
          "create.form.basicInformation.fields.nationality.options.VENEZUELA",
        value: Nationality.VENEZUELA,
      },
      {
        label:
          "create.form.basicInformation.fields.nationality.options.ARGENTINA",
        value: Nationality.ARGENTINA,
      },
      {
        label: "create.form.basicInformation.fields.nationality.options.CHILE",
        value: Nationality.CHILE,
      },
      {
        label:
          "create.form.basicInformation.fields.nationality.options.COLOMBIA",
        value: Nationality.COLOMBIA,
      },
      {
        label: "create.form.basicInformation.fields.nationality.options.MEXICO",
        value: Nationality.MEXICO,
      },
      {
        label: "create.form.basicInformation.fields.nationality.options.OTHER",
        value: Nationality.OTHER,
      },
    ],
  },
  {
    label: "create.form.basicInformation.fields.birthDate.label",
    placeholder: "create.form.basicInformation.fields.birthDate.placeholder",
    type: "date",
    name: "birthDate",
    required: true,
  },
  {
    placeholder:
      "create.form.basicInformation.fields.emergencyPhone.placeholder",
    label: "create.form.basicInformation.fields.emergencyPhone.label",
    type: "phone",
    name: "emergencyPhone",
    required: false,
  },
];

const contractInformation: IControl<CreateTenantFields>[] = [
  {
    label: "create.form.contractInformation.fields.entryDate.label",
    placeholder: "create.form.contractInformation.fields.entryDate.placeholder",
    type: "date",
    name: "entryDate",
    required: true,
  },
  {
    label: "create.form.contractInformation.fields.outDate.label",
    placeholder: "create.form.contractInformation.fields.outDate.placeholder",
    type: "date",
    name: "outDate",
    required: false,
  },
  {
    label: "create.form.contractInformation.fields.apartment.label",
    placeholder: "create.form.contractInformation.fields.apartment.placeholder",
    type: "select",
    name: "apartment",
    required: true,
  },
  {
    label: "create.form.contractInformation.fields.paymentDay.label",
    placeholder:
      "create.form.contractInformation.fields.paymentDay.placeholder",
    type: "number",
    name: "paymentDay",
    required: true,
  },
];

export const createTenantSections = [
  {
    id: 1,
    title: "create.form.basicInformation.title",
    description: "create.form.basicInformation.description",
    controls: basicInformation,
  },
  {
    id: 2,
    title: "create.form.contractInformation.title",
    description: "create.form.contractInformation.description",
    controls: contractInformation,
  },
];
