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
	reposHasFile,
	repositoryBaseFieldConfig,
	repositoryFieldConfig,
	repositoryFormSelectOptios,
} from "@/constants/repository";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import AppRoutes from "@/router/routes";
import { generateZodSchema } from "@/shared/utils/getZodScheme";
import { RepositoryItemKey } from "@/types/repository";
import { Button } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiChevronRight } from "react-icons/hi2";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { RepositoryRequest } from "../types/koleksi.type";
import { createRepository } from "../services/koleksiService";
import { toast } from "react-toastify";

const CreateKoleksiPage = () => {
	const { koleksi } = useParams<{ koleksi: RepositoryItemKey }>();
	const user = useTypedSelector((state) => state.oauth.oauthData);
	const navigate = useNavigate();

	const [isLoadingCreate, setIsLoadingCreate] = useState(false);

	const detailKey = koleksi
		? (koleksi as keyof typeof repositoryFieldConfig)
		: null;

	const formFields = [
		...repositoryBaseFieldConfig.filter((field) =>
			field.name === "nama_file"
				? koleksi && reposHasFile.includes(koleksi.toUpperCase())
				: true
		),
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
		setIsLoadingCreate(true);

		const { judul, nama_sampul, nama_file, pengarang, ...reposData } =
			values as RepositoryRequest;

		createRepository({
			token: user?.access_token,
			atr: { slug: koleksi },
			repos: {
				judul,
				nama_sampul: nama_sampul,
				nama_file: nama_file,
				pengarang: pengarang,
				type: koleksi?.toUpperCase() as
					| "EJURNAL"
					| "JURNAL"
					| "EBOOK"
					| "BUKU"
					| "SKRIPSI",
				[koleksi as string]: {
					...reposData,
				},
			},
			onDone: (data) => {
				if (data.status === 201) {
					toast.success(data.message, {
						autoClose: 700,
						onClose: () => {
							navigate(
								AppRoutes.AdminKoleksi.path.replace(":koleksi", koleksi || "")
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
				...(repositoryFieldConfig[detailKey].reduce(
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
				judul: "",
				pengarang: "",
				nama_sampul: null,
				nama_file: null,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [detailKey]);

	if (!koleksi) return <Navigate to={AppRoutes.Error.path} />;

	return (
		<div className="p-4">
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
															const selectedOptions =
																repositoryFormSelectOptios[
																	ff.name as keyof typeof repositoryFormSelectOptios
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
															{repositoryFormSelectOptios[
																ff.name as keyof typeof repositoryFormSelectOptios
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
													value={undefined}
													onChange={(e) => {
														const value = e.target.value;
														if (value === "") {
															field.onChange(0);
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
							Simpan Repository
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default CreateKoleksiPage;
