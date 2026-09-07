import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface Props {
    isChecked: boolean;
    value: number;
    sisaTagihan: number;
    onCommit: (nominal: number) => void;
}

const NominalBayarCell = ({ isChecked, value, sisaTagihan, onCommit }: Props) => {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = Number(e.target.value);
        const capped = Math.min(Math.max(raw, 0), sisaTagihan);
        setLocalValue(capped);
    };

    const handleBlur = () => {
        onCommit(localValue);
    };

    return (
        <Input
            type="number"
            disabled={!isChecked}
            value={localValue}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-32"
        />
    );
};
export default NominalBayarCell;