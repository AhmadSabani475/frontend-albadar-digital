import DeleteButton from "@/components/molecules/DeleteButton";
import { Button } from "@/components/ui/button";
import type { Santri } from "@/types/Santri";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil } from "lucide-react";
import { Link } from "react-router-dom";



const columns: ColumnDef<Santri>[] = [
    {
        accessorKey: "namaLengkap",
        header: "Nama Lengkap",
    },
    {
        accessorKey: "kamarId.namaKamar",
        header: "Kamar"
    },
    {
        accessorKey: "kamarId.asramaId.namaAsrama",
        header: "Asrama"
    },
    {
        id: "actions",
        header: "Aksi",
        cell: ({ row }) => (
            <div className="flex gap-2">
                <Link to={`/dashboard/santri/view/${row.original._id}`}>
                    <Button variant={"ghost"} size="icon" aria-label="Lihat detail santri">
                        <Eye className="h-4 w-4" />
                    </Button>
                </Link>

                <Button variant={"ghost"} size="icon">
                    <Pencil className="h-4 w-4" />
                </Button>
                <DeleteButton id={row.original._id} />
            </div>
        )
    }
]
export { columns };