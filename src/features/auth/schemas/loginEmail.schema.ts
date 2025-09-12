import z from "zod";

const schema = z.object({
  email: z.email({
    error: "form.fields.email.errors.required",
  }),
});

const controls = [
  {
    label: "Correo",
    placeholder: "mi-correo@gmail.com",
    type: "email",
  },
];

export type SchemaType = z.infer<typeof schema>;
export type SchemaFields = keyof SchemaType;

export { controls, schema };
