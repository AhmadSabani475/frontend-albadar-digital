
import { SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';
import type { LucideIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface PropTypes {
    title: string;
    url: string;
    Icon?: LucideIcon;
}
const SidebarNavItem = (props: PropTypes) => {
    const { title, url, Icon } = props;
    const location = useLocation().pathname;
    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                isActive={location === url}
                render={<Link to={url} className="flex gap-3" />}
            >
                {Icon && <Icon className="h-4 w-4" />}
                <span>{title}</span>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
};
export default SidebarNavItem;