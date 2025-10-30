import { IControl } from "@/features/shared/types/formfield";
import { Currency } from "lucide-react";
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

enum Condition {
  NEW = "NEW",
  GOOD = "GOOD",
  MAINTENANCE = "MAINTENANCE",
}

export const createApartmentSchema = z.object({
  name: z.string().min(1, {
    error: "form.apartmentInformation.fields.name.errors.required",
  }),
  internalCode: z.string().min(1, {
    error: "form.apartmentInformation.fields.internalCode.errors.required",
  }),
  address: z.string().min(1, {
    error: "form.apartmentInformation.fields.address.errors.required",
  }),
  floor: z.number({
    error: "form.apartmentInformation.fields.floor.errors.required",
  }),
  area: z.number({
    error: "form.apartmentInformation.fields.area.errors.required",
  }),
  status: z.enum(Status, {
    error: "form.apartmentInformation.fields.status.errors.required",
  }),
  parking: z.string({
    error: "form.apartmentInformation.fields.parking.errors.required",
  }),

  persons: z.number({
    error: "form.physicalDetails.fields.persons.errors.required",
  }),
  rooms: z.number({
    error: "form.physicalDetails.fields.rooms.errors.required",
  }),
  bathrooms: z.number({
    error: "form.physicalDetails.fields.bathrooms.errors.required",
  }),
  floors: z.number({
    error: "form.physicalDetails.fields.floors.errors.required",
  }),
  furnished: z.boolean().default(false),
  pets: z.boolean().default(false),
  condition: z.enum(Condition, {
    error: "form.physicalDetails.fields.condition.errors.required",
  }),
  monthlyFee: z.number({
    error: "form.financialInformation.fields.monthlyFee.errors.required",
  }),
  garanty: z.number({
    error: "form.financialInformation.fields.garanty.errors.required",
  }),
  currency: z.enum(Currencies, {
    error: "form.financialInformation.fields.currency.errors.required",
  }),
  maintenanceFee: z
    .number({
      error: "form.financialInformation.fields.maintenanceFee.errors.required",
    })
    .or(z.nan())
    .optional(),
});

export type SchemaInformation = z.infer<typeof createApartmentSchema>;
export type SchemaInformationFields = keyof SchemaInformation;

const apartmentInformation: IControl<SchemaInformationFields>[] = [
  {
    label: "form.apartmentInformation.fields.name.label",
    placeholder: "form.apartmentInformation.fields.name.placeholder",
    type: "text",
    required: true,
    name: "name",
  },
  {
    label: "form.apartmentInformation.fields.internalCode.label",
    placeholder: "form.apartmentInformation.fields.internalCode.placeholder",
    type: "text",
    required: true,
    name: "internalCode",
  },
  {
    label: "form.apartmentInformation.fields.address.label",
    placeholder: "form.apartmentInformation.fields.address.placeholder",
    type: "text",
    required: true,
    name: "address",
  },
  {
    label: "form.apartmentInformation.fields.floor.label",
    placeholder: "form.apartmentInformation.fields.floor.placeholder",
    required: true,
    type: "number",
    name: "floor",
  },
  {
    label: "form.apartmentInformation.fields.area.label",
    placeholder: "form.apartmentInformation.fields.area.placeholder",
    type: "number",
    required: true,
    name: "area",
  },
  {
    label: "form.apartmentInformation.fields.status.label",
    placeholder: "form.apartmentInformation.fields.status.placeholder",
    type: "select",
    required: true,
    name: "status",
    options: [
      {
        label: "form.apartmentInformation.fields.status.options.available",
        value: Status.AVAILABLE,
      },
      {
        label: "form.apartmentInformation.fields.status.options.rented",
        value: Status.RENTED,
      },
      {
        label: "form.apartmentInformation.fields.status.options.maintenance",
        value: Status.MAINTENANCE,
      },
    ],
  },
  {
    label: "form.apartmentInformation.fields.parking.label",
    placeholder: "form.apartmentInformation.fields.parking.placeholder",
    type: "text",
    required: false,
    name: "parking",
  },
];

const physicalDetails: IControl<SchemaInformationFields>[] = [
  {
    label: "form.physicalDetails.fields.persons.label",
    placeholder: "form.physicalDetails.fields.persons.placeholder",
    type: "number",
    required: true,
    name: "persons",
  },
  {
    label: "form.physicalDetails.fields.rooms.label",
    placeholder: "form.physicalDetails.fields.rooms.placeholder",
    type: "number",
    required: true,
    name: "rooms",
  },
  {
    label: "form.physicalDetails.fields.bathrooms.label",
    placeholder: "form.physicalDetails.fields.bathrooms.placeholder",
    type: "number",
    required: true,
    name: "bathrooms",
  },
  {
    label: "form.physicalDetails.fields.floors.label",
    placeholder: "form.physicalDetails.fields.floors.placeholder",
    type: "number",
    required: true,
    name: "floors",
  },
  {
    label: "form.physicalDetails.fields.condition.label",
    placeholder: "form.physicalDetails.fields.condition.placeholder",
    type: "select",
    required: true,
    name: "condition",
    options: [
      {
        value: Condition.NEW,
        label: "form.physicalDetails.fields.condition.options.good",
      },
      {
        value: Condition.GOOD,
        label: "form.physicalDetails.fields.condition.options.remoleded",
      },
      {
        value: Condition.MAINTENANCE,
        label: "form.physicalDetails.fields.condition.options.maintenance",
      },
    ],
  },
  {
    label: "form.physicalDetails.fields.furnished.label",
    type: "switch",
    required: true,
    name: "furnished",
  },
  {
    label: "form.physicalDetails.fields.pets.label",
    type: "switch",
    required: true,
    name: "pets",
  },
];

const financialInformationControls: IControl<SchemaInformationFields>[] = [
  {
    label: "form.financialInformation.fields.monthlyFee.label",
    placeholder: "form.financialInformation.fields.monthlyFee.placeholder",
    type: "number",
    name: "monthlyFee",
    required: true,
  },
  {
    label: "form.financialInformation.fields.garanty.label",
    placeholder: "form.financialInformation.fields.garanty.placeholder",
    type: "number",
    name: "garanty",
    required: true,
  },
  {
    label: "form.financialInformation.fields.currency.label",
    placeholder: "form.financialInformation.fields.currency.placeholder",
    type: "select",
    name: "currency",
    required: true,
    options: [
      {
        label: "form.financialInformation.fields.currency.options.pen",
        value: Currencies.PEN,
      },
      {
        label: "form.financialInformation.fields.currency.options.usd",
        value: Currencies.USD,
      },
      {
        label: "form.financialInformation.fields.currency.options.eur",
        value: Currencies.EUR,
      },
    ],
  },
  {
    label: "form.financialInformation.fields.maintenanceFee.label",
    placeholder: "form.financialInformation.fields.maintenanceFee.placeholder",
    type: "number",
    name: "maintenanceFee",
    required: false,
  },
];

export const createApartmentSections = [
  {
    id: 1,
    title: "form.apartmentInformation.title",
    description: "form.apartmentInformation.description",
    controls: apartmentInformation,
  },
  {
    id: 2,
    title: "form.physicalDetails.title",
    description: "form.physicalDetails.description",
    controls: physicalDetails,
  },
  {
    id: 3,
    title: "form.financialInformation.title",
    description: "form.financialInformation.description",
    controls: financialInformationControls,
  },
];
