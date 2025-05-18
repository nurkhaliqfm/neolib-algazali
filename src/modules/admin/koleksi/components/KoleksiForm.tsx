import { moneyConverter } from '@/utils/moneyFormatter';
import { useCallback } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
dayjs.locale('id');

interface RepositoryFormProps<T extends object> {
	data: T;
	renderFields: (args: { data: T; keys: (keyof T)[] }) => React.ReactNode;
}

const formSchema = z.object({
	username: z.string().min(2).max(50),
});

export const KoleksiForm = <T extends object>({
	data,
	renderFields,
}: RepositoryFormProps<T>) => {
	const keys = Object.keys(data) as (keyof T)[];
	return <>{renderFields({ data, keys })}</>;
};

export const KoleksiFormItem = ({
	slug,
	title,
	value,
}: {
	slug: string;
	title: string;
	value: string;
}) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	const renderItem = useCallback((value: string, slug: string) => {
		switch (slug) {
			case 'harga':
				return moneyConverter(value);
			case 'tanggal':
				return dayjs(new Date(value)).format('DD MMMM YYYY');
			default:
				return value;
		}
	}, []);

	return (
		<div className="flex flex-col my-1">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder="shadcn" {...field} />
								</FormControl>
								<FormDescription>
									This is your public display name.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
			{/* <p className="text-xs">{title}</p>
			{value ? (
				<p>{renderItem(value, slug)}</p>
			) : (
				<p className="italic text-slate-300">{title} tidak ada</p>
			)} */}
		</div>
	);
};
