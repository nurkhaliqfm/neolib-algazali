import { ChartPeminjaman } from '@/modules/Admin/components/chart';
import CardKoleksi, { StatistikKeyRepos, StatistikResponse } from '../../components/card';
import { TableContentPeminjamanProps, TableDataDashboard } from './TableData';

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

const dataPeminjaman: TableContentPeminjamanProps[] = [
    {
        id: 1,
        name: "Nurkhaliq Futhra",
        role: "Mahasiswa",
        peminjaman: "04-25-2025",
        pengembalian: "04-30-2025",
        status: "ongoing",
    },
    {
        id: 2,
        name: "Zoey Lang",
        role: "Dosen",
        peminjaman: "04-25-2025",
        pengembalian: "04-30-2025",
        status: "expired",
    },
    {
        id: 3,
        name: "Jane Fisher",
        role: "Dosen",
        peminjaman: "04-25-2025",
        pengembalian: "04-30-2025",
        status: "ongoing",
    },
    {
        id: 4,
        name: "William Howard",
        role: "Eksternal",
        peminjaman: "04-25-2025",
        pengembalian: "04-30-2025",
        status: "expired",
    },
    {
        id: 5,
        name: "Kristen Copper",
        role: "Mahasiswa",
        peminjaman: "04-20-2025",
        pengembalian: "04-31-2025",
        status: "ongoing",
    },
    {
        id: 6,
        name: "Kristen Copper",
        role: "Mahasiswa",
        peminjaman: "04-25-2025",
        pengembalian: "04-30-2025",
        status: "ongoing",
    },
];

function DashboardPage() {
    return <>
        <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {dataStatistik && Object.keys(dataStatistik.repository).map((keys) => {
                return <CardKoleksi key={`card-koleksi-${keys}`} slug={keys as StatistikKeyRepos} item={dataStatistik.repository[keys as StatistikKeyRepos]} />
            })}
            <CardKoleksi key={`card-koleksi-anggota`} slug='anggota' item={dataStatistik.anggota} />
            <CardKoleksi key={`card-koleksi-pinjaman`} slug='pinjaman' item={dataStatistik.pinjaman} />
        </section>

        <section className='my-4 grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-max'>
            <ChartPeminjaman />
            <TableDataDashboard data={dataPeminjaman} />
        </section>
    </>;
}

export default DashboardPage;
