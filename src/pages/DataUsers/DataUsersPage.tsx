import { useState } from "react";
import CreateUserDialog from "@/components/molecules/CreateUserDialog";
import UserTable from "@/components/organisms/UserTable";

const DataUsersPage = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-3xl font-bold">Data User</h1>
                    <p className="text-[#c9c5c5] text-xs">Kelola data Pengguna</p>
                </div>
                <CreateUserDialog onSuccess={() => setRefreshKey((prev) => prev + 1)} />
            </div>
            <UserTable key={refreshKey} />
        </div>
    )
}
export default DataUsersPage;