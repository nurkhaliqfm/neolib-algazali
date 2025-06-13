export interface TransaksiResponse {
	transaksi: TransaksiDetailResponse[];
	total: number;
	pages: { total: number; start: number; end: number; current: number };
}

export interface TransaksiDetailResponse {
	id: number;
	denda: number;
	overdue_days: number;
	user: {
		id: number;
		fullname: string;
		id_role: number;
	};
	repository: {
		id: number;
		judul: string;
		pengarang: string;
		type: "EJURNAL" | "JURNAL" | "EBOOK" | "BUKU" | "SKRIPSI";
	};
	status: "BORROWED" | "RETURNED" | "LOST" | "DAMAGED" | "AVAILABLE";
	borrowedAt: Date | null;
	returnedAt: Date | null;
}
