import { z } from "zod";

export const signUpSchema = z.object({
	email: z.string().email({ message: 'forms.email_@' }),
	name: z.string().min(3, { message: 'forms.sp_name' }),
	lastName: z.string().min(3, { message: 'forms.sp_name_last' }),
	password: z.string().min(8, { message: 'forms.pass_lenght' }) .refine((password) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/.test(password), { message: 'forms.pass_rexpression', }),
	confirmPassword: z.string().min(8, { message: 'forms.field_required' }),
}).refine((data) => data.password === data.confirmPassword, { message: 'forms.pass_eq', path: ["confirmPassword"] });
