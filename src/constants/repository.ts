import { z } from "zod";

export const typeColorMap: Record<
	string,
	"success" | "danger" | "default" | "warning" | "primary" | undefined
> = {
	JURNAL: "danger",
	EJURNAL: "success",
	EBOOK: "default",
	BUKU: "primary",
	SKRIPSI: "warning",
};

export const repositoryTypeMap = {
	JURNAL: "jurnal",
	EJURNAL: "ejurnal",
	BUKU: "buku",
	EBOOK: "ebook",
	SKRIPSI: "skripsi",
} as const;

export const repositoryBukuMetaFileds = {
	tanggal: { slug: "Tanggal", isWajib: true },
	no_regist: { slug: "Nomor Registrasi", isWajib: true },
	pengarang: { slug: "Pengarang", isWajib: true },
	sinopsis: { slug: "Sinopsis", isWajib: true },
	cetakan: { slug: "Cetakan", isWajib: true },
	penerbit: { slug: "Penerbit", isWajib: true },
	tempat_terbit: { slug: "Tempat Terbit", isWajib: true },
	tahun_terbit: { slug: "Tahun Terbit", isWajib: true },
	asal_buku: { slug: "Asal Buku", isWajib: true },
	isbn: { slug: "ISBN", isWajib: true },
	no_klasifikasi: { slug: "Nomor Klasifikasi", isWajib: true },
	harga: { slug: "Harga", isWajib: true },
	jumlah_buku: { slug: "Jumlah Buku", isWajib: true },
	keterangan: { slug: "Keterangan", isWajib: true },
	lokasi: { slug: "Lokasi Buku", isWajib: true },
} as const;

export const repositoryBukuMetaScheme = z.object({
	tanggal: z.string().optional().nullable(),
	no_regist: z.string().optional().nullable(),
	pengarang: z.string().min(2).max(50),
	sinopsis: z.string().optional().nullable(),
	cetakan: z.string().min(2).max(50),
	penerbit: z.string().min(2).max(50),
	tempat_terbit: z.string().min(2).max(50),
	tahun_terbit: z.number(),
	asal_buku: z.string().optional().nullable(),
	isbn: z.string().min(2).max(50),
	no_klasifikasi: z.string().optional().nullable(),
	harga: z.number(),
	jumlah_buku: z.number(),
	keterangan: z.string().optional().nullable(),
	lokasi: z
		.object({
			id: z.number(),
			nama: z.string().min(2).max(50),
		})
		.nullable(),
});

export const repositoryEbookMetaFields = {
	pengarang: { slug: "Pengarang", isWajib: true },
	sinopsis: { slug: "Sinopsis", isWajib: true },
	cetakan: { slug: "Cetakan", isWajib: true },
	penerbit: { slug: "Penerbit", isWajib: true },
	tempat_terbit: { slug: "Tempat Terbit", isWajib: true },
	tahun_terbit: { slug: "Tahun Terbit", isWajib: true },
	isbn: { slug: "ISBN", isWajib: true },
} as const;

export const repositoryEjurnalMetaFields = {
	abstrak: { slug: "Abstrak", isWajib: true },
	pengarang: { slug: "Pengarang", isWajib: true },
	penerbit: { slug: "Penerbit", isWajib: true },
	jurnal: { slug: "Jurnal", isWajib: true },
	tahun_terbit: { slug: "Tahun Terbit", isWajib: true },
	isbn: { slug: "ISBN", isWajib: true },
} as const;

export const repositoryJurnalMetaFileds = {
	abstrak: { slug: "Abstrak", isWajib: true },
	pengarang: { slug: "Pengarang", isWajib: true },
	penerbit: { slug: "Penerbit", isWajib: true },
	jurnal: { slug: "Jurnal", isWajib: true },
	tahun_terbit: { slug: "Tahun Terbit", isWajib: true },
	isbn: { slug: "ISBN", isWajib: true },
	lokasi: { slug: "Lokasi", isWajib: true },
} as const;

export const repositorySkripsiMetaFields = {
	abstrak: { slug: "Abstrak", isWajib: true },
	pengarang: { slug: "Pengarang", isWajib: true },
	fakultas: { slug: "Fakultas", isWajib: true },
	prodi: { slug: "Prodi", isWajib: true },
	tahun_terbit: { slug: "Tahun Terbit", isWajib: true },
	lokasi: { slug: "Lokasi", isWajib: true },
} as const;

