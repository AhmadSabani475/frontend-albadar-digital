import Brand from '../atoms/Brand';
import SidebarNavItem from '../molecules/SidebarNavItem';
import SidebarNavGroup from '../molecules/SidebarNavGroup';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '../ui/sidebar';
import { useAuthStore } from '@/store/authStore';
import { SIDEBAR_MENU } from '@/constants/menu';
import { LogOut, SlidersHorizontal } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const AppSidebar = () => {
    const { user, logout } = useAuthStore();
    const { isMobile, setOpenMobile } = useSidebar();
    const location = useLocation();

    useEffect(() => {
        if (isMobile) {
            setOpenMobile(false);
        }
    }, [location.pathname]);

    const filteredMenu = SIDEBAR_MENU
        .map((entry) => {
            if (entry.type === 'item') {
                if (entry.roles && !entry.roles.includes(user?.role ?? 'bendahara')) {
                    return null;
                }
                return entry;
            }
            return {
                ...entry,
                items: entry.items.filter((item) => !item.roles || item.roles.includes(user?.role ?? 'bendahara')),
            };
        })
        .filter((entry): entry is NonNullable<typeof entry> => {
            if (!entry) return false;
            if (entry.type === 'group') return entry.items.length > 0;
            return true;
        });
    return (
        <Sidebar>
            <SidebarHeader>
                <Brand />
            </SidebarHeader>
            <SidebarContent className="px-2 py-2">
                <SidebarGroup className="p-0">
                    <SidebarMenu className="gap-1">
                        {filteredMenu.map((entry) =>
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
                    {user?.role === 'admin' && (
                        <SidebarNavItem
                            title="Pengaturan"
                            url="/dashboard/settings"
                            Icon={SlidersHorizontal}
                        />
                    )}
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