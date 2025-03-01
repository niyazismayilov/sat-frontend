import { Box, Typography, BoxProps, Theme, styled, SxProps } from '@mui/material';
import { headerHeight, headerTopHeight } from 'config';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu } from './menu';

const Root = styled(Box)<BoxProps & { scrolledDown: boolean; sx: SxProps<Theme> }>(
    ({ theme, scrolledDown }: { theme: Theme; scrolledDown: boolean }) => ({
        position: 'absolute',
        top: 0,
        marginBottom: theme.spacing(0),
        width: '23%',
        marginTop: scrolledDown ? headerHeight - headerTopHeight : headerHeight,
    }),
);

const MenuItem = styled(Box)<BoxProps>(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    transition: '.2s',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(3, 3),
    cursor: 'pointer',
    '&:hover': {
        '& > *': {
            color: '#fff !important',
        },
        backgroundColor: theme.palette.primary.main,
    },
}));

export const EventsMenu: React.FC<{ item: any }> = ({ item }) => {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const [scrolledDown, setScrolledDown] = useState(false);

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
        <Box
            onMouseEnter={(e) => {
                handlePopoverOpen(e);
            }}
            onMouseLeave={handlePopoverClose}
        >
            <Root
                sx={{
                    display: open ? 'default' : 'none',
                }}
                scrolledDown={scrolledDown}
            >
                <Menu />
            </Root>
            <MenuItem
                sx={{
                    px: { md: 1.5, lg: 2 },
                }}
            >
                <Typography
                    variant="h5"
                    color="text.secondary"
                    sx={{
                        color: item.matchingRoutes.some((route) => window.location.pathname === route)
                            ? 'primary.main'
                            : 'text.secondary',
                    }}
                >
                    {t(`header:${item.name}`)}
                </Typography>
            </MenuItem>
        </Box>
    );
};
