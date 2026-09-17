import SelectField from '@/components/molecules/SelectField';
import FormField from '@/components/molecules/FormField';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

export interface RiwayatTransaksiFilter {
    metodePembayaran: 'cash' | 'transfer' | '';
    hasBukti: 'true' | 'false' | '';
    startDate: string;
    endDate: string;
}

interface Props {
    filters: RiwayatTransaksiFilter;
    onChange: (key: keyof RiwayatTransaksiFilter, value: string) => void;
    onReset: () => void;
}

const FilterRiwayatTransaksi = ({ filters, onChange, onReset }: Props) => {
    return (
        <div className="flex flex-wrap items-end gap-3">
            <div className="w-full sm:w-48">
                <SelectField
                    name="metodePembayaran"
                    label="Metode Bayar"
                    value={filters.metodePembayaran}
                    onChange={(val) => onChange('metodePembayaran', val as 'cash' | 'transfer' | '')}
                    placeholder="Semua Metode"
                    groups={[
                        {
                            groupLabel: 'Metode Bayar',
                            options: [
                                { label: 'Semua Metode', value: '' },
                                { label: 'Cash', value: 'cash' },
                                { label: 'Transfer', value: 'transfer' },
                            ],
                        },
                    ]}
                />
            </div>

            <div className="w-full sm:w-48">
                <SelectField
                    name="hasBukti"
                    label="Bukti Transfer"
                    value={filters.hasBukti}
                    onChange={(val) => onChange('hasBukti', val as 'true' | 'false' | '')}
                    placeholder="Semua Bukti TF"
                    groups={[
                        {
                            groupLabel: 'Status Bukti TF',
                            options: [
                                { label: 'Semua Bukti TF', value: '' },
                                { label: 'Sudah Upload', value: 'true' },
                                { label: 'Belum Upload', value: 'false' },
                            ],
                        },
                    ]}
                />
            </div>

            <div className="w-full sm:w-44">
                <FormField
                    type="date"
                    name="startDate"
                    label="Dari Tanggal"
                    value={filters.startDate}
                    onChange={(e) => onChange('startDate', e.target.value)}
                />
            </div>

            <div className="w-full sm:w-44">
                <FormField
                    type="date"
                    name="endDate"
                    label="Sampai Tanggal"
                    value={filters.endDate}
                    onChange={(e) => onChange('endDate', e.target.value)}
                />
            </div>

            <Button variant="ghost" size="sm" onClick={onReset} className="h-10">
                <RotateCcw className="w-4 h-4 mr-1.5" />
                Reset Filter
            </Button>
        </div>
    );
};

export default FilterRiwayatTransaksi;
