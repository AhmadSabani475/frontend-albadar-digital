import { useState } from "react";
import CreateUserDialog from "@/components/molecules/CreateUserDialog";
import UserTable from "@/components/organisms/UserTable";

const DataUsersPage = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Data User</h1>
                <CreateUserDialog onSuccess={() => setRefreshKey((prev) => prev + 1)} />
            </div>
            <UserTable key={refreshKey} />
        </div>
    )
}
export default DataUsersPage;