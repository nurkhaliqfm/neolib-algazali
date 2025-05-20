import { RepositoryItemKey } from "@/types/repository";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getListRepository } from "../services/koleksiService";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { RepositoryResponse } from "../types/koleksi.type";
import { RepositoryTable } from "../components/KoleksiTable";
import { Button } from "@heroui/react";
import { HiOutlinePlus } from "react-icons/hi2";
import AppRoutes from "@/router/routes";

const ListKoleksiPage = () => {
	const navigate = useNavigate();
	const { koleksi } = useParams<{ koleksi: RepositoryItemKey }>();
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get("page") || "1";

	const user = useTypedSelector((state) => state.oauth.oauthData);
	const [repositoryData, setrepositoryData] =
		useState<RepositoryResponse | null>(null);

	useEffect(() => {
		if (koleksi) {
			getListRepository({
				token: user?.access_token,
				page: page,
				type: koleksi,
				onDone: (data) => {
					setrepositoryData(data);
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	return (
		<>
			{repositoryData && koleksi ? (
				<>
					<section className="flex justify-between my-2 px-4 capitalize">
						<h3 className="capitalize text-xl font-light">
							Data Koleksi {koleksi}
						</h3>
						<Button
							onPress={() =>
								navigate(
									`${AppRoutes.AdminCreateKoleksi.path.replace(
										":koleksi",
										koleksi
									)}`
								)
							}
							startContent={<HiOutlinePlus />}
							size="sm"
							color="primary"
							variant="solid"
							className="capitalize">{`${koleksi} Baru`}</Button>
					</section>
					<RepositoryTable
						repos={repositoryData}
						page={Number(page)}
						slug={koleksi}
						setSearchParams={setSearchParams}
					/>
				</>
			) : (
				<div className="border-1 border-slate-100 p-2 rounded-lg text-center shadow-md">
					Data koleksi tidak ditemukan
				</div>
			)}
		</>
	);
};

export default ListKoleksiPage;
