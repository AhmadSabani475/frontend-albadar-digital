import type { ColumnDef } from "@tanstack/react-table";
import type { User } from "@/types/Users";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
            <span className="capitalize">{row.original.role}</span>
        ),
    },
    {
        accessorKey: "is_active",
        header: "Status",
        cell: ({ row }) => (
            <Badge variant={row.original.is_active ? "default" : "secondary"}>
                {row.original.is_active ? "Aktif" : "Belum Aktif"}
            </Badge>
        ),
    },
    {
        id: "actions",
        header: "Aksi",
        cell: ({ row }) => (
            <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => console.log("Edit:", row.original)}>
                    <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => console.log("Delete:", row.original)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
            </div>
        ),
    },
];