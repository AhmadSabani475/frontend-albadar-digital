import { Outlet } from "react-router-dom";
import AppSidebar from "../organisms/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

const DashboardLayout = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 flex flex-col min-h-screen">
                <div className="flex items-center gap-2 border-b px-4 py-3">
                    <SidebarTrigger />
                </div>
                <div className="flex-1 p-6">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    )
}

export default DashboardLayout;