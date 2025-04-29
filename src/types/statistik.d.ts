export type StatistikResponseItem = {
	title: string;
	total: number;
};

export type StatistikResponse = {
	repository: { [key in RepositoryItemKey]: StatistikItem };
	anggota: StatistikResponseItem;
	pinjaman: StatistikResponseItem;
};
