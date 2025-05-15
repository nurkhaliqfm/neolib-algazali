import { RepositoryEbook } from "@/modules/admin/koleksi/types/koleksi.type";
import { DetailRepositoryItem } from "./DetailItem";
import { repositoryEbookMetaFields } from "@/constants/repository";

interface Props {
	data: RepositoryEbook;
}

export const EbookDetail: React.FC<Props> = ({ data }) => (
	<>
		{Object.keys(repositoryEbookMetaFields).map((key) => {
			return (
				<DetailRepositoryItem
					key={key}
					slug={key}
					title={
						repositoryEbookMetaFields[
							key as keyof typeof repositoryEbookMetaFields
						].slug
					}
					value={data[key as keyof RepositoryEbook] as string}
				/>
			);
		})}
	</>
);
