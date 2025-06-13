import { ApiError, ApiResponse } from "@/types/global";
import axios, { AxiosError } from "axios";
import {
	AnggotaDetailResponse,
	AnggotaDetailTransaksiResponse,
	AnggotaDosenRequest,
	AnggotaMahasiswaRequest,
	AnggotaRequest,
	AnggotaResponse,
	AnggotaUmumRequest,
} from "../types/anggota.type";
import { AnggotaItemKey } from "@/types/anggota";

const { VITE_SERVER_BASE_URL } = import.meta.env;

const getListAnggota = async ({
	token,
	type,
	page,
	keyword,
	limit,
	onDone,
	onError,
}: {
	token: string | null | undefined;
	type: string;
	page: string;
	keyword?: string;
	limit?: string;
	onDone?: (data: AnggotaResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	try {
		const response = await axios.get(
			`${VITE_SERVER_BASE_URL}/admin/anggota/${type}s?page=${page}${
				keyword ? `&keyword=${keyword}` : ""
			}${limit ? `&limit=${limit}` : ""}`,
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
					error: axiosError.message,
				});
			if (axiosError.response?.status === 401) {
				localStorage.removeItem("authData");
				window.location.reload();
			}
		}
		throw error;
	}
};

const createtAnggota = async ({
	token,
	atr,
	anggota,
	onDone,
	onError,
}: {
	token: string | null | undefined;
	atr: {
		slug: AnggotaItemKey | undefined;
	};
	anggota: AnggotaRequest;
	onDone?: (data: ApiResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	const anggotaBodyRequest: Record<
		string,
		| string
		| null
		| Record<string, string | number | { id: number; nama: string } | null>
	> = {
		fullname: anggota.fullname,
		email: null,
		data: {},
	};

	if (atr.slug) {
		const data = anggota[atr.slug as keyof AnggotaRequest] as
			| AnggotaMahasiswaRequest
			| AnggotaDosenRequest
			| AnggotaUmumRequest;

		Object.keys(data).forEach((key) => {
			if (key === "prodi") {
				if ("prodi" in data) {
					anggotaBodyRequest.data = {
						...(typeof anggotaBodyRequest[`data`] === "object" &&
						anggotaBodyRequest[`data`] !== null
							? anggotaBodyRequest[`data`]
							: {}),
						id_prodi: data?.prodi?.id,
					};
				}
			} else if (key === "jenis_kelamin") {
				anggotaBodyRequest.data = {
					...(typeof anggotaBodyRequest[`data`] === "object" &&
					anggotaBodyRequest[`data`] !== null
						? anggotaBodyRequest[`data`]
						: {}),
					jenis_kelamin: data.jenis_kelamin.id === 1 ? "L" : "P",
				};
			} else {
				anggotaBodyRequest.data = {
					...(typeof anggotaBodyRequest[`data`] === "object" &&
					anggotaBodyRequest[`data`] !== null
						? anggotaBodyRequest[`data`]
						: {}),
					[key]: data[key as keyof typeof data],
				};
			}
		});
	}

	try {
		const response = await axios.post(
			`${VITE_SERVER_BASE_URL}/admin/anggota/${atr.slug}/create`,
			anggotaBodyRequest,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		if (onDone)
			onDone({
				status: response.status,
				message: response.data.message || "Anggota created successfully",
			});
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError<ApiError>;
			if (onError)
				onError({
					status: axiosError.response?.status || 500,
					error: axiosError.message,
				});
			if (axiosError.response?.status === 401) {
				localStorage.removeItem("authData");
				window.location.reload();
			}
		}
		throw error;
	}
};

const updateAnggota = async ({
	token,
	atr,
	anggota,
	onDone,
	onError,
}: {
	token: string | null | undefined;
	atr: {
		id: string | null;
		slug: AnggotaItemKey | undefined;
	};
	anggota: AnggotaRequest;
	onDone?: (data: ApiResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	const anggotaBodyRequest: Record<
		string,
		| string
		| null
		| Record<string, string | number | { id: number; nama: string } | null>
	> = {
		fullname: anggota.fullname,
		email: null,
		data: {},
	};

	if (atr.slug) {
		const data = anggota[atr.slug as keyof AnggotaRequest] as
			| AnggotaMahasiswaRequest
			| AnggotaDosenRequest
			| AnggotaUmumRequest;

		Object.keys(data).forEach((key) => {
			if (key === "prodi") {
				if ("prodi" in data) {
					anggotaBodyRequest.data = {
						...(typeof anggotaBodyRequest[`data`] === "object" &&
						anggotaBodyRequest[`data`] !== null
							? anggotaBodyRequest[`data`]
							: {}),
						id_prodi: data?.prodi?.id,
					};
				}
			} else if (key === "jenis_kelamin") {
				anggotaBodyRequest.data = {
					...(typeof anggotaBodyRequest[`data`] === "object" &&
					anggotaBodyRequest[`data`] !== null
						? anggotaBodyRequest[`data`]
						: {}),
					jenis_kelamin: data.jenis_kelamin.id === 1 ? "L" : "P",
				};
			} else {
				anggotaBodyRequest.data = {
					...(typeof anggotaBodyRequest[`data`] === "object" &&
					anggotaBodyRequest[`data`] !== null
						? anggotaBodyRequest[`data`]
						: {}),
					[key]: data[key as keyof typeof data],
				};
			}
		});
	}

	try {
		const response = await axios.patch(
			`${VITE_SERVER_BASE_URL}/admin/anggota/${atr.slug}?anggota=${atr.id}`,
			anggotaBodyRequest,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		if (onDone)
			onDone({
				status: response.status,
				message: response.data.message || "Anggota update successfully",
			});
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError<ApiError>;
			if (onError)
				onError({
					status: axiosError.response?.status || 500,
					error: axiosError.message,
				});
			if (axiosError.response?.status === 401) {
				localStorage.removeItem("authData");
				window.location.reload();
			}
		}
		throw error;
	}
};

const getAnggotaDetail = async ({
	token,
	type,
	anggota,
	onDone,
	onError,
}: {
	token: string | null | undefined;
	type: string;
	anggota: string;
	onDone?: (data: AnggotaDetailResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	try {
		const response = await axios.get(
			`${VITE_SERVER_BASE_URL}/admin/anggota/${type}/detail?anggota=${anggota}`,
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
					error: axiosError.message,
				});
			if (axiosError.response?.status === 401) {
				localStorage.removeItem("authData");
				window.location.reload();
			}
		}
		throw error;
	}
};

const getAnggotaTransaksiDetail = async ({
	token,
	type,
	anggota,
	onDone,
	onError,
}: {
	token: string | null | undefined;
	type: string;
	anggota: string;
	onDone?: (data: AnggotaDetailTransaksiResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	try {
		const response = await axios.get(
			`${VITE_SERVER_BASE_URL}/admin/anggota/${type}/transaksi?anggota=${anggota}`,
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
					error: axiosError.message,
				});
			if (axiosError.response?.status === 401) {
				localStorage.removeItem("authData");
				window.location.reload();
			}
		}
		throw error;
	}
};

const getAnggotaDocument = async ({
	token,
	type,
	anggota,
	onDone,
	onError,
}: {
	token: string | null | undefined;
	type: string;
	anggota: string;
	onDone?: (data: ApiResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	try {
		const response = await axios.get(
			`${VITE_SERVER_BASE_URL}/admin/anggota/${type}/bebas-pustaka?anggota=${anggota}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (onDone)
			onDone({
				status: response.status,
				message:
					response.data.message || "Success create bebas pustaka document",
			});
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError<ApiError>;
			if (onError)
				onError({
					status: axiosError.response?.status || 500,
					error: axiosError.message,
				});
			if (axiosError.response?.status === 401) {
				localStorage.removeItem("authData");
				window.location.reload();
			}
		}
		throw error;
	}
};

const deleteAnggota = async ({
	token,
	type,
	anggota,
	onDone,
	onError,
}: {
	token: string | null | undefined;
	type: string;
	anggota: number;
	onDone?: (data: ApiResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	try {
		const response = await axios.get(
			`${VITE_SERVER_BASE_URL}/admin/anggota/${type}/delete?anggota=${anggota}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (onDone)
			onDone({
				status: response.status,
				message: response.data.message || "Anggota deleted successfully",
			});
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError<ApiError>;
			if (onError)
				onError({
					status: axiosError.response?.status || 500,
					error: axiosError.message,
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
	getListAnggota,
	getAnggotaDetail,
	getAnggotaTransaksiDetail,
	getAnggotaDocument,
	createtAnggota,
	updateAnggota,
	deleteAnggota,
};
