import { useRef, useState } from 'react';
import { Camera } from 'lucide-react';

type PhotoUploadProps = {
    name: string;
    label?: string;
    maxSizeMB?: number;
    accept?: string;
    initialPreview?: string;
    onChange?: (file: File | null) => void | Promise<void>;
    disabled?: boolean;
};

const PhotoUpload = ({
    name,
    label = 'Ganti Foto',
    maxSizeMB = 2,
    accept = 'image/jpeg,image/png',
    initialPreview,
    onChange,
    disabled = false,
}: PhotoUploadProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(initialPreview ?? null);
    const [error, setError] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        const file = e.target.files?.[0] ?? null;
        setError('');

        if (!file) return;

        if (file.size > maxSizeMB * 1024 * 1024) {
            setError(`Ukuran file maksimal ${maxSizeMB}MB`);
            return;
        }

        const url = URL.createObjectURL(file);
        setPreview(url);
        onChange?.(file);
    };

    const handleTriggerClick = () => {
        if (disabled) return;
        inputRef.current?.click();
    };

    return (
        <div className="flex flex-col items-center gap-3">
            <button
                type="button"
                onClick={handleTriggerClick}
                disabled={disabled}
                className={`w-28 h-28 rounded-full border-2 border-dashed flex items-center justify-center overflow-hidden transition-colors ${
                    disabled
                        ? 'border-border bg-muted/30 cursor-default'
                        : 'border-border bg-muted/40 hover:bg-muted'
                }`}
            >
                {preview ? (
                    <img src={preview} alt="Preview foto" className="w-full h-full object-cover" />
                ) : (
                    <Camera className="text-muted-foreground w-8 h-8" />
                )}
            </button>
            <input
                ref={inputRef}
                type="file"
                name={name}
                accept={accept}
                onChange={handleFileChange}
                className="hidden"
                disabled={disabled}
            />

            {!disabled && (
                <>
                    <button
                        type="button"
                        onClick={handleTriggerClick}
                        className="px-4 py-1.5 rounded-full border border-primary text-primary text-sm font-medium hover:bg-primary/10 transition-colors cursor-pointer"
                    >
                        {label}
                    </button>
                    <p className="text-xs text-muted-foreground">
                        Format: JPG, PNG. Max {maxSizeMB}MB.
                    </p>
                </>
            )}

            {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
    );
};

export default PhotoUpload;