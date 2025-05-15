import { useLocation, useParams } from "react-router-dom";
import { getDetailRepository } from "../services/koleksiService";
import {
	RepositoryDetailItem,
	RepositoryDetailResponse,
} from "../types/koleksi.type";
import { RepositoryItemKey } from "@/types/repository";
import { createElement, useEffect, useState } from "react";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { BukuDetail } from "@/shared/components/DetailRepository/BukuDetail";
import { EbookDetail } from "@/shared/components/DetailRepository/EbookDetail";
import { EjurnalDetail } from "@/shared/components/DetailRepository/EjurnalDetail";
import { JurnalDetail } from "@/shared/components/DetailRepository/JurnalDetail";
import { SkripsiDetail } from "@/shared/components/DetailRepository/SkripsiDetail";

const detailComponentMap: {
	[K in keyof RepositoryDetailItem]: React.FC<{
		data: RepositoryDetailItem[K];
	}>;
} = {
	jurnal: JurnalDetail,
	ejurnal: EjurnalDetail,
	buku: BukuDetail,
	ebook: EbookDetail,
	skripsi: SkripsiDetail,
};

function renderDetailRepository<T extends keyof RepositoryDetailItem>(
	key: T,
	data: RepositoryDetailItem[T]
) {
	const Component = detailComponentMap[key] as React.ComponentType<{
		data: RepositoryDetailItem[T];
	}>;
	return createElement(Component, { data });
}

const EditKoleksiPage = () => {
	const { koleksi } = useParams<{ koleksi: RepositoryItemKey }>();
	const { search } = useLocation();

	const params = new URLSearchParams(search);
	const repos = params.get("repos");

	const user = useTypedSelector((state) => state.oauth.oauthData);
	const [repositoryDetailData, setrepositoryDetailData] =
		useState<RepositoryDetailResponse | null>(null);

	useEffect(() => {
		if (koleksi && repos) {
			getDetailRepository({
				token: user?.access_token,
				type: koleksi,
				repos: repos,
				onDone: (data) => {
					setrepositoryDetailData(data);
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [koleksi, repos]);

	return (
		<>
			{renderDetailRepository(
				(detailKey, detailData as RepositoryDetailItem[typeof detailKey])
			)}
		</>
	);
};

export default EditKoleksiPage;
