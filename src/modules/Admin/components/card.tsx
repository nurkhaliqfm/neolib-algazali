import { cn } from "@/lib/utils";
import { BiBarChart } from "react-icons/bi";
import { HiOutlineAcademicCap, HiOutlineBookOpen, HiOutlineDocumentText, HiOutlineUserGroup, HiOutlineWallet } from "react-icons/hi2";
import { IconType } from "react-icons/lib";


type StatistikItem = {
    title: string,
    total: number
}

export type StatistikResponse = {
    repository: { [key in StatistikKeyRepos]: StatistikItem },
    anggota: StatistikItem,
    pinjaman: StatistikItem
}

export type StatistikKeyRepos = 'artikel_jurnal' | 'ejurnal' | 'buku' | 'ebook' | 'skripsi';
export type StatistikKey = StatistikKeyRepos | 'pinjaman' | 'anggota'

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

const CardKoleksi = ({ slug, item }: { slug: StatistikKey, item: StatistikItem }) => {
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

export default CardKoleksi