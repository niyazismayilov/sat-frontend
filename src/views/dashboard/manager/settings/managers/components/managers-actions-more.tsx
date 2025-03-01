import { IconButton, List, ListItem, ListItemButton, ListItemText, Popover, TableCell } from '@mui/material';
import { ReactComponent as MoreHorizIcon } from 'assets/icons/manager-dashboard/more-icon.svg';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import { useDeleteUsersPermissionsUserMutation } from 'graphql/generated';
import { useNotifications } from 'context/NotificationsContext';
import { Link } from 'components';
// import { Link } from 'components';

type ParticipantsActionsProps = {
    refetch: () => void;
    managerId: string;
};

export const ManagersActionsMore: React.FC<ParticipantsActionsProps> = ({ managerId, refetch }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>();
    const { notify, confirm } = useNotifications();

    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event?.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [deleteManager] = useDeleteUsersPermissionsUserMutation({
        onCompleted() {
            notify({ type: 'success', message: 'Menecer uğurla silindi' });
            refetch();
        },
    });

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
                    <Link to={`/d/settings/managers/edit/${managerId}`}>
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
                                        deleteManager({ variables: { deleteUsersPermissionsUserId: managerId } });
                                        e.preventDefault();
                                        e.stopPropagation();
                                    },
                                    description: 'Bu menecer silinəcək',
                                });
                            }}
                        >
                            <ListItemText primary="Meneceri sil" />
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
