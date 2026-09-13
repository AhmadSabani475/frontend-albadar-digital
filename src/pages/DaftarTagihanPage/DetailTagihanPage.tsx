import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { tagihanService } from "@/services/tagihan.service";
import { pembayaranService } from "@/services/pembayaran.service";
import type { Tagihan } from "@/types/Tagihan";
import type { Pembayaran } from "@/types/Pembayaran";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FormField from "@/components/molecules/FormField";
import { Button } from "@/components/ui/button";
import { StepBackIcon } from "lucide-react";

const DetailTagihanPage = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tagihan, setTagihan] = useState<Tagihan | undefined>();
    const [riwayatPembayaran, setRiwayatPembayaran] = useState<Pembayaran[]>([]);

    const [nominalBayar, setNominalBayar] = useState<number | "">("");
    const [tanggalBayar, setTanggalBayar] = useState<string>(
        new Date().toISOString().split("T")[0]
    );
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const fetchData = async (tagihanId: string | undefined) => {
        if (!tagihanId) return;
        try {
            setIsLoading(true);
            const [resTagihan, resPembayaran] = await Promise.all([
                tagihanService.getTagihanById(tagihanId),
                pembayaranService.getAllPembayaran({ tagihanId }),
            ]);

            setTagihan(resTagihan.data);
            setRiwayatPembayaran(resPembayaran.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    const handleSubmitPembayaran = async (e: React.SubmitEvent) => {
        e.preventDefault();
        if (!id || !nominalBayar || Number(nominalBayar) <= 0) return;

        try {
            setIsSubmitting(true);
            await pembayaranService.createPembayaran({
                tagihanId: id,
                nominalBayar: Number(nominalBayar),
                tanggalBayar: new Date(tanggalBayar),
            });

            setNominalBayar("");
            await fetchData(id);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        fetchData(id);
    }, [id]);

    if (isLoading) {
        return <div className="p-4 text-center">Memuat data...</div>;
    }

    const santri = tagihan?.santriId;
    const totalNominal = tagihan?.nominalTagihan || 0;
    const totalDibayar = riwayatPembayaran.reduce(
        (sum, item) => sum + item.nominalBayar,
        0
    );

    const sisaTagihan = Math.max(0, totalNominal - totalDibayar);
    const isLunas = tagihan?.status === "lunas" || sisaTagihan === 0;
    const persentase =
        totalNominal > 0
            ? Math.min(100, Math.round((totalDibayar / totalNominal) * 100))
            : 0;

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <Link to='/dashboard/daftar-tagihan'>
                    <Button variant="outline" size="sm" className="w-fit">
                        <StepBackIcon className="w-4 h-4 mr-1" />
                        Kembali
                    </Button>
                </Link>
                <h2 className="text-2xl font-bold">{santri?.namaLengkap}</h2>
                <p className="text-xs font-light text-zinc-400">
                    {santri?.kamarId?.namaKamar} - {santri?.kamarId?.asramaId?.namaAsrama}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start w-full">
                <div className="lg:col-span-2 flex flex-col gap-5">
                    <Card className="w-full">
                        <CardHeader className="text-xl font-semibold border-b pb-4">
                            Informasi Tagihan
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-y-6 gap-x-4 pt-4">
                            <div>
                                <p className="text-xs text-zinc-400">Jenis Tagihan</p>
                                <p className="text-base font-semibold mt-1">
                                    {tagihan?.jenisTagihanId?.nama}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-zinc-400">Periode</p>
                                <p className="text-base font-semibold mt-1">
                                    {tagihan?.periode}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-zinc-400">Nominal Tagihan</p>
                                <p className="text-xl font-bold text-emerald-400 mt-1">
                                    Rp {tagihan?.nominalTagihan?.toLocaleString("id-ID")}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-zinc-400">Jatuh Tempo</p>
                                <p className="text-base font-semibold text-rose-300 mt-1">
                                    {tagihan?.jatuhTempo
                                        ? new Date(tagihan.jatuhTempo).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })
                                        : "-"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground mb-1.5">Status</p>
                                <Badge
                                    className={
                                        tagihan?.status === "belum_bayar"
                                            ? "bg-red-500/20 text-red-300 border-0 rounded-full px-3"
                                            : tagihan?.status === "sebagian"
                                                ? "bg-amber-500/20 text-amber-300 border-0 rounded-full px-3"
                                                : "bg-emerald-500/20 text-emerald-300 border-0 rounded-full px-3"
                                    }
                                >
                                    {tagihan?.status === "belum_bayar"
                                        ? "Belum Bayar"
                                        : tagihan?.status === "sebagian"
                                            ? "Sebagian/Cicilan"
                                            : "Lunas"}
                                </Badge>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground mb-1.5">Sumber Nominal</p>
                                <Badge className="bg-zinc-800 text-zinc-300 border-0 rounded-full px-3">
                                    {tagihan?.sumberNominal === "default" ? "Default" : "Khusus"}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="text-xl font-semibold border-b pb-4">
                            Riwayat Pembayaran
                        </CardHeader>
                        <CardContent className="pt-4">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-15">No</TableHead>
                                        <TableHead>Tanggal Bayar</TableHead>
                                        <TableHead>Nominal</TableHead>
                                        <TableHead>Dicatat Oleh</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {riwayatPembayaran.length > 0 ? (
                                        riwayatPembayaran.map((item, index) => (
                                            <TableRow key={item._id || index}>
                                                <TableCell className="font-medium">{index + 1}</TableCell>
                                                <TableCell>
                                                    {new Date(item.tanggalBayar).toLocaleDateString("id-ID")}
                                                </TableCell>
                                                <TableCell>
                                                    Rp {item.nominalBayar?.toLocaleString("id-ID")}
                                                </TableCell>
                                                <TableCell>
                                                    {item.dicatatOleh?.santriId?.namaLengkap ||
                                                        item.dicatatOleh?.username ||
                                                        "-"}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center text-gray-400">
                                                Belum ada riwayat pembayaran.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={2} className="font-bold text-center">
                                            Total Terbayar
                                        </TableCell>
                                        <TableCell colSpan={2} className="font-bold text-primary">
                                            Rp {totalDibayar.toLocaleString("id-ID")}
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1 ">
                    <Card className="w-full">
                        <CardHeader className="text-xl font-bold pb-2 border-b">
                            Ringkasan Pelunasan
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4 pt-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Nominal Tagihan</span>
                                <span className="font-semibold">
                                    Rp {totalNominal.toLocaleString("id-ID")}
                                </span>
                            </div>

                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Sudah Dibayar</span>
                                <span className="font-semibold text-emerald-400">
                                    Rp {totalDibayar.toLocaleString("id-ID")}
                                </span>
                            </div>

                            <div className="pt-2 border-t border-zinc-800">
                                <p className="text-xs text-muted-foreground">Sisa Tagihan</p>
                                <p className="text-3xl font-bold text-rose-200 mt-1">
                                    Rp {sisaTagihan.toLocaleString("id-ID")}
                                </p>
                            </div>

                            <div className="flex flex-col gap-1.5 pt-1">
                                <div className="flex justify-between text-xs text-muted-foreground font-medium">
                                    <span>Progress</span>
                                    <span>{persentase}%</span>
                                </div>
                                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                                    <div
                                        className="bg-primary h-full rounded-full transition-all duration-300"
                                        style={{ width: `${persentase}%` }}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full mt-5">
                        <CardHeader className="text-xl font-bold pb-2 border-b">
                            Catat Pembayaran
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4 pt-4">
                            {isLunas ? (
                                <p className="text-sm text-emerald-400 text-center py-2">
                                    Tagihan ini sudah lunas.
                                </p>
                            ) : (
                                <form onSubmit={handleSubmitPembayaran} className="flex flex-col gap-4">
                                    <FormField
                                        label="Nominal Pembayaran (Rp)"
                                        name="nominalBayar"
                                        placeholder="Contoh: 200000"
                                        type="number"
                                        value={nominalBayar}
                                        onChange={(e) => setNominalBayar(e.target.value ? Number(e.target.value) : "")}
                                    />

                                    <FormField
                                        label="Tanggal Bayar"
                                        name="tanggalBayar"
                                        type="date"
                                        value={tanggalBayar}
                                        onChange={(e) => setTanggalBayar(e.target.value)}
                                    />

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting || !nominalBayar}
                                        className="w-full mt-2"
                                    >
                                        {isSubmitting ? "Menyimpan..." : "Simpan Pembayaran"}
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DetailTagihanPage;