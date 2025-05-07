import {
	Chip,
	Pagination,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tooltip,
} from '@heroui/react';
import { Key, useCallback } from 'react';
import { BaseRepository, RepositoryResponse } from '../types/koleksi.type';
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi2';
import { TableHeaderComponent } from '@/types/global';
import { SetURLSearchParams } from 'react-router-dom';

const RepositoryHeaderTable: TableHeaderComponent[] = [
	{ name: 'JUDUL', slug: 'judul' },
	{ name: 'NAMA SAMPUL', slug: 'nama_sampul' },
	{ name: 'NAMA FILE', slug: 'nama_file' },
	{ name: 'JENIS', slug: 'type' },
	{ name: 'ACTIONS', slug: 'actions' },
];

const typeColorMap: Record<
	string,
	'success' | 'danger' | 'default' | 'warning' | 'primary' | undefined
> = {
	JURNAL: 'danger',
	EJURNAL: 'success',
	EBOOK: 'default',
	BUKU: 'primary',
	SKRIPSI: 'warning',
};

export function RepositoryTable({
	data,
	page,
	setSearchParams,
}: {
	data: RepositoryResponse;
	page: number;
	setSearchParams: SetURLSearchParams;
}) {
	const renderCell = useCallback((data: BaseRepository, columnKey: Key) => {
		const cellValue = data[columnKey as keyof BaseRepository];

		switch (columnKey) {
			case 'judul':
				return <>{data.judul}</>;
			case 'nama_sampul':
				return <>{data.nama_sampul}</>;
			case 'nama_file':
				return <>{data.nama_file}</>;
			case 'type':
				return (
					<Chip
						className="capitalize"
						color={typeColorMap[data.type]}
						size="sm"
						variant="flat">
						{cellValue}
					</Chip>
				);
			case 'actions':
				return (
					<div className="relative flex items-center gap-2">
						<Tooltip color="warning" content="Detail Repository">
							<span className="text-lg text-warning cursor-pointer active:opacity-50">
								<HiOutlineEye />
							</span>
						</Tooltip>
						<Tooltip color="success" content="Edit Repository">
							<span className="text-lg text-success cursor-pointer active:opacity-50">
								<HiOutlinePencil />
							</span>
						</Tooltip>
						<Tooltip color="danger" content="Delete Repository">
							<span className="text-lg text-danger cursor-pointer active:opacity-50">
								<HiOutlineTrash />
							</span>
						</Tooltip>
					</div>
				);
			default:
				return cellValue;
		}
	}, []);

	return (
		<Table
			aria-label="Data koleksi perpustakaan"
			bottomContent={
				<div className="flex w-full justify-center">
					<Pagination
						isCompact
						showControls
						showShadow
						color="primary"
						page={page}
						total={data.pages.total}
						onChange={(page) => setSearchParams({ page: page.toString() })}
					/>
				</div>
			}>
			<TableHeader columns={RepositoryHeaderTable}>
				{(column) => (
					<TableColumn key={column.slug} align="start">
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody items={data.repository} className="overflow-y-scroll">
				{(item) => (
					<TableRow key={item.judul}>
						{(columnKey) => (
							<TableCell>{renderCell(item, columnKey)}</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
