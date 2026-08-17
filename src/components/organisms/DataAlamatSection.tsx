import { MapIcon } from "lucide-react";
import AccordionSection from "../molecules/AccordionSection";
import FormRow from "../atoms/FormRow";
import { Textarea } from "../ui/textarea";
import { Field, FieldLabel } from "../ui/field";
import FormField from "../molecules/FormField";

const DataAlamatSection = () => {
    return (
        <AccordionSection value="alamat" Icon={MapIcon} title="Alamat">
            <FormRow>
                <Field>
                    <FieldLabel htmlFor="alamat.jalan">
                        Jalan/Detail Alamat
                        <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Textarea
                        id="alamat.jalan"
                        name="alamat.jalan"
                        placeholder="Contoh: Jl.Merdeka No.12 Perum Asri"
                        rows={4}
                        required
                    />
                </Field>
            </FormRow>
            <FormRow>
                <FormField type="text" label="RT/RW" name="rt/rw"
                    placeholder="002/005" id="rt/rw" />
            </FormRow>
        </AccordionSection>
    )
}
export default DataAlamatSection;