import { Key, useCallback, useState } from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Spinner,
	Button,
	Chip,
	Tooltip,
} from "@heroui/react";
import { TransaksiDetailResponse } from "../../transaksi/types/transaksi.type";
import { userRoleMap } from "@/constants/user";
import { moneyConverter } from "@/utils/moneyFormatter";
import {
	TransaksiHeaderTable,
	typeTransaksiColorMap,
} from "@/constants/transaksi";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import AppRoutes from "@/router/routes";
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

const AnggotaTransaksiTable = ({
	transaksi,
}: {
	transaksi: TransaksiDetailResponse[];
}) => {
	const navigate = useNavigate();
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingDelete, setIsLoadingDelete] = useState(false);

	const itemCountShow = 5;
	const pageLimit = Math.ceil(transaksi.length / itemCountShow);

	const list = {
		items: transaksi.slice(0, page * itemCountShow) || [],
		isLoading: isLoading,
		loadMore: () => {
			if (!isLoading) {
				setIsLoading(true);
				setTimeout(() => {
					setPage((prev) => prev + 1);
					setIsLoading(false);
				}, 1000);
			}
		},
	};

	const hasMore = page < pageLimit;

	const renderCell = useCallback(
		(data: TransaksiDetailResponse, columnKey: Key) => {
			const cellValue = data[columnKey as keyof TransaksiDetailResponse];

			switch (columnKey) {
				case "judul":
					return <>{data.repository.judul}</>;
				case "peminjam":
					return <>{data.user.fullname}</>;
				case "anggota":
					return (
						<>{userRoleMap[data.user.id_role as keyof typeof userRoleMap]}</>
					);
				case "overdue":
					return (
						<p className="text-center">
							{data.status === "RETURNED" ? "-" : `${data.overdue_days} Hari`}
						</p>
					);
				case "denda":
					return (
						<p className="text-center">
							{data.status === "RETURNED"
								? "-"
								: moneyConverter(String(data.denda))}
						</p>
					);
				case "status":
					return (
						<Chip
							className="capitalize"
							color={typeTransaksiColorMap[data.status]}
							size="sm"
							variant="flat">
							{data.status}
						</Chip>
					);
				case "borrowedAt":
					return (
						<p className="text-center">
							{dayjs(data.borrowedAt).format("DD MMMM YYYY")}
						</p>
					);
				case "returnedAt":
					return (
						<p className="text-center">
							{dayjs(data.returnedAt).format("DD MMMM YYYY")}
						</p>
					);
				case "actions":
					return (
						<div className="relative flex items-center gap-2">
							<Tooltip color="warning" content="Detail Pinjaman">
								<button
									onClick={() =>
										navigate(
											`${AppRoutes.AdminDetailTransaksi}?transaksi=${data.id}`
										)
									}
									className="text-lg text-warning cursor-pointer active:opacity-50">
									<HiOutlineEye />
								</button>
							</Tooltip>
							{data.status === "BORROWED" && (
								<Tooltip color="success" content="Edit Pinjaman">
									<button
										onClick={() =>
											navigate(
												`${AppRoutes.AdminEditTransaksi}?transaksi=${data.id}`
											)
										}
										className="text-lg text-success cursor-pointer active:opacity-50">
										<HiOutlinePencil />
									</button>
								</Tooltip>
							)}

							<AlertDialog>
								<Tooltip color="danger" content="Delete Pinjaman">
									<AlertDialogTrigger asChild>
										<button className="text-lg text-danger cursor-pointer active:opacity-50">
											<HiOutlineTrash />
										</button>
									</AlertDialogTrigger>
								</Tooltip>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>
											Apakah anda yakin ingin menghapus pinjaman ini?
										</AlertDialogTitle>
										<AlertDialogDescription>
											Pinjaman <b>{data.user.fullname}</b> untuk{" "}
											<b>{data.repository.judul}</b> akan dihapus. Tindakan ini
											tidak dapat dibatalkan. Ini akan secara permanen menghapus
											transaksi dari server kami.
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
											}}>
											Hapus
										</Button>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</div>
					);
				default:
					return (
						<>
							{cellValue !== null && cellValue !== undefined
								? cellValue.toString()
								: ""}
						</>
					);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	return (
		<Table
			isHeaderSticky
			aria-label="Table list transaksi anggota"
			shadow="none"
			border={0}
			topContent={
				<span className="text-default-400 text-small">
					Total Pinjaman {transaksi.length}
				</span>
			}
			topContentPlacement="outside"
			bottomContent={
				hasMore && !isLoading ? (
					<div className="flex w-full justify-center">
						<Button
							isDisabled={list.isLoading}
							variant="flat"
							onPress={list.loadMore}>
							{list.isLoading && <Spinner color="white" size="sm" />}
							Load More
						</Button>
					</div>
				) : null
			}
			classNames={{
				base: "max-h-[520px] overflow-scroll",
			}}>
			<TableHeader columns={TransaksiHeaderTable}>
				{(column) => (
					<TableColumn key={column.slug} align="start">
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody
				isLoading={isLoading}
				items={list.items}
				loadingContent={
					<div className="bg-white rounded-xl shadow-md z-50">
						<Spinner className="m-4" label="Loading data..." />
					</div>
				}>
				{(item) => (
					<TableRow key={`transaksi-item-${item.id}`}>
						{(columnKey) => (
							<TableCell key={`cell-${columnKey}`}>
								{renderCell(item, columnKey)}
							</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};

export default AnggotaTransaksiTable;
