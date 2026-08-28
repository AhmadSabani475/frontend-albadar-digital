import { useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
    type ColumnDef,
    type RowSelectionState,
    type Row,
} from '@tanstack/react-table';
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '../ui/table';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

interface DataTableProps<T> {
    data: T[];
    columns: ColumnDef<T>[];
    isLoading?: boolean;
    searchPlaceholder?: string;
    emptyMessage?: string;
    rowSelection?: RowSelectionState;
    setRowSelection?: React.Dispatch<React.SetStateAction<RowSelectionState>>;
    enableRowSelection?: boolean | ((row: Row<T>) => boolean);
}

const DataTable = <T,>(props: DataTableProps<T>) => {
    const {
        data,
        columns,
        isLoading = false,
        searchPlaceholder = 'Cari...',
        emptyMessage = 'Belum ada data',
        rowSelection = {},
        setRowSelection,
        enableRowSelection = false,
    } = props;
    const [globalFilter, setGlobalFilter] = useState('');
    const [pageSize, setPageSize] = useState(10);

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
            rowSelection,
        },
        onGlobalFilterChange: setGlobalFilter,
        onRowSelectionChange: setRowSelection,
        enableRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize } },
    });

    if (isLoading) {
        return <p className="text-sm text-muted-foreground">Memuat data...</p>;
    }

    const totalRows = table.getFilteredRowModel().rows.length;
    const currentPage = table.getState().pagination.pageIndex;
    const from = totalRows === 0 ? 0 : currentPage * pageSize + 1;
    const to = Math.min((currentPage + 1) * pageSize, totalRows);

    return (
        <div className="rounded-xl border border-white/10 bg-[#141414] overflow-hidden">

            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span>Tampilkan</span>
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            const newSize = Number(e.target.value);
                            setPageSize(newSize);
                            table.setPageSize(newSize);
                        }}
                        className="bg-[#1c1b1b] border border-white/10 rounded-md px-3 py-1.5 font-medium focus:outline-none"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                    <span>entri</span>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                        type="text"
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder={searchPlaceholder}
                        className="bg-[#1c1b1b] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-white/20 w-64"
                    />
                </div>
            </div>


            <div className="overflow-x-auto">
                <Table className="table-fixed w-full min-w-175">
                    <TableHeader className="bg-[#1c1b1b]">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="hover:bg-transparent border-b border-white/10">
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="font-semibold text-sm pl-6 py-4 text-gray-200 whitespace-nowrap"
                                        style={{ width: header.column.columnDef.size }}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="pl-6 py-4 text-gray-200 whitespace-nowrap"
                                            style={{ width: cell.column.columnDef.size }}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center text-muted-foreground py-8">
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between p-4 border-t border-white/10 text-sm text-gray-400">
                <span>
                    Menampilkan {from} sampai {to} dari {totalRows} entri
                </span>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft size={14} />
                        Sebelumnya
                    </button>

                    {Array.from({ length: table.getPageCount() }, (_, i) => i).map((pageIndex) => (
                        <button
                            key={pageIndex}
                            onClick={() => table.setPageIndex(pageIndex)}
                            className={`w-8 h-8 rounded-md font-medium transition-colors ${pageIndex === currentPage
                                ? 'bg-green-600 text-white'
                                : 'hover:bg-white/5 text-gray-400'
                                }`}
                        >
                            {pageIndex + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Selanjutnya
                        <ChevronRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataTable;