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
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-3xl font-bold">Data Santri</h1>
                    <p className="text-[#c9c5c5] text-xs">Kelola data Santri</p>
                </div>
                <Link to="/dashboard/santri/add">
                    <Button className="text-md bg-green-400 text-black flex gap-2 px-4 py-2
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