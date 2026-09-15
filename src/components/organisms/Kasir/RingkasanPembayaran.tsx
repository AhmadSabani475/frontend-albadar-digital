import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
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
    metodePembayaran: 'cash' | 'transfer';           // â† pastikan ada
    onMetodePembayaranChange: (metode: 'cash' | 'transfer') => void;  // â† pastikan ada
    onSubmit: () => void;
    onReset: () => void;
}

const RingkasanPembayaranCard = ({ items, total, isPending, onSubmit, onReset, metodePembayaran, onMetodePembayaranChange }: Props) => {
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
                                    <p>{item.label}</p>
                                    <p className="text-xs text-muted-foreground">{item.kategori}</p>
                                </div>
                                <p>{item.nominal.toLocaleString('id-ID')}</p>
                            </div>
                        ))}
                    </div>
                )}

                <div className="border-t border-border pt-3 flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">TOTAL PEMBAYARAN</span>
                    <span className="text-primary text-xl font-bold">Rp {total.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Metode Pembayaran</Label>
                    <RadioGroup value={metodePembayaran} onValueChange={onMetodePembayaranChange} className="w-fit flex ">
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="cash" id="cash" />
                            <Label htmlFor="cash">Cash</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="transfer" id="transfer" />
                            <Label htmlFor="transfer">Transfer</Label>
                        </div>
                    </RadioGroup>
                </div>

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
