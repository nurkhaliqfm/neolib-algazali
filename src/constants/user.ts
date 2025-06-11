export const userRoleMap = {
	1: "SUPER ADMIN",
	2: "MAHASISWA",
	3: "UMUM",
	4: "DOSEN",
} as const;

export const typeAnggotaColorMap: Record<
	string,
	"success" | "danger" | "default" | "warning" | "primary" | undefined
> = {
	MAHASISWA: "success",
	DOSEN: "primary",
	UMUM: "warning",
};

export const anggotaBaseFieldConfig = [
	{ name: "fullname", label: "Nama Anggota", type: "text", required: true },
	{ name: "kontak", label: "Kontak", type: "text", required: true },
	{ name: "alamat", label: "Alamat", type: "text", required: true },
	{
		name: "jenis_kelamin",
		label: "Jenis Kelamin",
		type: "select",
		required: true,
	},
];

export const anggotaFieldConfig = {
	mahasiswa: [
		{
			name: "nim",
			label: "NIM",
			type: "text",
			required: true,
		},
		{ name: "prodi", label: "Program Studi", type: "select", required: true },
		{ name: "angkatan", label: "Angkatan", type: "number", required: true },
		{ name: "fakultas", label: "Fakultas", type: "text", required: false },
	],
	dosen: [
		{ name: "jabatan", label: "Jabatan", type: "text", required: true },
		{ name: "kampus", label: "Kampus", type: "text", required: true },
	],
	umum: [{ name: "nik", label: "NIK", type: "text", required: true }],
};

const jenisKelaminOptions = [
	{ id: 1, nama: "Laki-Laki" },
	{ id: 2, nama: "Perempuan" },
];

export const prodiOptions = [
	{ id: 1, nama: "S1 - Administrasi Publik" },
	{ id: 2, nama: "S1 - Sistem Informasi" },
	{ id: 3, nama: "S1 - Bisnis Digital" },
];

export const anggotaFormSelectOptios = {
	jenis_kelamin: jenisKelaminOptions,
	prodi: prodiOptions,
};
