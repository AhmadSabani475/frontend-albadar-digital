import CreateTagihan from "@/components/molecules/CreateTagihan";
import TableTagihan from "@/components/organisms/DaftarTagihan/TableTagihan";

const TagihanPage = () => {
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex justify-end">
                <CreateTagihan />
            </div>
            <TableTagihan />
        </div>
    );
}
export default TagihanPage;