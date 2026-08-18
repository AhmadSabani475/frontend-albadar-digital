import type React from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

interface AccordionSectionProps {
    value: string;
    Icon: React.ElementType;
    title: string;
    children: React.ReactNode;
};

const AccordionSection = (props: AccordionSectionProps) => {
    const {
        children,
        Icon,
        title,
        value
    } = props;

    return (
        <AccordionItem value={value} className="border-2 px-8 rounded-2xl">
            <AccordionTrigger className="hover:no-underline py-5">
                <div className="flex gap-2 items-center">
                    <Icon className="text-green-400" />
                    <h3 className="text-xl font-semibold">{title}</h3>
                </div>
            </AccordionTrigger>
            <AccordionContent className="pb-5">
                <div className="flex flex-col gap-4 rounded-2xl">
                    {children}
                </div>
            </AccordionContent>
        </AccordionItem>
    );
};

export default AccordionSection;