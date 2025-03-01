import { Grid, Box, Container, Theme, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import card from 'assets/home/card.png';
import { Testimonial } from './testimonial';
import { BlogLottie } from './lotties/blog';
import { VideoLottie } from './lotties/video';
import { BroadcastLottie } from './lotties/broadcast';
import { Link } from 'components';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    padding: theme.spacing(6, 0),
    '& .title': {
        fontSize: 36,
        fontWeight: 700,
        marginBottom: theme.spacing(3),
        color: theme.palette.primary.main,
        [theme.breakpoints.down('md')]: {
            fontSize: 32,
        },
    },
    '& .detail': {
        fontSize: 20,
        fontWeight: 400,
        marginBottom: theme.spacing(9),
        color: theme.palette.primary.main,
        [theme.breakpoints.up('md')]: {
            width: '60%',
            fontSize: 16,
        },
    },
    '& .profit-item': {
        padding: theme.spacing(10, 0),
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#F4F4F4',
        border: '1px solid #EEEEEE',
        borderRadius: 10,
        '& > p': {
            fontSize: 20,
            fontWeight: 700,
        },
    },
    '& .icon': {
        width: 76,
        height: 76,
        marginBottom: theme.spacing(4),
    },
    '& .card-container': {
        margin: theme.spacing(11, 0, 6, 0),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
        borderRadius: 8,
    },
    '& .card-title': {
        fontSize: 48,
        fontWeight: 700,
        [theme.breakpoints.down('md')]: {
            fontSize: 32,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 20,
        },
    },
    '& .card-detail': {
        fontSize: 20,
        fontWeight: 400,
        [theme.breakpoints.down('md')]: {
            fontSize: 16,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 14,
        },
    },
    '& .card-image': {
        transform: 'translateY(-44px)',
        [theme.breakpoints.down('md')]: {
            width: '200px',
        },
    },
}));

export const Profit: React.FC = () => {
    return (
        <Root>
            <Container>
                <Typography className="title">Faydalı</Typography>
                <Typography className="detail">
                    100-dən çox ekspertin bilik və təcrübələrini sizin üçün topladıq.
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Link to="/bloq">
                            <BlogLottie style={{ cursor: 'pointer' }} />
                        </Link>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Link to="/video">
                            <VideoLottie style={{ cursor: 'pointer' }} />
                        </Link>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Link to="/verilis-seriyalari">
                            <BroadcastLottie style={{ cursor: 'pointer' }} />
                        </Link>
                    </Grid>
                </Grid>
                <Box className="card-container">
                    <img src={card} className="card-image" />
                    <Box>
                        <Typography className="card-title">Hissə-hissə ödəmək imkanı</Typography>
                        <Typography className="card-detail">
                            Birkart və Bolkart vasitəsilə daha rahat ödəniş et.
                        </Typography>
                    </Box>
                </Box>
            </Container>
            <Testimonial />
        </Root>
    );
};
