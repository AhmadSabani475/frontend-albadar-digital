import type { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

interface PropTypes {
    jenisTagihanContent: ReactNode;
    tarifKhususContent: ReactNode;
}

const TabsTagihan = (props: PropTypes) => {
    const {
        jenisTagihanContent,
        tarifKhususContent
    } = props;
    return (
        <Tabs defaultValue='jenis'>
            <TabsList variant="line">
                <TabsTrigger value='jenis'>Jenis Tagihan</TabsTrigger>
                <TabsTrigger value='tarifKhusus'>Tarif Khusus</TabsTrigger>

            </TabsList>
            <TabsContent value="jenis">{jenisTagihanContent}</TabsContent>
            <TabsContent value="tarifKhusus">{tarifKhususContent}</TabsContent>

        </Tabs>
    )
}
export default TabsTagihan;