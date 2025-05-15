import { RepositoryJurnal } from "@/modules/admin/koleksi/types/koleksi.type";
import { DetailRepositoryItem } from "./DetailItem";
import { repositoryJurnalMetaFileds } from "@/constants/repository";

interface Props {
	data: RepositoryJurnal;
}

export const JurnalDetail: React.FC<Props> = ({ data }) => (
	<>
		{Object.keys(repositoryJurnalMetaFileds).map((key) => {
			return (
				<DetailRepositoryItem
					key={key}
					slug={key}
					title={
						repositoryJurnalMetaFileds[
							key as keyof typeof repositoryJurnalMetaFileds
						].slug
					}
					value={
						key === "lokasi"
							? data.lokasi
								? data.lokasi.nama
								: ""
							: (data[key as keyof RepositoryJurnal] as string)
					}
				/>
			);
		})}
	</>
);
