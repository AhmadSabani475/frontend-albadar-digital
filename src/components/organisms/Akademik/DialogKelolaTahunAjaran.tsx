import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TabelTahunAjaran from "./TabelTahunAjaran";
import { ArrowRight } from "lucide-react";

interface PropTypes {
    trigger?: React.ReactElement;
}

const DialogKelolaTahunAjaran = ({ trigger }: PropTypes) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    trigger ? (
                        trigger
                    ) : (
                        <Button variant="outline" size="sm" className="gap-2">
                            <span>Kelola</span>
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    )
                }
            />
            <DialogContent className="sm:max-w-3xl lg:max-w-4xl w-full max-h-[85vh] overflow-y-auto p-6">
                <DialogHeader className="mb-4">
                    <DialogTitle className="text-lg font-bold">
                        Kelola Tahun Ajaran
                    </DialogTitle>
                </DialogHeader>

                <TabelTahunAjaran />
            </DialogContent>
        </Dialog>
    );
};

export default DialogKelolaTahunAjaran;
