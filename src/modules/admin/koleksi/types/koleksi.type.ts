import { repositoryTypeMap } from "@/constants/repository";

export type RepositoryJurnal = {
	abstrak: string | null;
	pengarang: string;
	penerbit: string | null;
	jurnal: string | null;
	tahun_terbit: number;
	isbn: string | null;
	lokasi: {
		id: string;
		nama: string;
	};
};

export type RepositoryEjurnal = {
	abstrak: string | null;
	pengarang: string;
	penerbit: string | null;
	jurnal: string | null;
	tahun_terbit: number;
	isbn: string | null;
};

export type RepositoryEbook = {
	pengarang: string;
	sinopsis: string | null;
	cetakan: string | null;
	penerbit: string;
	tempat_terbit: string | null;
	tahun_terbit: number;
	isbn: string | null;
};

export type RepositoryBuku = {
	pengarang: string;
	sinopsis: string | null;
	cetakan: string | null;
	penerbit: string;
	tanggal: string | null;
	no_regist: string | null;
	tempat_terbit: string | null;
	tahun_terbit: number;
	asal_buku: string | null;
	isbn: string | null;
	no_klasifikasi: string | null;
	harga: number;
	jumlah_buku: number;
	keterangan: string | null;
	lokasi: {
		id: string;
		nama: string;
	};
};

export type RepositorySkripsi = {
	abstrak: string | null;
	pengarang: string | null;
	fakultas: string | null;
	prodi: string;
	tahun_terbit: number;
	lokasi: {
		id: string;
		nama: string;
	};
};

export interface BaseRepository {
	id: string;
	judul: string;
	nama_sampul: string | null;
	nama_file: string | null;
	type: "EJURNAL" | "JURNAL" | "EBOOK" | "BUKU" | "SKRIPSI";
}

export interface RepositoryResponse {
	repository: BaseRepository[];
	pages: { total: number; start: number; end: number; current: number };
}

export interface RepositoryDetailResponse extends BaseRepository {
	jurnal?: RepositoryJurnal;
	ejurnal?: RepositoryEjurnal;
	buku?: RepositoryBuku;
	ebook?: RepositoryEbook;
	skripsi?: RepositorySkripsi;
}

export type RepositoryDetailItem = {
	jurnal: RepositoryJurnal;
	ejurnal: RepositoryEjurnal;
	buku: RepositoryBuku;
	ebook: RepositoryEbook;
	skripsi: RepositorySkripsi;
};

type RepositoryType = keyof typeof repositoryTypeMap;
export type DetailRepositoryKey = (typeof repositoryTypeMap)[RepositoryType];
