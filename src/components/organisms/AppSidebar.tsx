import { Bed, LayoutDashboard, School, Users } from "lucide-react";
import Brand from "../molecules/Brand";
import SidebarNavItem from "../molecules/SidebarNavItem";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { useAuthStore } from "@/store/authStore";

const AppSidebar = () => {
    const user = useAuthStore.getState().user;

    if (!user) {
        return null;
    }

    const { username, role } = user;
    return (
        <Sidebar>
            <SidebarHeader
            >
                <Brand />
            </SidebarHeader>
            <SidebarContent>
                <SidebarNavItem
                    title="Dashboard"
                    url="/dashboard"
                    Icon={LayoutDashboard}
                />
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <p>{username}</p>
                            <p>{role}</p>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar;