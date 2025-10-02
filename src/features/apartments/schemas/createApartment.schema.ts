import { IControl } from "@/features/shared/types/formfield";
import z from "zod";

enum Status {
  AVAILABLE = "AVAILABLE",
  RENTED = "RENTED",
  MAINTENANCE = "MAINTENANCE",
}

enum Currencies {
  PEN = "PEN",
  USD = "USD",
  EUR = "EUR",
}

enum ApartmentType {
  ESTANDAR = "ESTANDAR",
  PENTHOUSE = "PENTHOUSE",
  DUPLEX = "DUPLEX",
}

enum PaymentMethods {
  YAPE = "YAPE",
  CREDIT_CARD = "CREDIT_CARD",
  DEPOSIT = "DEPOSIT",
  CASH = "CASH",
}

export const createApartmentSchema = z.object({
  name: z.string().min(1, {
    error: "form.information.fields.name.errors.required",
  }),
  address: z.string().min(1, {
    error: "form.information.fields.address.errors.required",
  }),
  persons: z.number({
    error: "form.information.fields.persons.errors.required",
  }),
  rooms: z.number({
    error: "form.information.fields.rooms.errors.required",
  }),
  floors: z.number({
    error: "form.information.fields.floors.errors.required",
  }),
  status: z.enum(Status, {
    error: "form.information.fields.status.errors.required",
  }),
  furnished: z.boolean().default(false),
  bathrooms: z.number({
    error: "form.information.fields.status.errors.required",
  }),
  currency: z.enum(Currencies, {
    error: "form.contract.fields.currency.errors.required",
  }),
  costRent: z.number({
    error: "form.contract.fields.costRent.errors.required",
  }),
  garanty: z
    .number({
      error: "form.contract.fields.garanty.errors.required",
    })
    .or(z.nan())
    .optional(),
  maintenanceFee: z
    .number({
      error:
        "form.administrativeInformation.fields.maintenanceFee.errors.required",
    })
    .or(z.nan())
    .optional(),
  parkings: z
    .number({
      error: "form.administrativeInformation.fields.parkings.errors.required",
    })
    .or(z.nan())
    .optional(),
  numberParkings: z
    .number({
      error:
        "form.administrativeInformation.fields.numberParkings.errors.required",
    })
    .or(z.nan())
    .optional(),
});

export type SchemaInformation = z.infer<typeof createApartmentSchema>;
export type SchemaInformationFields = keyof SchemaInformation;

const informationControls: IControl<SchemaInformationFields>[] = [
  {
    label: "form.information.fields.name.label",
    placeholder: "form.information.fields.name.placeholder",
    type: "text",
    required: true,
    name: "name",
  },
  {
    label: "form.information.fields.address.label",
    placeholder: "form.information.fields.address.placeholder",
    type: "text",
    required: true,
    name: "address",
  },
  {
    label: "form.information.fields.persons.label",
    placeholder: "form.information.fields.persons.placeholder",
    type: "number",
    required: true,
    name: "persons",
  },
  {
    label: "form.information.fields.rooms.label",
    placeholder: "form.information.fields.rooms.placeholder",
    required: true,
    type: "number",
    name: "rooms",
  },
  {
    label: "form.information.fields.floors.label",
    placeholder: "form.information.fields.floors.placeholder",
    type: "number",
    required: true,
    name: "floors",
  },
  {
    label: "form.information.fields.status.label",
    placeholder: "form.information.fields.status.placeholder",
    type: "select",
    required: true,
    name: "status",
    options: [
      {
        label: "form.information.fields.status.options.available",
        value: Status.AVAILABLE,
      },
      {
        label: "form.information.fields.status.options.rented",
        value: Status.RENTED,
      },
      {
        label: "form.information.fields.status.options.maintenance",
        value: Status.MAINTENANCE,
      },
    ],
  },
  {
    label: "form.information.fields.bathrooms.label",
    placeholder: "form.information.fields.bathrooms.placeholder",
    type: "number",
    required: true,
    name: "bathrooms",
  },
  {
    label: "form.information.fields.furnished.label",
    type: "switch",
    required: true,
    name: "furnished",
  },
];

const contractControls: IControl<SchemaInformationFields>[] = [
  {
    label: "form.contract.fields.currency.label",
    placeholder: "form.contract.fields.currency.placeholder",
    type: "select",
    required: true,
    name: "currency",
    options: [
      {
        label: "form.contract.fields.currency.options.pen",
        value: Currencies.PEN,
      },
      {
        label: "form.contract.fields.currency.options.usd",
        value: Currencies.USD,
      },
      {
        label: "form.contract.fields.currency.options.eur",
        value: Currencies.EUR,
      },
    ],
  },
  {
    label: "form.contract.fields.costRent.label",
    placeholder: "form.contract.fields.costRent.placeholder",
    type: "number",
    required: true,
    name: "costRent",
  },
  {
    label: "form.contract.fields.garanty.label",
    placeholder: "form.contract.fields.garanty.placeholder",
    type: "number",
    required: false,
    name: "garanty",
  },
];

const administrativeInformationControls: IControl<SchemaInformationFields>[] = [
  {
    label: "form.administrativeInformation.fields.maintenanceFee.label",
    placeholder:
      "form.administrativeInformation.fields.maintenanceFee.placeholder",
    type: "number",
    name: "maintenanceFee",
    required: false,
  },
  {
    label: "form.administrativeInformation.fields.parkings.label",
    placeholder: "form.administrativeInformation.fields.parkings.placeholder",
    type: "number",
    name: "parkings",
    required: false,
  },
  {
    label: "form.administrativeInformation.fields.numberParkings.label",
    placeholder:
      "form.administrativeInformation.fields.numberParkings.placeholder",
    type: "number",
    name: "numberParkings",
    required: false,
  },
];

export const createApartmentSections = [
  {
    id: 1,
    title: "form.information.title",
    description: "form.information.description",
    controls: informationControls,
  },
  {
    id: 2,
    title: "form.contract.title",
    description: "form.contract.description",
    controls: contractControls,
  },
  {
    id: 3,
    title: "form.administrativeInformation.title",
    description: "form.contract.description",
    controls: administrativeInformationControls,
  },
];
