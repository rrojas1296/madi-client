import { IControl } from "@/features/shared/types/formfield";
import z from "zod";

export enum ApartmentStatus {
  AVAILABLE = "AVAILABLE",
  LEASED = "LEASED",
  MAINTENANCE = "MAINTENANCE",
}

export enum ApartmentCurrencies {
  PEN = "PEN",
  USD = "USD",
  EUR = "EUR",
}

export enum ApartmentCondition {
  NEW = "NEW",
  REMODELED = "REMODELED",
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
  floor: z
    .number({
      error: "form.apartmentInformation.fields.floor.errors.required",
    })
    .min(1, {
      error: "form.apartmentInformation.fields.floor.errors.min",
    }),
  area: z
    .number({
      error: "form.apartmentInformation.fields.area.errors.required",
    })
    .min(1, {
      error: "form.apartmentInformation.fields.area.errors.min",
    })
    .int({
      error: "form.apartmentInformation.fields.area.errors.int",
    }),
  status: z.enum(ApartmentStatus, {
    error: "form.apartmentInformation.fields.status.errors.required",
  }),
  parking: z.string({
    error: "form.apartmentInformation.fields.parking.errors.required",
  }),
  persons: z
    .number({
      error: "form.physicalDetails.fields.persons.errors.required",
    })
    .min(1, {
      error: "form.physicalDetails.fields.persons.errors.min",
    }),
  rooms: z
    .number({
      error: "form.physicalDetails.fields.rooms.errors.required",
    })
    .min(1, {
      error: "form.physicalDetails.fields.rooms.errors.min",
    }),
  bathrooms: z
    .number({
      error: "form.physicalDetails.fields.bathrooms.errors.required",
    })
    .min(1, {
      error: "form.physicalDetails.fields.bathrooms.errors.min",
    }),
  floors: z
    .number({
      error: "form.physicalDetails.fields.floors.errors.required",
    })
    .min(1, {
      error: "form.physicalDetails.fields.floors.errors.min",
    }),
  furnished: z.boolean().default(false),
  pets: z.boolean().default(false),
  condition: z.enum(ApartmentCondition, {
    error: "form.physicalDetails.fields.condition.errors.required",
  }),
  monthlyFee: z
    .number({
      error: "form.financialInformation.fields.monthlyFee.errors.required",
    })
    .min(1, {
      error: "form.financialInformation.fields.monthlyFee.errors.min",
    }),
  garanty: z
    .number({
      error: "form.financialInformation.fields.garanty.errors.required",
    })
    .min(1, {
      error: "form.financialInformation.fields.garanty.errors.min",
    }),
  currency: z.enum(ApartmentCurrencies, {
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
    isFloat: false,
    name: "floor",
  },
  {
    label: "form.apartmentInformation.fields.area.label",
    placeholder: "form.apartmentInformation.fields.area.placeholder",
    type: "number",
    required: true,
    isFloat: true,
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
        value: ApartmentStatus.AVAILABLE,
      },
      {
        label: "form.apartmentInformation.fields.status.options.leased",
        value: ApartmentStatus.LEASED,
      },
      {
        label: "form.apartmentInformation.fields.status.options.maintenance",
        value: ApartmentStatus.MAINTENANCE,
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
    isFloat: false,
    name: "persons",
  },
  {
    label: "form.physicalDetails.fields.rooms.label",
    placeholder: "form.physicalDetails.fields.rooms.placeholder",
    type: "number",
    isFloat: false,
    required: true,
    name: "rooms",
  },
  {
    label: "form.physicalDetails.fields.bathrooms.label",
    placeholder: "form.physicalDetails.fields.bathrooms.placeholder",
    type: "number",
    required: true,
    isFloat: false,
    name: "bathrooms",
  },
  {
    label: "form.physicalDetails.fields.floors.label",
    placeholder: "form.physicalDetails.fields.floors.placeholder",
    type: "number",
    required: true,
    isFloat: false,
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
        value: ApartmentCondition.NEW,
        label: "form.physicalDetails.fields.condition.options.new",
      },
      {
        value: ApartmentCondition.REMODELED,
        label: "form.physicalDetails.fields.condition.options.remodeled",
      },
      {
        value: ApartmentCondition.MAINTENANCE,
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
    isFloat: true,
    name: "monthlyFee",
    required: true,
  },
  {
    label: "form.financialInformation.fields.garanty.label",
    placeholder: "form.financialInformation.fields.garanty.placeholder",
    type: "number",
    isFloat: true,
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
        value: ApartmentCurrencies.PEN,
      },
      {
        label: "form.financialInformation.fields.currency.options.usd",
        value: ApartmentCurrencies.USD,
      },
      {
        label: "form.financialInformation.fields.currency.options.eur",
        value: ApartmentCurrencies.EUR,
      },
    ],
  },
  {
    label: "form.financialInformation.fields.maintenanceFee.label",
    placeholder: "form.financialInformation.fields.maintenanceFee.placeholder",
    type: "number",
    name: "maintenanceFee",
    isFloat: true,
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
