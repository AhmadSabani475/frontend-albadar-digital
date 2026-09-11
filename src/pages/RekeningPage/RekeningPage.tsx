import CreateRekeningDialog from "@/components/molecules/CreateRekeningDialog";
import TableRekening from "@/components/organisms/Rekening/TableRekening";
import { useState } from "react";

const RekeningPage = () => {
    const [refreshKey] = useState(0);
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex justify-end">
                <CreateRekeningDialog />
            </div>
            <TableRekening key={refreshKey} />
        </div>
    );
};
export default RekeningPage;