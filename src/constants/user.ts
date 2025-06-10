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
