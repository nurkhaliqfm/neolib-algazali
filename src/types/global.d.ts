export interface ApiError {
	status: number;
	error: string;
}

export interface ApiResponse {
	status: number;
	message: string;
}

export interface TableHeaderComponent {
	name: string;
	slug: string;
}
