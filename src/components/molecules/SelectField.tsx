import { Field, FieldLabel } from "../ui/field";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

interface SelectOption {
    label: string;
    value: string;
}

interface SelectGrup {
    groupLabel: string;
    options: SelectOption[];
}

interface PropTypes {
    name: string;
    label: string;
    value: string;
    groups: SelectGrup[];
    placeholder?: string;
    error?: string;
    onChange?: (value: string) => void;
    required?: boolean;
}

const SelectField = (props: PropTypes) => {
    const {
        name,
        label,
        value,
        groups,
        placeholder,
        error,
        onChange,
        required = false,
    } = props;

    const allItems = groups.flatMap((group) => group.options);

    return (
        <Field>
            <FieldLabel htmlFor={name}>
                {label}
            </FieldLabel>
            <Select
                items={allItems}
                value={value}
                onValueChange={(newValue) => onChange?.(newValue ?? "")}
                required={required}
            >
                <SelectTrigger id={name} name={name} className="w-full">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {groups.map((group, idx) => (
                        <div key={group.groupLabel}>
                            <SelectGroup>
                                <SelectLabel>{group.groupLabel}</SelectLabel>
                                {group.options.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                            {idx < groups.length - 1 && <SelectSeparator />}
                        </div>
                    ))}
                </SelectContent>
            </Select>
            {error && <p className="text-sm text-destructive">{error}</p>}
        </Field>
    )
}

export default SelectField;