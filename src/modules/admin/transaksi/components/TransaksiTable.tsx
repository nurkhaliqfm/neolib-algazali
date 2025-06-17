import {
	Button,
	Chip,
	Input,
	Pagination,
	Spinner,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tooltip,
} from "@heroui/react";
import { Key, useCallback, useMemo, useState } from "react";
import {
	TransaksiDetailResponse,
	TransaksiResponse,
} from "../types/transaksi.type";
import {
	HiOutlineEye,
	HiOutlineMagnifyingGlass,
	HiOutlinePencil,
	HiOutlineTrash,
} from "react-icons/hi2";
import { SetURLSearchParams, useNavigate } from "react-router-dom";
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
// import { deleteRepository } from "../services/transaksiService";
import { useTypedSelector } from "@/hooks/useTypedSelector";
// import { toast } from "react-toastify";
import {
	TransaksiHeaderTable,
	typeTransaksiColorMap,
} from "@/constants/transaksi";
import dayjs from "dayjs";
import { typeAnggotaColorMap, userRoleMap } from "@/constants/user";
import { moneyConverter } from "@/utils/moneyFormatter";

export function TransaksiTable({
	data,
	page,
	keyword,
	limit,
	setSearchParams,
}: {
	data: TransaksiResponse;
	page: number;
	keyword: string;
	limit: string;
	setSearchParams: SetURLSearchParams;
}) {
	const navigate = useNavigate();
	const user = useTypedSelector((state) => state.oauth.oauthData);
	const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
	const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
	const [filterValue, setFilterValue] = useState<string>(keyword);

	const onSearchChange = (value: string) => {
		setFilterValue(value);
		setIsLoadingData(true);
		const debounceTimeout = setTimeout(() => {
			if (value) {
				setSearchParams({
					keyword: value.toString(),
					page: "1",
					limit: limit,
				});
			} else {
				setSearchParams({
					page: "1",
					limit: limit,
				});
			}
			setIsLoadingData(false);
		}, 1000);

		return () => clearTimeout(debounceTimeout);
	};

	const onClear = useCallback(() => {
		setFilterValue("");
	}, []);

	const onRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFilterValue("");
		setSearchParams({
			page: "1",
			limit: e.target.value,
		});
	};

	const topContent = useMemo(() => {
		return (
			<div className="flex flex-col gap-4 px-4">
				<div className="flex justify-between gap-3 items-end">
					<Input
						isClearable
						className="w-full sm:max-w-[44%]"
						placeholder="Search repository by judul or pengarang..."
						startContent={<HiOutlineMagnifyingGlass />}
						value={filterValue}
						onClear={() => onClear()}
						onValueChange={onSearchChange}
					/>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-default-400 text-small">
						Total {data.total} transaksi
					</span>
					<label className="flex items-center text-default-400 text-small">
						Rows per page:
						<select
							className="bg-transparent outline-none text-default-400 text-small"
							defaultValue={limit || "5"}
							onChange={onRowsPerPageChange}>
							<option value="5">5</option>
							<option value="10">10</option>
							<option value="15">15</option>
							<option value="20">20</option>
						</select>
					</label>
				</div>
			</div>
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterValue, onSearchChange]);

	const renderCell = useCallback(
		(data: TransaksiDetailResponse, columnKey: Key) => {
			const cellValue = data[columnKey as keyof TransaksiDetailResponse];

			switch (columnKey) {
				case "judul":
					return <>{data.repository.judul}</>;
				case "pengarang":
					return <>{data.repository.pengarang}</>;
				case "peminjam":
					return <>{data.user.fullname}</>;
				case "anggota":
					return (
						<Chip
							className="capitalize"
							color={
								typeAnggotaColorMap[
									userRoleMap[data.user.id_role as keyof typeof userRoleMap]
								]
							}
							size="sm"
							variant="flat">
							{userRoleMap[data.user.id_role as keyof typeof userRoleMap]}
						</Chip>
					);
				case "overdue":
					return <>{data.overdue_days} Hari</>;
				case "denda":
					return <>{moneyConverter(String(data.denda))}</>;
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
					return <>{dayjs(data.borrowedAt).format("DD MMMM YYYY")}</>;
				case "returnedAt":
					return <>{dayjs(data.returnedAt).format("DD MMMM YYYY")}</>;
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
												console.log(user?.access_token);
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
			isStriped={true}
			shadow="none"
			aria-label="Data transaksi perpustakaan"
			topContent={topContent}
			topContentPlacement="outside"
			bottomContentPlacement="outside"
			bottomContent={
				<div className="flex w-full justify-center">
					<Pagination
						isCompact
						showControls
						showShadow
						color="primary"
						page={page}
						total={data.pages.total}
						onChange={(page) =>
							setSearchParams({
								page: page.toString(),
								keyword: filterValue,
								limit: limit,
							})
						}
					/>
				</div>
			}>
			<TableHeader columns={TransaksiHeaderTable}>
				{(column) => (
					<TableColumn key={column.slug} align="start">
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody
				isLoading={isLoadingData}
				loadingContent={
					<div className="bg-white rounded-xl shadow-md z-50">
						<Spinner className="m-4" label="Loading data..." />
					</div>
				}
				emptyContent={`Data Transaksi tidak ditemukan `}
				items={data.transaksi}
				className="overflow-y-scroll">
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
}
