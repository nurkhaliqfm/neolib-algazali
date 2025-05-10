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
} from "@heroui/react";
import { Key, useCallback } from "react";
import { BaseRepository, RepositoryResponse } from "../types/koleksi.type";
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import { TableHeaderComponent } from "@/types/global";
import { SetURLSearchParams, useNavigate } from "react-router-dom";
import AppRoutes from "@/router/routes";
import { typeColorMap } from "@/constants/repository";

const RepositoryHeaderTable: TableHeaderComponent[] = [
	{ name: "JUDUL", slug: "judul" },
	{ name: "NAMA SAMPUL", slug: "nama_sampul" },
	{ name: "NAMA FILE", slug: "nama_file" },
	{ name: "JENIS", slug: "type" },
	{ name: "ACTIONS", slug: "actions" },
];

export function RepositoryTable({
	repos,
	page,
	slug,
	setSearchParams,
}: {
	repos: RepositoryResponse;
	page: number;
	slug: string;
	setSearchParams: SetURLSearchParams;
}) {
	const navigate = useNavigate();
	const renderCell = useCallback((data: BaseRepository, columnKey: Key) => {
		const cellValue = data[columnKey as keyof BaseRepository];

		switch (columnKey) {
			case "judul":
				return <>{data.judul}</>;
			case "nama_sampul":
				return <>{data.nama_sampul}</>;
			case "nama_file":
				return <>{data.nama_file}</>;
			case "type":
				return (
					<Chip
						className="capitalize"
						color={typeColorMap[data.type]}
						size="sm"
						variant="flat">
						{cellValue}
					</Chip>
				);
			case "actions":
				return (
					<div className="relative flex items-center gap-2">
						<Tooltip color="warning" content="Detail Repository">
							<span
								onClick={() =>
									navigate(
										`${AppRoutes.AdminDetailKoleksi.path.replace(
											":koleksi",
											slug
										)}?repos=${data.id}`
									)
								}
								className="text-lg text-warning cursor-pointer active:opacity-50">
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Table
			isStriped={true}
			shadow="none"
			aria-label="Data koleksi perpustakaan"
			bottomContent={
				<div className="flex w-full justify-center">
					<Pagination
						isCompact
						showControls
						showShadow
						color="primary"
						page={page}
						total={repos.pages.total}
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
			<TableBody
				emptyContent={`Koleksi ${slug} tidak ditemukan `}
				items={repos.repository}
				className="overflow-y-scroll">
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
