import { Box, Grid, Theme, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { ReactComponent as ArrowIcon } from 'assets/common-icons/arrow-forward.svg';
import { Link } from 'components';
import { useTranslation } from 'react-i18next';
const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    backgroundColor: '#fff',
    padding: theme.spacing(2, 2),
    width: '100%',
    borderTop: '3px solid #F3F4F6',
    boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.1)',
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
            '& .events-item-text': {
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
        lineHeight: '28px',
        color: '#111827',
        borderBottom: `1px solid transparent`,
    },
    '& .grid-item': {
        '& > *:not(:last-child)': {
            '& .menu-item': {
                borderRight: '1px solid #F4F4F4',
            },
        },
    },
}));

export const Menu: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Root>
            <Grid item xs={3} className="grid-item">
                <Link to="/tedbirler/sat-forum">
                    <Box className="events-item">
                        <ArrowIcon className="course-item-icon" />
                        <Typography className="events-item-text">{t('eventsMenu:satForum')}</Typography>
                    </Box>
                </Link>
                <Link to="/tedbirler/biznes-idareciliyi-forumu">
                    <Box className="events-item">
                        <ArrowIcon className="course-item-icon" />
                        <Typography className="events-item-text">
                            {t('eventsMenu:businessAdministrationForum')}
                        </Typography>
                    </Box>
                </Link>
                <Link to="/tedbirler/stratejik-hr-forumu">
                    <Box className="events-item">
                        <ArrowIcon className="course-item-icon" />
                        <Typography className="events-item-text">{t('eventsMenu:strategicHRForum')}</Typography>
                    </Box>
                </Link>
                <Link to="/tedbirler/master-klass">
                    <Box className="events-item">
                        <ArrowIcon className="course-item-icon" />
                        <Typography className="events-item-text">{t('eventsMenu:masterClass')}</Typography>
                    </Box>
                </Link>
            </Grid>
        </Root>
    );
};
