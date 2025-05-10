import { repositoryTypeMap } from "@/constants/repository";
import { RepositoryDetailResponse } from "@/modules/admin/koleksi/types/koleksi.type";

export function getRepositoryDetail<T extends RepositoryDetailResponse>(
	repo: T
) {
	const key = repositoryTypeMap[repo.type];
	return repo[key];
}
