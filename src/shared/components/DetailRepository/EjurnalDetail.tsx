import { RepositoryEjurnal } from "@/modules/admin/koleksi/types/koleksi.type";
import { DetailRepositoryItem } from "./DetailItem";

interface Props {
	data: RepositoryEjurnal;
}

const repositoryEjurnalMap = {
	abstrak: { slug: "Abstrak", isWajib: true },
	pengarang: { slug: "Pengarang", isWajib: true },
	penerbit: { slug: "Penerbit", isWajib: true },
	jurnal: { slug: "Jurnal", isWajib: true },
	tahun_terbit: { slug: "Tahun Terbit", isWajib: true },
	isbn: { slug: "ISBN", isWajib: true },
} as const;

export const EjurnalDetail: React.FC<Props> = ({ data }) => (
	<>
		{Object.keys(repositoryEjurnalMap).map((key) => {
			return (
				<DetailRepositoryItem
					key={key}
					slug={key}
					title={
						repositoryEjurnalMap[key as keyof typeof repositoryEjurnalMap].slug
					}
					value={data[key as keyof RepositoryEjurnal] as string}
				/>
			);
		})}
	</>
);
