import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import type { LucideIcon } from "lucide-react";
interface PropTypes {
    id?: string;
    name: string;
    label: string;
    value?: string;
    defaultValue?: string;
    type?: string;
    error?: string;
    placeholder?: string;
    Icon?: LucideIcon;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const FormField = (props: PropTypes) => {
    const {
        id,
        name,
        label,
        onChange,
        defaultValue,
        value,
        placeholder,
        type = 'text',
        error,
        Icon,
        required = false
    } = props;

    return (
        <Field>
            <FieldLabel htmlFor={name}>
                {label}
            </FieldLabel>
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                )}
                <Input
                    name={name}
                    id={id}
                    defaultValue={defaultValue}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    className={`h-11 ${Icon ? "pl-9" : ""}`}
                    required={required}
                />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
        </Field>
    )
}

export default FormField;