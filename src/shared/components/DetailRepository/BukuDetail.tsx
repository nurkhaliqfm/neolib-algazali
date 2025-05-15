import { RepositoryBuku } from "@/modules/admin/koleksi/types/koleksi.type";
import { DetailRepositoryItem } from "./DetailItem";
import { repositoryBukuMetaFileds } from "@/constants/repository";

interface Props {
	data: RepositoryBuku;
}

export const BukuDetail: React.FC<Props> = ({ data }) => (
	<>
		{Object.keys(repositoryBukuMetaFileds).map((key) => {
			return (
				<DetailRepositoryItem
					key={key}
					slug={key}
					title={
						repositoryBukuMetaFileds[
							key as keyof typeof repositoryBukuMetaFileds
						].slug
					}
					value={
						key === "lokasi"
							? data.lokasi
								? data.lokasi.nama
								: ""
							: (data[key as keyof RepositoryBuku] as string)
					}
				/>
			);
		})}
	</>
);
