import type { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

interface PropTypes {
    jenisTagihanContent: ReactNode;
    tarifKhususContent: ReactNode;
    tagihanContent?: ReactNode;
}

const TabsTagihan = (props: PropTypes) => {
    const {
        jenisTagihanContent,
        tagihanContent,
        tarifKhususContent
    } = props;
    return (
        <Tabs defaultValue='jenis'>
            <TabsList variant="line">
                <TabsTrigger value='jenis'>Jenis Tagihan</TabsTrigger>
                <TabsTrigger value='tarifKhusus'>Tarif Khusus</TabsTrigger>
                <TabsTrigger value='tagihan'>Tagihan</TabsTrigger>
            </TabsList>
            <TabsContent value="jenis">{jenisTagihanContent}</TabsContent>
            <TabsContent value="tarifKhusus">{tarifKhususContent}</TabsContent>
            <TabsContent value="tagihan">{tagihanContent}</TabsContent>
        </Tabs>
    )
}
export default TabsTagihan;