export const repositoryMetaFileds = {
	tanggal: { slug: "Tanggal", isWajib: true },
	no_regist: { slug: "Nomor Registrasi", isWajib: true },
	pengarang: { slug: "Pengarang", isWajib: true },
	sinopsis: { slug: "Sinopsis", isWajib: true },
	cetakan: { slug: "Cetakan", isWajib: true },
	penerbit: { slug: "Penerbit", isWajib: true },
	tempat_terbit: { slug: "Tempat Terbit", isWajib: true },
	tahun_terbit: { slug: "Tahun Terbit", isWajib: true },
	asal_buku: { slug: "Asal Buku", isWajib: true },
	isbn: { slug: "ISBN", isWajib: true },
	no_klasifikasi: { slug: "Nomor Klasifikasi", isWajib: true },
	harga: { slug: "Harga", isWajib: true },
	jumlah_buku: { slug: "Jumlah Buku", isWajib: true },
	keterangan: { slug: "Keterangan", isWajib: true },
	lokasi: { slug: "Lokasi Buku", isWajib: true },
	abstrak: { slug: "Abstrak", isWajib: true },
	jurnal: { slug: "Jurnal", isWajib: true },
	fakultas: { slug: "Fakultas", isWajib: true },
	prodi: { slug: "Prodi", isWajib: true },
};

export const repositoryFieldConfig = {
	jurnal: [
		{ name: "abstrak", label: "Abstrak", type: "textarea", required: false },
		{ name: "pengarang", label: "Pengarang", type: "text", required: true },
		{ name: "penerbit", label: "Penerbit", type: "text", required: false },
		{ name: "jurnal", label: "Jurnal", type: "text", required: false },
		{
			name: "tahun_terbit",
			label: "Tahun Terbit",
			type: "number",
			required: true,
		},
		{ name: "isbn", label: "ISBN", type: "text", required: false },
		{ name: "lokasi", label: "Lokasi", type: "select", required: true },
	],
	ejurnal: [
		{ name: "abstrak", label: "Abstrak", type: "textarea", required: false },
		{ name: "pengarang", label: "Pengarang", type: "text", required: true },
		{ name: "penerbit", label: "Penerbit", type: "text", required: false },
		{ name: "jurnal", label: "Jurnal", type: "text", required: false },
		{
			name: "tahun_terbit",
			label: "Tahun Terbit",
			type: "number",
			required: true,
		},
		{ name: "isbn", label: "ISBN", type: "text", required: false },
	],
	ebook: [
		{ name: "pengarang", label: "Pengarang", type: "text", required: true },
		{ name: "sinopsis", label: "Sinopsis", type: "textarea", required: false },
		{ name: "cetakan", label: "Cetakan", type: "text", required: false },
		{ name: "penerbit", label: "Penerbit", type: "text", required: true },
		{
			name: "tempat_terbit",
			label: "Tempat Terbit",
			type: "text",
			required: false,
		},
		{
			name: "tahun_terbit",
			label: "Tahun Terbit",
			type: "number",
			required: true,
		},
		{ name: "isbn", label: "ISBN", type: "text", required: false },
	],
	buku: [
		{ name: "pengarang", label: "Pengarang", type: "text", required: true },
		{ name: "sinopsis", label: "Sinopsis", type: "textarea", required: false },
		{ name: "cetakan", label: "Cetakan", type: "text", required: false },
		{ name: "penerbit", label: "Penerbit", type: "text", required: true },
		{ name: "tanggal", label: "Tanggal", type: "text", required: false },
		{
			name: "no_regist",
			label: "Nomor Registrasi",
			type: "text",
			required: false,
		},
		{
			name: "no_klasifikasi",
			label: "Nomor Klasifikasi",
			type: "text",
			required: false,
		},
		{
			name: "tempat_terbit",
			label: "Tempat Terbit",
			type: "text",
			required: false,
		},
		{
			name: "tahun_terbit",
			label: "Tahun Terbit",
			type: "number",
			required: true,
		},
		{ name: "asal_buku", label: "Asal Buku", type: "text", required: false },
		{ name: "isbn", label: "ISBN", type: "text", required: false },
		{ name: "harga", label: "Harga Buku", type: "number", required: true },
		{
			name: "jumlah_buku",
			label: "Jumlah Buku",
			type: "number",
			required: true,
		},
		{ name: "keterangan", label: "Keterangan", type: "text", required: false },
		{ name: "lokasi", label: "Lokasi", type: "select", required: true },
	],
	skripsi: [
		{ name: "abstrak", label: "Abstrak", type: "textarea", required: false },
		{ name: "pengarang", label: "Pengarang", type: "text", required: true },
		{ name: "fakultas", label: "Fakultas", type: "text", required: true },
		{ name: "prodi", label: "Program Studi", type: "text", required: true },
		{
			name: "tahun_terbit",
			label: "Tahun Terbit",
			type: "number",
			required: true,
		},
		{ name: "lokasi", label: "Lokasi", type: "select", required: true },
	],
};
