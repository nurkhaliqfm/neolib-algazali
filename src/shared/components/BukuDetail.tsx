import { RepositoryBuku } from "@/modules/admin/koleksi/types/koleksi.type";

interface Props {
	data: RepositoryBuku;
}

export const BukuDetail: React.FC<Props> = ({ data }) => (
	<>
		<div className="flex flex-col">
			<p className="text-sm">Abstrak</p>
			<p>{data.pengarang}</p>
		</div>
		<div className="flex flex-col">
			<p className="text-sm">Sinopsis</p>
			<p>{data.sinopsis}</p>
		</div>
		<div className="flex flex-col">
			<p className="text-sm">Cetakan</p>
			<p>{data.cetakan}</p>
		</div>
		<div className="flex flex-col">
			<p className="text-sm">Penerbit</p>
			<p>{data.penerbit}</p>
		</div>
		<div className="flex flex-col">
			<p className="text-sm">Tempat Terbit</p>
			<p>{data.tempat_terbit}</p>
		</div>
		<div className="flex flex-col">
			<p className="text-sm">Tempat Terbit</p>
			<p>{data.tempat_terbit}</p>
		</div>
		<div className="flex flex-col">
			<p className="text-sm">Tahun Terbit</p>
			<p>{data.tahun_terbit}</p>
		</div>
		<div className="flex flex-col">
			<p className="text-sm">ISBN</p>
			<p>{data.isbn}</p>
		</div>
		<div className="flex flex-col">
			<p className="text-sm">Lokasi</p>
			<p>{data.lokasi ? data.lokasi.nama : "Lokasi tidak ditemukan"}</p>
		</div>
	</>
);
