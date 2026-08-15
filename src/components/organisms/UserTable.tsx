import { useEffect, useState } from "react";
import { getColumns } from "./columns";
import type { User } from "@/types/Users";
import { usersService } from "@/services/users.service";
import DataTable from "./DataTable";
import StatusAlert from "../molecules/StatusAlert";

const UserTable = () => {
    const [data, setData] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [alert, setAlert] = useState<{
        variant: "success" | "error" | "info" | "warning";
        title: string;
        description?: string;
    } | null>(null);


    const handleDelete = async (id: string) => {
        try {
            setIsLoading(true);
            await usersService.deleteUserById(id);
            await fetchUsers();
            setAlert({
                variant: 'success',
                title: "User berhasil dihapus",
                description: "Data user telah dihapus dari sistem.",
            })
        } catch (error) {
            setAlert({
                variant: "error",
                title: "Gagal menghapus user",
                description: "Terjadi kesalahan, coba lagi.",
            });
        } finally {
            setIsLoading(false)
        }
    };



    const fetchUsers = () => {
        setIsLoading(true);
        usersService.getAllUsers()
            .then((res) => setData(res.data))
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(null), 3000)
            return () => clearTimeout(timer)
        }
    }, [alert])

    const columns = getColumns({ onDelete: handleDelete })

    return (
        <div>
            <DataTable
                data={data}
                columns={columns}
                isLoading={isLoading}
                searchPlaceholder="Cari user..."
                emptyMessage="Belum ada data user" />

            {alert && (
                <div className="fixed top-4 right-4 z-50 w-full max-w-sm">
                    <StatusAlert
                        variant={alert.variant}
                        title={alert.title}
                        description={alert.description}
                    />
                </div>
            )}
        </div>
    )

}

export default UserTable;