import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Kwitansi } from '@/types/Kwitansi';
import { uploadFileToSupabase } from '@/utils/uploadSupabase';
import { kasirService } from '@/services/kasir.service';
import { toast } from '@/hooks/use-toast';
import { Loader2, Upload, FileText, Image as ImageIcon, ExternalLink } from 'lucide-react';

interface UploadBuktiTfDialogProps {
    kwitansi: Kwitansi | null;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const UploadBuktiTfDialog = ({
    kwitansi,
    isOpen,
    onClose,
    onSuccess,
}: UploadBuktiTfDialogProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    if (!kwitansi) return null;

    const currentBuktiUrl = kwitansi.buktiTransferUrl;

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast({
                variant: 'destructive',
                title: 'Ukuran File Terlalu Besar',
                description: 'Maksimal ukuran file adalah 5MB.',
            });
            return;
        }

        setSelectedFile(file);
        if (file.type.startsWith('image/')) {
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setPreviewUrl(null);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        try {
            setIsUploading(true);
            const publicUrl = await uploadFileToSupabase(selectedFile, 'bukti-transfer');
            await kasirService.updateBuktiTransfer(kwitansi._id, publicUrl);

            toast({
                variant: 'success',
                title: 'Bukti Transfer Berhasil Diunggah',
                description: `Bukti transfer untuk kwitansi ${kwitansi.nomorKwitansi} telah tersimpan.`,
            });

            onSuccess();
            onClose();
            setSelectedFile(null);
            setPreviewUrl(null);
        } catch (error) {
            console.error('Upload Error:', error);
            toast({
                variant: 'destructive',
                title: 'Gagal Mengunggah',
                description: (error as Error).message || 'Terjadi kesalahan saat mengunggah bukti transfer.',
            });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Upload Bukti Transfer</DialogTitle>
                    <DialogDescription>
                        Unggah foto atau dokumen bukti transfer untuk Kwitansi{' '}
                        <strong className="text-foreground">{kwitansi.nomorKwitansi}</strong>.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4 py-3">
                    {/* Current Bukti Preview if any */}
                    {currentBuktiUrl && !selectedFile && (
                        <div className="flex flex-col gap-2 p-3 rounded-xl border border-border bg-muted/30">
                            <span className="text-xs text-muted-foreground font-medium">Bukti Transfer Saat Ini:</span>
                            {currentBuktiUrl.match(/\.(jpeg|jpg|png|webp)/i) ? (
                                <img
                                    src={currentBuktiUrl}
                                    alt="Bukti Transfer"
                                    className="max-h-48 w-full object-contain rounded-lg border border-border"
                                />
                            ) : (
                                <a
                                    href={currentBuktiUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs text-primary flex items-center gap-1.5 underline"
                                >
                                    <FileText className="w-4 h-4" />
                                    Lihat Berkas Bukti Transfer Saat Ini
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            )}
                        </div>
                    )}

                    {/* File Dropzone / Uploader */}
                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-xl bg-muted/20 hover:bg-muted/40 transition-colors">
                        {previewUrl ? (
                            <img
                                src={previewUrl}
                                alt="Pratinjau Foto"
                                className="max-h-44 object-contain mb-3 rounded-lg border border-border"
                            />
                        ) : selectedFile ? (
                            <div className="flex items-center gap-2 mb-3 text-sm font-medium text-foreground">
                                <FileText className="w-5 h-5 text-primary" />
                                {selectedFile.name}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2 mb-3">
                                <div className="p-3 rounded-full bg-primary/10 text-primary">
                                    <ImageIcon className="w-6 h-6" />
                                </div>
                                <p className="text-sm font-medium text-foreground text-center">
                                    Pilih foto atau dokumen bukti transfer
                                </p>
                                <p className="text-xs text-muted-foreground">JPG, PNG, WebP, PDF max 5MB</p>
                            </div>
                        )}

                        <label className="px-4 py-2 rounded-lg border border-input bg-background hover:bg-accent text-sm font-medium transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs">
                            <Upload className="w-3.5 h-3.5" />
                            {selectedFile ? 'Ganti File' : 'Pilih File'}
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp,application/pdf"
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" onClick={onClose} disabled={isUploading}>
                        Batal
                    </Button>
                    <Button onClick={handleUpload} disabled={!selectedFile || isUploading}>
                        {isUploading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                                Mengunggah...
                            </>
                        ) : (
                            'Simpan Bukti Transfer'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UploadBuktiTfDialog;
