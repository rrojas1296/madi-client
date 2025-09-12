import z from "zod";

const schema = z
  .object({
    password: z.string().min(1, {
      error: "fields.password.errors.required",
    }),
    confirmPassword: z.string(),
  })
  .check((ctx) => {
    if (ctx.value.password !== ctx.value.confirmPassword) {
      ctx.issues.push({
        code: "custom",
        message: "fields.confirmPassword.errors.not-match",
        path: ["confirmPassword"],
        input: ctx,
      });
    }
  });

export type SchemaType = z.infer<typeof schema>;
export type SchemaField = keyof SchemaType;

export { schema };
