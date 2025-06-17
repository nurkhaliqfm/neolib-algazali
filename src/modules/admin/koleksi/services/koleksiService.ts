import { ApiError, ApiResponse } from "@/types/global";
import axios, { AxiosError } from "axios";
import {
	RepositoryBuku,
	RepositoryDetailResponse,
	RepositoryEbook,
	RepositoryEjurnal,
	RepositoryJurnal,
	RepositoryRequest,
	RepositoryResponse,
	RepositorySkripsi,
} from "../types/koleksi.type";
import { RepositoryItemKey } from "@/types/repository";

const { VITE_SERVER_BASE_URL } = import.meta.env;

const getListRepositoryPagination = async ({
	token,
	type,
	page,
	keyword,
	isPublic,
	limit,
	onDone,
	onError,
}: {
	token: string | null | undefined;
	type: string;
	page: string;
	isPublic: boolean;
	keyword?: string;
	limit?: string;
	onDone?: (data: RepositoryResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	const baseUrl = isPublic
		? `${VITE_SERVER_BASE_URL}/public`
		: `${VITE_SERVER_BASE_URL}/admin/repository`;
	try {
		const response = await axios.get(
			`${baseUrl}/${type}s?page=${page}${keyword ? `&keyword=${keyword}` : ""}${
				limit ? `&limit=${limit}` : ""
			}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (onDone) onDone(response.data);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError<ApiError>;
			if (onError)
				onError({
					status: axiosError.response?.status || 500,
					error: axiosError.response?.data.error || axiosError.message,
				});
			if (axiosError.response?.status === 401) {
				localStorage.removeItem("authData");
				window.location.reload();
			}
		}
		throw error;
	}
};

const getDetailRepository = async ({
	token,
	type,
	repos,
	isPublic,
	onDone,
	onError,
}: {
	token: string | null | undefined;
	type: string;
	repos: string;
	isPublic: boolean;
	onDone?: (data: RepositoryDetailResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	const baseUrl = isPublic
		? `${VITE_SERVER_BASE_URL}/public`
		: `${VITE_SERVER_BASE_URL}/admin/repository`;
	try {
		const response = await axios.get(
			`${baseUrl}/${type}/detail?repos=${repos}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (onDone) onDone(response.data);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError<ApiError>;
			if (onError)
				onError({
					status: axiosError.response?.status || 500,
					error: axiosError.response?.data.error || axiosError.message,
				});
			if (axiosError.response?.status === 401) {
				localStorage.removeItem("authData");
				window.location.reload();
			}
		}
		throw error;
	}
};

const updateRepository = async ({
	token,
	atr,
	repos,
	onDone,
	onError,
}: {
	token: string | null | undefined;
	atr: {
		id: string | null;
		slug: RepositoryItemKey | undefined;
	};
	repos: RepositoryRequest;
	onDone?: (data: ApiResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	const repositoryBodyRequest = new FormData();

	repositoryBodyRequest.append("judul", repos.judul);
	repositoryBodyRequest.append("type", repos.type);
	if (repos.old_sampul) {
		repositoryBodyRequest.append("nama_sampul", repos.old_sampul);
	}
	if (repos.old_file) {
		repositoryBodyRequest.append("nama_file", repos.old_file);
	}
	if (repos.nama_sampul) {
		const fileSampul = repos.nama_sampul as FileList;
		repositoryBodyRequest.append("sampul", fileSampul[0], fileSampul[0]?.name);
	}
	if (repos.nama_file) {
		const fileRepos = repos.nama_file as FileList;
		repositoryBodyRequest.append("repos", fileRepos[0], fileRepos[0]?.name);
	}
	if (atr.slug) {
		const data = repos[atr.slug as keyof RepositoryRequest] as
			| RepositoryJurnal
			| RepositoryEjurnal
			| RepositoryBuku
			| RepositoryEbook
			| RepositorySkripsi;

		Object.keys(data).forEach((key) => {
			if (
				key !== "judul" &&
				key !== "nama_sampul" &&
				key !== "nama_file" &&
				key !== "id_lokasi" &&
				key !== "id_prodi"
			) {
				if (key === "lokasi") {
					if ("lokasi" in data) {
						repositoryBodyRequest.append(`data[id_lokasi]`, data?.lokasi?.id);
					}
				} else if (key === "prodi") {
					if ("prodi" in data) {
						repositoryBodyRequest.append(`data[id_prodi]`, data?.prodi?.id);
					}
				} else {
					repositoryBodyRequest.append(
						`data[${key}]`,
						data[key as keyof typeof data] as unknown as string
					);
				}
			}
		});
	}

	try {
		const response = await axios.patch(
			`${VITE_SERVER_BASE_URL}/admin/repository/${atr.slug}?repos=${atr.id}`,
			repositoryBodyRequest,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (onDone)
			onDone({
				status: response.status,
				message: response.data.message || "Repository updated successfully",
			});
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError<ApiError>;
			if (onError)
				onError({
					status: axiosError.response?.status || 500,
					error: axiosError.response?.data.error || axiosError.message,
				});
			if (axiosError.response?.status === 401) {
				localStorage.removeItem("authData");
				window.location.reload();
			}
		}
		throw error;
	}
};

const createRepository = async ({
	token,
	atr,
	repos,
	onDone,
	onError,
}: {
	token: string | null | undefined;
	atr: {
		slug: RepositoryItemKey | undefined;
	};
	repos: RepositoryRequest;
	onDone?: (data: ApiResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	const repositoryBodyRequest = new FormData();

	repositoryBodyRequest.append("judul", repos.judul);
	repositoryBodyRequest.append("type", repos.type);
	if (repos.nama_sampul) {
		const fileSampul = repos.nama_sampul as FileList;
		repositoryBodyRequest.append("sampul", fileSampul[0], fileSampul[0]?.name);
	}
	if (repos.nama_file) {
		const fileRepos = repos.nama_file as FileList;
		repositoryBodyRequest.append("repos", fileRepos[0], fileRepos[0]?.name);
	}
	if (atr.slug) {
		const data = repos[atr.slug as keyof RepositoryRequest] as
			| RepositoryJurnal
			| RepositoryEjurnal
			| RepositoryBuku
			| RepositoryEbook
			| RepositorySkripsi;

		Object.keys(data).forEach((key) => {
			if (
				key !== "judul" &&
				key !== "nama_sampul" &&
				key !== "nama_file" &&
				key !== "id_lokasi" &&
				key !== "id_prodi"
			) {
				if (key === "lokasi") {
					if ("lokasi" in data) {
						repositoryBodyRequest.append(`data[id_lokasi]`, data?.lokasi?.id);
					}
				} else if (key === "prodi") {
					if ("prodi" in data) {
						repositoryBodyRequest.append(`data[id_prodi]`, data?.prodi?.id);
					}
				} else {
					repositoryBodyRequest.append(
						`data[${key}]`,
						data[key as keyof typeof data] as unknown as string
					);
				}
			}
		});
	}

	try {
		const response = await axios.post(
			`${VITE_SERVER_BASE_URL}/admin/repository/${atr.slug}/create`,
			repositoryBodyRequest,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (onDone)
			onDone({
				status: response.status,
				message: response.data.message || "Repository created successfully",
			});
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError<ApiError>;
			if (onError)
				onError({
					status: axiosError.response?.status || 500,
					error: axiosError.response?.data.error || axiosError.message,
				});
			if (axiosError.response?.status === 401) {
				localStorage.removeItem("authData");
				window.location.reload();
			}
		}
		throw error;
	}
};

const deleteRepository = async ({
	token,
	type,
	repos,
	onDone,
	onError,
}: {
	token: string | null | undefined;
	type: string;
	repos: number;
	onDone?: (data: ApiResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	try {
		const response = await axios.get(
			`${VITE_SERVER_BASE_URL}/admin/repository/${type}/delete?repos=${repos}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (onDone)
			onDone({
				status: response.status,
				message: response.data.message || "Repository deleted successfully",
			});
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError<ApiError>;
			if (onError)
				onError({
					status: axiosError.response?.status || 500,
					error: axiosError.response?.data.error || axiosError.message,
				});
			if (axiosError.response?.status === 401) {
				localStorage.removeItem("authData");
				window.location.reload();
			}
		}
		throw error;
	}
};

export {
	getListRepositoryPagination,
	getDetailRepository,
	updateRepository,
	createRepository,
	deleteRepository,
};
