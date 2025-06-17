import { BaseRepository } from "../../koleksi/types/koleksi.type";

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
		email: string;
	};
	repository: BaseRepository;
	status: "BORROWED" | "RETURNED" | "LOST" | "DAMAGED" | "AVAILABLE";
	borrowedAt: Date | null;
	returnedAt: Date | null;
}
