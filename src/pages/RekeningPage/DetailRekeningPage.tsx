import CreateMutasiDialog from "@/components/molecules/CreateMutasiDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mutasiService } from "@/services/mutasi.service";
import { rekeningService } from "@/services/rekening.service";
import type { MutasiRekening } from "@/types/Mutasi";
import type { Rekening } from "@/types/Rekening";
import { ArrowDown, ArrowLeft, ArrowUp, IdCardIcon, StepBack } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const DetailRekeningPage = () => {
    const { id } = useParams();
    const [dataRekening, setDataRekening] = useState<Rekening | undefined>();
    const [riwayatMutasi, setRiwayatMutasi] = useState<MutasiRekening[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fetchRekeningData = async (id: string | undefined) => {
        try {
            setIsLoading(true);
            const [resRekening, resMutasi] = await Promise.all([
                rekeningService.getRekeningById(id),
                mutasiService.getMutasiByRekeningId(id)
            ])
            setDataRekening(resRekening.data);
            setRiwayatMutasi(resMutasi.data || []);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchRekeningData(id)
    }, [id])

    if (isLoading) {
        return <div className="p-4 text-center">Memuat data...</div>;
    }

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex justify-between px-2 items-center">
                <div className="flex flex-col gap-1 ">
                    <div className="flex gap-2 items-center ">
                        <ArrowLeft className="text-green-400 h-4 w-4" />
                        <Link to='/dashboard/rekening'>
                            <span className="text-green-400 text-xs">
                                Kembali Ke Daftar Rekening</span>
                        </Link>
                    </div>
                    <div className="flex gap-2 items-center">
                        <h2 className="text-2xl font-bold">Mutasi Rekening</h2>
                        <Badge>{dataRekening?.jenisRekening === 'uang_jajan' ? 'Uang Jajan' : 'Tabungan Ziarah'}</Badge>
                    </div>
                </div>
                <CreateMutasiDialog rekeningId={id}
                    onSuccess={() => fetchRekeningData(id)} />
            </div>
            <Card className="w-full flex-row px-4 justify-between items-center">
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">{dataRekening?.santriId.namaLengkap}</h3>
                    <div className="flex gap-2">
                        <div className="flex gap-2 items-center">
                            <IdCardIcon className="h-4 w-4" />
                            <span>Kamar {dataRekening?.santriId.kamarId.namaKamar} - Albadar {dataRekening?.santriId.kamarId.asramaId.namaAsrama}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <span className="text-gray-400 text-xs">Total Saldo Saat ini</span>
                    <h3
                        className="text-green-400 text-2xl font-semibold"
                    >{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(dataRekening?.saldo ?? 0)}</h3>
                </div>
            </Card>

            <Card className="bg-[#111111] border-gray-800">
                <CardHeader className="text-xl font-semibold text-white">
                    Mutasi Rekening
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-gray-800 hover:bg-transparent">
                                <TableHead className="w-15 text-center text-gray-400 font-medium">No</TableHead>
                                <TableHead className="w-45 text-gray-400 font-medium">Tanggal</TableHead>
                                <TableHead className="w-37.5 text-gray-400 text-center font-medium">Jenis</TableHead>
                                <TableHead className="w-50 text-right text-gray-400 font-medium pr-8">Nominal</TableHead>
                                <TableHead className="text-gray-400 font-medium">Keterangan</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {riwayatMutasi.length > 0 ? (
                                riwayatMutasi.map((item, index) => (
                                    <TableRow key={item._id || index} className="border-gray-800/50 hover:bg-gray-800/30">
                                        <TableCell className="text-center text-gray-300 font-medium py-4">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="text-gray-300">
                                            {new Date(item.createdAt).toLocaleDateString("id-ID", {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </TableCell>
                                        <TableCell>
                                            {item.jenis === 'setor' ? (
                                                <Badge className="inline-flex w-[90px] justify-center items-center gap-1.5 rounded-md bg-emerald-500/15 px-3 py-1.5 text-sm font-medium text-emerald-500 border-0">
                                                    <ArrowDown className="h-4 w-4" />
                                                    Masuk
                                                </Badge>
                                            ) : (
                                                <Badge className=" inline-flex w-[90px] justify-center items-center gap-1.5 rounded-md bg-rose-500/15 px-3 py-1.5 text-sm font-medium text-rose-500 border-0">
                                                    <ArrowUp className="h-4 w-4" />
                                                    Keluar
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right text-gray-200 font-medium pr-8">
                                            {new Intl.NumberFormat('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR',
                                                minimumFractionDigits: 0
                                            }).format(item.nominal || 0)}
                                        </TableCell>
                                        <TableCell className="text-gray-300">
                                            {item.keterangan || "-"}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow className="border-gray-800">
                                    <TableCell colSpan={5} className="h-32 text-center text-gray-500">
                                        Belum ada Mutasi Rekening.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
    )

}
export default DetailRekeningPage;