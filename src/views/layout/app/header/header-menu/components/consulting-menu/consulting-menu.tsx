import { Box, Typography, BoxProps, Theme, styled, SxProps } from '@mui/material';
import { headerHeight, headerTopHeight } from 'config';
import React, { useState, useEffect, useRef } from 'react';
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

export const ConsultingMenu: React.FC<{ item: any }> = ({ item }) => {
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

    const ref = useRef<any>(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            const element = document.querySelector('#consultingMenu');
            element?.setAttribute('style', 'display:none');
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <Box
            onMouseEnter={(e) => {
                const element = document.querySelector('#consultingMenu');
                element?.setAttribute('style', 'display:default');
                handlePopoverOpen(e);
            }}
            onMouseLeave={handlePopoverClose}
            ref={ref}
        >
            <Root
                sx={{
                    display: open ? 'default' : 'none',
                }}
                scrolledDown={scrolledDown}
                id="consultingMenu"
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
