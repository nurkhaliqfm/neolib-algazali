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
