import { useEffect, useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from "@tanstack/react-table";
import { columns } from "./columns";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "../ui/table";

import type { User } from "@/types/Users";
import { usersService } from "@/services/users.service";

const UserTable = () => {
    const [data, setData] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUsers = () => {
        setIsLoading(true);
        usersService.getAllUsers()
            .then((res) => setData(res.data))
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (isLoading) {
        return <p className="text-sm text-muted-foreground">Memuat data...</p>;
    }

    return (
        <Table>
            <TableHeader className="bg-green-400">
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <TableHead key={header.id}>
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
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={columns.length} className="text-center text-muted-foreground">
                            Belum ada data user
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default UserTable;