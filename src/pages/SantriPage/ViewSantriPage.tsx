
import ViewDataSantri from '@/components/organisms/Santri/ViewDataSantri';
import { useParams } from 'react-router-dom';

const ViewSantriPage = () => {
    const { id } = useParams();

    if (!id) {
        return <p className="text-center text-destructive py-10">ID santri tidak ditemukan</p>;
    }

    return (
        <ViewDataSantri id={id} />
    );
};
export default ViewSantriPage;