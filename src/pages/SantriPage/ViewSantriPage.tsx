import ViewDataSantri from '@/components/organisms/ViewDataSantri';
import { useParams } from 'react-router-dom';

const ViewSantriPage = () => {
    const { id } = useParams();
    return (
        <ViewDataSantri id={id} />
    );
};
export default ViewSantriPage;