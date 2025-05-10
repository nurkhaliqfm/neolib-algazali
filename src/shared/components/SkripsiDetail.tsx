import { RepositorySkripsi } from "@/modules/admin/koleksi/types/koleksi.type";

interface Props {
	data: RepositorySkripsi;
}

export const SkripsiDetail: React.FC<Props> = ({ data }) => (
	<>
		<div className="flex flex-col">
			<p className="text-sm">Abstrak</p>
			<p>{data.abstrak}</p>
		</div>
		<div className="flex flex-col">
			<p className="text-sm">Pengarang</p>
			<p>{data.pengarang}</p>
		</div>
		<div className="flex flex-col">
			<p className="text-sm">Fakultas</p>
			<p>{data.fakultas}</p>
		</div>
		<div className="flex flex-col">
			<p className="text-sm">Prodi</p>
			<p>{data.prodi}</p>
		</div>
		<div className="flex flex-col">
			<p className="text-sm">Tahun Terbit</p>
			<p>{data.tahun_terbit}</p>
		</div>
		<div className="flex flex-col">
			<p className="text-sm">Lokasi</p>
			<p>{data.lokasi.nama || "Lokasi Tidak Ditemukan"}</p>
		</div>
	</>
);
