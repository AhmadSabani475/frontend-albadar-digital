
import { ChevronDown, type LucideIcon } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';
import { Link, useLocation } from 'react-router-dom';

interface groupItem {
    name: string;
    url: string;
    icon?: LucideIcon;
}

interface PropTypes {
    label: string;
    items: groupItem[];
}

const SidebarNavGroup = (props: PropTypes) => {
    const { label, items } = props;
    const location = useLocation().pathname;
    return (
        <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
                <SidebarGroupLabel render={<CollapsibleTrigger />}>

                    {label}
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />

                </SidebarGroupLabel>
                <CollapsibleContent>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.name}>
                                    <SidebarMenuButton isActive={location === item.url}
                                        render={<Link to={item.url} />}>

                                        {item.icon && <item.icon />}
                                        <span>{item.name}</span>

                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>

                    </SidebarGroupContent>
                </CollapsibleContent>
            </SidebarGroup>
        </Collapsible >
    );
};
export default SidebarNavGroup;