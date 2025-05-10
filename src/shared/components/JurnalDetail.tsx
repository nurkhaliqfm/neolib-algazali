import { RepositoryJurnal } from "@/modules/admin/koleksi/types/koleksi.type";

interface Props {
	data: RepositoryJurnal;
}

export const JurnalDetail: React.FC<Props> = ({ data }) => (
	<>
		<div className="flex flex-col">
			<p className="text-sm">Abstrak</p>
			<p>{data.abstrak}</p>
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
			<p className="text-sm">Penerbit</p>
			<p>{data.penerbit}</p>
		</div>
		<div className="flex flex-col">
			<p className="text-sm">Pengarang</p>
			<p>{data.pengarang}</p>
		</div>
		<div className="flex flex-col">
			<p className="text-sm">Jurnal</p>
			<p>{data.jurnal}</p>
		</div>
		<div className="flex flex-col">
			<p className="text-sm">Lokasi</p>
			<p>{data.lokasi.nama}</p>
		</div>
	</>
);
