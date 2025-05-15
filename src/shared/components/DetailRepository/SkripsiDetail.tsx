import { RepositorySkripsi } from "@/modules/admin/koleksi/types/koleksi.type";
import { DetailRepositoryItem } from "./DetailItem";
import { repositorySkripsiMetaFields } from "@/constants/repository";

interface Props {
	data: RepositorySkripsi;
}

export const SkripsiDetail: React.FC<Props> = ({ data }) => (
	<>
		{Object.keys(repositorySkripsiMetaFields).map((key) => {
			return (
				<DetailRepositoryItem
					key={key}
					slug={key}
					title={
						repositorySkripsiMetaFields[
							key as keyof typeof repositorySkripsiMetaFields
						].slug
					}
					value={
						key === "lokasi"
							? data.lokasi
								? data.lokasi.nama
								: ""
							: (data[key as keyof RepositorySkripsi] as string)
					}
				/>
			);
		})}
	</>
);
