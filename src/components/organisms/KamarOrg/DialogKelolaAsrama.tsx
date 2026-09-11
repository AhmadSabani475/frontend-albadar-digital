import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { asramaService } from "@/services/asrama.service";
import type { Asrama } from "@/types/Kamar";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import ConfirmDeleteButton from "@/components/molecules/ConfirmDeleteButton";


const DialogKelolaAsrama = () => {
    const [dataAsrama, setDataAsrama] = useState<Asrama[] | null>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const [namaAsrama, setNamaAsrama] = useState<string>('');
    const [keterangan, setKeterangan] = useState<string>('');

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const result = await asramaService.getAllAsrama();
            setDataAsrama(result.data ?? []);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    const resetForm = () => {
        setNamaAsrama("");
        setKeterangan("");
    };
    const handleCreateAsrama = async () => {
        if (!namaAsrama.trim()) return;
        try {
            setIsSubmitting(true);
            await asramaService.createAsrama({ namaAsrama, keterangan })
            resetForm();
            await fetchData();
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleDeleteAsrama = async (id: string) => {
        try {
            await asramaService.deleteAsrama(id);
            await fetchData();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (open) fetchData();
    }, [open]);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button variant="outline">Kelola Asrama</Button>} />
            <DialogContent className="sm:max-w-sm">
                <DialogHeader className="mb-5">
                    <DialogTitle>Kelola Asrama</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                    {isLoading && (
                        <p className="text-sm text-muted-foreground">Memuat data...</p>
                    )}

                    {!isLoading && dataAsrama?.length === 0 && (
                        <p className="text-sm text-muted-foreground">Belum ada data asrama.</p>
                    )}
                    {dataAsrama?.map((asrama) => (
                        <div
                            key={asrama._id}
                            className="flex items-center justify-between border rounded-md px-3 py-2"
                        >
                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-semibold">{asrama.namaAsrama}</span>
                                <p className="text-xs font-light">{asrama.keterangan}</p>
                            </div>

                            <div className="flex gap-1">
                                <Button
                                    size="icon"
                                    variant="ghost"
                                >
                                    <Pencil className="w-4 h-4" />
                                </Button>
                                <ConfirmDeleteButton
                                    trigger={
                                        <Button size="icon" variant="ghost">
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </Button>
                                    }
                                    title={`Hapus asrama "${asrama.namaAsrama}"?`}
                                    onConfirm={() => handleDeleteAsrama(asrama._id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-2 mt-4">
                    <Label htmlFor="nama-asrama">
                        Tambah Asrama
                    </Label>
                    <div className="flex gap-3">
                        <Input
                            id="nama-asrama"
                            placeholder="Nama asrama"
                            value={namaAsrama}
                            onChange={(e) => setNamaAsrama(e.target.value)}
                            required
                        />
                        <Input
                            id="keterangan"
                            placeholder="Keterangan"
                            value={keterangan}
                            onChange={(e) => setKeterangan(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter className="mt-4">
                    <DialogClose render={<Button variant="outline">Tutup</Button>} />
                    <Button type="button" onClick={handleCreateAsrama} disabled={isSubmitting || !namaAsrama.trim()}>
                        {isSubmitting ? "Menyimpan..." : "Simpan"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}
export default DialogKelolaAsrama;