
import { useParams } from 'react-router-dom';

const ViewSantriPage = () => {
    const { id } = useParams();
    return (
        // <ViewDataSantri id={id} />
        <h1>hello</h1>
    );
};
export default ViewSantriPage;