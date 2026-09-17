import { useState } from 'react';
import { Field, FieldLabel } from '../ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';

interface Option {
    label: string;
    value: string;
}

interface PropTypes {
    label: string
    name: string
    value: string
    onChange: (value: string) => void
    options: Option[]
    placeholder?: string
    emptyText?: string
    required?: boolean
}

const SearchableSelectField = (props: PropTypes) => {
    const {
        label,
        name,
        onChange,
        options,
        value,
        emptyText = 'Tidak Ditemukan',
        placeholder = 'Pilih...',
        required
    } = props;

    const [open, setOpen] = useState<boolean>(false);
    const selected = options.find((opt) => opt.value === value);
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
                            {selected ? selected.label : placeholder}
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
                                {options.map((opt) => (
                                    <CommandItem
                                        key={opt.value}
                                        value={`${opt.label} ${opt.value}`}
                                        onSelect={() => {
                                            onChange(opt.value);
                                            setOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={`mr-2 ${value === opt.value ? 'opacity-100' : 'opacity-0'}`}
                                        />
                                        {opt.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            {required && !value && (
                <input tabIndex={-1} autoComplete="off" className="sr-only" required value="" onChange={() => { }} />
            )}
        </Field>

    );
};
export default SearchableSelectField;