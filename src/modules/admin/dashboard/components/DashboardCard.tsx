import { cn } from '@/lib/utils';
import { BiBarChart } from 'react-icons/bi';
import {
	HiOutlineAcademicCap,
	HiOutlineBookOpen,
	HiOutlineDocumentText,
	HiOutlineUserGroup,
	HiOutlineWallet,
} from 'react-icons/hi2';
import { IconType } from 'react-icons/lib';
import { CardDashboardItemKey } from '../types/dashboard.type';
import { StatistikResponseItem } from '@/types/statistik';

const StatistikRepositroyComponent: Record<
	CardDashboardItemKey,
	{ color: string; background: string; icon: IconType }
> = {
	artikel_jurnal: {
		color: 'text-red-400',
		background: 'bg-red-400',
		icon: HiOutlineDocumentText,
	},
	ejurnal: {
		color: 'text-yellow-400',
		background: 'bg-yellow-400',
		icon: HiOutlineDocumentText,
	},
	buku: {
		color: 'text-blue-400',
		background: 'bg-blue-400',
		icon: HiOutlineBookOpen,
	},
	ebook: {
		color: 'text-green-400',
		background: 'bg-green-400',
		icon: HiOutlineBookOpen,
	},
	skripsi: {
		color: 'text-cyan-400',
		background: 'bg-cyan-400',
		icon: HiOutlineAcademicCap,
	},
	pinjaman: {
		color: 'text-orange-400',
		background: 'bg-orange-400',
		icon: HiOutlineWallet,
	},
	anggota: {
		color: 'text-purple-400',
		background: 'bg-purple-400',
		icon: HiOutlineUserGroup,
	},
};

export const DashboardCard = ({
	slug,
	item,
}: {
	slug: CardDashboardItemKey;
	item: StatistikResponseItem;
}) => {
	const { icon: Icon, color, background } = StatistikRepositroyComponent[slug];

	return (
		<div className="rounded-xl border bg-card text-card-foreground shadow flex flex-col p-4 justify-between">
			<div className={cn('rounded-md w-10 h-10 p-2 text-white', background)}>
				<Icon size={20} />
			</div>
			<section className="flex items-center justify-between">
				<div>
					<h2 className="font-light text-sm mt-2 text-slate-400">
						{item.title.toUpperCase()}
					</h2>
					<p className="font-semibold text-xl text-slate-700">{item.total}</p>
				</div>
				<BiBarChart className={cn(color)} size={40} />
			</section>
		</div>
	);
};
