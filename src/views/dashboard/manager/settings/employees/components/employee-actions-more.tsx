import { IconButton, List, ListItem, ListItemButton, ListItemText, Popover } from '@mui/material';
import Divider from '@mui/material/Divider';
import { ReactComponent as MoreHorizIcon } from 'assets/icons/manager-dashboard/more-icon.svg';
import { Link } from 'components';
import { useNotifications } from 'context/NotificationsContext';
import { useDeleteEmployeeMutation } from 'graphql/generated';
import { useState } from 'react';
// import { Link } from 'components';

type ParticipantsActionsProps = {
    refetch: () => void;
    employeeId: string;
};

export const EmployeeActionsMore: React.FC<ParticipantsActionsProps> = ({ employeeId, refetch }) => {
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

    const [deleteEmployee] = useDeleteEmployeeMutation({
        onCompleted() {
            notify({ type: 'success', message: 'Əməkdaş uğurla silindi' });
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
                    <Link to={`/d/settings/employees/edit/${employeeId}`}>
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
                                        deleteEmployee({ variables: { deleteEmployeeId: employeeId } });
                                        e.preventDefault();
                                        e.stopPropagation();
                                    },
                                    description: 'Bu əməkdaş silinəcək',
                                });
                            }}
                        >
                            <ListItemText primary="Əməkdaşı sil" />
                        </ListItemButton>
                    </ListItem>
                    <Divider style={{ width: '100%' }} />
                </List>
            </Popover>
            <IconButton
                sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, width: 40, height: 40 }}
                onClick={handleClick}
            >
                <MoreHorizIcon />
            </IconButton>
        </>
    );
};
