export type BorrowHistoryReponse = {
	id: number;
	name: string;
	role: string;
	peminjaman: string;
	pengembalian: string;
	status: 'ongoing' | 'expired';
};
