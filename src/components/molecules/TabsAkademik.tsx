import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs"
import type { ReactNode } from "react"

interface Props {
    tingkatKelasContent: ReactNode
    tingkatNgajiContent?: ReactNode
}

const TabsAkademik = ({ tingkatKelasContent, tingkatNgajiContent }: Props) => {
    return (
        <Tabs defaultValue="kelas" className="w-full">
            <TabsList>
                <TabsTrigger value="kelas">Tingkat Kelas</TabsTrigger>
                <TabsTrigger value="ngaji">Tingkat Ngaji</TabsTrigger>
            </TabsList>

            <TabsContent value="kelas">{tingkatKelasContent}</TabsContent>
            <TabsContent value="ngaji">{tingkatNgajiContent}</TabsContent>
        </Tabs>
    )
}

export default TabsAkademik