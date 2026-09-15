import { useState } from 'react';
import CreateUserDialog from '@/components/organisms/Users/CreateUserDialog';
import UserTable from '@/components/organisms/Users/UserTable';

const DataUsersPage = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex justify-end">
                <CreateUserDialog onSuccess={() => setRefreshKey((prev) => prev + 1)} />
            </div>
            <UserTable key={refreshKey} />
        </div>
    );
};
export default DataUsersPage;