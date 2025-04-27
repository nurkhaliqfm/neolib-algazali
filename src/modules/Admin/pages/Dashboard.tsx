import { cn } from '@/lib/utils';
import {
	HiOutlineAcademicCap,
	HiOutlineBookOpen,
	HiOutlineDocumentText,
	HiOutlineUserGroup,
	HiOutlineWallet,
} from 'react-icons/hi2';
import { BiBarChart } from "react-icons/bi";
import { IconType } from 'react-icons/lib';

type StatistikItem = {
	title: string,
	total: number
}

type StatistikResponse = {
	repository: { [key in StatistikKeyRepos]: StatistikItem },
	anggota: StatistikItem,
	pinjaman: StatistikItem
}

type StatistikKeyRepos = 'artikel_jurnal' | 'ejurnal' | 'buku' | 'ebook' | 'skripsi';
type StatistikKey = StatistikKeyRepos | 'pinjaman' | 'anggota'

const StatistikRepositroyComponent: Record<StatistikKey, { color: string, icon: IconType }> = {
	"artikel_jurnal": {
		color: 'red',
		icon: HiOutlineDocumentText
	}, "ejurnal": {
		color: 'yellow',
		icon: HiOutlineDocumentText
	}, "buku": {
		color: 'blue',
		icon: HiOutlineBookOpen
	}, 'ebook': {
		color: 'green',
		icon: HiOutlineBookOpen
	}, "skripsi": {
		color: 'cyan',
		icon: HiOutlineAcademicCap
	}
	, "pinjaman": {
		color: 'orange',
		icon: HiOutlineWallet
	}
	, "anggota": {
		color: 'purple',
		icon: HiOutlineUserGroup
	}
}

const dataStatistik: StatistikResponse = {
	repository: {
		artikel_jurnal: {
			title: 'Artikel Jurnal',
			total: 15,
		},
		ejurnal: {
			title: "E-Jurnal",
			total: 3
		},
		buku: {
			title: "Buku",
			total: 1447,
		},
		ebook: {
			title: "E-Book",
			total: 69
		},
		skripsi: {
			title: "Skripsi",
			total: 1145
		}
	},
	anggota: {
		title: "Anggota",
		total: 409
	},
	pinjaman: { title: "Pinjaman", total: 25 }
}


const CardComponent = ({ slug, item }: { slug: StatistikKey, item: StatistikItem }) => {
	const { icon: Icon, color } = StatistikRepositroyComponent[slug];
	return <div className="rounded-xl border bg-card text-card-foreground shadow flex flex-col p-4 justify-between">
		<div className={cn("rounded-md w-10 h-10 p-2 text-white", `bg-${color}-400`)}><Icon size={20} /></div>
		<section className='flex items-center justify-between'>
			<div>
				<h2 className="font-light text-sm mt-2 text-slate-400">{item.title.toUpperCase()}</h2>
				<p className="font-semibold text-xl text-slate-700">{item.total}</p>
			</div>
			<BiBarChart className={`text-${color}-400`} size={40} />
		</section>
	</div>
}

function DashboardPage() {
	return <section className="grid grid-cols-2 md::grid-cols-4 gap-2">
		{dataStatistik && Object.keys(dataStatistik.repository).map((keys) => {
			return <CardComponent key={`card-koleksi-${keys}`} slug={keys as StatistikKeyRepos} item={dataStatistik.repository[keys as StatistikKeyRepos]} />
		})}
		<CardComponent key={`card-koleksi-anggota`} slug='anggota' item={dataStatistik.anggota} />
		<CardComponent key={`card-koleksi-pinjaman`} slug='pinjaman' item={dataStatistik.pinjaman} />
	</section>;
}

export default DashboardPage;
