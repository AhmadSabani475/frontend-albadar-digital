import { useState } from 'react';
import KamarTable from '@/components/organisms/KamarOrg/KamarTable';
import CreateKamarDialog from '@/components/molecules/CreateKamarDialog';
import DialogKelolaAsrama from '@/components/organisms/KamarOrg/DialogKelolaAsrama';

const KamarPage = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex justify-end gap-3">
                <DialogKelolaAsrama />
                <CreateKamarDialog onSuccess={() => setRefreshKey((prev) => prev + 1)} />
            </div>
            <KamarTable key={refreshKey} />
        </div>
    );
};
export default KamarPage;