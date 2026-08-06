import Brand from "../molecules/Brand";
import SidebarNavItem from "../molecules/SidebarNavItem";
import SidebarNavGroup from "../molecules/SidebarNavGroup";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton } from "../ui/sidebar";
import { useAuthStore } from "@/store/authStore";
import { SIDEBAR_MENU } from "@/constants/menu";
import { LogOut } from "lucide-react";


const AppSidebar = () => {
    const logout = useAuthStore((state) => state.logout);
    return (
        <Sidebar>
            <SidebarHeader>
                <Brand />
            </SidebarHeader>
            <SidebarContent>
                {SIDEBAR_MENU.map((entry) =>
                    entry.type === "item" ? (
                        <SidebarNavItem
                            key={entry.url}
                            title={entry.title}
                            url={entry.url}
                            Icon={entry.icon}
                        />
                    ) : (
                        <SidebarNavGroup
                            key={entry.label}
                            label={entry.label}
                            items={entry.items}
                        />
                    )
                )}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuButton onClick={logout} className="text-destructive hover:text-destructive">
                        <LogOut />
                        <span>Logout</span>
                    </SidebarMenuButton>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar;