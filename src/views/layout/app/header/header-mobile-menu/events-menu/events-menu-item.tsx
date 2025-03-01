import { Box, BoxProps, Theme, Typography, styled, Collapse } from '@mui/material';
import React, { useState } from 'react';
import { ReactComponent as ArrowIcon } from 'assets/common-icons/arrow-forward.svg';
import { Link } from 'components';
import { useTranslation } from 'react-i18next';
const Root = styled(Box)<BoxProps>(({ theme }: { theme: Theme }) => ({
    padding: theme.spacing(2, 3),
    width: '100%',
    borderRadius: '5px',
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
    '& .events-item': {
        display: 'flex',
        alignItems: 'center',
        transition: 'all .2s ease',
        width: '100%',
        overflowX: 'hidden',
        cursor: 'pointer',
        transform: 'translateX(-16px)',
        '&:hover': {
            transform: 'translateX(0px)',
            '& > .course-item-icon': {
                opacity: 1,
            },
            '& .course-item-text': {
                color: theme.palette.primary.main,
                borderBottom: `1px solid ${theme.palette.primary.main}`,
            },
        },
    },
    '& .course-item-icon': {
        color: theme.palette.primary.main,
        width: 16,
        height: 16,
        opacity: 0,
        marginRight: theme.spacing(0.5),
    },
    '& .events-item-text': {
        fontSize: 14,
        fontWeight: 500,
        lineHeight: '35px',
        color: '#111827',
    },
}));

export const EventsMenuItem: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [open, setOpen] = useState(true);
    const { t } = useTranslation();
    return (
        <>
            <Collapse in={open}>
                <Root onClick={() => setOpen((value) => !value)}>
                    <Link to="/events/sat-forum" onClick={onClose}>
                        <Box className="events-item">
                            <ArrowIcon className="course-item-icon" />
                            <Typography className="events-item-text">{t('eventsMenu:satForum')}</Typography>
                        </Box>
                    </Link>
                    <Link to="/events/business-administration-forum" onClick={onClose}>
                        <Box className="events-item">
                            <ArrowIcon className="course-item-icon" />
                            <Typography className="events-item-text">
                                {t('eventsMenu:businessAdministrationForum')}
                            </Typography>
                        </Box>
                    </Link>
                    <Link to="/events/strategic-hr-forum" onClick={onClose}>
                        <Box className="events-item">
                            <ArrowIcon className="course-item-icon" />
                            <Typography className="events-item-text">{t('eventsMenu:strategicHRForum')}</Typography>
                        </Box>
                    </Link>
                </Root>
            </Collapse>
        </>
    );
};
