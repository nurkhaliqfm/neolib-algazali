import { RepositoryJurnal } from "@/modules/admin/koleksi/types/koleksi.type";
import { DetailRepositoryItem } from "./DetailItem";

interface Props {
	data: RepositoryJurnal;
}

const repositoryJurnalMap = {
	abstrak: { slug: "Abstrak", isWajib: true },
	pengarang: { slug: "Pengarang", isWajib: true },
	penerbit: { slug: "Penerbit", isWajib: true },
	jurnal: { slug: "Jurnal", isWajib: true },
	tahun_terbit: { slug: "Tahun Terbit", isWajib: true },
	isbn: { slug: "ISBN", isWajib: true },
	lokasi: { slug: "Lokasi", isWajib: true },
} as const;

export const JurnalDetail: React.FC<Props> = ({ data }) => (
	<>
		{Object.keys(repositoryJurnalMap).map((key) => {
			return (
				<DetailRepositoryItem
					key={key}
					slug={key}
					title={
						repositoryJurnalMap[key as keyof typeof repositoryJurnalMap].slug
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
