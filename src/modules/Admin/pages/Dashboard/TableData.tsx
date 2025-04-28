import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User } from "@heroui/react";
import dayjs from "dayjs";
import { Key, useCallback } from "react";


type TableColumnKey = 'name' | 'peminjaman' | 'status'

type TableColumnPorps = {
    name: string,
    uid: TableColumnKey
}

export type TableContentPeminjamanProps = {
    id: number,
    name: string,
    role: string,
    peminjaman: string,
    pengembalian: string,
    status: 'ongoing' | 'expired'
}

const tableColumns: TableColumnPorps[] = [
    { name: "NAME", uid: "name" },
    { name: "PEMINJAMAN", uid: "peminjaman" },
    { name: "STATUS", uid: "status" }
];

const statusColorMap: Record<string, "success" | "danger" | "default" | "primary" | "secondary" | "warning" | undefined> = {
    ongoing: "success",
    expired: "danger",
};

export function TableDataDashboard({ data }: { data: TableContentPeminjamanProps[] }) {
    const renderCell = useCallback((data: TableContentPeminjamanProps, columnKey: Key) => {
        const cellValue = data[columnKey as TableColumnKey];
        const startTime = dayjs(data.peminjaman)
        const endTime = dayjs(data.pengembalian)

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "lg" }}
                        description={data.role}
                        name={cellValue}
                    >
                        {data.name}
                    </User>
                );
            case "peminjaman":
                return (
                    <div className="flex flex-col gap-y-2">
                        {/* <HiOutlineCalendarDateRange /> */}
                        <Chip color="warning" variant="flat" className="text-bold text-sm capitalize">
                            {endTime.diff(startTime, 'd', true)} Hari
                        </Chip>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[data.status]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            default:
                return cellValue;
        }
    }, []);

    return <Table aria-label="Data peminjaman perpustakaan">
        <TableHeader columns={tableColumns}>
            {(column) => (
                <TableColumn key={column.uid} align='start'>
                    {column.name}
                </TableColumn>
            )}
        </TableHeader>
        <TableBody items={data} className="overflow-y-scroll">
            {(item) => (
                <TableRow key={item.id}>
                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
            )}
        </TableBody>
    </Table>
}