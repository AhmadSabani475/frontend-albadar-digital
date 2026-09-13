import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';


interface PropTypes {
    trigger: React.ReactElement
    title?: string
    description?: string
    onConfirm: () => void | Promise<void>
    loading?: boolean
}

const ConfirmDeleteButton = (props: PropTypes) => {
    const {
        trigger,
        title = 'Hapus Data?',
        description = 'Tindakan ini tidak dapat dibatalkan. Data akan dihapus secara permanen.',
        onConfirm,
        loading
    } = props;

    return (
        <AlertDialog>
            <AlertDialogTrigger render={trigger} />
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>Batal</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        disabled={loading}
                        variant="destructive"
                    >
                        {loading ? 'Menghapus...' : 'Hapus'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );

};

export default ConfirmDeleteButton;