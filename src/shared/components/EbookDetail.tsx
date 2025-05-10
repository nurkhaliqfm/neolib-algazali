import { RepositoryEbook } from "@/modules/admin/koleksi/types/koleksi.type";

interface Props {
	data: RepositoryEbook;
}

export const EbookDetail: React.FC<Props> = ({ data }) => (
	<>
		<div className="flex flex-col">
			<p className="text-sm">Pengarang</p>
			<p>{data.pengarang}</p>
		</div>
		<div className="flex flex-col">
			<p className="text-sm">Sinopsis</p>
			<p>{data.sinopsis}</p>
		</div>
		<div className="flex flex-col">
			<p className="text-sm">Cetak</p>
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
			<p className="text-sm">Tahun Terbit</p>
			<p>{data.tahun_terbit}</p>
		</div>
	</>
);
