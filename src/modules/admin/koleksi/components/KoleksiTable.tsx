import {
	Button,
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
import { Key, useCallback, useState } from "react";
import { BaseRepository, RepositoryResponse } from "../types/koleksi.type";
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import { TableHeaderComponent } from "@/types/global";
import { SetURLSearchParams, useNavigate } from "react-router-dom";
import AppRoutes from "@/router/routes";
import { typeColorMap } from "@/constants/repository";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteRepository } from "../services/koleksiService";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { toast } from "react-toastify";

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
	const user = useTypedSelector((state) => state.oauth.oauthData);
	const [isLoadingDelete, setIsLoadingDelete] = useState(false);
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
							<button
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
							</button>
						</Tooltip>
						<Tooltip color="success" content="Edit Repository">
							<button
								onClick={() =>
									navigate(
										`${AppRoutes.AdminEditKoleksi.path.replace(
											":koleksi",
											slug
										)}?repos=${data.id}`
									)
								}
								className="text-lg text-success cursor-pointer active:opacity-50">
								<HiOutlinePencil />
							</button>
						</Tooltip>
						<AlertDialog>
							<Tooltip color="danger" content="Delete Repository">
								<AlertDialogTrigger asChild>
									<button className="text-lg text-danger cursor-pointer active:opacity-50">
										<HiOutlineTrash />
									</button>
								</AlertDialogTrigger>
							</Tooltip>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>
										Apakah anda yakin ingin menghapus repository ini?
									</AlertDialogTitle>
									<AlertDialogDescription>
										Repository <b>{data.judul}</b> Tindakan ini tidak dapat
										dibatalkan. Ini akan secara permanen menghapus repository
										Anda dan menghapus data Anda dari server kami.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Batal</AlertDialogCancel>
									<Button
										size="md"
										isLoading={isLoadingDelete}
										spinner={
											<svg
												className="animate-spin h-5 w-5 text-current"
												fill="none"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg">
												<circle
													className="opacity-25"
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													strokeWidth="4"
												/>
												<path
													className="opacity-75"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
													fill="currentColor"
												/>
											</svg>
										}
										color="danger"
										variant="solid"
										onPress={() => {
											setIsLoadingDelete(true);
											deleteRepository({
												token: user?.access_token,
												repos: data.id,
												type: slug,
												onDone: (data) => {
													if (data.status === 200) {
														toast.success(data.message, {
															autoClose: 700,
															onClose: () => {
																navigate(
																	AppRoutes.AdminKoleksi.path.replace(
																		":koleksi",
																		slug
																	)
																);
															},
														});
													} else {
														toast.error(data.message, {
															theme: "colored",
															autoClose: 700,
															onClose: () => {
																setIsLoadingDelete(false);
															},
														});
													}
												},
												onError: (error) => {
													toast.error(error.error, {
														theme: "colored",
														autoClose: 700,
														onClose: () => {
															setIsLoadingDelete(false);
														},
													});
												},
											});
										}}>
										Hapus
									</Button>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
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
