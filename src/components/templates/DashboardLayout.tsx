import { Link, Outlet, useMatches } from 'react-router-dom';
import AppSidebar from '../organisms/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb';
import ThemeToggle from '../molecules/ThemeToggle';
import { Toaster } from '../ui/toast';

type RouteHandle = {
    title?: string;
    subtitle?: string;
    breadcrumb?: string;
}

const DashboardLayout = () => {
    const matches = useMatches();

    const crumbs = matches.filter((m) => (m.handle as RouteHandle)?.breadcrumb)
        .map((m) => ({
            label: (m.handle as RouteHandle)?.breadcrumb!,
            path: m.pathname
        }))
    const activeHandle = matches[matches.length - 1]?.handle as RouteHandle | undefined;
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 flex flex-col min-h-screen min-w-0 overflow-hidden">
                <div className="flex items-center gap-2 border-b px-4 py-3">
                    <SidebarTrigger />
                    <Separator orientation='vertical' className='h-4' />
                    <Breadcrumb>
                        <BreadcrumbList>
                            {crumbs.map((crumb, i) => (
                                <div key={crumb.path} className="flex items-center gap-2">
                                    <BreadcrumbItem>
                                        {i === crumbs.length - 1 ? (
                                            <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink render={<Link to={crumb.path} />}>
                                                {crumb.label}
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                    {i < crumbs.length - 1 && <BreadcrumbSeparator />}
                                </div>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="ml-auto flex items-center gap-2">
                        <ThemeToggle />
                    </div>
                </div>
                <div className="flex-1 p-6 flex flex-col gap-4 overflow-auto min-w-0">
                    {activeHandle?.title && (
                        <div className="flex flex-col gap-1.5">
                            <h1 className="text-3xl font-bold">{activeHandle.title}</h1>
                            {activeHandle.subtitle && (
                                <p className="text-muted-foreground text-xs">{activeHandle.subtitle}</p>
                            )}
                        </div>
                    )}
                    <Outlet />
                </div>
            </main>
            <Toaster />
        </SidebarProvider>
    );
};

export default DashboardLayout;