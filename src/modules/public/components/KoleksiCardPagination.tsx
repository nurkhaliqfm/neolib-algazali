import { Input, Pagination, Spinner } from "@heroui/react";
import { useCallback, useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { SetURLSearchParams } from "react-router-dom";
import { CardCustomeStyleDetail } from "./CardRepository";
import { RepositoryResponse } from "@/modules/admin/koleksi/types/koleksi.type";
import { repositoryTypeMap } from "@/constants/repository";

const { VITE_SERVER_BASE_URL } = import.meta.env;

export function KoleksiCardPagination({
	data,
	page,
	keyword,
	limit,
	slug,
	setSearchParams,
}: {
	data: RepositoryResponse;
	page: number;
	keyword: string;
	limit: string;
	slug: string;
	setSearchParams: SetURLSearchParams;
}) {
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

	return (
		<section className="my-4">
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
						Total {data.total} {slug}
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

			{isLoadingData ? (
				<div className="flex justify-center my-4">
					<div className="bg-white rounded-xl shadow-md z-50 w-fit">
						<Spinner className="m-4" label="Loading data..." />
					</div>
				</div>
			) : (
				<>
					{data.repository.length > 0 ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mt-6 px-6">
							{data.repository.map((repository) => {
								const detailKey = repositoryTypeMap[repository.type];
								const selectedReposByType = repository[detailKey];

								return (
									<CardCustomeStyleDetail
										key={`repository-item-${repository.id}-${repository.type}`}
										url={`${VITE_SERVER_BASE_URL}/public/${repository.type}/sampul/${repository.nama_sampul}`}
										title={repository.judul}
										type={repository.type}
										repos={repository.id}
										pengarang={selectedReposByType?.pengarang as string}
										tahun_terbit={
											selectedReposByType?.tahun_terbit.toString() as string
										}
										sinopsis={
											selectedReposByType
												? ("sinopsis" in selectedReposByType &&
														selectedReposByType.sinopsis) ||
												  undefined
												: undefined
										}
										abstrak={
											selectedReposByType
												? ("abstrak" in selectedReposByType &&
														selectedReposByType.abstrak) ||
												  undefined
												: undefined
										}
									/>
								);
							})}
						</div>
					) : (
						<div className="flex justify-center my-4">
							<p className="border-1 border-slate-100 p-2 rounded-lg text-center shadow-md">
								Data koleksi tidak ditemukan
							</p>
						</div>
					)}

					{data.repository.length > 0 && (
						<div className="flex w-full justify-center my-4 mb-8">
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
					)}
				</>
			)}
		</section>
	);
}
