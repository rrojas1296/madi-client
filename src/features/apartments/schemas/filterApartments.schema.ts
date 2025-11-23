import z from "zod";
import { ApartmentCurrencies, ApartmentStatus } from "./createApartment.schema";
import { IControl } from "@/features/shared/types/formfield";

const rangeSchema = (errorKey: string) =>
  z
    .object({
      min: z
        .int()
        .min(1, {
          error: `${errorKey}.negative`,
        })
        .or(z.nan())
        .optional(),
      max: z
        .int()
        .min(1, {
          error: `${errorKey}.negative`,
        })
        .or(z.nan())
        .optional(),
    })
    .refine(
      (data) => {
        if (data.min == null || data.max == null) return true;
        if (isNaN(data.min) || isNaN(data.max)) return true;
        return data.max > data.min;
      },
      {
        error: `${errorKey}.invalidRange`,
        path: ["max"],
      },
    );

export const filtersSchema = z.object({
  status: z.array(z.enum(ApartmentStatus)).optional(),
  currency: z.array(z.enum(ApartmentCurrencies)).optional(),
  monthlyFee: rangeSchema("filters.monthlyFee.errors").optional(),
  rooms: rangeSchema("filters.rooms.errors").optional(),
  area: rangeSchema("filters.area.errors").optional(),
  pets: z.array(z.enum(["true", "false"])).optional(),
  furnished: z.array(z.enum(["true", "false"])).optional(),
});

export type FiltersSchema = z.infer<typeof filtersSchema>;
export type FiltersSchemaFields = keyof FiltersSchema;

export const filterControls: IControl<FiltersSchemaFields>[] = [
  {
    name: "status",
    label: "filters.status.label",
    type: "select-badge",
    options: [
      {
        label: "filters.status.options.available",
        value: ApartmentStatus.AVAILABLE,
      },
      {
        label: "filters.status.options.leased",
        value: ApartmentStatus.LEASED,
      },
      {
        label: "filters.status.options.maintenance",
        value: ApartmentStatus.MAINTENANCE,
      },
    ],
  },
  {
    name: "currency",
    label: "filters.currency.label",
    type: "select-badge",
    options: [
      {
        label: "filters.currency.options.pen",
        value: ApartmentCurrencies.PEN,
      },
      {
        label: "filters.currency.options.usd",
        value: ApartmentCurrencies.USD,
      },
      {
        label: "filters.currency.options.eur",
        value: ApartmentCurrencies.EUR,
      },
    ],
  },
  {
    name: "monthlyFee",
    label: "filters.monthlyFee.label",
    type: "input-range",
    placeholderMin: "filters.monthlyFee.placeholderMin",
    placeholderMax: "filters.monthlyFee.placeholderMax",
  },
  {
    name: "rooms",
    label: "filters.rooms.label",
    type: "input-range",
    placeholderMin: "filters.rooms.placeholderMin",
    placeholderMax: "filters.rooms.placeholderMax",
  },
  {
    name: "area",
    label: "filters.area.label",
    type: "input-range",
    placeholderMin: "filters.area.placeholderMin",
    placeholderMax: "filters.area.placeholderMax",
  },
  {
    name: "pets",
    label: "filters.pets.label",
    type: "select-badge",
    options: [
      {
        label: "filters.pets.options.true",
        value: "true",
      },
      {
        label: "filters.pets.options.false",
        value: "false",
      },
    ],
  },
  {
    name: "furnished",
    label: "filters.furnished.label",
    type: "select-badge",
    options: [
      {
        label: "filters.furnished.options.true",
        value: "true",
      },
      {
        label: "filters.furnished.options.false",
        value: "false",
      },
    ],
  },
];
