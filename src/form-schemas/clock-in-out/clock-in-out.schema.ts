import { z } from "zod";

export const clockInOutSchema = z.object({
	document: z.string().min(1, { message: 'forms.sp_document' }),
});