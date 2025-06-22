import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getListTransaksi } from "../services/transaksiService";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { TransaksiResponse } from "../types/transaksi.type";
import { Button } from "@heroui/react";
import { HiOutlinePlus } from "react-icons/hi2";
import AppRoutes from "@/router/routes";
import { TransaksiTable } from "../components/TransaksiTable";

const ListTransaksiPage = () => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get("page") || "1";
	const keyword = searchParams.get("keyword") || "";
	const limit = searchParams.get("limit") || "5";

	const user = useTypedSelector((state) => state.oauth.oauthData);
	const [transaksiData, setTransaksiData] = useState<TransaksiResponse | null>(
		null
	);

	useEffect(() => {
		getListTransaksi({
			token: user?.access_token,
			page: page,
			keyword: keyword,
			limit: limit,
			onDone: (data) => {
				setTransaksiData(data);
			},
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, keyword, limit]);

	return (
		<>
			{transaksiData ? (
				<>
					<section className="flex justify-between my-2 p-4 pb-0 capitalize">
						<h3 className="capitalize text-xl font-light">Data Transaksi</h3>
						<Button
							onPress={() => navigate(`${AppRoutes.AdminCreateTransaksi.path}`)}
							startContent={<HiOutlinePlus />}
							size="sm"
							color="primary"
							variant="solid"
							className="capitalize">
							Transaksi Baru
						</Button>
					</section>
					<TransaksiTable
						data={transaksiData}
						page={Number(page)}
						keyword={keyword}
						limit={limit}
						setSearchParams={setSearchParams}
					/>
				</>
			) : (
				<div className="border-1 border-slate-100 p-2 rounded-lg text-center shadow-md m-4">
					Data Transaksi tidak ditemukan
				</div>
			)}
		</>
	);
};

export default ListTransaksiPage;
