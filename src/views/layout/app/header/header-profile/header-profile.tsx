import { Box, Typography, Popover as MuiPopover, IconButton, Divider, Button, Hidden } from '@mui/material';
import { styled } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { useAuth } from 'context/auth/store';
import { useNotifications } from 'context/NotificationsContext';
import { useTranslation } from 'react-i18next';
import { LogoutDialog } from 'components/logout-dialog';
import { useState } from 'react';
import { ReactComponent as ArrowDownIcon } from 'assets/common-icons/arrow-down.svg';
import { ReactComponent as LogOutIcon } from 'assets/icons/logout-new.svg';
import { CustomerMenuItems } from './menu-items/customer-menu-items';
import { ManagerMenuItems } from './menu-items/manager-menu-items';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    border: '1px solid #E5E7EB',
    borderRadius: '6px',
    minWidth: '186px',
    maxWidth: '186px',
    padding: '5px',
    [theme.breakpoints.down('sm')]: {
        minWidth: '92px',
        maxWidth: '92px',
    },
    '& .profile-content': {
        marginLeft: theme.spacing(1),
    },
    '& .user': {
        minWidth: 40,
        minHeight: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.spacing(2),
        backgroundColor: 'rgba(248, 248, 248, 1)',
        marginLeft: '3px',
        '& > p': {
            color: theme.palette.text.secondary,
        },
    },
    '& .customer-name': {
        color: theme.palette.text.secondary,
        letterSpacing: '0.25px',
    },
    '& .customer-code': {
        color: 'rgba(231, 109, 79, 1)',
    },
    '& .arrow-button': {
        width: 'max-content',
        height: 'max-content',
        marginLeft: 'auto',
    },
    '& .arrow-icon': {
        transition: 'all .3s',
        width: '18px',
        height: '18px',
    },
}));

const Popover = styled(MuiPopover)(({ theme }: { theme: Theme }) => ({
    marginTop: theme.spacing(0.8),
    '& .MuiPaper-root': {
        minWidth: 186,
        border: '1px solid #D0D5DD',
        boxShadow: 'none',
        '& .MuiButtonBase-root': {
            textTransform: 'none',
        },
        [theme.breakpoints.down('xs')]: {
            minWidth: '90vw',
        },
    },
    '& .popover-content': {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(1),
    },
    '& .divider': {
        color: theme.palette.text.disabled,
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    '& .menu-item': {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontSize: '14px',
        color: '#4E4B66',
        padding: '8px 0',
        paddingLeft: theme.spacing(1),
        '&.selected': {
            color: '#044AB1',
        },
        '& svg': {
            width: '24px',
            height: '24px',
        },
    },
}));

export const HeaderProfile: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [{ user }, dispatch] = useAuth();
    const { notify } = useNotifications();
    const { t } = useTranslation();

    const handleClick = (event): void => {
        setAnchorEl(event.currentTarget);
    };

    const logOut = (): void => {
        dispatch({ type: 'LOGGED_OUT' });
        notify({
            type: 'success',
            message: t('login:logout'),
        });
    };

    const handleClose = (): void => {
        setAnchorEl(null);
    };

    const renderMenuItems = (): React.ReactElement => {
        if (user?.role['type'] === 'authenticated') {
            return <CustomerMenuItems {...{ handleClose }} />;
        }
        return <ManagerMenuItems {...{ handleClose }} />;
    };

    const [openDialog, setOpenDialog] = useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    return (
        <>
            <Root onClick={(event) => handleClick(event)}>
                <LogoutDialog handleConfirm={logOut} open={openDialog} handleClose={handleCloseDialog} />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box className="user">
                        <Typography fontWeight="600" fontSize="0.875rem">
                            {user?.firstName[0] + '' + user?.lastName[0]}
                        </Typography>
                    </Box>
                    <Hidden smDown>
                        <Box className="profile-content">
                            <Typography fontWeight="700" fontSize="0.875rem" className="customer-name">
                                {user?.firstName + ' ' + user?.lastName}
                            </Typography>
                        </Box>
                    </Hidden>
                </Box>
                <IconButton className="arrow-button">
                    <ArrowDownIcon
                        style={{
                            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                        className="arrow-icon"
                    />
                </IconButton>
            </Root>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Box className="popover-content">
                    {renderMenuItems()}
                    <Divider className="divider" />
                    <Button
                        startIcon={<LogOutIcon />}
                        className="menu-item"
                        onClick={handleOpenDialog}
                        style={{ color: '#CD2227' }}
                    >
                        {t('login:logout')}
                    </Button>
                </Box>
            </Popover>
        </>
    );
};
