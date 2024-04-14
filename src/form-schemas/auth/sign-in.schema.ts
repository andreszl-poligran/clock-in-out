import { z } from "zod";

export const signInSchema = z.object({
	email: z.string().email({ message: "forms.email_@" }),
	password: z.string().min(8, { message: "forms.pass_lenght" })
});