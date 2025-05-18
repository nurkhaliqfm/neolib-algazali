import { z } from 'zod';

export const typeColorMap: Record<
	string,
	'success' | 'danger' | 'default' | 'warning' | 'primary' | undefined
> = {
	JURNAL: 'danger',
	EJURNAL: 'success',
	EBOOK: 'default',
	BUKU: 'primary',
	SKRIPSI: 'warning',
};

export const repositoryTypeMap = {
	JURNAL: 'jurnal',
	EJURNAL: 'ejurnal',
	BUKU: 'buku',
	EBOOK: 'ebook',
	SKRIPSI: 'skripsi',
} as const;

export const repositoryBukuMetaFileds = {
	tanggal: { slug: 'Tanggal', isWajib: true },
	no_regist: { slug: 'Nomor Registrasi', isWajib: true },
	pengarang: { slug: 'Pengarang', isWajib: true },
	sinopsis: { slug: 'Sinopsis', isWajib: true },
	cetakan: { slug: 'Cetakan', isWajib: true },
	penerbit: { slug: 'Penerbit', isWajib: true },
	tempat_terbit: { slug: 'Tempat Terbit', isWajib: true },
	tahun_terbit: { slug: 'Tahun Terbit', isWajib: true },
	asal_buku: { slug: 'Asal Buku', isWajib: true },
	isbn: { slug: 'ISBN', isWajib: true },
	no_klasifikasi: { slug: 'Nomor Klasifikasi', isWajib: true },
	harga: { slug: 'Harga', isWajib: true },
	jumlah_buku: { slug: 'Jumlah Buku', isWajib: true },
	keterangan: { slug: 'Keterangan', isWajib: true },
	lokasi: { slug: 'Lokasi Buku', isWajib: true },
} as const;

export const repositoryBukuMetaScheme = z.object({
	tanggal: z.string().min(2).max(50),
	no_regist: z.string().min(2).max(50),
	pengarang: z.string().min(2).max(50),
	sinopsis: z.string().min(2).max(50),
	cetakan: z.string().min(2).max(50),
	penerbit: z.string().min(2).max(50),
	tempat_terbit: z.string().min(2).max(50),
	tahun_terbit: z.string().min(2).max(50),
	asal_buku: z.string().min(2).max(50),
	isbn: z.string().min(2).max(50),
	no_klasifikasi: z.string().min(2).max(50),
	harga: z.string().min(2).max(50),
	jumlah_buku: z.string().min(2).max(50),
	keterangan: z.string().min(2).max(50),
	lokasi: z.string().min(2).max(50),
});

export const repositoryEbookMetaFields = {
	pengarang: { slug: 'Pengarang', isWajib: true },
	sinopsis: { slug: 'Sinopsis', isWajib: true },
	cetakan: { slug: 'Cetakan', isWajib: true },
	penerbit: { slug: 'Penerbit', isWajib: true },
	tempat_terbit: { slug: 'Tempat Terbit', isWajib: true },
	tahun_terbit: { slug: 'Tahun Terbit', isWajib: true },
	isbn: { slug: 'ISBN', isWajib: true },
} as const;

export const repositoryEjurnalMetaFields = {
	abstrak: { slug: 'Abstrak', isWajib: true },
	pengarang: { slug: 'Pengarang', isWajib: true },
	penerbit: { slug: 'Penerbit', isWajib: true },
	jurnal: { slug: 'Jurnal', isWajib: true },
	tahun_terbit: { slug: 'Tahun Terbit', isWajib: true },
	isbn: { slug: 'ISBN', isWajib: true },
} as const;

export const repositoryJurnalMetaFileds = {
	abstrak: { slug: 'Abstrak', isWajib: true },
	pengarang: { slug: 'Pengarang', isWajib: true },
	penerbit: { slug: 'Penerbit', isWajib: true },
	jurnal: { slug: 'Jurnal', isWajib: true },
	tahun_terbit: { slug: 'Tahun Terbit', isWajib: true },
	isbn: { slug: 'ISBN', isWajib: true },
	lokasi: { slug: 'Lokasi', isWajib: true },
} as const;

export const repositorySkripsiMetaFields = {
	abstrak: { slug: 'Abstrak', isWajib: true },
	pengarang: { slug: 'Pengarang', isWajib: true },
	fakultas: { slug: 'Fakultas', isWajib: true },
	prodi: { slug: 'Prodi', isWajib: true },
	tahun_terbit: { slug: 'Tahun Terbit', isWajib: true },
	lokasi: { slug: 'Lokasi', isWajib: true },
} as const;

export const repositoryMetaFileds = {
	tanggal: { slug: 'Tanggal', isWajib: true },
	no_regist: { slug: 'Nomor Registrasi', isWajib: true },
	pengarang: { slug: 'Pengarang', isWajib: true },
	sinopsis: { slug: 'Sinopsis', isWajib: true },
	cetakan: { slug: 'Cetakan', isWajib: true },
	penerbit: { slug: 'Penerbit', isWajib: true },
	tempat_terbit: { slug: 'Tempat Terbit', isWajib: true },
	tahun_terbit: { slug: 'Tahun Terbit', isWajib: true },
	asal_buku: { slug: 'Asal Buku', isWajib: true },
	isbn: { slug: 'ISBN', isWajib: true },
	no_klasifikasi: { slug: 'Nomor Klasifikasi', isWajib: true },
	harga: { slug: 'Harga', isWajib: true },
	jumlah_buku: { slug: 'Jumlah Buku', isWajib: true },
	keterangan: { slug: 'Keterangan', isWajib: true },
	lokasi: { slug: 'Lokasi Buku', isWajib: true },
	abstrak: { slug: 'Abstrak', isWajib: true },
	jurnal: { slug: 'Jurnal', isWajib: true },
	fakultas: { slug: 'Fakultas', isWajib: true },
	prodi: { slug: 'Prodi', isWajib: true },
};
