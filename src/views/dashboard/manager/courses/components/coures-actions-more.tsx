import { IconButton, List, ListItem, ListItemButton, ListItemText, Popover, TableCell } from '@mui/material';
import { ReactComponent as MoreHorizIcon } from 'assets/icons/manager-dashboard/more-icon.svg';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import { useDeleteCourseMutation } from 'graphql/generated';
import { useNotifications } from 'context/NotificationsContext';
import { Link } from 'components';

type CoursesActionsProps = {
    refetch: () => void;
    courseId: string;
};

export const CoursesActionsMore: React.FC<CoursesActionsProps> = ({ courseId, refetch }) => {
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

    const [deleteCourse] = useDeleteCourseMutation({
        onCompleted() {
            notify({ type: 'success', message: 'Kurs uğurla silindi' });
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
                    <Link to={`/d/training/course/edit/${courseId}`}>
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
                                        deleteCourse({ variables: { deleteCourseId: courseId } });
                                        e.preventDefault();
                                        e.stopPropagation();
                                    },
                                    description: 'Bu kurs silinəcək',
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
