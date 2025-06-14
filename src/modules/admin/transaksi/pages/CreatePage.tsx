import { Selection } from "@heroui/react";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getListAnggota } from "../../anggota/services/anggotaService";
import { anggotaTypeMap } from "@/constants/user";
import { AnggotaResponse } from "../../anggota/types/anggota.type";
import { RepositoryResponse } from "../../koleksi/types/koleksi.type";
import { getListRepository } from "../../koleksi/services/koleksiService";
import { repositoryTypeMap } from "@/constants/repository";
import { SelectionAnggotaTable } from "../components/SelectionAnggotaTable";
import { SelectionKoleksiTable } from "../components/SelectionKoleksiTable";

const CreateTransaksiPage = () => {
	const user = useTypedSelector((state) => state.oauth.oauthData);
	const navigate = useNavigate();

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

	const [searchRepos, setSearchRepos] = useState<string>("");
	const [searchAnggota, setSearchAnggota] = useState<string>("");

	useEffect(() => {
		const reposType = Array.from(
			selectedReposType
		)[0] as keyof typeof repositoryTypeMap;

		getListRepository({
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

		getListAnggota({
			token: user?.access_token,
			page: "1",
			limit: "5",
			keyword: searchAnggota,
			type: anggotaTypeMap[anggotaGroup],
			onDone: (data) => {
				setAnggotaData(data);
			},
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedAnggotaGroup, searchAnggota]);

	return (
		<>
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
								data={anggotaData}
								type={selectedAnggotaGroup}
								setType={setSelectedAnggotaGroup}
								setSearchParams={setSearchAnggota}
								search={searchAnggota}
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
								setType={setSelectedReposType}
								setSearchParams={setSearchRepos}
								search={searchRepos}
							/>
						</div>
					</Fragment>
				</section>
			)}
		</>
	);
};

export default CreateTransaksiPage;
