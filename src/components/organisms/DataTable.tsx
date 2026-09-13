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
import { Skeleton } from '../ui/skeleton';
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
    meta?: Record<string, unknown>;
}

const DataTable = <T,>(props: DataTableProps<T>) => {
    const {
        data,
        columns,
        meta,
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
        meta,
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

    const totalRows = table.getFilteredRowModel().rows.length;
    const currentPage = table.getState().pagination.pageIndex;
    const from = totalRows === 0 ? 0 : currentPage * pageSize + 1;
    const to = Math.min((currentPage + 1) * pageSize, totalRows);

    return (
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-xs">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Tampilkan</span>
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            const newSize = Number(e.target.value);
                            setPageSize(newSize);
                            table.setPageSize(newSize);
                        }}
                        className="bg-background border border-border text-foreground rounded-md px-3 py-1.5 font-medium focus:outline-none focus:ring-1 focus:ring-ring"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                    <span>entri</span>
                </div>

                <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <input
                        type="text"
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder={searchPlaceholder}
                        className="bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring w-full sm:w-64"
                    />
                </div>
            </div>


            <div className="overflow-x-auto">
                <Table className="table-fixed w-full">
                    <TableHeader className="bg-muted/50 border-b border-border">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="hover:bg-transparent border-b border-border">
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="font-semibold text-sm px-6 py-3.5 text-foreground whitespace-nowrap"
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
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, rIdx) => (
                                <TableRow key={rIdx} className="border-b border-border">
                                    {columns.map((_, cIdx) => (
                                        <TableCell key={cIdx} className="px-6 py-3.5">
                                            <Skeleton className="h-5 w-full max-w-[140px] rounded-md" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} className="border-b border-border hover:bg-muted/40 transition-colors">
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="px-6 py-3.5 text-foreground whitespace-nowrap"
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

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-t border-border text-sm text-muted-foreground">
                <span>
                    Menampilkan {from} sampai {to} dari {totalRows} entri
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft size={14} />
                        Sebelumnya
                    </button>

                    {Array.from({ length: table.getPageCount() }, (_, i) => i).map((pageIndex) => (
                        <button
                            key={pageIndex}
                            onClick={() => table.setPageIndex(pageIndex)}
                            className={`w-8 h-8 rounded-md font-medium transition-colors ${pageIndex === currentPage
                                ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {pageIndex + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
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