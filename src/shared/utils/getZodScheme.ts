import { z } from "zod";

export const generateZodSchema = (
	fields: Array<{
		name: string;
		label: string;
		type: string;
		required: boolean;
	}>
) => {
	return z.object(
		fields.reduce((schema, field) => {
			let fieldSchema;
			switch (field.type) {
				case "text":
				case "textarea":
					fieldSchema = z.string();
					break;
				case "number":
					fieldSchema = z.number();
					break;
				case "select":
					fieldSchema = z.object({
						id: z.number(),
						nama: z.string(),
					});
					break;
				default:
					fieldSchema = z.any();
			}
			if (field.required) {
				if (fieldSchema instanceof z.ZodString) {
					fieldSchema = fieldSchema.min(1, `Field ${field.label} is required`);
				}
			}
			return { ...schema, [field.name]: fieldSchema };
		}, {})
	);
};
