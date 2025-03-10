import MenuIcon from '@mui/icons-material/Menu';
import { SwipeableDrawer, Box, IconButton, Theme, Divider, Typography } from '@mui/material';
import { useAuthDispatch } from 'context/auth/store';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/styles';
// import { SearchBar } from './searchbar';
import { LanguageSelector, SocialIcons, Link } from 'components';
import { ReactComponent as PhoneIcon } from 'assets/home/icons/phone.svg';
import { menuItems } from '../header-menu/components/menu-items';
import { TrainingsMenu } from './trainings-menu';
import { ConsultingMenu } from './consulting-menu';
import { EventsMenu } from './events-menu';
import { ProjectsMenu } from './projects-menu';

const Drawer = styled(SwipeableDrawer)(({ theme }: { theme: Theme }) => ({
    '& .MuiPaper-root': {
        width: '100%',
        padding: theme.spacing(2),
    },
    '& .menu-item': {
        fontWeight: 500,
        cursor: 'pointer',
    },
    '& .auth': {
        height: 44,
    },
}));

export const HeaderMobileMenu = () => {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    const dispatch = useAuthDispatch();

    return (
        <>
            <Drawer
                anchor="left"
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                onOpen={() => {
                    setOpen(false);
                }}
                sx={{ width: '100%' }}
            >
                <Box display="flex" justifyContent="space-between" flexDirection="column" sx={{ height: '100%' }}>
                    <Box>
                        <Box sx={{ width: '100%', mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton onClick={() => setOpen(false)}>
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        {/* <SearchBar mb={4} />           NOT DELETE */}
                        {/* <Box mb={8}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => {
                                    dispatch({ type: 'AUTH_DIALOG_OPENED', tab: 1 });
                                }}
                                sx={{ mb: 2 }}
                                className="auth"
                            >
                                {t('auth:signUp')}
                            </Button>
                            <Button
                                onClick={() => {
                                    dispatch({ type: 'AUTH_DIALOG_OPENED', tab: 0 });
                                }}
                                fullWidth
                                variant="outlined"
                                className="auth"
                            >
                                {t('auth:login')}
                            </Button>
                        </Box> */}
                        <Box>
                            {menuItems.map((item, i) => {
                                return item.route ? (
                                    <Link to={item.route} onClick={() => setOpen(false)} key={i}>
                                        <Box sx={{ mb: 2 }}>
                                            <Typography
                                                className="menu-item"
                                                variant="h5"
                                                sx={{
                                                    color: item.matchingRoutes.some(
                                                        (route) => window.location.pathname === route,
                                                    )
                                                        ? 'primary.main'
                                                        : 'text.secondary',
                                                }}
                                            >
                                                {t(`header:${item.name}`)}
                                            </Typography>
                                        </Box>
                                    </Link>
                                ) : (
                                    <>
                                        {item.name === 'trainings' && (
                                            <TrainingsMenu item={item} onClose={() => setOpen(false)} />
                                        )}
                                        {item.name === 'consulting' && (
                                            <ConsultingMenu item={item} onClose={() => setOpen(false)} />
                                        )}
                                        {item.name === 'events' && (
                                            <EventsMenu item={item} onClose={() => setOpen(false)} />
                                        )}
                                        {item.name === 'projects' && (
                                            <ProjectsMenu item={item} onClose={() => setOpen(false)} />
                                        )}
                                    </>
                                );
                            })}
                        </Box>
                    </Box>
                    <Box>
                        <Divider />
                        <Box
                            sx={{
                                padding: (theme) => theme.spacing(3),
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <LanguageSelector sx={{ mb: 5 }} />
                            <SocialIcons sx={{ mb: 2.5 }} />
                            <Box display="flex" alignItems="center">
                                <PhoneIcon />
                                <Typography
                                    className="phone-number"
                                    onClick={() => {
                                        location.href = 'tel:+994123103546';
                                    }}
                                >
                                    +994 12 310 35 46
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Drawer>
            <IconButton onClick={() => setOpen(true)}>
                <MenuIcon color="primary" />
            </IconButton>
        </>
    );
};
