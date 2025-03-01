import { IconButton /* , List, ListItem, Popover, TableCell */ } from '@mui/material';
import { useDeleteMessageMutation } from 'graphql/generated';
import { useNotifications } from 'context/NotificationsContext';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

type RequestsActionsProps = {
    refetch: () => void;
    messageId: string;
};

export const RequestsActionsMore: React.FC<RequestsActionsProps> = ({ messageId, refetch }) => {
    const { notify, confirm } = useNotifications();

    const [deleteMessage] = useDeleteMessageMutation({
        onCompleted() {
            notify({ type: 'success', message: 'Müraciət uğurla silindi' });
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
                            deleteMessage({ variables: { deleteMessageId: messageId } });
                            e.preventDefault();
                            e.stopPropagation();
                        },
                        description: 'Bu müraciət silinəcək',
                    });
                }}
            >
                <DeleteOutlineOutlinedIcon color="secondary" />
            </IconButton>
        </>
    );
};
