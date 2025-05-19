import { useLocation, useParams } from "react-router-dom";
import { getDetailRepository } from "../services/koleksiService";
import { RepositoryDetailResponse } from "../types/koleksi.type";
import { RepositoryItemKey } from "@/types/repository";
import { useEffect, useState } from "react";
import { useTypedSelector } from "@/hooks/useTypedSelector";

import {
	repositoryBukuMetaScheme,
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
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const lokasiOptions = [
	{ id: 1, nama: "Rak 1" },
	{ id: 2, nama: "Rak 2" },
	{ id: 3, nama: "Rak 3" },
	{ id: 4, nama: "Rak 4" },
];

const EditKoleksiPage = () => {
	const { koleksi } = useParams<{ koleksi: RepositoryItemKey }>();
	const { search } = useLocation();

	const params = new URLSearchParams(search);
	const repos = params.get("repos");

	const user = useTypedSelector((state) => state.oauth.oauthData);
	const [repositoryDetailData, setrepositoryDetailData] =
		useState<RepositoryDetailResponse | null>(null);

	const form = useForm<z.infer<typeof repositoryBukuMetaScheme>>({
		resolver: zodResolver(repositoryBukuMetaScheme),
	});

	function onSubmit(values: z.infer<typeof repositoryBukuMetaScheme>) {
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
					form.reset(
						data[repositoryTypeMap[data.type]] as unknown as z.infer<
							typeof repositoryBukuMetaScheme
						>
					);
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [koleksi, repos]);

	if (!repositoryDetailData) return <p>No data found.</p>;

	const detailKey = repositoryTypeMap[repositoryDetailData.type];
	// const detailData = repositoryDetailData[detailKey];
	const formFields = repositoryFieldConfig[detailKey].map((field) => ({
		...field,
		type: field.type as "number" | "textarea" | "text" | "select",
		name: field.name as keyof z.infer<typeof repositoryBukuMetaScheme>,
	}));

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
					{formFields.map((ff) => {
						return (
							<FormField
								key={ff.name}
								control={form.control}
								name={ff.name}
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

					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</>
	);
};

export default EditKoleksiPage;
