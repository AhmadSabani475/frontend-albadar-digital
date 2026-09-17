import Logo from '../atoms/Logo';

const Brand = () => {
    return (
        <div className="flex flex-row items-center gap-3 py-5 px-3 border-b group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:px-0">
            <Logo
                src="/logo_albadar.png"
                alt="logo"
                className="shrink-0 group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:w-6"
            />
            <div className="flex flex-col justify-center group-data-[collapsible=icon]:hidden">
                <h3 className="text-xl font-bold text-primary tracking-tight">
                    Al-Badar
                </h3>
                <p className="font-light text-xs text-muted-foreground">Digital Portal</p>
            </div>
        </div>
    );
};

export default Brand;