import { useState } from "react";
import KamarTable from "@/components/organisms/KamarOrg/KamarTable";
import CreateKamarDialog from "@/components/molecules/CreateKamarDialog";

const KamarPage = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Data Kamar</h1>

                <CreateKamarDialog onSuccess={() => setRefreshKey((prev) => prev + 1)} />
            </div>
            <KamarTable key={refreshKey} />
        </div>
    )
}
export default KamarPage;