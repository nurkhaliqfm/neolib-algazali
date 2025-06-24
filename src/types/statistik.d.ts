export type StatistikResponseItem = {
	title: string;
	total: number;
};

export type StatistikResponse = {
	repository: { [key in RepositoryItemKey]: StatistikResponseItem };
	anggota: StatistikResponseItem;
	pinjaman: StatistikResponseItem;
};

export type StatistikTransaksiResponse = {
	month: string;
	peminjaman: number;
};

export type StatistikVisitorResponse = {
	month: string;
	visitor: number;
};
