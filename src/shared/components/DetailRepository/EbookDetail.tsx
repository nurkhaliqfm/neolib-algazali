import { RepositoryEbook } from "@/modules/admin/koleksi/types/koleksi.type";
import { DetailRepositoryItem } from "./DetailItem";

interface Props {
	data: RepositoryEbook;
}

const repositoryEbookMap = {
	pengarang: { slug: "Pengarang", isWajib: true },
	sinopsis: { slug: "Sinopsis", isWajib: true },
	cetakan: { slug: "Cetakan", isWajib: true },
	penerbit: { slug: "Penerbit", isWajib: true },
	tempat_terbit: { slug: "Tempat Terbit", isWajib: true },
	tahun_terbit: { slug: "Tahun Terbit", isWajib: true },
	isbn: { slug: "ISBN", isWajib: true },
} as const;

export const EbookDetail: React.FC<Props> = ({ data }) => (
	<>
		{Object.keys(repositoryEbookMap).map((key) => {
			return (
				<DetailRepositoryItem
					key={key}
					slug={key}
					title={
						repositoryEbookMap[key as keyof typeof repositoryEbookMap].slug
					}
					value={data[key as keyof RepositoryEbook] as string}
				/>
			);
		})}
	</>
);
