import EditSantriForm from "@/components/organisms/Santri/EditSantriForm";
import { useParams } from "react-router-dom";

const EditSantriPage = () => {
    const { id } = useParams();

    if (!id) {
        return <p className="text-center text-destructive py-10">ID santri tidak ditemukan</p>;
    }

    return (
        <EditSantriForm id={id} />
    )

}

export default EditSantriPage;