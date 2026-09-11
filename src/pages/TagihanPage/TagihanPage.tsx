import TabsTagihan from "@/components/molecules/TabsTagihan";
import TableJenisTagihan from "./TagihanContent/JenisTagihan/TableJenisTagihan";
import { useState } from "react";
import TableTarifKhusus from "./TagihanContent/TarifKhusus/TableTarifKhusus";

const TagihanPage = () => {
    const [refreshKey] = useState(0);
    return (
        <div className="w-full flex flex-col gap-4">
            <TabsTagihan key={refreshKey} jenisTagihanContent={<TableJenisTagihan />}
                tarifKhususContent={<TableTarifKhusus />}
            />
        </div>
    );
}
export default TagihanPage;