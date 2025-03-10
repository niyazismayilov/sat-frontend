import { AppBar, Typography, Box, Divider, Container, Theme, ButtonBase } from '@mui/material';
import { styled } from '@mui/styles';
import { useEffect, useState } from 'react';
import { /* LanguageSelector, */ Link, SocialIcons } from 'components';
import { HeaderMenu } from './header-menu';
import { headerTopHeight, logo } from 'config';
import { useTranslation } from 'react-i18next';
import { useAuthDispatch } from 'context/auth/store';
import { HeaderMobileMenu } from './header-mobile-menu';
import { useAuth } from 'context/auth/store';

const Root = styled(AppBar)(({ theme }: { theme: Theme }) => ({
    '& .header-top': {
        backgroundColor: '#F3F3F3',
        padding: theme.spacing(1, 0),
        transition: 'all .2s',
        '& > *': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        [theme.breakpoints.down('lg')]: {
            display: 'none',
        },
    },
    '& .header': {
        backgroundColor: theme.palette.background.default,
        '& > *': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        [theme.breakpoints.down('lg')]: {
            padding: theme.spacing(1, 0),
        },
    },
    '& .contact': {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(5),
        [theme.breakpoints.down('md')]: {
            gap: theme.spacing(3),
        },
        [theme.breakpoints.down('sm')]: {
            gap: theme.spacing(1),
        },
    },
    '& .phone-number': {
        color: theme.palette.primary.main,
        fontSize: 14,
        fontWeight: 500,
        cursor: 'pointer',
    },
    '& .logo-button': {
        [theme.breakpoints.up('md')]: {
            marginTop: theme.spacing(-1),
        },
    },
    '& .auth': {
        padding: theme.spacing(1.5, 5),
        '&.login': {
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            },
        },
    },
    '& .hiddenLgDown': {
        [theme.breakpoints.down('lg')]: {
            display: 'none',
        },
    },
    '& .hiddenLgUp': {
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
}));

export const Header: React.FC = () => {
    const [{ isLoggedIn }] = useAuth();

    const { t } = useTranslation();
    const [scrolledDown, setScrolledDown] = useState(false);

    const dispatch = useAuthDispatch();

    const handleScroll = () => {
        if (window.scrollY > 10) {
            setScrolledDown(true);
        } else {
            setScrolledDown(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Root elevation={0} style={{ boxShadow: scrolledDown ? '0 0 6px 0 rgba(0,0,0,.12)' : 'none' }}>
            <Box
                className="header-top"
                style={{
                    marginTop: scrolledDown ? `-${headerTopHeight}px` : '0px',
                }}
            >
                <Container>
                    <Box className="contact">
                        <Typography
                            className="phone-number"
                            onClick={() => {
                                location.href = 'tel:+994123103546';
                            }}
                        >
                            +994 55 455 56 45
                        </Typography>
                        <Divider orientation="vertical" flexItem />
                        <SocialIcons />
                    </Box>
                </Container>
            </Box>
            <Box className="header">
                <Container>
                    <Box display="flex" alignItems="center" sx={{ gap: '20px' }}>
                        <Box className="hiddenLgUp">
                            <HeaderMobileMenu />
                        </Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Link style={{ width: 'unset' }} to="/">
                                <ButtonBase disableRipple className="logo-button">
                                    <img src={logo} alt="satgroup logo" />
                                </ButtonBase>
                            </Link>
                            <Box flexGrow={1}>
                                <HeaderMenu />
                            </Box>
                        </Box>
                    </Box>
                    {/* <Box display="flex" alignItems="center">
                        {isLoggedIn ? (
                            <HeaderProfile />
                        ) : (
                            <>
                                <Button
                                    onClick={() => {
                                        dispatch({ type: 'AUTH_DIALOG_OPENED', tab: 0 });
                                    }}
                                    className="auth login"
                                >
                                    {t('auth:login')}
                                </Button>
                                <Button
                                    variant="contained"
                                    className="auth"
                                    sx={{ ml: 0.5 }}
                                    onClick={() => {
                                        dispatch({ type: 'AUTH_DIALOG_OPENED', tab: 1 });
                                    }}
                                >
                                    {t('auth:signUp')}
                                </Button>
                            </>
                        )}
                    </Box> */}
                </Container>
            </Box>
        </Root>
    );
};
