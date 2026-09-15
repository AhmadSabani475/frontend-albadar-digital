import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';


interface PropTypes {
    trigger: React.ReactElement
    title?: string
    description?: string
    onConfirm: () => void | Promise<void>
    loading?: boolean
    actionLabel?: string
    actionVariant?: "destructive" | "default" | "outline" | "secondary" | "ghost" | "link"
}

const ConfirmActionButton = (props: PropTypes) => {
    const {
        trigger,
        title = 'Hapus Data?',
        description = 'Tindakan ini tidak dapat dibatalkan. Data akan dihapus secara permanen.',
        onConfirm,
        loading,
        actionLabel = 'Hapus',
        actionVariant = 'destructive'
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
                        variant={actionVariant}
                    >
                        {loading ? 'Memproses...' : actionLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );

};

export default ConfirmActionButton;