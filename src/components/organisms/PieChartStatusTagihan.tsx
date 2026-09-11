import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

interface Props {
    data: { status: string; count: number }[];
}

const statusConfig: Record<string, { label: string; color: string }> = {
    lunas: { label: 'Lunas', color: '#22c55e' },
    sebagian: { label: 'Sebagian', color: '#eab308' },
    belum_bayar: { label: 'Belum Bayar', color: '#ef4444' },
};

const PieChartStatusTagihan = ({ data }: Props) => {
    const chartData = data.map((d) => ({
        name: statusConfig[d.status]?.label ?? d.status,
        value: d.count,
        color: statusConfig[d.status]?.color ?? '#888',
    }));

    return (
        <Card>
            <CardHeader>
                <h3 className="font-semibold">Status Tagihan</h3>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label={(entry) => entry.value}
                            labelLine={false}
                        >
                            {chartData.map((entry, i) => (
                                <Cell key={i} fill={entry.color} stroke="#0a0a0a" strokeWidth={2} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ background: '#1c1b1b', border: '1px solid rgba(255,255,255,0.1)' }}
                        />
                        <Legend
                            layout="horizontal"
                            verticalAlign="bottom"
                            wrapperStyle={{ fontSize: 13 }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default PieChartStatusTagihan;