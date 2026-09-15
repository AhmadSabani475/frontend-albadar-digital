import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { createPortal } from "react-dom";
import type { Kwitansi } from "@/types/Kwitansi";
import type { Santri } from "@/types/Santri";

interface Props {
    kwitansi: Kwitansi | null;
    santri?: Santri;
    onClose: () => void;
}

const labelJenisRekening: Record<string, string> = {
    uang_jajan: 'Uang Jajan',
    tabungan_ziarah: 'Ziarah',
};

const StrukKwitansiDialog = ({ kwitansi, santri,onClose }: Props) => {
    if (!kwitansi) return null;


    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <Dialog open={!!kwitansi} onOpenChange={(open) => !open && onClose()}>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Struk Pembayaran</DialogTitle>
                    </DialogHeader>

                    <div className="text-sm space-y-3">
                        <div className="text-center border-b border-dashed border-border pb-3">
                            <p className="font-bold">Al-Badar Digital Portal</p>
                            <p className="text-xs text-muted-foreground">{kwitansi.nomorKwitansi}</p>
                            <p className="text-xs text-muted-foreground">
                                {new Date(kwitansi.createdAt).toLocaleString('id-ID')}
                            </p>
                        </div>

                        <div className="text-xs">
                            <p>Santri: <span className="font-medium">{santri?.namaLengkap ?? '-'}</span></p>
                            <p className="text-muted-foreground">NIS: {santri?.nis ?? '-'}</p>
                            <p className="text-muted-foreground">Metode: <span className="font-medium capitalize text-foreground">{kwitansi.metodePembayaran ?? 'cash'}</span></p>
                        </div>

                        <div className="border-t border-dashed border-border pt-3 space-y-2">
                            {kwitansi.items.map((item, i) => {
                                const showKeterangan = Boolean(
                                    item.keterangan &&
                                    !item.label.toLowerCase().includes(item.keterangan.toLowerCase().replace('periode:', '').trim())
                                );
                                return (
                                    <div key={i} className="flex justify-between items-start">
                                        <div className="flex flex-col">
                                            <span className="font-medium">{item.label}</span>
                                            {showKeterangan && (
                                                <span className="text-[11px] text-muted-foreground">
                                                    {item.keterangan}
                                                </span>
                                            )}
                                        </div>
                                        <span className="font-mono">Rp {item.nominal.toLocaleString('id-ID')}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="border-t border-dashed border-border pt-3 flex justify-between font-bold">
                            <span>Total</span>
                            <span>Rp {kwitansi.totalNominal.toLocaleString('id-ID')}</span>
                        </div>

                        <div className="border-t border-dashed border-border pt-3 space-y-1">
                            <p className="text-xs text-muted-foreground mb-1">Saldo Akhir:</p>
                            {kwitansi.saldoSnapshot.map((s, i) => (
                                <div key={i} className="flex justify-between text-xs">
                                    <span>{labelJenisRekening[s.jenisRekening] ?? s.jenisRekening}</span>
                                    <span>Rp {s.saldo.toLocaleString('id-ID')}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <DialogFooter className="print:hidden">
                        <Button variant="outline" onClick={onClose}>Tutup</Button>
                        <Button onClick={handlePrint}>
                            <Printer className="w-4 h-4 mr-2" />
                            Cetak
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* ── Area cetak: di-render langsung ke body, bypass Dialog portal ── */}
            {createPortal(
                <div
                    id="struk-print-area"
                    style={{
                        display: 'none',
                        fontFamily: '"Geist Variable", sans-serif',
                        color: '#000',
                        background: '#fff',
                        fontSize: 14,
                        maxWidth: 320,
                        margin: '0 auto',
                        padding: 24,
                    }}
                >
                    {/* Header */}
                    <div style={{ textAlign: 'center', borderBottom: '1px dashed #999', paddingBottom: 12, marginBottom: 12 }}>
                        <p style={{ fontWeight: 700, fontSize: 16, margin: 0 }}>Al-Badar Digital Portal</p>
                        <p style={{ fontSize: 11, color: '#666', margin: '4px 0 0' }}>{kwitansi.nomorKwitansi}</p>
                        <p style={{ fontSize: 11, color: '#666', margin: '2px 0 0' }}>
                            {new Date(kwitansi.createdAt).toLocaleString('id-ID')}
                        </p>
                    </div>

                    {/* Info Santri */}
                    <div style={{ fontSize: 12, marginBottom: 12 }}>
                        <p style={{ margin: 0 }}>Santri: <strong>{santri?.namaLengkap ?? '-'}</strong></p>
                        <p style={{ margin: '2px 0 0', color: '#666' }}>NIS: {santri?.nis ?? '-'}</p>
                        <p style={{ margin: '2px 0 0', color: '#666' }}>Metode: <strong style={{ textTransform: 'capitalize' }}>{kwitansi.metodePembayaran ?? 'cash'}</strong></p>
                    </div>

                    {/* Item Pembayaran */}
                    <div style={{ borderTop: '1px dashed #999', paddingTop: 12, marginBottom: 12 }}>
                        {kwitansi.items.map((item, i) => {
                            const showKeterangan = Boolean(
                                item.keterangan &&
                                !item.label.toLowerCase().includes(item.keterangan.toLowerCase().replace('periode:', '').trim())
                            );
                            return (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, alignItems: 'flex-start' }}>
                                    <div>
                                        <div style={{ fontWeight: 600 }}>{item.label}</div>
                                        {showKeterangan && (
                                            <div style={{ fontSize: 11, color: '#555' }}>{item.keterangan}</div>
                                        )}
                                    </div>
                                    <span>Rp {item.nominal.toLocaleString('id-ID')}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Total */}
                    <div style={{ borderTop: '1px dashed #999', paddingTop: 12, marginBottom: 12, display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                        <span>Total</span>
                        <span>Rp {kwitansi.totalNominal.toLocaleString('id-ID')}</span>
                    </div>

                    {/* Saldo Akhir */}
                    <div style={{ borderTop: '1px dashed #999', paddingTop: 12 }}>
                        <p style={{ fontSize: 12, color: '#666', margin: '0 0 6px' }}>Saldo Akhir:</p>
                        {kwitansi.saldoSnapshot.map((s, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                                <span>{labelJenisRekening[s.jenisRekening] ?? s.jenisRekening}</span>
                                <span>Rp {s.saldo.toLocaleString('id-ID')}</span>
                            </div>
                        ))}
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default StrukKwitansiDialog;