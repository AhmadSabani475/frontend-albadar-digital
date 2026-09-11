import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { useSantriList } from "@/hooks/use-santri";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect: (santriId: string) => void;
}

const SearchSantriDialog = ({ open, onOpenChange, onSelect }: Props) => {
    const [keyword, setKeyword] = useState('');
    const { data: santriList, isLoading } = useSantriList('aktif');

    const filtered = useMemo(() => {
        if (!santriList) return [];
        return santriList.filter((s) =>
            s.namaLengkap.toLowerCase().includes(keyword.toLowerCase())
        );
    }, [santriList, keyword]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Pilih Santri</DialogTitle>
                </DialogHeader>

                <Input
                    placeholder="Cari nama santri..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    autoFocus
                />

                <div className="max-h-80 overflow-y-auto flex flex-col gap-1 mt-2">
                    {isLoading && <p className="text-sm text-muted-foreground py-4 text-center">Memuat...</p>}

                    {!isLoading && filtered.length === 0 && (
                        <p className="text-sm text-muted-foreground py-4 text-center">Santri tidak ditemukan</p>
                    )}

                    {filtered.map((santri) => (
                        <button
                            key={santri._id}
                            onClick={() => {
                                onSelect(santri._id);
                                setKeyword('');
                            }}
                            className="text-left px-3 py-2 rounded hover:bg-muted transition-colors"
                        >
                            <p className="font-medium">{santri.namaLengkap}</p>
                            <p className="text-xs text-muted-foreground">NIS: {santri.nis}</p>
                        </button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SearchSantriDialog;