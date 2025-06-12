import { TableHeaderComponent } from "@/types/global";

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

export const TransaksiHeaderTable: TableHeaderComponent[] = [
	{ name: "JUDUL", slug: "judul" },
	{ name: "PEMINJAM", slug: "peminjam" },
	{ name: "ANGGOTA", slug: "anggota" },
	{ name: "STATUS", slug: "status" },
	{ name: "TANGGAL PINJAM", slug: "borrowedAt" },
	{ name: "TANGGAL KEMBALI", slug: "returnedAt" },
	{ name: "DENDA", slug: "denda" },
	{ name: "TERLAMBAT", slug: "overdue" },
	{ name: "ACTIONS", slug: "actions" },
];
