import { IconButton } from '@mui/material';
import { useDeleteSubscriberMutation } from 'graphql/generated';
import { useNotifications } from 'context/NotificationsContext';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

type SubscribersActionsProps = {
    refetch: () => void;
    subscriberId: string;
};

export const SubscribersActionsMore: React.FC<SubscribersActionsProps> = ({ subscriberId, refetch }) => {
    const { notify, confirm } = useNotifications();

    const [deleteSubscriber] = useDeleteSubscriberMutation({
        onCompleted() {
            notify({ type: 'success', message: 'Abunəçi uğurla silindi' });
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
                            deleteSubscriber({ variables: { deleteSubscriberId: subscriberId } });
                            e.preventDefault();
                            e.stopPropagation();
                        },
                        description: 'Bu abunəçi silinəcək',
                    });
                }}
            >
                <DeleteOutlineOutlinedIcon color="secondary" />
            </IconButton>
        </>
    );
};
