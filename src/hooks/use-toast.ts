import * as React from "react";
import { toast as baseToast } from "@/components/ui/toast";

export interface ToastOptions {
    title?: React.ReactNode;
    description?: React.ReactNode;
    variant?: "default" | "destructive" | "success";
    type?: "success" | "error" | "warning" | "info" | "default";
    action?: React.ReactNode;
}

export function toast({ title, description, variant, type }: ToastOptions) {
    const mappedType =
        type ||
        (variant === "destructive"
            ? "error"
            : variant === "success"
            ? "success"
            : "info");

    return baseToast.add({
        title,
        description,
        type: mappedType,
    });
}

export function useToast() {
    return {
        toast,
        dismiss: (id?: string) => {
            if (id) {
                baseToast.close(id);
            }
        },
    };
}

