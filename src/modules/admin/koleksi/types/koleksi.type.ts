export type RepositoryJurnal = {
	abstrak: string | null;
	pengarang: string;
	penerbit: string | null;
	jurnal: string | null;
	tahun_terbit: number;
	isbn: string | null;
	id_lokasi: number;
};

export type RepositoryEjurnal = {
	abstrak: string | null;
	pengarang: string;
	penerbit: string | null;
	jurnal: string | null;
	tahun_terbit: number;
	isbn: string | null;
};

export type RepositoryBuku = {
	pengarang: string;
	sinopsis: string | null;
	cetakan: string | null;
	penerbit: string;
	tempat_terbit: string | null;
	tahun_terbit: number;
	isbn: string | null;
};

export type RepositoryEbook = {
	tanggal: string | null;
	no_regist: string | null;
	pengarang: string;
	sinopsis: string | null;
	cetakan: string | null;
	penerbit: string;
	tempat_terbit: string | null;
	tahun_terbit: number;
	asal_buku: string | null;
	isbn: string | null;
	no_klasifikasi: string | null;
	harga: number;
	jumlah_buku: number;
	keterangan: string | null;
	id_lokasi: number;
};

export type RepositorySkripsi = {
	abstrak: string | null;
	pengarang: string | null;
	fakultas: string | null;
	prodi: string;
	tahun_terbit: number;
	id_lokasi: number;
};

export interface BaseRepository {
	judul: string;
	nama_sampul: string | null;
	nama_file: string | null;
	type: 'EJURNAL' | 'JURNAL' | 'EBOOK' | 'BUKU' | 'SKRIPSI';
}

export interface RepositoryResponse {
	repository: BaseRepository[];
	pages: { total: number; start: number; end: number; current: number };
}

export type RepositoryHeaderSlug =
	| 'judul'
	| 'nama_sampul'
	| 'nama_file'
	| 'type'
	| 'actions';
