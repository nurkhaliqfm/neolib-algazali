import { useLocation, useParams } from 'react-router-dom';
import { getDetailRepository } from '../services/koleksiService';
import {
	RepositoryDetailItem,
	RepositoryDetailResponse,
} from '../types/koleksi.type';
import { RepositoryItemKey } from '@/types/repository';
import { useEffect, useState } from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import {
	repositoryBukuMetaScheme,
	repositoryMetaFileds,
	repositoryTypeMap,
} from '@/constants/repository';
import { KoleksiForm } from '../components/KoleksiForm';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';

const EditKoleksiPage = () => {
	const { koleksi } = useParams<{ koleksi: RepositoryItemKey }>();
	const { search } = useLocation();

	const params = new URLSearchParams(search);
	const repos = params.get('repos');

	const user = useTypedSelector((state) => state.oauth.oauthData);
	const [repositoryDetailData, setrepositoryDetailData] =
		useState<RepositoryDetailResponse | null>(null);

	const form = useForm<z.infer<typeof repositoryBukuMetaScheme>>({
		resolver: zodResolver(repositoryBukuMetaScheme),
	});

	function onSubmit(values: z.infer<typeof repositoryBukuMetaScheme>) {
		console.log(values);
	}

	useEffect(() => {
		if (koleksi && repos) {
			getDetailRepository({
				token: user?.access_token,
				type: koleksi,
				repos: repos,
				onDone: (data) => {
					setrepositoryDetailData(data);
					form.reset(
						data[repositoryTypeMap[data.type]] as z.infer<
							typeof repositoryBukuMetaScheme
						>
					);
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [koleksi, repos]);

	if (!repositoryDetailData) return <p>No data found.</p>;

	const detailKey = repositoryTypeMap[repositoryDetailData.type];
	const detailData = repositoryDetailData[detailKey];

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<KoleksiForm
						data={detailData as RepositoryDetailItem[typeof detailKey]}
						renderFields={({ data, keys }) => {
							const key = keys.filter((key) => (key as string) !== 'id');
							return (
								<>
									{key.map((k) => (
										<FormField
											key={k}
											control={form.control}
											name={k}
											render={({ field }) => (
												<FormItem>
													<FormLabel>{repositoryMetaFileds[k].slug}</FormLabel>
													<FormControl>
														<Input
															placeholder="shadcn"
															{...field}
															defaultValue={data[k] as string}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									))}
								</>
							);
						}}
					/>

					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</>
	);
};

export default EditKoleksiPage;
