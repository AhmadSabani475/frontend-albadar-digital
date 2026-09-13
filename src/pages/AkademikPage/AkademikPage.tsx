import TabsAkademik from "@/components/molecules/TabsAkademik";
import TabelTingkatNgaji from "@/components/organisms/Akademik/TabelTingkatNgaji";
import TabelTingkatKelas from "@/components/organisms/Akademik/TableTingkatKelas";


const AkademikPage = () => {
    return (
        <div className="p-6">
            <TabsAkademik
                tingkatKelasContent={<TabelTingkatKelas />}
                tingkatNgajiContent={<TabelTingkatNgaji />}
            />
        </div>
    )
}
export default AkademikPage;