import type { ReactNode } from "react";
import AppSidebar from "../organisms/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

interface PropTypes {
    children: ReactNode
}

const DashboardLayout = (props: PropTypes) => {
    const { children } = props;
    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}

export default DashboardLayout;