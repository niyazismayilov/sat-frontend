import { Box, BoxProps, Typography } from '@mui/material';
import { Link } from 'components';
import { useTranslation } from 'react-i18next';
import { menuItems } from './components/menu-items';
import { Theme, styled } from '@mui/material/styles';
import React from 'react';
import { TrainingsMenu } from './components/trainings-menu';
import { ConsultingMenu } from './components/consulting-menu';
import { EventsMenu } from './components/events-menu';
import { ProjectsMenu } from './components/projects-menu';

const Menu = styled(Box)({
    height: '100%',
    display: 'flex',
    flexGrow: 1,
    marginLeft: 3,
});

const Root = styled(Box)<BoxProps>(({ theme }: { theme: Theme }) => ({
    [theme.breakpoints.down('lg')]: {
        display: 'none',
    },
}));

const MenuItem = styled(Box)<BoxProps>(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    transition: '.2s',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(3, 2),
    cursor: 'pointer',
    position: 'relative',
    '&:hover': {
        '& > *': {
            color: '#fff !important',
        },
        backgroundColor: theme.palette.primary.main,
    },
}));

export const HeaderMenu: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Root>
            <Menu>
                {menuItems.map((item, i) => {
                    return item.route ? (
                        <Link to={item.route}>
                            <MenuItem
                                key={i}
                                sx={{
                                    px: { md: 1.5, lg: 2 },
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        color: item.matchingRoutes.some((route) => window.location.pathname === route)
                                            ? 'primary.main'
                                            : 'text.secondary',
                                    }}
                                >
                                    {t(`header:${item.name}`)}
                                </Typography>
                            </MenuItem>
                        </Link>
                    ) : (
                        <>
                            {item.name === 'trainings' && <TrainingsMenu item={item} />}
                            {item.name === 'consulting' && <ConsultingMenu item={item} />}
                            {item.name === 'events' && <EventsMenu item={item} />}
                            {item.name === 'projects' && <ProjectsMenu item={item} />}
                        </>
                    );
                })}
            </Menu>
        </Root>
    );
};
