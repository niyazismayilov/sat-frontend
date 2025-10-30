import { Box, Button, Theme, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import wrapper from 'assets/home/nartio.jpg';

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
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: theme.spacing(8),
        zIndex: 1,
        width: '100%',
        [theme.breakpoints.down('md')]: {
            paddingBottom: theme.spacing(4),
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
        fontSize: '3rem',
        color: '#FFFFFF',
        lineHeight: '80px',
        textAlign: 'center',
        [theme.breakpoints.down('lg')]: {
            fontSize: '1.75rem',
            lineHeight: '36px',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: 18,
            lineHeight: '22px',
        },
    },
    '& .second-title': {
        color: '#FFFFFF',
        fontSize: '3rem',
        fontWeight: 700,
        lineHeight: '80px',
        marginBottom: theme.spacing(2.5),
        textAlign: 'center',
        [theme.breakpoints.down('lg')]: {
            fontSize: '1.75rem',
            lineHeight: '36px',
            marginBottom: theme.spacing(2),
        },
        [theme.breakpoints.down('md')]: {
            fontSize: 18,
            lineHeight: '22px',
            marginBottom: theme.spacing(1.5),
        },
    },
    '& .detail': {
        fontSize: '20px',
        fontWeight: 500,
        lineHeight: '30px',
        color: '#FFFFFF',
        marginBottom: theme.spacing(6.5),
        textAlign: 'center',
        [theme.breakpoints.down('lg')]: {
            fontSize: '16px',
            lineHeight: '21px',
            marginBottom: theme.spacing(3.5),
        },
        [theme.breakpoints.down('md')]: {
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
    return (
        <Wrapper>
            <Box className="details-wrapper">
                <Typography className="title">Yumşaq bacarıqların</Typography>
                <Typography className="second-title">qiymətləndirilməsi platforması</Typography>
                <Box className="hiddenMdDown">
                    <Typography className="detail">
                        Əməkdaşların qabiliyyətlərinin, şəxsi xüsusiyyətlərinin
                        <br />
                        qiymətləndirilməsi uğurlu idarəçilik üçün ən effektli alət
                    </Typography>
                </Box>
                <a href="https://nartio.com/" target="_blank" rel="noopener noreferrer">
                    <Button variant="contained" className="contact-button" color="primary">
                        Daha ətraflı
                    </Button>
                </a>
            </Box>
            <Box style={{ width: '100%', height: '100%' }}>
                <img className="image" src={wrapper} />
            </Box>
        </Wrapper>
    );
};
