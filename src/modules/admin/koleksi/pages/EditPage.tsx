import { useLocation, useParams } from "react-router-dom";
import { getDetailRepository } from "../services/koleksiService";
import { RepositoryDetailResponse } from "../types/koleksi.type";
import { RepositoryItemKey } from "@/types/repository";
import { useEffect, useState } from "react";
import { useTypedSelector } from "@/hooks/useTypedSelector";

import {
	lokasiOptions,
	repositoryBaseFieldConfig,
	repositoryFieldConfig,
	repositoryTypeMap,
} from "@/constants/repository";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { generateZodSchema } from "@/shared/utils/getZodScheme";
import { Button } from "@heroui/react";
import { HiChevronRight } from "react-icons/hi2";

const EditKoleksiPage = () => {
	const { koleksi } = useParams<{ koleksi: RepositoryItemKey }>();
	const { search } = useLocation();

	const params = new URLSearchParams(search);
	const repos = params.get("repos");

	const user = useTypedSelector((state) => state.oauth.oauthData);
	const [repositoryDetailData, setrepositoryDetailData] =
		useState<RepositoryDetailResponse | null>(null);

	const detailKey = repositoryDetailData
		? repositoryTypeMap[repositoryDetailData.type]
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
		defaultValues: {
			judul: repositoryDetailData?.judul || "",
			nama_sampul: repositoryDetailData?.nama_sampul || null,
			nama_file: repositoryDetailData?.nama_file || null,
			...(repositoryDetailData && detailKey
				? repositoryDetailData[detailKey]
				: {}),
		},
	});

	function onSubmit(values: z.infer<typeof formZodSchema>) {
		console.log(values);
	}

	useEffect(() => {
		if (koleksi && repos) {
			getDetailRepository({
				token: user?.access_token,
				type: koleksi,
				repos: repos,
				onDone: (data) => {
					setrepositoryDetailData(data);
					if (formZodSchema) {
						form.reset({
							...(data[repositoryTypeMap[data.type]] as unknown as z.infer<
								typeof formZodSchema
							>),
							judul: data.judul || "",
							nama_sampul: data.nama_sampul || null,
							nama_file: data.nama_file || null,
						});
					}
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [koleksi, repos]);

	if (!repositoryDetailData) return <p>No data found.</p>;

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
													value={(field.value as typeof field.value) ?? ""}
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
													value={(field.value as typeof field.value) ?? ""}
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
							Update Repository
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
};

export default EditKoleksiPage;
