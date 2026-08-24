import { useState } from 'react';
import { Field, FieldLabel } from '../ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';

interface Option {
    label: string;
    value: string;
}

interface PropTypes {
    label: string;
    name: string;
    value: string[];
    onChange: (value: string[]) => void;
    options: Option[];
    placeholder?: string;
    emptyText?: string;
    required?: boolean;
}

const MultiSelectField = (props: PropTypes) => {
    const {
        label,
        name,
        onChange,
        options,
        value,
        emptyText = 'Tidak Ditemukan',
        placeholder = 'Pilih...',
        required,
    } = props;

    const [open, setOpen] = useState<boolean>(false);

    const toggleValue = (optValue: string) => {
        if (value.includes(optValue)) {
            onChange(value.filter((v) => v !== optValue));
        } else {
            onChange([...value, optValue]);
        }
    };

    const removeValue = (optValue: string) => {
        onChange(value.filter((v) => v !== optValue));
    };

    const selectedOptions = options.filter((opt) => value.includes(opt.value));

    return (
        <Field>
            <FieldLabel htmlFor={name}>{label}</FieldLabel>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger
                    render={
                        <Button
                            id={name}
                            type="button"
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between font-normal"
                        >
                            {value.length > 0 ? `${value.length} santri dipilih` : placeholder}
                            <ChevronsUpDown className="opacity-50" />
                        </Button>
                    }
                />
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                    <Command>
                        <CommandInput placeholder={`Cari ${label.toLowerCase()}...`} />
                        <CommandList>
                            <CommandEmpty>{emptyText}</CommandEmpty>
                            <CommandGroup>
                                {options.map((opt) => {
                                    const isSelected = value.includes(opt.value);
                                    return (
                                        <CommandItem
                                            key={opt.value}
                                            value={opt.label}
                                            onSelect={() => toggleValue(opt.value)}
                                        >
                                            <Check
                                                className={`mr-2 ${isSelected ? 'opacity-100' : 'opacity-0'}`}
                                            />
                                            {opt.label}
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {selectedOptions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                    {selectedOptions.map((opt) => (
                        <Badge key={opt.value} variant="outline" className="gap-1 pr-1">
                            {opt.label}
                            <button
                                type="button"
                                onClick={() => removeValue(opt.value)}
                                className="hover:bg-neutral-700 rounded-full p-0.5"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
            )}

            {required && value.length === 0 && (
                <input tabIndex={-1} autoComplete="off" className="sr-only" required value="" onChange={() => { }} />
            )}
        </Field>
    );
};

export default MultiSelectField;