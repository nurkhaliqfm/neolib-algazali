import { RepositoryBuku } from "@/modules/admin/koleksi/types/koleksi.type";
import { DetailRepositoryItem } from "./DetailItem";

interface Props {
	data: RepositoryBuku;
}

const repositoryBukuMap = {
	tanggal: { slug: "Tanggal", isWajib: true },
	no_regist: { slug: "Nomor Registrasi", isWajib: true },
	pengarang: { slug: "Pengarang", isWajib: true },
	sinopsis: { slug: "Sinopsis", isWajib: true },
	cetakan: { slug: "Cetakan", isWajib: true },
	penerbit: { slug: "Penerbit", isWajib: true },
	tempat_terbit: { slug: "Tempat Terbit", isWajib: true },
	tahun_terbit: { slug: "Tahun Terbit", isWajib: true },
	asal_buku: { slug: "Asal Buku", isWajib: true },
	isbn: { slug: "ISBN", isWajib: true },
	no_klasifikasi: { slug: "Nomor Klasifikasi", isWajib: true },
	harga: { slug: "Harga", isWajib: true },
	jumlah_buku: { slug: "Jumlah Buku", isWajib: true },
	keterangan: { slug: "Keterangan", isWajib: true },
	lokasi: { slug: "Lokasi Buku", isWajib: true },
} as const;

export const BukuDetail: React.FC<Props> = ({ data }) => (
	<>
		{Object.keys(repositoryBukuMap).map((key) => {
			return (
				<DetailRepositoryItem
					key={key}
					slug={key}
					title={repositoryBukuMap[key as keyof typeof repositoryBukuMap].slug}
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
