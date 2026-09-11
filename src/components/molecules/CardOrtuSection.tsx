import { Card } from '../ui/card';

interface CardOrtuSectionProps {
    Icon: React.ElementType;
    title: string;
    children: React.ReactNode;
}

const CardOrtuSection = ({ Icon, title, children }: CardOrtuSectionProps) => {
    return (
        <Card className="border-2 px-8 rounded-2xl w-full">
            <div className="flex gap-2 items-center">
                <Icon className="text-primary" />
                <h3 className="text-xl font-semibold">{title}</h3>
            </div>
            <div className="flex flex-col gap-4 rounded-2xl">
                {children}
            </div>
        </Card>
    );
};
export default CardOrtuSection;