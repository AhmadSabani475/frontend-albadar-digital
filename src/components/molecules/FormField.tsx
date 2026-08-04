import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

interface PropTypes {
    id?: string;
    name: string;
    label: string;
    value: string;
    type?: string;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField = (props: PropTypes) => {
    const {
        id,
        name,
        label,
        onChange,
        value,
        type = 'text',
        error
    } = props;

    return (
        <Field>
            <FieldLabel htmlFor={name}>
                {label}
            </FieldLabel>
            <Input type={type} name={name} id={id} value={value} onChange={onChange} />
            {error && <p className="text-sm text-destructive">{error}</p>}
        </Field>
    )
}

export default FormField;