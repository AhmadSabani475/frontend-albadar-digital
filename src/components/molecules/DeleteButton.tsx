import { santriService } from '@/services/santri.service';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { Trash, Trash2Icon } from 'lucide-react';

interface PropTypes {
    id: string;
}
const DeleteButton = ({ id }: PropTypes) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);
            await santriService.deleteSantriById(id);
            navigate('/dashboard/santri');
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <AlertDialog>
            <AlertDialogTrigger
                render={
                    <Button variant="destructive" size="icon">
                        <Trash className="h-4 w-4" />
                    </Button>
                }
            />
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Hapus Data Santri</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline" disabled={loading}>Batal</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={handleDelete} disabled={loading}>
                        {loading ? 'Menghapus...' : 'Hapus'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
export default DeleteButton;