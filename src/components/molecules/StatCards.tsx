import { Card, CardContent, CardHeader } from "../ui/card";

interface StatProps {
    title: string;
    Icon: React.ElementType;
    value: string;
}

const StatCards = ({ title, Icon, value }: StatProps) => {
    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between px-5 py-4 space-y-0">
                <p className="text-sm font-medium text-muted-foreground">{title}</p>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="px-5 pb-4">
                <span className="text-2xl font-bold">{value}</span>
            </CardContent>
        </Card>
    )
}
export default StatCards;