import { Box, Container, Grid, Hidden, Theme, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { BounceInRight } from 'components';
import image from '../../../assets/home/director.png';
import services from '../../../assets/home/whyus.svg';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    background: '#F4F4F4',
    '& .title': {
        fontSize: 36,
        fontWeight: 700,
        marginBottom: theme.spacing(6),
        color: theme.palette.primary.main,
        paddingTop: '20px',
    },
    '& .director-item': {
        backgroundColor: '#F4F4F4',
        height: '100%',
        color: '#111827',
        fontSize: '20px',
        fontWeight: '500',
    },
    '& .content': {
        marginTop: '12px',
    },

    '& .image': {
        height: '100%',
        [theme.breakpoints.down('lg')]: {
            display: 'flex',
            justifyContent: 'center',
        },
    },
    '& .image1': {
        height: '100%',
        objectFit: 'cover',
        width: '600px',
        [theme.breakpoints.down('md')]: {
            width: '350px',
        },
    },
    '& .content-name': {
        marginTop: '30px',
        marginBottom: '50px',
        [theme.breakpoints.down('md')]: {
            width: '350px',
        },
    },
}));

export const Directors: React.FC = () => {
    return (
        <Root>
            <Container>
                <Typography className="title">Direktorun Sözü</Typography>

                <BounceInRight>
                    <Grid container spacing={4}>
                        <Hidden lgUp>
                            <Grid item xs={12} sm={12} md={12} lg={6}>
                                <Box className="image">
                                    <img src={services} className="image1" />
                                </Box>
                            </Grid>
                        </Hidden>
                        <Grid item xs={12} sm={12} md={12} lg={6}>
                            <Box className="director-item">
                                <Box>
                                    <Hidden lgUp>
                                        <img src={image} className="content-name" />
                                    </Hidden>
                                    <Typography>
                                        Yarandığımız 2014-cü ildən bəri 1000-dən çox şirkət bizə güvənərək təlim və
                                        biznes konsaltinq xidmətimizdən istifadə etdi, 15 000-ə yaxın şəxs təlimlərimizə
                                        qatılaraq öz peşəkar bacarıqlarını artırdı, 70-dən çox şirkətdə yenilənmə,
                                        sistemləşmə işi apardıq, Avropa Yenidənqurma və İnkişaf Bankının aktiv biznes
                                        konsaltinq partnyorlarından birinə çevrildik. Bu nəticələrimiz üçün ilk növbədə
                                        bizə güvənən həmvətənlərimizə, şirkətlərimizə, sonra isə dəyərli komandamıza,
                                        təlimçilərimizə və konsultantlarımıza təşəkkür edirik.
                                    </Typography>
                                    <Typography className="content">
                                        Məqsədimiz biznes mühitimizə 2 istiqamətdə faydalı olmaqdır:
                                    </Typography>
                                    <Typography className="content">
                                        1) Şirkətlərimizin təlim partnyoru olaraq onların əməkdaşlarının peşəkarlığını
                                        və motivasiyasını artırmaq
                                    </Typography>
                                    <Typography className="content">
                                        2) Şirkətlərimizə sistemləşmə, korporativləşmə, strategiyanın hazırlanması
                                        istiqamətində dəstək olaraq şirkət güclərinin artmasına dəstək olmaq.
                                    </Typography>
                                    <Typography className="content">
                                        Eyni zamanda ölkəmizdə peşəkarların sayını artıraraq insanlarımızın rifah
                                        halının yüksəlməsində də rol almaq istəyirik. Bu məqsədlə təlimlərimizi daim
                                        təkmilləşdirir, SAT Academy və Satıcı Fabriki kimi peşə hazırlığını təmin edən
                                        platformaları də inkişaf etdiririk.
                                    </Typography>
                                    <Hidden lgDown>
                                        <img src={image} className="content-name" />
                                    </Hidden>
                                </Box>
                            </Box>
                        </Grid>
                        <Hidden lgDown>
                            <Grid item xs={12} sm={12} md={12} lg={6}>
                                <Box className="image">
                                    <img src={services} className="image1" />
                                </Box>
                            </Grid>
                        </Hidden>
                    </Grid>
                </BounceInRight>
            </Container>
        </Root>
    );
};
