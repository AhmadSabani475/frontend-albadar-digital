import { useJenisTagihan } from "@/hooks/use-jenis-tagihan";
import type { TunggakanFilter } from "@/services/tunggakan.service";
import SelectField from "@/components/molecules/SelectField";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const LIST_FILTER_KELAS = [
    { label: "Kelas 7", value: "Kelas 7" },
    { label: "Kelas 8", value: "Kelas 8" },
    { label: "Kelas 9", value: "Kelas 9" },
    { label: "Kelas 10", value: "Kelas 10" },
    { label: "Kelas 11", value: "Kelas 11" },
    { label: "Kelas 12", value: "Kelas 12" },
    { label: "Mahasiswa", value: "Mahasiswa" },
    { label: "Tidak Sekolah", value: "Tidak Sekolah" },
];

interface Props {
    filters: TunggakanFilter;
    onChange: (key: keyof TunggakanFilter, value: string) => void;
    onReset?: () => void;
}

const FilterTunggakan = ({ filters, onChange, onReset }: Props) => {
    const { data: listJenisTagihan, isLoading: loadingJenis } = useJenisTagihan();

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
                    placeholder="Semua Kelas"
                    groups={[
                        {
                            groupLabel: "Tingkat Kelas",
                            options: LIST_FILTER_KELAS,
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