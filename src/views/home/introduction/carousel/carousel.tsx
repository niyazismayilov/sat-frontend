import { Box, Button, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/styles';
import { Link, SliderDots } from 'components';
import { useSliderShowsQuery } from 'graphql/generated';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';

const RootComponent = styled(Box)(({ theme }: { theme: Theme }) => ({
    '& .slider': {
        width: '100%',
        height: '100%',
    },
    '& .wrapper': {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
    },
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
            height: '40vh',
            objectPosition: '80% 0',
        },
    },
    '& .contact-button': {
        fontSize: 18,
        color: '#fff',
        borderColor: '#fff',
        border: '1px solid',
        [theme.breakpoints.down('md')]: {
            fontSize: 14,
            padding: theme.spacing(1, 2),
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 12,
            padding: theme.spacing(0.5, 1.5),
        },
    },

    '& .contact-button-response': {
        [theme.breakpoints.down('md')]: {
            marginTop: 150,
        },
    },
    '& .slider-dots': {
        position: 'absolute',
        marginTop: theme.spacing(-3),
        width: '100%',
    },
    '& .title': {
        fontSize: '3.6rem',
        color: '#F1F1F1',
        width: '520px',
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
            padding: '20px',
            backgroundColor: '#044AB1',
            width: '175px',
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

export const Carousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { t } = useTranslation();
    const sliderRef = useRef<any>();

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (_, next) => setCurrentIndex(next),
    };

    const { data } = useSliderShowsQuery({
        fetchPolicy: 'cache-and-network',
        variables: {
            sort: ['createdAt:desc'],
        },
    });

    const dataSliders = data?.sliderShows?.data.map((sliderShow) => sliderShow) || [];

    return (
        <RootComponent>
            <Slider {...settings} className="slider" ref={sliderRef}>
                {dataSliders.map((dataSlider) => {
                    return (
                        <Box className="wrapper" key={dataSlider.id}>
                            <Box className="details-wrapper">
                                {dataSlider.attributes?.title && (
                                    <Typography
                                        className="title"
                                        dangerouslySetInnerHTML={{
                                            __html: dataSlider.attributes?.title,
                                        }}
                                    />
                                )}

                                <Box className="hiddenSm">
                                    <Typography className="detail">{dataSlider.attributes?.content}</Typography>
                                </Box>
                                <Link to="/elaqe">
                                    <Button variant="contained" className="contact-button">
                                        {t('home:contact')}
                                    </Button>
                                </Link>
                            </Box>
                            <Box style={{ width: '100%', height: '100%' }}>
                                <img className="image" src={dataSlider.attributes?.coverImage.data?.attributes?.url} />
                            </Box>
                        </Box>
                    );
                })}
            </Slider>
            <SliderDots
                className="slider-dots"
                numberOfDots={dataSliders.length}
                currentIndex={currentIndex}
                onClick={(index) => sliderRef?.current.slickGoTo(index)}
            />
        </RootComponent>
    );
};
