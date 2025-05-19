import { moneyConverter } from "@/utils/moneyFormatter";
import { useCallback } from "react";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

interface RepositoryDetailProps<T extends object> {
	data: T;
	renderFields: (args: { data: T; keys: (keyof T)[] }) => React.ReactNode;
}

export const KoleksiDetail = <T extends object>({
	data,
	renderFields,
}: RepositoryDetailProps<T>) => {
	// const keys = Object.keys(data) as (keyof T)[];
	const keys = Object.keys(data).filter(
		(key) => data[key as keyof T] !== undefined
	) as (keyof T)[];

	return <>{renderFields({ data, keys })}</>;
};

export const KoleksiDetailItem = ({
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
			case "harga":
				return moneyConverter(value);
			case "tanggal":
				return dayjs(new Date(value)).format("DD MMMM YYYY");
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
