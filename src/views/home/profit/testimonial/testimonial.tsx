import { useRef, useState } from 'react';
import { Box, Typography, Theme, Container, useTheme, IconButton } from '@mui/material';
import Slider from 'react-slick';
import { styled } from '@mui/styles';
import { ReactComponent as ArrowForwardIcon } from 'assets/common-icons/arrow-forward.svg';
import { ReactComponent as ArrowBackIcon } from 'assets/common-icons/arrow-back.svg';
import { TestimonialItem } from './testimonial-item';
// import { ReactComponent as Avatar0 } from 'assets/home/testimonial-avatars/avatar.svg';
// import { ReactComponent as Avatar1 } from 'assets/home/testimonial-avatars/avatar1.svg';
// import { ReactComponent as Avatar2 } from 'assets/home/testimonial-avatars/avatar2.svg';
// import { ReactComponent as Avatar3 } from 'assets/home/testimonial-avatars/avatar3.svg';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    padding: theme.spacing(6, 0),
    backgroundColor: theme.palette.primary.main,
    overflow: 'hidden',

    '& .testimonial-header': {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(6),
        alignItems: 'center',
        width: '100%',
        color: '#fff',
    },
    '& .testimonial-title': {
        fontSize: 36,
        fontWeight: 400,
        [theme.breakpoints.up('md')]: {
            width: '80%',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: 24,
        },
    },
    '& .slider': {
        width: '100vw',
        cursor: 'grab',
        marginBottom: theme.spacing(6),
        '&:active': {
            cursor: 'grabbing',
        },
    },
    '& .comment': {
        padding: theme.spacing(1.5, 5),
        fontSize: 18,
        fontWeight: 700,
        color: '#fff',
        borderColor: '#fff',
    },
}));

export const Testimonial: React.FC = () => {
    const sliderRef = useRef<any>();
    const theme = useTheme();

    const [currentIndex, setCurrentIndex] = useState(0);

    const settings = {
        arrows: false,
        infinite: true,
        speed: 800,
        slidesToShow: 4,
        slidesToScroll: 1,
        beforeChange: (_, next) => setCurrentIndex(next),
        responsive: [
            {
                breakpoint: theme.breakpoints.values.lg,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: theme.breakpoints.values.md,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: theme.breakpoints.values.sm,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <Root>
            <Container>
                <Box className="testimonial-header">
                    <Typography className="testimonial-title">
                        Ölkəmizdə yüzlərlə <span style={{ fontWeight: 'bold' }}>sahibkar</span> və
                        <span style={{ fontWeight: 'bold' }}> əməkdaş</span> tərəfindən etibar edilir
                    </Typography>
                    <Box display="flex">
                        <IconButton>
                            <ArrowBackIcon
                                onClick={() => sliderRef?.current.slickGoTo(currentIndex - 2)}
                                color="#fff"
                            />
                        </IconButton>
                        <IconButton>
                            <ArrowForwardIcon
                                onClick={() => sliderRef?.current.slickGoTo(currentIndex + 2)}
                                color="#fff"
                            />
                        </IconButton>
                    </Box>
                </Box>
                <Slider {...settings} className="slider" ref={sliderRef}>
                    <TestimonialItem
                        srcUrl={'https://www.youtube.com/embed/rYDclsTVU_o'}
                        testimonial="Araz Supermarket`in Mağaza müdirlərindən olan Emil Bağırov - `Peşəkar İdarəçilik Kursu"
                        key={1}
                        // writerImg={<Avatar0 />}
                        // writerName="Loki Bright"
                        // writerTitle="Founder, Bitcoin (BTC)"
                    />
                    <TestimonialItem
                        srcUrl={'https://www.youtube.com/embed/lqPiXIjQtnc'}
                        testimonial="Praktiki Satış Kursu - Sevda Aliyeva - Araznet"
                        key={2}
                        // writerImg={<Avatar1 />}
                        // writerName="Loki Bright"
                        // writerTitle="Founder, Bitcoin (BTC)"
                    />
                    <TestimonialItem
                        srcUrl={'https://www.youtube.com/embed/2O3fauFAdQU'}
                        testimonial="“Odontos” - Qasım Qasımov - “Praktiki Satış” kursu!"
                        key={3}
                        // writerImg={<Avatar2 />}
                        // writerName="Loki Bright"
                        // writerTitle="Founder, Bitcoin (BTC)"
                    />
                    <TestimonialItem
                        srcUrl={'https://www.youtube.com/embed/N6CLkv_aoG0'}
                        testimonial="“Avrora” - Əli Anar - “Layihələrin idarə edilməsi” kursu!"
                        key={4}
                        // writerImg={<Avatar3 />}
                        // writerName="Loki Bright"
                        // writerTitle="Founder, Bitcoin (BTC)"
                    />
                    <TestimonialItem
                        srcUrl={'https://www.youtube.com/embed/9gDuF_R0k5M'}
                        testimonial="Fransa Mədəniyyət mərkəzinin əməkdaşları üçün Praktiki Satış təlimləri!"
                        key={5}
                        // writerImg={<Avatar2 />}
                        // writerName="Loki Bright"
                        // writerTitle="Founder, Bitcoin (BTC)"
                    />
                    <TestimonialItem
                        srcUrl={'https://www.youtube.com/embed/KXBBeHLjMfQ'}
                        testimonial="Teymur İslamlı - “Təlimçilər üçün Təlim” kursu"
                        key={6}
                        // writerImg={<Avatar3 />}
                        // writerName="Loki Bright"
                        // writerTitle="Founder, Bitcoin (BTC)"
                    />

                    <TestimonialItem
                        srcUrl={'https://www.youtube.com/embed/tyEhZIl4RoQ'}
                        testimonial="“Focus Optika” -Məmmədemin İslamov - Konsaltinq xidməti"
                        key={7}
                        // writerImg={<Avatar3 />}
                        // writerName="Loki Bright"
                        // writerTitle="Founder, Bitcoin (BTC)"
                    />
                    <TestimonialItem
                        srcUrl={'https://www.youtube.com/embed/d5_XtZrpCWw'}
                        testimonial="“Missiya” - Mircavid Əhməd - Təlimlər!"
                        key={8}
                        // writerImg={<Avatar3 />}
                        // writerName="Loki Bright"
                        // writerTitle="Founder, Bitcoin (BTC)"
                    />
                </Slider>
            </Container>
        </Root>
    );
};
