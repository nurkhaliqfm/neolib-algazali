import { repositoryTypeMap } from "@/constants/repository";

export type RepositoryJurnal = {
	abstrak: string | null;
	// pengarang: string;
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
	// pengarang: string;
	penerbit: string | null;
	jurnal: string | null;
	tahun_terbit: number;
	isbn: string | null;
};

export type RepositoryEbook = {
	// pengarang: string;
	sinopsis: string | null;
	cetakan: string | null;
	penerbit: string;
	tempat_terbit: string | null;
	tahun_terbit: number;
	isbn: string | null;
};

export type RepositoryBuku = {
	// pengarang: string;
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
	// pengarang: string | null;
	fakultas: string | null;
	tahun_terbit: number;
	lokasi: {
		id: string;
		nama: string;
	};
	prodi: {
		id: string;
		nama: string;
	};
};

export interface BaseRepository {
	id: number;
	judul: string;
	pengarang: string;
	nama_sampul: string | null;
	nama_file: string | null;
	type: "EJURNAL" | "JURNAL" | "EBOOK" | "BUKU" | "SKRIPSI";
}

export interface BaseRepositoryRequest {
	judul: string;
	pengarang: string;
	old_sampul?: string | null;
	old_file?: string | null;
	nama_sampul: FileList | null;
	nama_file: FileList | null;
	type: "EJURNAL" | "JURNAL" | "EBOOK" | "BUKU" | "SKRIPSI";
}

export interface RepositoryResponse {
	repository: RepositoryDetailResponse[];
	total: number;
	pages: { total: number; start: number; end: number; current: number };
}

export interface RepositoryDetailResponse extends BaseRepository {
	jurnal?: RepositoryJurnal;
	ejurnal?: RepositoryEjurnal;
	buku?: RepositoryBuku;
	ebook?: RepositoryEbook;
	skripsi?: RepositorySkripsi;
}

export interface RepositoryRequest extends BaseRepositoryRequest {
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
