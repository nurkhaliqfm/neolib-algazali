import { TransaksiDetailResponse } from "../../transaksi/types/transaksi.type";

export interface BaseUser {
	id: number;
	fullname: string;
	email: string;
}

export interface BaseAnggota {
	nama: string;
	kontak: string | null;
	alamat: string | null;
	jenis_kelamin: "L" | "P";
}

export interface AnggotaMahasiswa extends BaseAnggota {
	nim: string;
	prodi: {
		id: string;
		nama: string;
	};
	angkatan: number;
	fakultas: string | null;
}

export interface AnggotaDosen extends BaseAnggota {
	jabatan: true;
	kampus: true;
}

export interface AnggotaUmum extends BaseAnggota {
	nik: true;
}

export interface AnggotaDetailResponse extends BaseUser {
	mahasiswa?: AnggotaMahasiswa;
	dosen?: AnggotaDosen;
	umum?: AnggotaUmum;
}

export interface AnggotaDetailTransaksiResponse extends AnggotaDetailResponse {
	transaksi: TransaksiDetailResponse[];
}

export interface AnggotaResponse {
	anggota: AnggotaDetailResponse[];
	total: number;
	pages: { total: number; start: number; end: number; current: number };
}

export interface BaseAnggotaRequest {
	nama: string;
	kontak: string | null;
	alamat: string | null;
	jenis_kelamin: {
		id: number;
		nama: string;
	};
}

export interface AnggotaMahasiswaRequest extends BaseAnggotaRequest {
	nim: string;
	prodi: {
		id: string;
		nama: string;
	};
	angkatan: number;
	fakultas: string | null;
}

export interface AnggotaDosenRequest extends BaseAnggotaRequest {
	jabatan: true;
	kampus: true;
}

export interface AnggotaUmumRequest extends BaseAnggotaRequest {
	nik: true;
}

export interface AnggotaRequest {
	fullname: string;
	email: string | null;
	mahasiswa?: AnggotaMahasiswaRequest;
	dosen?: AnggotaDosenRequest;
	umum?: AnggotaUmumRequest;
}
