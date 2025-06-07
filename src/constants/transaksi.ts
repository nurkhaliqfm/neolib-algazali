export const typeTransaksiColorMap: Record<
	string,
	"success" | "danger" | "default" | "warning" | "primary" | undefined
> = {
	DAMAGED: "danger",
	RETURNED: "success",
	BORROWED: "default",
	AVAILABLE: "primary",
	LOST: "warning",
};
