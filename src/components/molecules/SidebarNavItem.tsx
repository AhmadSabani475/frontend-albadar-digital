
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface PropTypes {
    title: string;
    url: string;
    Icon?: LucideIcon;
}
const SidebarNavItem = (props: PropTypes) => {
    const { title, url, Icon } = props;
    return (
        <SidebarGroup>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <Link to={url} className="flex gap-3">
                            {Icon && <Icon />}
                            <span>{title}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>

    )
}
export default SidebarNavItem;