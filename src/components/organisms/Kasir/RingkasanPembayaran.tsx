import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, Upload } from "lucide-react";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";

interface RingkasanItem {
    label: string;
    kategori: string;
    nominal: number;
}

interface Props {
    items: RingkasanItem[];
    total: number;
    isPending: boolean;
    metodePembayaran: 'cash' | 'transfer';
    onMetodePembayaranChange: (metode: 'cash' | 'transfer') => void;
    buktiTransferFile?: File | null;
    onBuktiTransferFileChange?: (file: File | null) => void;
    onSubmit: () => void;
    onReset: () => void;
}

const RingkasanPembayaranCard = ({
    items,
    total,
    isPending,
    onSubmit,
    onReset,
    metodePembayaran,
    onMetodePembayaranChange,
    buktiTransferFile,
    onBuktiTransferFileChange,
}: Props) => {
    return (
        <Card>
            <CardHeader>
                <h2 className="font-semibold">Ringkasan Pembayaran</h2>
            </CardHeader>
            <CardContent className="space-y-4">
                {items.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Belum ada item dipilih</p>
                ) : (
                    <div className="space-y-3">
                        {items.map((item, i) => (
                            <div key={i} className="flex justify-between text-sm">
                                <div>
                                    <p className="font-medium">{item.label}</p>
                                    <p className="text-xs text-muted-foreground">{item.kategori}</p>
                                </div>
                                <p className="font-mono">Rp {item.nominal.toLocaleString('id-ID')}</p>
                            </div>
                        ))}
                    </div>
                )}

                <div className="border-t border-border pt-3 flex justify-between items-center">
                    <span className="text-sm text-muted-foreground font-semibold">TOTAL PEMBAYARAN</span>
                    <span className="text-primary text-xl font-bold">Rp {total.toLocaleString('id-ID')}</span>
                </div>

                <div className="flex flex-col gap-2">
                    <Label className="font-semibold">Metode Pembayaran</Label>
                    <RadioGroup value={metodePembayaran} onValueChange={(val) => onMetodePembayaranChange(val as 'cash' | 'transfer')} className="w-fit flex gap-6">
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="cash" id="cash" />
                            <Label htmlFor="cash" className="cursor-pointer">Cash</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="transfer" id="transfer" />
                            <Label htmlFor="transfer" className="cursor-pointer">Transfer</Label>
                        </div>
                    </RadioGroup>
                </div>

                {/* Optional Upload Bukti Transfer when Transfer is selected */}
                {metodePembayaran === 'transfer' && (
                    <div className="flex flex-col gap-2 p-3 rounded-xl bg-muted/40 border border-border/70 text-xs">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="bukti-transfer-input" className="text-xs font-semibold flex items-center gap-1.5">
                                <Upload className="w-3.5 h-3.5 text-primary" />
                                Bukti Transfer (Opsional)
                            </Label>
                        </div>
                        <input
                            id="bukti-transfer-input"
                            type="file"
                            accept="image/jpeg,image/png,image/webp,application/pdf"
                            onChange={(e) => onBuktiTransferFileChange?.(e.target.files?.[0] ?? null)}
                            className="text-xs cursor-pointer file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                        />
                        {buktiTransferFile && (
                            <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                                ✓ File dipilih: {buktiTransferFile.name}
                            </span>
                        )}
                        <span className="text-[11px] text-muted-foreground italic">
                            Bisa diunggah sekarang atau belakangan di Riwayat Transaksi.
                        </span>
                    </div>
                )}

                <Button
                    className="w-full cursor-pointer"
                    disabled={items.length === 0 || isPending}
                    onClick={onSubmit}
                >
                    <Printer className="w-4 h-4 mr-2" />
                    {isPending ? 'Memproses...' : 'Proses & Cetak Struk'}
                </Button>
                <Button variant="outline" className="w-full cursor-pointer" onClick={onReset}>
                    Reset
                </Button>
            </CardContent>
        </Card>
    );
};

export default RingkasanPembayaranCard;
