import { useTahunAjaran } from "@/hooks/use-tahun-ajaran";
import SearchableSelectField from "../molecules/SearchableSelectField";



interface Props {
    tahunAjaranAsalId: string;
    tahunAjaranTujuanId: string;
    onChangeAsal: (id: string) => void;
    onChangeTujuan: (id: string) => void;
}

const SelectTahunAjaran = ({ tahunAjaranAsalId, tahunAjaranTujuanId, onChangeAsal, onChangeTujuan }: Props) => {
    const { data: tahunAjaranList } = useTahunAjaran();
    const options = (tahunAjaranList ?? []).map((t) => ({
        label: t.nama,
        value: t._id
    }));
    return (
        <div className="grid grid-cols-2 gap-4">
            <SearchableSelectField
                label="Tahun Ajaran Asal"
                name="tahunAjaranAsal"
                onChange={onChangeAsal}
                options={options}
                value={tahunAjaranAsalId}
                required
            />
            <SearchableSelectField
                label="Tahun Ajaran Tujuan"
                name="tahunAjaranTujuan"
                onChange={onChangeTujuan}
                options={options}
                value={tahunAjaranTujuanId}
                required
            />
        </div>
    )

}
export default SelectTahunAjaran;