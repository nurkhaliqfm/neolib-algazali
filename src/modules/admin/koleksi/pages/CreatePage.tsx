import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
	lokasiOptions,
	repositoryBaseFieldConfig,
	repositoryFieldConfig,
} from "@/constants/repository";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import AppRoutes from "@/router/routes";
import { generateZodSchema } from "@/shared/utils/getZodScheme";
import { RepositoryItemKey } from "@/types/repository";
import { Button } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { HiChevronRight } from "react-icons/hi2";
import { Navigate, useParams } from "react-router-dom";
import { z } from "zod";

const CreateKoleksiPage = () => {
	const { koleksi } = useParams<{ koleksi: RepositoryItemKey }>();
	const user = useTypedSelector((state) => state.oauth.oauthData);

	const detailKey = koleksi
		? (koleksi as keyof typeof repositoryFieldConfig)
		: null;

	const formFields = [
		...repositoryBaseFieldConfig,
		...(detailKey
			? repositoryFieldConfig[detailKey].map((field) => ({
					...field,
					type: field.type as "number" | "textarea" | "text" | "select",
					name: field.name as keyof z.infer<typeof formZodSchema>,
			  }))
			: []),
	];

	const formZodSchema = detailKey
		? generateZodSchema([
				...repositoryBaseFieldConfig.map((field) => ({
					...field,
					type: field.type,
					name: field.name,
				})),
				...repositoryFieldConfig[detailKey],
		  ])
		: z.object({});

	const form = useForm<z.infer<typeof formZodSchema>>({
		resolver: zodResolver(formZodSchema),
		defaultValues: {},
	});

	function onSubmit(values: z.infer<typeof formZodSchema>) {
		console.log("token", user?.access_token);
		console.log(values);
	}

	useEffect(() => {
		if (detailKey) {
			form.reset({
				...form.getValues(),
				...(repositoryFieldConfig[detailKey].reduce(
					(acc, field) => ({
						...acc,
						[field.name]:
							field.type === "number"
								? null
								: field.type === "textarea"
								? ""
								: field.type === "select"
								? null
								: "",
					}),
					{}
				) as z.infer<typeof formZodSchema>),
				judul: "",
				nama_sampul: null,
				nama_file: null,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [detailKey]);

	if (!koleksi) return <Navigate to={AppRoutes.Error.path} />;

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
					{formFields.map((ff) => {
						return (
							<FormField
								key={ff.name}
								control={form.control}
								name={ff.name as keyof z.infer<typeof formZodSchema>}
								render={({ field }) => (
									<FormItem>
										<FormLabel>{ff.label}</FormLabel>
										<FormControl>
											{ff.type === "select" ? (
												<>
													<Select
														onValueChange={(value) => {
															const selectedLokasi = lokasiOptions.find(
																(lokasi) => lokasi.id === Number(value)
															);
															field.onChange(selectedLokasi || null);
														}}
														value={
															field.value && typeof field.value === "object"
																? String((field.value as { id: number }).id)
																: undefined
														}>
														<SelectTrigger>
															<SelectValue placeholder={`Pilih ${ff.label}`} />
														</SelectTrigger>
														<SelectContent>
															{lokasiOptions.map((lokasi) => (
																<SelectItem
																	key={lokasi.id}
																	value={String(lokasi.id)}>
																	{lokasi.nama}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</>
											) : ff.type === "textarea" ? (
												<Textarea
													placeholder={`Masukkan ${ff.label}`}
													{...field}
													rows={5}
													value={
														typeof field.value === "object" &&
														field.value !== null
															? ""
															: (field.value as typeof field.value) ?? ""
													}
												/>
											) : ff.type === "number" ? (
												<Input
													placeholder={`Masukkan ${ff.label}`}
													{...field}
													type="number"
													onChange={(e) => {
														const value = e.target.value;
														if (value === "") {
															field.onChange(null);
														} else {
															field.onChange(Number(value));
														}
													}}
												/>
											) : ff.type === "file" ? (
												<Input
													{...field}
													type="file"
													value={undefined}
													onChange={(e) => {
														const file = e.target.files as FileList;
														field.onChange(file);
													}}
												/>
											) : (
												<Input
													placeholder={`Masukkan ${ff.label}`}
													{...field}
													type={ff.type}
													value={
														typeof field.value === "object" &&
														field.value !== null
															? ""
															: (field.value as typeof field.value) ?? ""
													}
												/>
											)}
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						);
					})}

					<div className="flex justify-end">
						<Button
							endContent={<HiChevronRight />}
							className="mt-4"
							color="primary"
							type="submit">
							Simpan Repository
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
};

export default CreateKoleksiPage;
