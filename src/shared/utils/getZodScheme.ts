import { z } from "zod";

export const generateZodSchema = (
	fields: Array<{
		name: string;
		label: string;
		type: string;
		required: boolean;
		allowed?: string[];
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
				case "file":
					fieldSchema = z
						.any()
						.refine(
							(file) => file instanceof FileList && file.length > 0,
							"file is required"
						)
						.refine((file) => {
							return (
								file instanceof FileList &&
								file.length > 0 &&
								field.allowed?.includes(file[0].type)
							);
						}, "files are allowed for this field");
					break;
				case "select":
					fieldSchema = z
						.object({
							id: z.number(),
							nama: z.string(),
						})
						.nullable()
						.refine((val) => val !== null, {
							message: `Field ${field.label} is required to select`,
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
