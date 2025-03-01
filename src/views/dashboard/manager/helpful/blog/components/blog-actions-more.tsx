import { IconButton, List, ListItem, ListItemButton, ListItemText, Popover, TableCell } from '@mui/material';
import { ReactComponent as MoreHorizIcon } from 'assets/icons/manager-dashboard/more-icon.svg';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import { Link } from 'components';
import { useDeleteBlogMutation } from 'graphql/generated';
import { useNotifications } from 'context/NotificationsContext';

type BlogsActionsProps = {
    blogId: string;
    refetch: () => void;
};

export const BlogsActionsMore: React.FC<BlogsActionsProps> = ({ blogId, refetch }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>();
    const { notify, confirm } = useNotifications();

    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event?.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [deleteBlog] = useDeleteBlogMutation({
        onCompleted() {
            notify({ type: 'success', message: 'Bloq uğurla silindi' });
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
                    <Link to={`/d/helpful/blog/edit/${blogId}`}>
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
                                        deleteBlog({ variables: { deleteBlogId: blogId } });
                                        e.preventDefault();
                                        e.stopPropagation();
                                    },
                                    description: 'Bu bloq silinəcək',
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
