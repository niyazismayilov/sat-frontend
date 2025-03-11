import { Box, Button, Theme, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import wrapper from 'assets/home/aboutUs-background.jpg';
import { Link } from 'components';
import { useTranslation } from 'react-i18next';

const Wrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    '& .details-wrapper': {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: theme.spacing(5),
        zIndex: 1,
        width: '45%',
        [theme.breakpoints.down('md')]: {
            width: '100%',
            alignItems: 'center',
            paddingLeft: 0,
            justifyContent: 'start',
        },
    },
    '& .image': {
        objectFit: 'cover',
        width: '100%',
        position: 'relative',
        [theme.breakpoints.down('md')]: {
            height: '80vh',
            objectPosition: '80% 0',
        },
        [theme.breakpoints.down('sm')]: {
            height: '70vh',
            objectPosition: '80% 0',
        },
    },
    '& .contact-button': {
        fontSize: 18,
        [theme.breakpoints.down('md')]: {
            fontSize: 16,
            padding: theme.spacing(1.5, 3),
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 14,
            padding: theme.spacing(1, 2),
        },
    },
    '& .title': {
        fontSize: '3.6rem',
        color: '#111827',
        lineHeight: '95px',
        [theme.breakpoints.down('lg')]: {
            fontSize: '2rem',
            lineHeight: '40px',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: 20,
            lineHeight: '24px',
        },
    },
    '& .second-title': {
        color: theme.palette.primary.main,
        fontSize: '3.6rem',
        fontWeight: 700,
        lineHeight: '95px',
        marginBottom: theme.spacing(2.5),
        [theme.breakpoints.down('lg')]: {
            fontSize: '2rem',
            lineHeight: '40px',
            marginBottom: theme.spacing(2),
        },
        [theme.breakpoints.down('md')]: {
            fontSize: 20,
            lineHeight: '24px',
            marginBottom: theme.spacing(1.5),
        },
    },
    '& .detail': {
        fontSize: '20px',
        fontWeight: 500,
        lineHeight: '30px',
        color: '#374151',
        marginBottom: theme.spacing(6.5),
        [theme.breakpoints.down('lg')]: {
            fontSize: '16px',
            lineHeight: '21px',
            marginBottom: theme.spacing(3.5),
        },
        [theme.breakpoints.down('md')]: {
            textAlign: 'center',
            fontSize: '14px',
            lineHeight: '16px',
            marginBottom: theme.spacing(3),
        },
    },
    '& .hiddenMdDown': {
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
}));

export const GeneralInfo: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Wrapper>
            <Box className="details-wrapper">
                <Typography className="title">Sənə uyğun olanı</Typography>
                <Typography className="second-title">Gəl birlikdə tapaq!</Typography>
                <Box className="hiddenMdDown">
                    <Typography className="detail">
                        SAT Group şirkətinin fəaliyyət istiqaməti satış, marketinq, idarəetmə təlimləri və biznesiniz
                        inkişafı üçün konsaltinq xidmətləridirS.
                    </Typography>
                </Box>
                <Link to="/elaqe">
                    <Button variant="contained" className="contact-button" color="primary">
                        {t('home:contact')}
                    </Button>
                </Link>
            </Box>
            <Box style={{ width: '100%', height: '100%' }}>
                <img className="image" src={wrapper} />
            </Box>
        </Wrapper>
    );
};
