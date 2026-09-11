import SantriTable from '@/components/organisms/SantriTable/SantriTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SantriPage = () => {
    const [refreshKey] = useState(0);

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex justify-end">
                <Link to="/dashboard/santri/add">
                    <Button className="flex items-center gap-2 cursor-pointer">
                        <Plus className="w-4 h-4" />
                        Tambah Santri
                    </Button>
                </Link>
            </div>
            <SantriTable key={refreshKey} />
        </div>
    );
};
export default SantriPage;