import TabsAkademik from "@/components/molecules/TabsAkademik";
import TabelTingkatNgaji from "@/components/organisms/Akademik/TabelTingkatNgaji";
import TabelTingkatKelas from "@/components/organisms/Akademik/TableTingkatKelas";


const AkademikPage = () => {
    return (
        <div className="w-full flex flex-col gap-4">
            <TabsAkademik
                tingkatKelasContent={<TabelTingkatKelas />}
                tingkatNgajiContent={<TabelTingkatNgaji />}
            />
        </div>
    )
}
export default AkademikPage;