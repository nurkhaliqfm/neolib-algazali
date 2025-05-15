import { RepositoryEjurnal } from "@/modules/admin/koleksi/types/koleksi.type";
import { DetailRepositoryItem } from "./DetailItem";
import { repositoryEjurnalMetaFiels } from "@/constants/repository";

interface Props {
	data: RepositoryEjurnal;
}

export const EjurnalDetail: React.FC<Props> = ({ data }) => (
	<>
		{Object.keys(repositoryEjurnalMetaFiels).map((key) => {
			return (
				<DetailRepositoryItem
					key={key}
					slug={key}
					title={
						repositoryEjurnalMetaFiels[
							key as keyof typeof repositoryEjurnalMetaFiels
						].slug
					}
					value={data[key as keyof RepositoryEjurnal] as string}
				/>
			);
		})}
	</>
);
