import { useCallback } from "react";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

interface RepositoryDetailProps<T extends object> {
	data: T;
	renderFields: (args: { data: T; keys: (keyof T)[] }) => React.ReactNode;
}

export const AnggotaDetail = <T extends object>({
	data,
	renderFields,
}: RepositoryDetailProps<T>) => {
	const keys = Object.keys(data).filter(
		(key) => data[key as keyof T] !== undefined
	) as (keyof T)[];

	return <>{renderFields({ data, keys })}</>;
};

export const AnggotaDetailItem = ({
	slug,
	title,
	value,
}: {
	slug: string;
	title: string;
	value: string;
}) => {
	const renderItem = useCallback((value: string, slug: string) => {
		switch (slug) {
			default:
				return value;
		}
	}, []);

	return (
		<div className="flex flex-col my-1">
			<p className="text-xs">{title}</p>
			{value ? (
				<p>{renderItem(value, slug)}</p>
			) : (
				<p className="italic text-slate-300">{title} tidak ada</p>
			)}
		</div>
	);
};
