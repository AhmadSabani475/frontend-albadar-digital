import { santriService } from '@/services/santri.service';
import type { Santri } from '@/types/Santri';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { columns } from './columns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const SantriTable = () => {

    const [data, setData] = useState<Santri[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const result = await santriService.getAllSantri();
            setData(result.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel()
    });

    if (isLoading) {
        return <p className="text-sm text-muted-foreground">Memuat data...</p>;
    }

    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <TableHead key={header.id}>
                                {header.isPlaceholder ? null :
                                    flexRender(header.column.columnDef.header, header.getContext())}
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableCell colSpan={columns.length} className="text-center text-muted-foreground">
                        Belum ada data Santri
                    </TableCell>
                )}
            </TableBody>
        </Table>
    );
};
export default SantriTable;