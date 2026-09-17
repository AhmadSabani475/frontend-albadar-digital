import type React from 'react';

interface DetailItemProps {
    label: string;
    value?: React.ReactNode;
    icon?: React.ElementType;
    className?: string;
}

export const DetailItem = ({ label, value, icon: Icon, className = '' }: DetailItemProps) => {
    const isDisplayable = value !== undefined && value !== null && value !== '';

    return (
        <div className={`flex flex-col gap-1 p-3 rounded-xl bg-muted/30 border border-border/50 ${className}`}>
            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                {Icon && <Icon className="w-3.5 h-3.5 text-muted-foreground/70" />}
                {label}
            </span>
            <div className="text-sm font-semibold text-foreground break-words">
                {isDisplayable ? value : <span className="text-muted-foreground/50 italic font-normal">Tidak diisi</span>}
            </div>
        </div>
    );
};

export default DetailItem;
