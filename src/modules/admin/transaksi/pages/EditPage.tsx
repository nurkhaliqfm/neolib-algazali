import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Selection,
	useDisclosure,
} from "@heroui/react";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getListAnggotaPagination } from "../../anggota/services/anggotaService";
import { anggotaTypeMap } from "@/constants/user";
import {
	AnggotaDetailResponse,
	AnggotaResponse,
} from "../../anggota/types/anggota.type";
import {
	RepositoryDetailResponse,
	RepositoryResponse,
} from "../../koleksi/types/koleksi.type";
import { getListRepositoryPagination } from "../../koleksi/services/koleksiService";
import { repositoryTypeMap } from "@/constants/repository";
import { SelectionAnggotaTable } from "../components/SelectionAnggotaTable";
import { SelectionKoleksiTable } from "../components/SelectionKoleksiTable";
import { toast } from "react-toastify";
import {
	getDetailTransaksi,
	updateTransaksi,
} from "../services/transaksiService";
import AppRoutes from "@/router/routes";
import { roleConverter } from "@/utils/roleCoverter";
import { TransaksiDetailResponse } from "../types/transaksi.type";

const EditTransaksiPage = () => {
	const user = useTypedSelector((state) => state.oauth.oauthData);
	const { search } = useLocation();
	const navigate = useNavigate();

	const params = new URLSearchParams(search);
	const transaksi = params.get("transaksi");

	const { isOpen, onOpen, onClose } = useDisclosure();

	const [isLoadingCreate, setIsLoadingCreate] = useState(false);
	const [selectedAnggotaGroup, setSelectedAnggotaGroup] = useState<Selection>(
		new Set(["MAHASISWA"])
	);
	const [selectedReposType, setSelectedReposType] = useState<Selection>(
		new Set(["JURNAL"])
	);
	const [anggotaData, setAnggotaData] = useState<AnggotaResponse | null>(null);
	const [repositoryData, setRepositoryData] =
		useState<RepositoryResponse | null>(null);

	const [selectedRepositoryBorrowed, setSelectedRepositoryBorrowed] =
		useState<RepositoryDetailResponse>();

	const [selectedAnggotaBorrowed, setSelectedAnggotaBorrowed] =
		useState<AnggotaDetailResponse>();

	const [detailTransaksi, setDetailTransaksi] =
		useState<TransaksiDetailResponse | null>();

	const [searchRepos, setSearchRepos] = useState<string>("");
	const [searchAnggota, setSearchAnggota] = useState<string>("");

	const handleConfirmationModalButton = () => {
		if (selectedAnggotaBorrowed && selectedRepositoryBorrowed) {
			onOpen();
		} else {
			toast.error("Data Anggota dan Repository harus dipilih", {
				theme: "colored",
				autoClose: 700,
			});
		}
	};

	const handleConfirmationButton = () => {
		if (
			detailTransaksi &&
			selectedAnggotaBorrowed &&
			selectedRepositoryBorrowed
		) {
			console.log(selectedAnggotaBorrowed, selectedRepositoryBorrowed);
			updateTransaksi({
				token: user?.access_token,
				transaksi: detailTransaksi.id,
				data: {
					user: selectedAnggotaBorrowed.id,
					repos: selectedRepositoryBorrowed.id,
					type: selectedRepositoryBorrowed.type,
				},
				onDone: (data) => {
					if (data.status === 200) {
						toast.success(data.message, {
							autoClose: 700,
							onClose: () => {
								navigate(AppRoutes.AdminTransaksi.path);
							},
						});
					} else {
						toast.error(data.message, {
							theme: "colored",
							autoClose: 700,
							onClose: () => {
								setIsLoadingCreate(false);
							},
						});
					}
				},
				onError: (error) => {
					toast.error(error.error, {
						theme: "colored",
						autoClose: 700,
						onClose: () => {
							setIsLoadingCreate(false);
						},
					});
				},
			});
		}
	};

	useEffect(() => {
		if (transaksi) {
			getDetailTransaksi({
				token: user?.access_token,
				transaksi: transaksi,
				onDone: (data) => {
					const type = data.repository.type;
					const anggota = roleConverter(data.user.id_role);
					setSelectedAnggotaGroup(new Set([anggota]));
					setSelectedReposType(new Set([type]));

					setSelectedAnggotaBorrowed(data.user);
					setSelectedRepositoryBorrowed(data.repository);

					setSearchRepos(data.repository.judul);

					setDetailTransaksi(data);
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [transaksi]);

	useEffect(() => {
		const reposType = Array.from(
			selectedReposType
		)[0] as keyof typeof repositoryTypeMap;

		getListRepositoryPagination({
			token: user?.access_token,
			page: "1",
			type: repositoryTypeMap[reposType],
			isPublic: false,
			keyword: searchRepos,
			limit: "5",
			onDone: (data) => {
				setRepositoryData(data);
			},
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedReposType]);

	useEffect(() => {
		const anggotaGroup = Array.from(
			selectedAnggotaGroup
		)[0] as keyof typeof anggotaTypeMap;

		getListAnggotaPagination({
			token: user?.access_token,
			page: "1",
			limit: "5",
			keyword: selectedAnggotaBorrowed?.fullname || searchAnggota,
			type: anggotaTypeMap[anggotaGroup],
			onDone: (data) => {
				setAnggotaData(data);
			},
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedAnggotaGroup, searchAnggota]);

	return (
		<>
			<Modal isOpen={isOpen} size="sm" onClose={onClose}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Konfirmasi Peminjaman Anggota
							</ModalHeader>
							<ModalBody>
								<p>
									Data pinjaman anggota atas nama{" "}
									<b>{selectedAnggotaBorrowed?.fullname}</b> dari perpustakaan
									ITBA Al-Gazali akan diubah menjadi sebagai berikut:
								</p>
								<p>
									<b>{selectedRepositoryBorrowed?.judul}</b> -{" "}
									{selectedRepositoryBorrowed?.pengarang}(
									<i>
										<b>{selectedRepositoryBorrowed?.type}</b>
									</i>
									)
								</p>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Batal
								</Button>
								<Button
									isLoading={isLoadingCreate}
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
									onPress={() => handleConfirmationButton()}>
									Konfirmasi
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
			{anggotaData && repositoryData && (
				<section className="flex flex-col gap-y-4 px-4">
					<Fragment>
						<p className="uppercase font-bold leading-3  mt-4">
							Daftar Anggota{" "}
							{
								Array.from(
									selectedAnggotaGroup
								)[0] as keyof typeof anggotaTypeMap
							}
						</p>
						<div className="overflow-visible">
							<SelectionAnggotaTable
								isEditMode={true}
								data={anggotaData}
								type={selectedAnggotaGroup}
								initial={selectedAnggotaBorrowed?.id}
								setType={setSelectedAnggotaGroup}
								setSearchParams={setSearchAnggota}
								search={searchAnggota}
								setSelectedItem={setSelectedAnggotaBorrowed}
							/>
						</div>
					</Fragment>

					<Fragment>
						<p className="uppercase font-bold leading-3 mt-4">
							Daftar Repository{" "}
							{
								Array.from(
									selectedReposType
								)[0] as keyof typeof repositoryTypeMap
							}
						</p>
						<div className="overflow-visible">
							<SelectionKoleksiTable
								data={repositoryData}
								type={selectedReposType}
								initial={selectedRepositoryBorrowed?.id}
								setType={setSelectedReposType}
								setSearchParams={setSearchRepos}
								search={searchRepos}
								setSelectedItem={setSelectedRepositoryBorrowed}
							/>
						</div>
					</Fragment>
				</section>
			)}
			<div className="flex justify-end items-end m-4">
				<Button
					onPress={() => handleConfirmationModalButton()}
					size="md"
					variant="shadow"
					color="primary">
					Selanjutnya
				</Button>
			</div>
		</>
	);
};

export default EditTransaksiPage;
