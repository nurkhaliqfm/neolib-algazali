export type StatistikResponseItem = {
	title: string;
	total: number;
};

export type StatistikResponse = {
	repository: { [key in RepositoryItemKey]: StatistikResponseItem };
	anggota: StatistikResponseItem;
	pinjaman: StatistikResponseItem;
};
