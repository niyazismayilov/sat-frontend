import { IconButton } from '@mui/material';
import { useDeleteCallbackMutation } from 'graphql/generated';
import { useNotifications } from 'context/NotificationsContext';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

type ReturnsActionsProps = {
    refetch: () => void;
    callbackId: string;
};

export const ReturnsActionsMore: React.FC<ReturnsActionsProps> = ({ callbackId, refetch }) => {
    const { notify, confirm } = useNotifications();

    const [deleteCallback] = useDeleteCallbackMutation({
        onCompleted() {
            notify({ type: 'success', message: 'Geri dönüş uğurla silindi' });
            refetch();
        },
    });

    return (
        <>
            <IconButton
                size="small"
                onClick={(e) => {
                    confirm({
                        onConfirm: () => {
                            deleteCallback({ variables: { deleteCallbackId: callbackId } });
                            e.preventDefault();
                            e.stopPropagation();
                        },
                        description: 'Bu geri dönüş silinəcək',
                    });
                }}
            >
                <DeleteOutlineOutlinedIcon color="secondary" />
            </IconButton>
        </>
    );
};
