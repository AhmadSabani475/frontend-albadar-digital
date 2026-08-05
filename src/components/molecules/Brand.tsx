import Logo from "../atoms/Logo"

const Brand = () => {
    return (
        <div className="flex flex-row items-center gap-3 py-5 px-3 border-b">
            <Logo src="/logo_albadar.jpg" alt="logo" />
            <div className="flex flex-col justify-center">
                <h3 className="text-xl font-bold text-green-400">
                    Al-Badar
                </h3>
                <p className="font-light text-xs">Digital Portal</p>
            </div>
        </div>
    )
}

export default Brand;