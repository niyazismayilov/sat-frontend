import { IconButton, List, ListItem, ListItemButton, ListItemText, Popover, TableCell } from '@mui/material';
import Divider from '@mui/material/Divider';
import { ReactComponent as MoreHorizIcon } from 'assets/icons/manager-dashboard/more-icon.svg';
import { Link } from 'components';
import { useNotifications } from 'context/NotificationsContext';
import { useDeleteSliderShowMutation } from 'graphql/generated';
import { useState } from 'react';

type BlogsActionsProps = {
    sliderId: string;
    refetch: () => void;
};

export const SliderActionsMore: React.FC<BlogsActionsProps> = ({ sliderId, refetch }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>();
    const { notify, confirm } = useNotifications();

    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event?.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [sliderBlog] = useDeleteSliderShowMutation({
        onCompleted() {
            notify({ type: 'success', message: 'Slyad uğurla silindi' });
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
                    <Link to={`/d/helpful/sliders/edit/${sliderId}`}>
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
                                        sliderBlog({ variables: { deleteSliderShowId: sliderId } });
                                        e.preventDefault();
                                        e.stopPropagation();
                                    },
                                    description: 'Bu slyad silinəcək',
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
