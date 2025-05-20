// import { z } from "zod";

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

export const lokasiOptions = [
	{ id: 1, nama: "Rak 1" },
	{ id: 2, nama: "Rak 2" },
	{ id: 3, nama: "Rak 3" },
	{ id: 4, nama: "Rak 4" },
];

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
