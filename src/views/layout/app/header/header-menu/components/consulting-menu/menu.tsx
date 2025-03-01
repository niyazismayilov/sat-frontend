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
    '& .consulting-item': {
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
            '& .consulting-item-text': {
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
    '& .consulting-item-text': {
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
                <Link to="/konsaltinq/konsaltinq-nedir">
                    <Box className="consulting-item">
                        <ArrowIcon className="course-item-icon" />
                        <Typography className="consulting-item-text">{t('consultingMenu:whatIsConsulting')}</Typography>
                    </Box>
                </Link>
                <Link to="/konsaltinq/bazar-arasdirmalari">
                    <Box className="consulting-item">
                        <ArrowIcon className="course-item-icon" />
                        <Typography className="consulting-item-text">
                            {t('consultingMenu:businessDiagnosticAndResearch')}
                        </Typography>
                    </Box>
                </Link>
                <Link to="/konsaltinq/strategiyanin-hazirlanmasi">
                    <Box className="consulting-item">
                        <ArrowIcon className="course-item-icon" />
                        <Typography className="consulting-item-text">
                            {t('consultingMenu:developingAStrategy')}
                        </Typography>
                    </Box>
                </Link>
                <Link to="/konsaltinq/biznes-modelin-tekmillesdirilmesi">
                    <Box className="consulting-item">
                        <ArrowIcon className="course-item-icon" />
                        <Typography className="consulting-item-text">
                            {t('consultingMenu:improvingTheBusinessModel')}
                        </Typography>
                    </Box>
                </Link>
                <Link to="/konsaltinq/satis-sisteminin-qurulmasi">
                    <Box className="consulting-item">
                        <ArrowIcon className="course-item-icon" />
                        <Typography className="consulting-item-text">
                            {t('consultingMenu:buildingASalesSystem')}
                        </Typography>
                    </Box>
                </Link>
                <Link to="/konsaltinq/marketing-sisteminin-qurulmasi">
                    <Box className="consulting-item">
                        <ArrowIcon className="course-item-icon" />
                        <Typography className="consulting-item-text">
                            {t('consultingMenu:buildingAMarketingSystem')}
                        </Typography>
                    </Box>
                </Link>
                <Link to="/konsaltinq/insan-resurslari-konsaltinqi">
                    <Box className="consulting-item">
                        <ArrowIcon className="course-item-icon" />
                        <Typography className="consulting-item-text">
                            {t('consultingMenu:humanResourcesConsulting')}
                        </Typography>
                    </Box>
                </Link>
                <Link to="/konsaltinq/is-analizi">
                    <Box className="consulting-item">
                        <ArrowIcon className="course-item-icon" />
                        <Typography className="consulting-item-text">{t('consultingMenu:jobAnalysis')}</Typography>
                    </Box>
                </Link>
                <Link to="/konsaltinq/idareetme-strukturu">
                    <Box className="consulting-item">
                        <ArrowIcon className="course-item-icon" />
                        <Typography className="consulting-item-text">
                            {t('consultingMenu:managementStructure')}
                        </Typography>
                    </Box>
                </Link>
                <Link to="/konsaltinq/vezife-ohdelikleri">
                    <Box className="consulting-item">
                        <ArrowIcon className="course-item-icon" />
                        <Typography className="consulting-item-text">{t('consultingMenu:responsibilities')}</Typography>
                    </Box>
                </Link>
                <Link to="/konsaltinq/emek-haqqi-ve-motivasiya-sistemi">
                    <Box className="consulting-item">
                        <ArrowIcon className="course-item-icon" />
                        <Typography className="consulting-item-text">
                            {t('consultingMenu:salaryAndMotivationSystem')}
                        </Typography>
                    </Box>
                </Link>
                <Link to="/konsaltinq/performans-menecment-sistemi">
                    <Box className="consulting-item">
                        <ArrowIcon className="course-item-icon" />
                        <Typography className="consulting-item-text">
                            {t('consultingMenu:performanceManagementSystem')}
                        </Typography>
                    </Box>
                </Link>
                <Link to="/konsaltinq/ise-qebul-sistemi">
                    <Box className="consulting-item">
                        <ArrowIcon className="course-item-icon" />
                        <Typography className="consulting-item-text">
                            {t('consultingMenu:recruitmentSystem')}
                        </Typography>
                    </Box>
                </Link>
            </Grid>
        </Root>
    );
};
