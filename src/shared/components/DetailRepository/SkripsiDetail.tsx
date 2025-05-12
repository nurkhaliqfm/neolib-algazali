import { RepositorySkripsi } from "@/modules/admin/koleksi/types/koleksi.type";
import { DetailRepositoryItem } from "./DetailItem";

interface Props {
	data: RepositorySkripsi;
}

const repositorySkripsiMap = {
	abstrak: { slug: "Abstrak", isWajib: true },
	pengarang: { slug: "Pengarang", isWajib: true },
	fakultaspenerbit: { slug: "Fakultas", isWajib: true },
	prodi: { slug: "Prodi", isWajib: true },
	tahun_terbit: { slug: "Tahun Terbit", isWajib: true },
	lokasi: { slug: "Lokasi", isWajib: true },
} as const;

export const SkripsiDetail: React.FC<Props> = ({ data }) => (
	<>
		{Object.keys(repositorySkripsiMap).map((key) => {
			return (
				<DetailRepositoryItem
					key={key}
					slug={key}
					title={
						repositorySkripsiMap[key as keyof typeof repositorySkripsiMap].slug
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
