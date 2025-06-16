import {
	Input,
	Select,
	Selection,
	SelectItem,
	Spinner,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@heroui/react";
import {
	Dispatch,
	Key,
	SetStateAction,
	useCallback,
	useMemo,
	useState,
} from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { TableHeaderComponent } from "@/types/global";
import { anggotaTypeMap } from "@/constants/user";
import {
	AnggotaDetailResponse,
	AnggotaResponse,
} from "../../anggota/types/anggota.type";

const AnggotaHeaderTable: TableHeaderComponent[] = [
	{ name: "NAMA", slug: "nama" },
	{ name: "NO IDENTITAS", slug: "identitas" },
	{ name: "JENIS KELAMIN", slug: "jenis_kelamin" },
	{ name: "KONTAK", slug: "kontak" },
	{ name: "ALAMAT", slug: "alamat" },
];
const anggotaOptions = [
	{ key: "MAHASISWA", label: "Mahasiswa" },
	{ key: "DOSEN", label: "Dosen" },
	{ key: "UMUM", label: "Umum" },
];

export function SelectionAnggotaTable({
	data,
	search,
	type,
	selectedItem,
	setType,
	setSearchParams,
	setSelectedItem,
}: {
	data: AnggotaResponse;
	search: string;
	type: Selection;
	selectedItem: Selection;
	setType: Dispatch<SetStateAction<Selection>>;
	setSearchParams: Dispatch<SetStateAction<string>>;
	setSelectedItem: Dispatch<SetStateAction<Selection>>;
}) {
	const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
	const [filterValue, setFilterValue] = useState<string>(search);

	const onSearchChange = (value: string) => {
		setFilterValue(value);
		setIsLoadingData(true);
		const debounceTimeout = setTimeout(() => {
			if (value) {
				setSearchParams(value.toString());
			} else {
				setSearchParams("");
			}
			setIsLoadingData(false);
		}, 1000);

		return () => clearTimeout(debounceTimeout);
	};

	const onClear = useCallback(() => {
		setFilterValue("");
	}, []);

	const topContent = useMemo(() => {
		return (
			<div className="flex justify-between gap-3 items-end">
				<Input
					isClearable
					className="w-full sm:max-w-[44%]"
					placeholder="Search anggota by name or nomor identitas..."
					startContent={<HiOutlineMagnifyingGlass />}
					value={filterValue}
					onClear={() => onClear()}
					onValueChange={onSearchChange}
				/>
				<Select
					isRequired
					className="md:max-w-xs"
					placeholder="Pilih Anggota Perpustakaan"
					selectedKeys={type}
					defaultSelectedKeys={["MAHASISWA"]}
					variant="bordered"
					onSelectionChange={setType}>
					{anggotaOptions.map((anggota) => (
						<SelectItem key={anggota.key}>{anggota.label}</SelectItem>
					))}
				</Select>
			</div>
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterValue, onSearchChange]);

	const renderCell = useCallback(
		(data: AnggotaDetailResponse, columnKey: Key) => {
			const cellValue =
				data[
					anggotaTypeMap[Array.from(type)[0] as keyof typeof anggotaTypeMap]
				];

			switch (columnKey) {
				case "nama":
					return <>{cellValue?.nama}</>;
				case "identitas":
					return (
						<>
							{cellValue && "nim" in cellValue
								? cellValue.nim
								: cellValue && "nik" in cellValue
								? cellValue.nik
								: cellValue && "no_identitas" in cellValue
								? cellValue.no_identitas
								: "-"}
						</>
					);
				case "alamat":
					return <>{cellValue?.alamat || "-"}</>;
				case "kontak":
					return <>{cellValue?.kontak}</>;
				case "jenis_kelamin":
					return (
						<>{cellValue?.jenis_kelamin === "L" ? "Laki-Laki" : "Perempuan"}</>
					);
				default:
					return <span>{String(cellValue)}</span>;
			}
		},
		[type]
	);

	return (
		<Table
			isStriped
			// disallowEmptySelection
			color="primary"
			aria-label="Daftar Anggota For Selected Transaction"
			selectionBehavior="toggle"
			selectionMode="single"
			topContent={topContent}
			selectedKeys={selectedItem}
			onSelectionChange={setSelectedItem}>
			<TableHeader columns={AnggotaHeaderTable}>
				{(column) => <TableColumn key={column.slug}>{column.name}</TableColumn>}
			</TableHeader>
			<TableBody
				isLoading={isLoadingData}
				loadingContent={
					<div className="bg-white rounded-xl shadow-md z-50">
						<Spinner className="m-4" label="Loading data..." />
					</div>
				}
				items={data.anggota}>
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
