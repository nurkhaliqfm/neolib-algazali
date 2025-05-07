import {
	Chip,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	User,
} from '@heroui/react';
import dayjs from 'dayjs';
import { Key, useCallback } from 'react';
import { HiOutlineCalendarDateRange } from 'react-icons/hi2';
import { BorrowHistoryReponse } from '@/types/borrow';
import { TableHeaderComponent } from '@/types/global';

const lastBorrowHeaderTable: TableHeaderComponent[] = [
	{ name: 'NAME', slug: 'name' },
	{ name: 'PEMINJAMAN', slug: 'peminjaman' },
	{ name: 'STATUS', slug: 'status' },
];

const statusColorMap: Record<
	string,
	| 'success'
	| 'danger'
	| 'default'
	| 'primary'
	| 'secondary'
	| 'warning'
	| undefined
> = {
	ongoing: 'success',
	expired: 'danger',
};

export function DashboardBorrowTable({
	data,
}: {
	data: BorrowHistoryReponse[];
}) {
	const renderCell = useCallback(
		(data: BorrowHistoryReponse, columnKey: Key) => {
			const cellValue = data[columnKey as keyof BorrowHistoryReponse];
			const startTime = dayjs(data.peminjaman);
			const endTime = dayjs(data.pengembalian);

			switch (columnKey) {
				case 'name':
					return (
						<User
							avatarProps={{ radius: 'lg' }}
							description={data.role}
							name={cellValue}>
							{data.name}
						</User>
					);
				case 'peminjaman':
					return (
						<div className="flex flex-col gap-y-2">
							<Chip
								color="warning"
								variant="flat"
								className="text-bold text-sm capitalize">
								<HiOutlineCalendarDateRange />{' '}
								{endTime.diff(startTime, 'd', true)} Hari
							</Chip>
						</div>
					);
				case 'status':
					return (
						<Chip
							className="capitalize"
							color={statusColorMap[data.status]}
							size="sm"
							variant="flat">
							{cellValue}
						</Chip>
					);
				default:
					return cellValue;
			}
		},
		[]
	);

	return (
		<Table aria-label="Data peminjaman perpustakaan">
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
