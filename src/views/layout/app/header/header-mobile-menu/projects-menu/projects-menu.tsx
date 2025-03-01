import { Box, BoxProps, Typography, Theme, styled, Collapse as MuiCollapse } from '@mui/material';
import React, { useState } from 'react';
import { ProjectsMenuItem } from './projects-menu-item';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ArrowRightIcon } from 'assets/icons/arrow-right.svg';

const Root = styled(Box)<BoxProps>(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    marginBottom: theme.spacing(2),
    '& .menu-item': {
        fontWeight: 500,
        cursor: 'pointer',
    },
}));

const Collapse = styled(MuiCollapse)<BoxProps>(({ theme }: { theme: Theme }) => ({
    '& .training-title': {
        padding: theme.spacing(1, 1.25),
        backgroundColor: '#F7F8FE',
        width: '100%',
        borderRadius: '5px',
        marginBottom: theme.spacing(2),
        '& > p': {
            color: theme.palette.primary.main,
            fontSize: 16,
            fontWeight: 600,
        },
    },
}));

export const ProjectsMenu: React.FC<{ item: any; onClose: () => void }> = ({ item, onClose }) => {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    return (
        <>
            <Root onClick={() => setOpen((value) => !value)}>
                <Typography
                    className="menu-item"
                    variant="h5"
                    sx={{
                        color: item.matchingRoutes.some((route) => window.location.pathname === route)
                            ? 'primary.main'
                            : 'text.secondary',
                    }}
                >
                    {t(`header:${item.name}`)}
                </Typography>
                <ArrowRightIcon />
            </Root>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <ProjectsMenuItem onClose={onClose} />
            </Collapse>
        </>
    );
};
