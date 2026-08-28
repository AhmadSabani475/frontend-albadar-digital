import CreateRekeningDialog from "@/components/molecules/CreateRekeningDialog";
import TableRekening from "@/components/organisms/Rekening/TableRekening";
import { useState } from "react";

const RekeningPage = () => {
    const [refreshKey] = useState(0);
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-3xl font-bold">Daftar Rekening Santri</h1>
                    <p className="text-[#c9c5c5] text-xs">Manage student savings, digital wallets, and transaction histories securely.</p>
                </div>
                <CreateRekeningDialog />
            </div>
            <TableRekening key={refreshKey} />
        </div>
    );
};
export default RekeningPage;