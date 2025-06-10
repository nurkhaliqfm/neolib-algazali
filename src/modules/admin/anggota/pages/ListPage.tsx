import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { AnggotaTable } from "../components/AnggotaTable";
import { Button } from "@heroui/react";
import { HiOutlinePlus } from "react-icons/hi2";
import AppRoutes from "@/router/routes";
import { AnggotaResponse } from "../types/anggota.type";
import { getListAnggota } from "../services/anggotaService";
import { AnggotaItemKey } from "@/types/anggota";

const ListAnggotaPage = () => {
	const navigate = useNavigate();
	const { group } = useParams<{ group: AnggotaItemKey }>();
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get("page") || "1";
	const keyword = searchParams.get("keyword") || "";
	const limit = searchParams.get("limit") || "5";

	const user = useTypedSelector((state) => state.oauth.oauthData);
	const [anggotaData, setAnggotaData] = useState<AnggotaResponse | null>(null);

	useEffect(() => {
		if (group) {
			getListAnggota({
				token: user?.access_token,
				page: page,
				type: group,
				keyword: keyword,
				limit: limit,
				onDone: (data) => {
					console.log("Data Anggota:", data);
					setAnggotaData(data);
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, keyword, limit]);

	return (
		<>
			{anggotaData && group ? (
				<>
					<section className="flex justify-between my-2 px-4 capitalize">
						<h3 className="capitalize text-xl font-light">
							Data Anggota {group}
						</h3>
						<Button
							onPress={() =>
								navigate(
									`${AppRoutes.AdminCreateKoleksi.path.replace(
										":koleksi",
										group
									)}`
								)
							}
							startContent={<HiOutlinePlus />}
							size="sm"
							color="primary"
							variant="solid"
							className="capitalize">{`${group} Baru`}</Button>
					</section>
					<AnggotaTable
						data={anggotaData}
						page={Number(page)}
						keyword={keyword}
						slug={group}
						limit={limit}
						setSearchParams={setSearchParams}
					/>
				</>
			) : (
				<div className="border-1 border-slate-100 p-2 rounded-lg text-center shadow-md">
					Data anggota tidak ditemukan
				</div>
			)}
		</>
	);
};

export default ListAnggotaPage;
