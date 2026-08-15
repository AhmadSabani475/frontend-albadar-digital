import SantriTable from '@/components/organisms/SantriTable/SantriTable';
import { Button } from '@base-ui/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SantriPage = () => {
    const [refreshKey] = useState(0);

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Data Santri</h1>
                <Link to="/dashboard/santri/add">
                    <Button className="bg-green-400 text-black flex gap-2 py-2 px-4 
                    cursor-pointer hover:text-white 
                    rounded-md">
                        <Plus />
                        Tambah Santri
                    </Button>
                </Link>

            </div>
            <SantriTable key={refreshKey} />
        </div>
    );
};
export default SantriPage;