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
import { useTypedSelector } from "@/hooks/useTypedSelector";
import AppRoutes from "@/router/routes";
import { generateZodSchema } from "@/shared/utils/getZodScheme";
import { Button } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiChevronRight } from "react-icons/hi2";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { AnggotaItemKey } from "@/types/anggota";
import {
	anggotaBaseFieldConfig,
	anggotaFieldConfig,
	anggotaFormSelectOptios,
} from "@/constants/user";
import { createtAnggota } from "../services/anggotaService";
import { AnggotaRequest } from "../types/anggota.type";
import { toast } from "react-toastify";

const CreateAnggotaPage = () => {
	const { group } = useParams<{ group: AnggotaItemKey }>();
	const user = useTypedSelector((state) => state.oauth.oauthData);
	const navigate = useNavigate();

	const [isLoadingCreate, setIsLoadingCreate] = useState(false);

	const detailKey = group ? (group as keyof typeof anggotaFieldConfig) : null;

	const formFields = [
		...anggotaBaseFieldConfig,
		...(detailKey
			? anggotaFieldConfig[detailKey].map((field) => ({
					...field,
					type: field.type as "number" | "textarea" | "text" | "select",
					name: field.name as keyof z.infer<typeof formZodSchema>,
			  }))
			: []),
	];

	const formZodSchema = detailKey
		? generateZodSchema([
				...anggotaBaseFieldConfig.map((field) => ({
					...field,
					type: field.type,
					name: field.name,
				})),
				...anggotaFieldConfig[detailKey].map((field) => ({
					...field,
					name: field.name,
				})),
		  ])
		: z.object({});

	const form = useForm<z.infer<typeof formZodSchema>>({
		resolver: zodResolver(formZodSchema),
		defaultValues: {},
	});

	function onSubmit(values: z.infer<typeof formZodSchema>) {
		setIsLoadingCreate(true);
		console.log(values);

		const { fullname, ...anggotaData } = values as AnggotaRequest;

		createtAnggota({
			token: user?.access_token,
			atr: { slug: group },
			anggota: {
				fullname: fullname,
				email: null,
				[group as string]: {
					...anggotaData,
					nama: fullname,
				},
			},
			onDone: (data) => {
				if (data.status === 201) {
					toast.success(data.message, {
						autoClose: 700,
						onClose: () => {
							navigate(
								AppRoutes.AdminAnggota.path.replace(":group", group || "")
							);
						},
					});
				} else {
					toast.error(data.message, {
						theme: "colored",
						autoClose: 700,
						onClose: () => {
							setIsLoadingCreate(false);
						},
					});
				}
			},
			onError: (error) => {
				toast.error(error.error, {
					theme: "colored",
					autoClose: 700,
					onClose: () => {
						setIsLoadingCreate(false);
					},
				});
			},
		});
	}

	useEffect(() => {
		if (detailKey) {
			form.reset({
				...form.getValues(),
				...(anggotaFieldConfig[detailKey].reduce(
					(acc, field) => ({
						...acc,
						[field.name]:
							field.type === "number"
								? undefined
								: field.type === "textarea"
								? ""
								: field.type === "select"
								? null
								: "",
					}),
					{}
				) as z.infer<typeof formZodSchema>),
				nama: "",
				kontak: "",
				alamat: "",
				jenis_kelamin: null,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [detailKey]);

	if (!group) return <Navigate to={AppRoutes.Error.path} />;

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
															const selectedOptions = anggotaFormSelectOptios[
																ff.name as keyof typeof anggotaFormSelectOptios
															].find((item) => item.id === Number(value));
															field.onChange(selectedOptions || null);
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
															{anggotaFormSelectOptios[
																ff.name as keyof typeof anggotaFormSelectOptios
															].map((item) => (
																<SelectItem
																	key={item.id}
																	value={String(item.id)}>
																	{item.nama}
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
													min={0}
													onChange={(e) => {
														const value = e.target.value;
														if (value === "") {
															field.onChange(undefined);
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
							isLoading={isLoadingCreate}
							spinner={
								<svg
									className="animate-spin h-5 w-5 text-current"
									fill="none"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg">
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									/>
									<path
										className="opacity-75"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										fill="currentColor"
									/>
								</svg>
							}
							endContent={<HiChevronRight />}
							className="mt-4"
							color="primary"
							type="submit">
							Simpan Anggota
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
};

export default CreateAnggotaPage;
