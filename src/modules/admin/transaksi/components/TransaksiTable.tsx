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
import { Key, useCallback, useEffect, useMemo, useState } from "react";
import {
	TransaksiDetailResponse,
	TransaksiResponse,
} from "../types/transaksi.type";
import {
	HiOutlineArchiveBoxArrowDown,
	HiOutlineArrowPath,
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
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { toast } from "react-toastify";
import {
	TransaksiHeaderTable,
	typeTransaksiColorMap,
} from "@/constants/transaksi";
import dayjs from "dayjs";
import { typeAnggotaColorMap, userRoleMap } from "@/constants/user";
import { moneyConverter } from "@/utils/moneyFormatter";
import { deleteTransaksi, updateTransaksi } from "../services/transaksiService";
import useDebounce from "@/hooks/useDebounce";

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
	const [isLoadingExtended, setIsLoadingExtended] = useState<boolean>(false);
	const [isLoadingReturned, setIsLoadingReturned] = useState<boolean>(false);
	const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
	const [filterValue, setFilterValue] = useState<string>(keyword);
	const debounceValue = useDebounce(filterValue);

	const onSearchChange = (value: string) => {
		setIsLoadingData(true);
		setFilterValue(value);
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

	useEffect(() => {
		setSearchParams({
			...(debounceValue &&
				debounceValue !== "" && { keyword: debounceValue.toString() }),
			page: "1",
			limit: limit,
		});

		setIsLoadingData(false);
	}, [debounceValue, limit, setSearchParams]);

	// useEffect(() => {
	// 	if (debounceValue) {
	// 		setSearchParams({
	// 			keyword: debounceValue.toString(),
	// 			page: "1",
	// 			limit: limit,
	// 		});
	// 	} else {
	// 		setSearchParams({
	// 			page: "1",
	// 			limit: limit,
	// 		});
	// 	}

	// 	setIsLoadingData(false);
	// }, [debounceValue, limit, setSearchParams]);

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
							<AlertDialog>
								<Tooltip color="primary" content="Kembalikan Pinjaman">
									<AlertDialogTrigger asChild>
										<button className="text-lg text-primary cursor-pointer active:opacity-50">
											<HiOutlineArrowPath />
										</button>
									</AlertDialogTrigger>
								</Tooltip>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>
											Apakah anda yakin ingin mengebalikan pinjaman ini?
										</AlertDialogTitle>
										<AlertDialogDescription>
											Pinjaman <b>{data.user.fullname}</b> untuk{" "}
											<b>{data.repository.judul}</b> akan dikembalikan. Tindakan
											ini tidak dapat dibatalkan.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Batal</AlertDialogCancel>
										<Button
											size="md"
											isLoading={isLoadingReturned}
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
											color="primary"
											variant="solid"
											onPress={() => {
												setIsLoadingReturned(true);
												updateTransaksi({
													token: user?.access_token,
													transaksi: data.id,
													slug: "returned",
													data: {
														repos: data.repository.id,
														user: data.user.id,
														type: data.repository.type,
													},
													onDone: (data) => {
														if (data.status === 200) {
															toast.success(data.message, {
																autoClose: 1000,
																onClose: () => {
																	window.location.reload();
																	setIsLoadingReturned(false);
																},
															});
														} else {
															toast.error(data.message, {
																theme: "colored",
																autoClose: 1000,
																onClose: () => {
																	setIsLoadingReturned(false);
																},
															});
														}
													},
													onError: (error) => {
														toast.error(error.error, {
															theme: "colored",
															autoClose: 1000,
															onClose: () => {
																setIsLoadingReturned(false);
															},
														});
													},
												});
											}}>
											Kembalikan
										</Button>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
							<AlertDialog>
								<Tooltip color="default" content="Perpanjang Pinjaman">
									<AlertDialogTrigger asChild>
										<button className="text-lg text-default cursor-pointer active:opacity-50">
											<HiOutlineArchiveBoxArrowDown />
										</button>
									</AlertDialogTrigger>
								</Tooltip>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>
											Apakah anda yakin ingin meperpanjang pinjaman ini?
										</AlertDialogTitle>
										<AlertDialogDescription>
											Pinjaman <b>{data.user.fullname}</b> untuk{" "}
											<b>{data.repository.judul}</b> akan diperpanjang. Tindakan
											ini tidak dapat dibatalkan.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Batal</AlertDialogCancel>
										<Button
											size="md"
											isLoading={isLoadingExtended}
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
											color="default"
											variant="solid"
											onPress={() => {
												setIsLoadingExtended(true);
												updateTransaksi({
													token: user?.access_token,
													transaksi: data.id,
													slug: "extended",
													data: {
														repos: data.repository.id,
														user: data.user.id,
														type: data.repository.type,
													},
													onDone: (data) => {
														if (data.status === 200) {
															toast.success(data.message, {
																autoClose: 1000,
																onClose: () => {
																	window.location.reload();
																	setIsLoadingExtended(false);
																},
															});
														} else {
															toast.error(data.message, {
																theme: "colored",
																autoClose: 1000,
																onClose: () => {
																	setIsLoadingExtended(false);
																},
															});
														}
													},
													onError: (error) => {
														toast.error(error.error, {
															theme: "colored",
															autoClose: 1000,
															onClose: () => {
																setIsLoadingExtended(false);
															},
														});
													},
												});
											}}>
											Perpanjang
										</Button>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
							{/* <Tooltip color="warning" content="Detail Pinjaman">
								<button
									onClick={() =>
										navigate(
											`${AppRoutes.AdminDetailTransaksi.path}?transaksi=${data.id}`
										)
									}
									className="text-lg text-warning cursor-pointer active:opacity-50">
									<HiOutlineEye />
								</button>
							</Tooltip> */}
							<Tooltip color="success" content="Edit Pinjaman">
								<button
									onClick={() =>
										navigate(
											`${AppRoutes.AdminEditTransaksi.path}?transaksi=${data.id}`
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
												deleteTransaksi({
													token: user?.access_token,
													transaksi: data.id,
													onDone: (data) => {
														if (data.status === 200) {
															toast.success(data.message, {
																autoClose: 1000,
																onClose: () => {
																	window.location.reload();
																	setIsLoadingDelete(false);
																},
															});
														} else {
															toast.error(data.message, {
																theme: "colored",
																autoClose: 1000,
																onClose: () => {
																	setIsLoadingDelete(false);
																},
															});
														}
													},
													onError: (error) => {
														toast.error(error.error, {
															theme: "colored",
															autoClose: 1000,
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
			className="gap-0 my-4"
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
