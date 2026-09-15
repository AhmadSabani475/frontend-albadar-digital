import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader } from "../../ui/card"

interface Props {
    data: { tanggal: string; total: number }[];
}

const formatTanggal = (tanggal: string) => {
    const d = new Date(tanggal);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
};

const GrafikPemasukanHarian = ({ data }: Props) => {
    const chartData = data.map((d) => ({
        tanggal: formatTanggal(d.tanggal),
        total: d.total,
    }));

    return (
        <Card className="w-full">
            <CardHeader>
                <h3 className="font-semibold">Pemasukan Bulan Ini</h3>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="tanggal" stroke="#888" fontSize={12} />
                        <YAxis stroke="#888" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
                        <Tooltip
                            formatter={(value) => [`Rp ${Number(value).toLocaleString('id-ID')}`, 'Total']}
                            contentStyle={{ background: '#1c1b1b', border: '1px solid rgba(255,255,255,0.1)' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="total"
                            stroke="#22c55e"
                            strokeWidth={2}
                            dot={{ fill: '#22c55e', r: 3 }}
                            activeDot={{ r: 5 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

export default GrafikPemasukanHarian;
