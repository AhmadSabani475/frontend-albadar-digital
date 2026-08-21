import TabsTagihan from "@/components/molecules/TabsTagihan";
import TableJenisTagihan from "./TagihanContent/JenisTagihan/TableJenisTagihan";
import { useState } from "react";
import TableTarifKhusus from "./TagihanContent/TarifKhusus/TableTarifKhusus";

const TagihanPage = () => {
    const [refreshKey] = useState(0);
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-3xl font-bold">Management Tagihan</h1>
                    <p className="text-[#c9c5c5] text-xs">Kelola Tagihan</p>
                </div>
            </div>
            <TabsTagihan key={refreshKey} jenisTagihanContent={<TableJenisTagihan />}
                tarifKhususContent={<TableTarifKhusus />}
            />
        </div>
    );
}
export default TagihanPage;