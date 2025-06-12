import { Card, CardBody, CardHeader } from "@heroui/react";
import { useLocation, useParams } from "react-router-dom";
import { AnggotaDetailTransaksiResponse } from "../types/anggota.type";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect, useState } from "react";
import { AnggotaItemKey } from "@/types/anggota";
import { anggotaBaseFieldConfig, anggotaFieldConfig } from "@/constants/user";
import { getAnggotaTransaksiDetail } from "../services/anggotaService";
import { AnggotaDetailItem } from "../components/AnggotaDetail";

const DetailAnggotaPage = () => {
	const { group } = useParams<{ group: AnggotaItemKey }>();
	const { search } = useLocation();

	const params = new URLSearchParams(search);
	const anggota = params.get("anggota");

	const user = useTypedSelector((state) => state.oauth.oauthData);
	const [anggotaTransaksiDetailData, setAnggotaTransaksiDetailData] =
		useState<AnggotaDetailTransaksiResponse | null>(null);

	useEffect(() => {
		if (group && anggota) {
			getAnggotaTransaksiDetail({
				token: user?.access_token,
				type: group,
				anggota: anggota,
				onDone: (data) => {
					console.log(data);
					setAnggotaTransaksiDetailData(data);
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [anggota, group]);

	if (!anggotaTransaksiDetailData) return <p></p>;

	const detailKey = group ? (group as keyof typeof anggotaFieldConfig) : null;

	const formFields = [
		...anggotaBaseFieldConfig,
		...(detailKey
			? anggotaFieldConfig[detailKey].map((field) => ({
					...field,
			  }))
			: []),
	];
	const detailData = detailKey && anggotaTransaksiDetailData[detailKey];

	return (
		<>
			{detailData && (
				<section className="flex gap-4 p-4 flex-col lg:flex-row">
					<Card className="py-4 flex-1 border rounded-2xl h-fit" shadow="none">
						<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
							<p className="text-tiny uppercase font-bold">Detail Anggota</p>
						</CardHeader>
						<CardBody className="overflow-visible py-2 px-4">
							{formFields.map((field) => {
								return (
									<AnggotaDetailItem
										key={field.name}
										slug={field.name}
										title={field.label}
										value={
											field.name === "fullname"
												? detailData.nama
												: field.name === "jenis_kelamin"
												? detailData.jenis_kelamin === "L"
													? "Laki-Laki"
													: "Perempuan"
												: field.name === "prodi"
												? ("prodi" in detailData && detailData.prodi?.nama) ||
												  ""
												: String(
														detailData[field.name as keyof typeof detailData] ??
															""
												  )
										}
									/>
								);
							})}
						</CardBody>
					</Card>
				</section>
			)}
		</>
	);
};

export default DetailAnggotaPage;
