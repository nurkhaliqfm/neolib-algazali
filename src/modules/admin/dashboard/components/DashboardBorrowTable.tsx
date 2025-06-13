import {
	Chip,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	User,
} from "@heroui/react";
import { Key, useCallback } from "react";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { TableHeaderComponent } from "@/types/global";
import { TransaksiDetailResponse } from "../../transaksi/types/transaksi.type";

const lastBorrowHeaderTable: TableHeaderComponent[] = [
	{ name: "NAME", slug: "name" },
	{ name: "TERLAMBAT", slug: "peminjaman" },
	{ name: "STATUS", slug: "status" },
];

const statusColorMap: Record<
	string,
	| "success"
	| "danger"
	| "default"
	| "primary"
	| "secondary"
	| "warning"
	| undefined
> = {
	ongoing: "success",
	expired: "danger",
};

export function DashboardBorrowTable({
	data,
}: {
	data: TransaksiDetailResponse[];
}) {
	const renderCell = useCallback(
		(data: TransaksiDetailResponse, columnKey: Key) => {
			const cellValue = data[columnKey as keyof TransaksiDetailResponse];

			switch (columnKey) {
				case "name":
					return (
						<User
							avatarProps={{ radius: "lg" }}
							description={
								data.user.id_role === 2
									? "Mahasiswa"
									: data.user.id_role === 3
									? "Umum"
									: "Dosen"
							}
							name={data.user.fullname}>
							{data.user.fullname}
						</User>
					);
				case "peminjaman":
					return (
						<div className="flex items-center justify-center gap-x-1 bg-warning-100 rounded-full py-1 px-2 w-fit">
							<HiOutlineCalendarDateRange />
							<span className="whitespace-nowrap">
								{data.overdue_days} Hari
							</span>
						</div>
					);
				case "status":
					return (
						<Chip
							className="capitalize"
							color={statusColorMap[data.status]}
							size="sm"
							variant="flat">
							{data.status}
						</Chip>
					);
				default:
					return typeof cellValue === "object" && cellValue !== null
						? JSON.stringify(cellValue)
						: cellValue?.toString() || null;
			}
		},
		[]
	);

	return (
		<Table aria-label="Data peminjaman perpustakaan" shadow="none">
			<TableHeader columns={lastBorrowHeaderTable}>
				{(column) => (
					<TableColumn key={column.slug} align="start">
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody items={data} className="overflow-y-scroll">
				{(item) => (
					<TableRow key={item.id}>
						{(columnKey) => (
							<TableCell>{renderCell(item, columnKey)}</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
