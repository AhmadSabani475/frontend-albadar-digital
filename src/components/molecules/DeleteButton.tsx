import { santriService } from "@/services/santri.service";
import { useNavigate } from "react-router-dom";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent
    , AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash, Trash2Icon } from "lucide-react";

interface PropTypes {
    id: string;
}
const DeleteButton = ({ id }: PropTypes) => {
    const navigate = useNavigate();
    const handleDelete = async () => {
        try {
            await santriService.deleteSantriById(id)
            navigate('/dashboard/santri');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger
                render={<Button variant="destructive">
                    <Trash className="h-14 w-14" />
                </Button>} />
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete Data</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={
                        handleDelete
                    }>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export default DeleteButton;