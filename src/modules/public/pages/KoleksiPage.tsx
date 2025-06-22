import { useTypedSelector } from "@/hooks/useTypedSelector";
import { getListRepositoryPagination } from "@/modules/admin/koleksi/services/koleksiService";
import { RepositoryResponse } from "@/modules/admin/koleksi/types/koleksi.type";
import { RepositoryItemKey } from "@/types/repository";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { KoleksiCardPagination } from "../components/KoleksiCardPagination";
import { HiOutlineInboxStack } from "react-icons/hi2";
import { SectionTitleContent } from "@/shared/components/SectionTitle";
import { typePublicRouteMap } from "@/constants/repository";
import { Spinner } from "@heroui/react";

const KoleksiPage = () => {
	const { koleksi } = useParams<{ koleksi: RepositoryItemKey }>();
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get("page") || "1";
	const keyword = searchParams.get("keyword") || "";
	const limit = searchParams.get("limit") || "10";

	const user = useTypedSelector((state) => state.oauth.oauthData);
	const [repositoryData, setRepositoryData] =
		useState<RepositoryResponse | null>(null);
	const [isLoadingData, setIsloadingData] = useState<boolean>(false);

	useEffect(() => {
		if (koleksi) {
			setIsloadingData(true);
			getListRepositoryPagination({
				token: user?.access_token,
				page: page,
				type: koleksi,
				keyword: keyword,
				isPublic: true,
				limit: limit,
				onDone: (data) => {
					setIsloadingData(false);
					setRepositoryData(data);
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, keyword, limit]);

	return (
		<>
			{isLoadingData ? (
				<div className="flex justify-center my-4">
					<div className="bg-white rounded-xl shadow-md z-50 w-fit">
						<Spinner className="m-4" label="Loading data..." />
					</div>
				</div>
			) : (
				<>
					{repositoryData && repositoryData.repository.length > 0 && koleksi ? (
						<section className="leading-3 mb-2 mt-4 px-6">
							<SectionTitleContent
								icon={HiOutlineInboxStack}
								title={`Daftar Koleksi ${
									typePublicRouteMap[repositoryData.repository[0].type].name
								}`}
								description="Berikut list repositori kami"
							/>

							<KoleksiCardPagination
								data={repositoryData}
								page={Number(page)}
								keyword={keyword}
								slug={koleksi}
								limit={limit}
								setSearchParams={setSearchParams}
							/>
						</section>
					) : (
						<div className="border-1 my-4 border-slate-100 p-2 rounded-lg text-center shadow-md">
							Data koleksi tidak ditemukan
						</div>
					)}
				</>
			)}
		</>
	);
};

export default KoleksiPage;
