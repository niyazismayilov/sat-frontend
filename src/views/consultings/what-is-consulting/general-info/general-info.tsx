import { Box, Theme, Container, Typography } from '@mui/material';
import Slider from 'react-slick';
import image23 from 'assets/consulting/image23.png';
import { styled } from '@mui/styles';
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
            justifyContent: 'flex-end',
            marginBottom: theme.spacing(8),
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
        color: '#fff',
        borderColor: '#fff',
        [theme.breakpoints.down('md')]: {
            fontSize: 14,
            padding: theme.spacing(1, 2),
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 12,
            padding: theme.spacing(0.5, 1.5),
        },
    },
    '& .title': {
        fontSize: '3.6rem',
        color: '#F1F1F1',
        lineHeight: '95px',
        marginBottom: theme.spacing(2.5),
        [theme.breakpoints.down('lg')]: {
            fontSize: '2rem',
            lineHeight: '40px',
            marginBottom: theme.spacing(2),
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '1rem',
            lineHeight: '20px',
            marginBottom: theme.spacing(1.5),
        },
    },
    '& .detail': {
        fontSize: '20px',
        fontWeight: 500,
        lineHeight: '30px',
        color: '#C9C9C9',
        marginBottom: theme.spacing(6.5),
        [theme.breakpoints.down('lg')]: {
            fontSize: '16px',
            lineHeight: '21px',
            marginBottom: theme.spacing(3.5),
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '12px',
            lineHeight: '16px',
            marginBottom: theme.spacing(3),
        },
    },
    '& .hiddenSm': {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
}));

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    marginBottom: theme.spacing(3),
    marginTop: '-6px',
    [theme.breakpoints.down('lg')]: {
        marginTop: theme.spacing(6),
    },
    '& .container': {
        display: 'flex',
        [theme.breakpoints.down('lg')]: {
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
    '& .image-wrapper': {
        width: '100%',
        position: 'relative',
        objectFit: 'cover',
        [theme.breakpoints.up('lg')]: {
            height: '741px',
        },
        [theme.breakpoints.down('lg')]: {
            height: '80vh',
            objectPosition: '80% 0',
        },
    },
    '& .slider': {
        width: '50%',
        height: '100%',
        [theme.breakpoints.down('lg')]: {
            width: '100%',
            marginBottom: theme.spacing(3),
        },
    },
    '& .slick-dots li button:before': {
        color: '#fff',
        fontSize: 12,
        transition: 'all .2s',
    },
    '& .slick-dots': {
        bottom: '24px',
    },
    '& .info': {
        padding: theme.spacing(6, 8),
        backgroundColor: '#F4F4F4',
        // height: '100%',
        [theme.breakpoints.up('lg')]: {
            height: '735px',
        },
        [theme.breakpoints.down('lg')]: {
            padding: theme.spacing(6, 3),
        },
    },
}));

export const GeneralInfo: React.FC = () => {
    const { t } = useTranslation();

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    return (
        <>
            <Wrapper>
                <Box className="details-wrapper">
                    <Slider {...settings} className="slider">
                        <Box className="image-wrapper">
                            <img className="image" src={image23} />
                        </Box>
                        <Box className="image-wrapper">
                            <img className="image" src={image23} />
                        </Box>
                        <Box className="image-wrapper">
                            <img className="image" src={image23} />
                        </Box>
                    </Slider>
                </Box>
            </Wrapper>
            <Root>
                <Container>
                    <Box className="container">
                        <Slider {...settings} className="slider">
                            <Box className="image-wrapper">
                                <img className="image" src={image23} />
                            </Box>
                            <Box className="image-wrapper">
                                <img className="image" src={image23} />
                            </Box>
                            <Box className="image-wrapper">
                                <img className="image" src={image23} />
                            </Box>
                        </Slider>
                        <Box>
                            <Box className="info">
                                <Typography fontSize={18} fontWeight={700} mb={2.5} color="primary.main">
                                    {t('consulting:whatIsConsulting')}
                                </Typography>
                                <Typography fontSize={24} fontWeight={600} mb={3} color="primary.main">
                                    {t('consulting:body1')}
                                </Typography>
                                <Typography fontSize={18} fontWeight={600} color="#374151">
                                    {t('consulting:body2')}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Root>
        </>
    );
};
