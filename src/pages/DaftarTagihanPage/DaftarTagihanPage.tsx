import CreateTagihan from "@/components/molecules/CreateTagihan";
import TableTagihan from "@/components/organisms/DaftarTagihan/TableTagihan";

const TagihanPage = () => {
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-3xl font-bold">Daftar Tagihan</h1>
                </div>
                <CreateTagihan />
            </div>
            <TableTagihan />
        </div>
    );
}
export default TagihanPage;