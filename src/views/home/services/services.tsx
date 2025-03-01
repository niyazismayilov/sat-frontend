import { Box, Container, Grid, Typography, Theme } from '@mui/material';
import { styled } from '@mui/styles';
import services1 from 'assets/home/services1.png';
import services2 from 'assets/home/services2.png';
import services3 from 'assets/home/services3.png';
import services4 from 'assets/home/services4.png';
import { BounceInRight } from 'components';
import { ServiceItem } from './service-item';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    padding: theme.spacing(6, 0),
    backgroundColor: '#F4F4F4',
    '& .title': {
        fontSize: 36,
        fontWeight: 700,
        color: theme.palette.primary.main,
        marginBottom: theme.spacing(1),
    },
    '& .detail': {
        fontSize: 20,
        fontWeight: '400px',
        color: theme.palette.primary.main,
        marginBottom: theme.spacing(8),
        [theme.breakpoints.up('md')]: {
            width: '100%',
        },
    },
}));

const services = [
    {
        title: 'Satış təlimləri',
        detail: 'Effektli satış texnikaları, satışın idarə olunması və satış alətləri					',
        image: services1,
    },
    {
        title: 'İdarəetmə təlimləri',
        detail: 'Müasir idarəetmə sistemləri, effektiv üsullar və alətlər',
        image: services2,
    },
    {
        title: 'Marketinq təlimləri',
        detail: 'Rəqəmsal marketinq peşəkarına çevrilmək üçün fürsətlər',
        image: services3,
    },
    {
        title: 'Konsaltinq',
        detail: 'Diaqnostika, strategiyanın hazırlanması, satış, marketinq və idarəetmə sistemləri							',
        image: services4,
    },
];

export const Services = () => {
    return (
        <Root>
            <Container>
                <Typography className="title">Xidmətlərimiz</Typography>
                <Typography className="detail">
                    Müasir dünya standartlarına cavab verən və yerli bazara uyğunlaşdırılmış təlimlər və biznes
                    konsaltinq xidmətlərini əlçatan edirik.
                </Typography>
                <BounceInRight>
                    <Grid container spacing={{ xs: 3 }}>
                        {services.map((service, index) => (
                            <Grid key={index} item xs={12} sm={6} md={3} display="flex" justifyContent="center">
                                <ServiceItem
                                    index={index}
                                    image={service.image}
                                    title={service.title}
                                    detail={service.detail}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </BounceInRight>
            </Container>
        </Root>
    );
};
