import Brand from '../molecules/Brand';
import SidebarNavItem from '../molecules/SidebarNavItem';
import SidebarNavGroup from '../molecules/SidebarNavGroup';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';
import { useAuthStore } from '@/store/authStore';
import { SIDEBAR_MENU } from '@/constants/menu';
import { LogOut, SlidersHorizontal } from 'lucide-react';

const AppSidebar = () => {
    const logout = useAuthStore((state) => state.logout);
    return (
        <Sidebar>
            <SidebarHeader>
                <Brand />
            </SidebarHeader>
            <SidebarContent className="px-2 py-2">
                <SidebarGroup className="p-0">
                    <SidebarMenu className="gap-1">
                        {SIDEBAR_MENU.map((entry) =>
                            entry.type === 'item' ? (
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
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-2 border-t border-border">
                <SidebarMenu className="gap-1">
                    <SidebarNavItem
                        title="Pengaturan"
                        url="/dashboard/settings"
                        Icon={SlidersHorizontal}
                    />
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={logout} className="text-destructive hover:text-destructive cursor-pointer font-medium">
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;