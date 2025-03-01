import { IconButton, List, ListItem, ListItemButton, ListItemText, Popover, TableCell } from '@mui/material';
import { useDeleteVideoMutation } from 'graphql/generated';
import { ReactComponent as MoreHorizIcon } from 'assets/icons/manager-dashboard/more-icon.svg';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import { Link } from 'components';
import { useNotifications } from 'context/NotificationsContext';

type VideosActionsProps = {
    videoId: string;
    refetch: () => void;
};

export const VideosActionsMore: React.FC<VideosActionsProps> = ({ videoId, refetch }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>();
    const { notify, confirm } = useNotifications();

    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event?.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [deleteVideo] = useDeleteVideoMutation({
        onCompleted() {
            notify({ type: 'success', message: 'Video uğurla silindi' });
            refetch();
        },
    });

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <List sx={{ padding: '15px 5px' }}>
                    <Link to={`/d/helpful/video/edit/${videoId}`}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Redaktə et" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Divider style={{ width: '100%' }} />
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={(e) => {
                                confirm({
                                    onConfirm: () => {
                                        deleteVideo({ variables: { deleteVideoId: videoId } });
                                        e.preventDefault();
                                        e.stopPropagation();
                                    },
                                    description: 'Bu video silinəcək',
                                });
                            }}
                        >
                            <ListItemText primary="Sil" />
                        </ListItemButton>
                    </ListItem>
                    <Divider style={{ width: '100%' }} />
                </List>
            </Popover>
            <TableCell>
                <IconButton onClick={handleClick}>
                    <MoreHorizIcon />
                </IconButton>
            </TableCell>
        </>
    );
};
