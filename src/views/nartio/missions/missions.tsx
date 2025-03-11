import { Box, Typography, Theme, Container, Grid } from '@mui/material';
import { styled } from '@mui/styles';
import { BounceInRight } from 'components';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    margin: theme.spacing(6, 0),
    '& .title': {
        fontSize: 36,
        fontWeight: 700,
        marginBottom: theme.spacing(6),
        color: theme.palette.primary.main,
    },
    '& .main-color': {
        color: '#111827',
    },
    '& .detail': {
        color: '#5B5B5B',
        fontSize: 18,
        fontWeight: 400,
        marginBottom: theme.spacing(4),
    },
    '& .mission-item': {
        padding: theme.spacing(2.5),
        backgroundColor: '#F4F4F4',
        borderRadius: 8,
        height: '100%',
    },
}));

export const Missions = () => {
    return (
        <Root>
            <Container>
                <Typography className="title">Dəyərlərimiz</Typography>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <BounceInRight style={{ height: '100%' }}>
                            <Box className="mission-item">
                                <Typography fontSize={70} fontWeight={600} className="main-color" mb={3}>
                                    01
                                </Typography>
                                <Typography fontSize={20} fontWeight={600} className="main-color" mb={1.5}>
                                    Məsuliyyətlilik
                                </Typography>
                                <Typography className="detail">
                                    Nəticəyə və keyfiyyətə görə məsuliyyəti üzərimizə götürür və işləri sürətlə həyata
                                    keçiririk
                                </Typography>
                            </Box>
                        </BounceInRight>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <BounceInRight style={{ height: '100%' }}>
                            <Box className="mission-item">
                                <Typography fontSize={70} fontWeight={600} className="main-color" mb={3}>
                                    02
                                </Typography>
                                <Typography fontSize={20} fontWeight={600} className="main-color" mb={1.5}>
                                    360 dərəcə hörmət
                                </Typography>
                                <Typography className="detail">
                                    Komanda yoldaşlarımıza, müştərilərimizə, partnyorlarımıza, bizi seçməyənlərə,
                                    rəqiblərimizə, qonşularımıza, kontaktda olduğumuz hər kəsə, şirkətimizin
                                    prosedurlarına hörmətlə yanaşırıq
                                </Typography>
                            </Box>
                        </BounceInRight>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <BounceInRight style={{ height: '100%' }}>
                            <Box className="mission-item">
                                <Typography fontSize={70} fontWeight={600} className="main-color" mb={3}>
                                    03
                                </Typography>
                                <Typography fontSize={20} fontWeight={600} className="main-color" mb={1.5}>
                                    Daimi inkişaf
                                </Typography>
                                <Typography className="detail">
                                    İnanırıq ki uğurlarımız və xoşbəxtliyimiz özümüzü daimi inkişaf etdirməyimizdən
                                    asılıdır. Buna görə də yerimizdə saymır, daim öyrənir və özümüzü təkmilləşdiririk.
                                </Typography>
                            </Box>
                        </BounceInRight>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <BounceInRight style={{ height: '100%' }}>
                            <Box className="mission-item" style={{ margin: 'auto' }}>
                                <Typography fontSize={70} fontWeight={600} className="main-color" mb={3}>
                                    04
                                </Typography>
                                <Typography fontSize={20} fontWeight={600} className="main-color" mb={1.5}>
                                    Pozitivlik
                                </Typography>
                                <Typography className="detail">
                                    Ətrafımıza pozitiv enerji ötürür, məsələlərə pozitiv yandan baxır, pozitiv planlar
                                    qururuq.
                                </Typography>
                            </Box>
                        </BounceInRight>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <BounceInRight style={{ height: '100%' }}>
                            <Box className="mission-item" style={{ margin: 'auto' }}>
                                <Typography fontSize={70} fontWeight={600} className="main-color" mb={3}>
                                    05
                                </Typography>
                                <Typography fontSize={20} fontWeight={600} className="main-color" mb={1.5}>
                                    Dürüstlük
                                </Typography>
                                <Typography className="detail">
                                    Komandamızla, müştərilərimizlə, tərəfdaşlarımız və bazar iştirakçıları ilə dürüstük.
                                    İşimizdə şəffaflığa və açıq kommunikasiyaya yüksək dəyər veririk.
                                </Typography>
                            </Box>
                        </BounceInRight>
                    </Grid>
                </Grid>
            </Container>
        </Root>
    );
};
