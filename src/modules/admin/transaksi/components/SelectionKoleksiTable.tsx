import {
	Image,
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
	useEffect,
	useMemo,
	useState,
} from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { TableHeaderComponent } from "@/types/global";
import {
	BaseRepository,
	RepositoryDetailResponse,
	RepositoryResponse,
} from "../../koleksi/types/koleksi.type";
import { repositoryTypeMap } from "@/constants/repository";
import useDebounce from "@/hooks/useDebounce";

const { VITE_SERVER_BASE_URL } = import.meta.env;

const reposTypeOptions = [
	{ key: "JURNAL", label: "Artikel Jurnal" },
	{ key: "BUKU", label: "Buku" },
	{ key: "SKRIPSI", label: "Skripsi" },
];

const RepositoryHeaderTable: TableHeaderComponent[] = [
	{ name: "SAMPUL", slug: "nama_sampul" },
	{ name: "JUDUL", slug: "judul" },
	{ name: "PENGARANG", slug: "pengarang" },
];

export function SelectionKoleksiTable({
	data,
	search,
	initial,
	type,
	setType,
	setSearchParams,
	setSelectedItem,
}: {
	data: RepositoryResponse;
	search: string;
	initial?: number | undefined;
	type: Selection;
	setType: Dispatch<SetStateAction<Selection>>;
	setSearchParams: Dispatch<SetStateAction<string>>;
	setSelectedItem: Dispatch<
		SetStateAction<RepositoryDetailResponse | undefined>
	>;
}) {
	const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
	const [filterValue, setFilterValue] = useState<string>(search);
	const [selectedKey, setSelectedKey] = useState<Selection>(
		new Set([String(initial)])
	);
	const debounceValue = useDebounce(filterValue);

	const onSearchChange = (value: string) => {
		setIsLoadingData(true);
		setFilterValue(value);
	};

	const onClear = useCallback(() => {
		setFilterValue("");
	}, []);

	useEffect(() => {
		setSearchParams(debounceValue ? debounceValue.toString() : "");
		setIsLoadingData(false);
	}, [debounceValue, setSearchParams]);

	const topContent = useMemo(() => {
		return (
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
				<Select
					isRequired
					className="md:max-w-xs"
					placeholder="Pilih Repository Perpustakaan"
					selectedKeys={type}
					defaultSelectedKeys={["JURNAL"]}
					variant="bordered"
					onSelectionChange={setType}>
					{reposTypeOptions.map((repos) => (
						<SelectItem key={repos.key}>{repos.label}</SelectItem>
					))}
				</Select>
			</div>
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterValue, onSearchChange]);

	const renderCell = useCallback((data: BaseRepository, columnKey: Key) => {
		const cellValue = data[columnKey as keyof BaseRepository];

		switch (columnKey) {
			case "judul":
				return <>{data.judul}</>;
			case "nama_sampul":
				return (
					<Image
						alt="Cover Repository"
						className="object-cover rounded-xl"
						src={`${VITE_SERVER_BASE_URL}/public/${
							repositoryTypeMap[data.type]
						}/sampul/${data.nama_sampul || "-"}`}
						width={120}
					/>
				);
			default:
				return cellValue;
		}
	}, []);

	return (
		<Table
			isStriped
			// disallowEmptySelection
			color="primary"
			aria-label="Daftar Repository For Selected Transaction"
			selectionBehavior="toggle"
			selectionMode="single"
			topContent={topContent}
			selectedKeys={selectedKey}
			onSelectionChange={(e) => {
				const repository = data.repository.find(
					(item) => item.id === Number(Array.from(e)[0])
				);

				if (repository) {
					setSelectedItem(repository);
					setSelectedKey(e);
				}
			}}>
			<TableHeader columns={RepositoryHeaderTable}>
				{(column) => <TableColumn key={column.slug}>{column.name}</TableColumn>}
			</TableHeader>
			<TableBody
				isLoading={isLoadingData}
				loadingContent={
					<div className="bg-white rounded-xl shadow-md z-50">
						<Spinner className="m-4" label="Loading data..." />
					</div>
				}
				items={data.repository}>
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
