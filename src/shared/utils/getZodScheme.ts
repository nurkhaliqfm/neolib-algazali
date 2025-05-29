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
							(file) => !file || file instanceof FileList,
							`${field.label} is required`
						)
						.refine(
							(file) =>
								!file ||
								file.length === 0 ||
								(file instanceof FileList &&
									file.length > 0 &&
									field.allowed?.includes(file[0].type)),
							`${field.allowed} are allowed for this field`
						)
						.optional();
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
