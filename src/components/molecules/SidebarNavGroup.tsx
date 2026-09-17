
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
            <SidebarGroup className="p-0 py-1">
                <SidebarGroupLabel
                    className="group-data-[collapsible=icon]:hidden"
                    render={<CollapsibleTrigger className="w-full flex items-center justify-between cursor-pointer hover:text-sidebar-foreground" />}
                >
                    <span>{label}</span>
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarGroupLabel>
                <CollapsibleContent>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-0.5">
                            {items.map((item) => {
                                const isActive = item.url === '/dashboard'
                                    ? location === '/dashboard'
                                    : (location === item.url || location.startsWith(item.url + '/'));

                                return (
                                    <SidebarMenuItem key={item.name}>
                                        <SidebarMenuButton
                                            isActive={isActive}
                                            tooltip={item.name}
                                            render={<Link to={item.url} />}
                                        >
                                            {item.icon && <item.icon />}
                                            <span>{item.name}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </CollapsibleContent>
            </SidebarGroup>
        </Collapsible>
    );
};
export default SidebarNavGroup;