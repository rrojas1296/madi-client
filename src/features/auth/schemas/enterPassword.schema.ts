import z from "zod";

const schema = z.object({
  password: z.string().min(1, {
    error: "field.errors.required",
  }),
});

export type SchemaType = z.infer<typeof schema>;
export type SchemaFields = keyof SchemaType;

export { schema };
