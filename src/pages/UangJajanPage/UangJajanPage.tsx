import { uangJajanService } from "@/services/uangjajan.service";
import { Calendar, CheckCircle, CircleEllipsis } from "lucide-react";
import { useEffect, useState } from "react";
import type { RowSelectionState } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { getUangJajanColumns, type UangJajanStatus } from "@/components/organisms/UangJajan/columns";
import DataTable from "@/components/organisms/DataTable";
import { Card, CardContent } from "@/components/ui/card";

const UangJajanPage = () => {
    const [data, setData] = useState<UangJajanStatus[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const result = await uangJajanService.getStatusHariIni();
            setData(result.data);
            setRowSelection({});
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleBagikan = async () => {
        const selectedIndices = Object.keys(rowSelection).map(Number);
        const selectedRekeningIds = selectedIndices.map(index => data[index].rekeningId);
        if (selectedRekeningIds.length === 0) return;
        try {
            setIsSubmitting(true);
            await uangJajanService.bagikanUangJajan(selectedRekeningIds);
            await fetchData();
        } catch (error) {
            console.error("Gagal membagikan uang jajan:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const columns = getUangJajanColumns();
    const hasSelection = Object.keys(rowSelection).length > 0;

    const sudahDiambil = data.filter((item) => item.sudahDiambil);
    const belumDiambil = data.filter((item) => !item.sudahDiambil)

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1.5">
                    <div className="text-muted-foreground text-xs flex gap-2 items-center">
                        <Calendar className="h-4 w-4" />
                        {new Date().toDateString()}
                    </div>
                </div>

                <Button
                    onClick={handleBagikan}
                    disabled={!hasSelection || isSubmitting}
                    className="cursor-pointer"
                >
                    {isSubmitting ? "Memproses..." : `Bagikan (${Object.keys(rowSelection).length})`}
                </Button>
            </div>
            <div className="flex gap-4 w-full">
                <Card className="w-full">
                    <CardContent className="flex justify-between items-center px-5 py-4">
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-medium text-muted-foreground">Sudah Diambil</p>
                            <span className="text-3xl text-primary font-bold">{sudahDiambil.length}</span>
                        </div>
                        <CheckCircle className="w-8 h-8 text-muted-foreground" />
                    </CardContent>
                </Card>

                <Card className="w-full">
                    <CardContent className="flex justify-between items-center px-5 py-4">
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-medium text-muted-foreground">Belum Diambil</p>
                            <span className="text-3xl text-destructive font-bold">{belumDiambil.length}</span>
                        </div>
                        <CircleEllipsis className="w-8 h-8 text-muted-foreground" />
                    </CardContent>
                </Card>
            </div>

            <DataTable
                columns={columns}
                data={data}
                emptyMessage="Daftar Rekening Belum Ada"
                isLoading={isLoading}
                searchPlaceholder="Cari Nama Santri..."
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
                enableRowSelection={(row) => !row.original.sudahDiambil && row.original.saldoCukup}
            />
        </div>
    );
};

export default UangJajanPage;