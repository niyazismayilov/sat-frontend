import { Box, ButtonBase, Drawer as MuiDrawer, Typography, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/styles';
import { useEffect, useState } from 'react';
import { MenuList } from './menu-list';
// import { lightModeLogo, darkModeLogo, minimalLogo } from 'config';
import { Theme } from '@mui/material/styles';
import { ReactComponent as LogoutIcon } from 'assets/icons/logout.svg';
import { Link } from 'components';
import { LogoutDialog } from 'components/logout-dialog';
import { logo } from 'config';
import { useAuth, useAuthDispatch } from 'context/auth/store';
import { useNotifications } from 'context/NotificationsContext';
import { useTranslation } from 'react-i18next';
import { collapsedSidebarWidth, sidebarWidth } from '../config';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { useLayout } from 'context/layout/store';

const Root = styled(Box)(({ theme, managerSidebarCollapsed }: { theme: Theme; managerSidebarCollapsed: boolean }) => ({
    position: 'fixed',
    height: `calc(var(--vh, 1vh) * 100)`,
    display: 'flex',
    zIndex: 11,
    boxShadow: theme.dark ? theme.shadows[2] : 'none',
    '& .collapsed-button': {
        width: 24,
        height: 54,
        backgroundColor: 'rgba(59, 67, 242, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        marginTop: theme.spacing(4.5),
        position: 'absolute',
        right: -24,
    },
    '& .collapsed-icon': {
        color: 'text.secondary',
        transform: managerSidebarCollapsed ? 'rotate(-90deg)' : 'rotate(90deg)',
    },
}));

const Drawer = styled(MuiDrawer)(
    ({
        theme,
        isMobile,
        managerSidebarCollapsed,
    }: {
        theme: Theme;
        isMobile: boolean;
        managerSidebarCollapsed: boolean;
    }) => ({
        width: !isMobile && managerSidebarCollapsed ? collapsedSidebarWidth : sidebarWidth,
        '& .MuiDrawer-paper': {
            transition: isMobile ? 'none' : 'all .2s',
            borderRight: 'none',
            width: !isMobile && managerSidebarCollapsed ? collapsedSidebarWidth : sidebarWidth,
        },
        '& .dashboard-menu': {
            '&::-webkit-scrollbar': {
                width: '0.3em',
                height: '0.1em',
            },
            '&::-webkit-scrollbar-thumb': {
                borderRadius: '8px',
                backgroundColor: 'rgba(59, 67, 242, .25)',
            },
            backgroundColor: theme.dark ? theme.palette.background.default : 'rgba(59, 67, 242, 0.02)',

            overflowY: 'auto',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            '& .logo': {
                minHeight: 42,
                width: 'auto',
                margin: theme.spacing(6, 0),
                display: 'flex',
                justifyContent: 'center',
            },
            '& .logout-button': {
                display: 'flex',
                padding: theme.spacing(2, 1.5),
                color: theme.palette.primary.main,
                justifyContent: 'flex-start',
                marginBottom: theme.spacing(2),
            },
        },
        '& .logout-icon': {
            marginLeft: managerSidebarCollapsed ? theme.spacing(4) : theme.spacing(3),
            marginRight: managerSidebarCollapsed ? theme.spacing(4) : theme.spacing(3),
        },
    }),
);

export const Sidebar: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { t } = useTranslation();
    const [{ user }] = useAuth();
    const authDispatch = useAuthDispatch();
    const { notify } = useNotifications();
    const [collapsed, setCollapsed] = useState<boolean>(true);
    const [{ managerSidebarCollapsed }, dispatch] = useLayout();

    useEffect(() => {
        if (isMobile) {
            dispatch({ type: 'SET_MANAGER_SIDEBAR_COLLAPSED', collapsed: false });
        }
    }, [isMobile]);

    const logOut = (): void => {
        authDispatch({ type: 'LOGGED_OUT' });
        notify({
            type: 'success',
            message: t('login:logout'),
        });
    };

    const collapse = () => {
        if (isMobile) {
            setCollapsed((val) => !val);
        } else {
            dispatch({ type: 'SET_MANAGER_SIDEBAR_COLLAPSED', collapsed: !managerSidebarCollapsed });
        }
    };

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <Root managerSidebarCollapsed={managerSidebarCollapsed}>
            <LogoutDialog open={open} handleClose={handleClose} handleConfirm={logOut} />
            <Drawer
                variant={isMobile ? undefined : 'permanent'}
                anchor="left"
                open={isMobile ? !collapsed : !managerSidebarCollapsed}
                onClose={() => isMobile && setCollapsed(true)}
                managerSidebarCollapsed={managerSidebarCollapsed}
                isMobile={isMobile}
            >
                <Box className="dashboard-menu">
                    {!managerSidebarCollapsed && (
                        <Link to="/" className="logo">
                            <img src={logo} alt="falkon logo" />
                        </Link>
                    )}

                    <MenuList />
                    <ButtonBase className="logout-button" onClick={handleOpen}>
                        <LogoutIcon className="logout-icon" />
                        <Typography fontWeight="500">Çıxış</Typography>
                    </ButtonBase>
                    <Box
                        sx={{
                            display: 'flex',
                            border: '1px solid #044AB1',
                            borderRadius: '8px',
                            alignItems: 'center',
                            marginBottom: '16px',
                            padding: '20px',
                            gap: '12px',
                        }}
                    >
                        <Box
                            sx={{
                                width: '40px',
                                height: '40px',
                                backgroundColor: '#CED0FC',
                                borderRadius: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography fontWeight={700} color="#4E4B66">
                                {user?.firstName.charAt(0)}
                                {user?.lastName.charAt(0)}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#4E4B66' }}>
                                {user?.firstName} {user?.lastName}
                            </Typography>
                            <Typography sx={{ fontSize: '13px', fontWeight: 500, color: '#6E7191' }}>
                                {user?.email}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Drawer>
            <ButtonBase className="collapsed-button" onClick={collapse}>
                <KeyboardArrowDownOutlinedIcon className="collapsed-icon" />
            </ButtonBase>
        </Root>
    );
};
