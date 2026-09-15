import CreateMutasiDialog from "@/components/organisms/Rekening/CreateMutasiDialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mutasiService } from "@/services/mutasi.service";
import { rekeningService } from "@/services/rekening.service";
import type { MutasiRekening } from "@/types/Mutasi";
import type { Rekening } from "@/types/Rekening";
import { ArrowDown, ArrowLeft, ArrowUp, IdCardIcon } from "lucide-react";
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
        return (
            <div className="w-full flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-8 w-48" />
                    </div>
                    <Skeleton className="h-10 w-32 rounded-md" />
                </div>
                <Card className="w-full flex flex-col sm:flex-row p-6 justify-between items-center gap-4">
                    <div className="flex flex-col gap-2 w-full max-w-sm">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                    <div className="flex flex-col gap-2 items-start sm:items-end w-full max-w-[160px]">
                        <Skeleton className="h-3 w-28" />
                        <Skeleton className="h-8 w-36" />
                    </div>
                </Card>
                <Card className="w-full p-6 space-y-4">
                    <Skeleton className="h-6 w-40" />
                    <div className="space-y-3">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full" />
                        ))}
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex flex-col gap-1">
                    <div className="flex gap-2 items-center">
                        <ArrowLeft className="text-primary h-4 w-4" />
                        <Link to='/dashboard/rekening'>
                            <span className="text-primary text-xs font-medium hover:underline">
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
            <Card className="w-full flex flex-col sm:flex-row p-6 justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">{dataRekening?.santriId?.namaLengkap ?? '-'}</h3>
                    <div className="flex gap-2">
                        <div className="flex gap-2 items-center text-muted-foreground text-sm">
                            <IdCardIcon className="h-4 w-4" />
                            <span>
                                {dataRekening?.santriId?.kamarId
                                    ? `Kamar ${dataRekening.santriId.kamarId.namaKamar ?? '-'} - Albadar ${dataRekening.santriId.kamarId.asramaId?.namaAsrama ?? '-'}`
                                    : 'Belum ada Kamar/Asrama'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-1 items-start sm:items-end">
                    <span className="text-muted-foreground text-xs">Total Saldo Saat ini</span>
                    <h3
                        className="text-primary text-2xl font-bold"
                    >{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(dataRekening?.saldo ?? 0)}</h3>
                </div>
            </Card>

            <Card className="w-full">
                <CardHeader className="text-xl font-semibold text-foreground">
                    Mutasi Rekening
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-border hover:bg-transparent">
                                <TableHead className="w-15 text-center text-muted-foreground font-medium">No</TableHead>
                                <TableHead className="w-45 text-muted-foreground font-medium">Tanggal</TableHead>
                                <TableHead className="w-37.5 text-muted-foreground text-center font-medium">Jenis</TableHead>
                                <TableHead className="w-50 text-right text-muted-foreground font-medium pr-8">Nominal</TableHead>
                                <TableHead className="text-muted-foreground font-medium">Keterangan</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {riwayatMutasi.length > 0 ? (
                                riwayatMutasi.map((item, index) => (
                                    <TableRow key={item._id || index} className="border-border hover:bg-muted/40 transition-colors">
                                        <TableCell className="text-center text-foreground font-medium py-4">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="text-foreground">
                                            {new Date(item.createdAt).toLocaleDateString("id-ID", {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </TableCell>
                                        <TableCell>
                                            {item.jenis === 'setor' ? (
                                                <Badge className="inline-flex w-[90px] justify-center items-center gap-1.5 rounded-md bg-emerald-500/15 px-3 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 border-0">
                                                    <ArrowDown className="h-4 w-4" />
                                                    Masuk
                                                </Badge>
                                            ) : (
                                                <Badge className=" inline-flex w-[90px] justify-center items-center gap-1.5 rounded-md bg-rose-500/15 px-3 py-1.5 text-sm font-medium text-rose-600 dark:text-rose-400 border-0">
                                                    <ArrowUp className="h-4 w-4" />
                                                    Keluar
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right text-foreground font-medium pr-8">
                                            {new Intl.NumberFormat('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR',
                                                minimumFractionDigits: 0
                                            }).format(item.nominal || 0)}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {item.keterangan || "-"}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow className="border-border">
                                    <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
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