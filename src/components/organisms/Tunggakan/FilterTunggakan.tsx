import { useJenisTagihan } from "@/hooks/use-jenis-tagihan";
import { useTingkatKelasQuery } from "@/hooks/use-tingkat-kelas-query";
import type { TunggakanFilter } from "@/services/tunggakan.service";
import SelectField from "@/components/molecules/SelectField";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";


interface Props {
    filters: TunggakanFilter;
    onChange: (key: keyof TunggakanFilter, value: string) => void;
    onReset?: () => void;
}

const FilterTunggakan = ({ filters, onChange, onReset }: Props) => {
    const { data: listJenisTagihan, isLoading: loadingJenis } = useJenisTagihan();
    const { data: listKelas, isLoading: loadingKelas } = useTingkatKelasQuery();

    return (
        <div className="flex flex-wrap items-end gap-3">
            <div className="w-full sm:w-56">
                <SelectField
                    name="jenisTagihanId"
                    label="Jenis Tagihan"
                    value={filters.jenisTagihanId ?? ""}
                    onChange={(val) => onChange("jenisTagihanId", val)}
                    disabled={loadingJenis}
                    placeholder="Semua Jenis Tagihan"
                    groups={[
                        {
                            groupLabel: "Jenis Tagihan",
                            options: (listJenisTagihan ?? []).map((jt) => ({
                                label: jt.nama,
                                value: jt._id,
                            })),
                        },
                    ]}
                />
            </div>

            <div className="w-full sm:w-48">
                <SelectField
                    name="kelasId"
                    label="Tingkat Kelas"
                    value={filters.kelasId ?? ""}
                    onChange={(val) => onChange("kelasId", val)}
                    disabled={loadingKelas}
                    placeholder="Semua Kelas"
                    groups={[
                        {
                            groupLabel: "Tingkat Kelas",
                            options: (listKelas ?? []).map((kelas) => ({
                                label: kelas.nama,
                                value: kelas._id,
                            })),
                        },
                    ]}
                />
            </div>

            {onReset && (
                <Button variant="ghost" size="sm" onClick={onReset}>
                    <RotateCcw data-icon="inline-start" />
                    Reset Filter
                </Button>
            )}
        </div>
    );
};

export default FilterTunggakan;