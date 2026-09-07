import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface RingkasanItem {
    label: string;
    kategori: string; 
    nominal: number;
}

interface Props {
    items: RingkasanItem[];
    total: number;
    isPending: boolean;
    onSubmit: () => void;
    onReset: () => void;
}

const RingkasanPembayaranCard = ({ items, total, isPending, onSubmit, onReset }: Props) => {
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

                <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">TOTAL PEMBAYARAN</span>
                    <span className="text-green-500 text-xl font-bold">Rp {total.toLocaleString('id-ID')}</span>
                </div>

                <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={items.length === 0 || isPending}
                    onClick={onSubmit}
                >
                    <Printer className="w-4 h-4 mr-2" />
                    {isPending ? 'Memproses...' : 'Proses & Cetak Struk'}
                </Button>
                <Button variant="outline" className="w-full" onClick={onReset}>
                    Reset
                </Button>
            </CardContent>
        </Card>
    );
};

export default RingkasanPembayaranCard;