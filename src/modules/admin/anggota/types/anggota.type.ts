export interface BaseAnggota {
	id: number;
	nama: string;
	kontak: string | null;
	alamat: string | null;
	jenis_kelamin: "L" | "P";
}

export interface AnggotaMahasiswa {
	nim: string;
	prodi: string;
	angkatan: string;
	fakultas: string;
}

export interface AnggotaDosen {
	jabatan: true;
	kampus: true;
}

export interface AnggotaUmum {
	nik: true;
}

export interface AnggotaDetailResponse extends BaseAnggota {
	mahasiswa?: AnggotaMahasiswa;
	dosen?: AnggotaDosen;
	umum?: AnggotaUmum;
}

export interface AnggotaResponse {
	anggota: AnggotaDetailResponse[];
	total: number;
	pages: { total: number; start: number; end: number; current: number };
}
