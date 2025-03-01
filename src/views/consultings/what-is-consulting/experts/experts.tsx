import { Box, Theme, Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/styles';
import expert1 from 'assets/home/team/team4.svg';
import expert2 from 'assets/home/team/team1.svg';
import expert3 from 'assets/home/team/team5.svg';
import expert5 from 'assets/home/team/team6.svg';
import { BounceInRight } from 'components';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    margin: theme.spacing(6, 0, 10, 0),
    '& .image': {
        width: '380px',
        height: '310px',
        objectFit: 'cover',
        borderRadius: 10,
        marginBottom: theme.spacing(3),
        [theme.breakpoints.down('md')]: {
            width: '350px',
        },
    },
    '& .expert-name': {
        color: '#1F2937',
        marginBottom: theme.spacing(0.5),
        fontWeight: 600,
        fontSize: 20,
    },
    '& .expert-title': {
        color: '#5B5B5B',
        fontWeight: 400,
        fontSize: 18,
        marginBottom: theme.spacing(2.5),
    },
    '& .expert-item': {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
}));

export const Experts: React.FC = () => {
    return (
        <Root>
            <Container>
                <Typography fontSize={36} fontWeight={700} color="primary.main" mb={6}>
                    Ekspertlərimiz
                </Typography>

                <BounceInRight>
                    <Grid container spacing={10} columnSpacing={3}>
                        <Grid item xs={12} sm={4} className="expert-item">
                            <Box>
                                <img src={expert1} className="image" />
                                <Typography className="expert-name">Anar Bayramov</Typography>
                                <Typography className="expert-title">Həmtəsisçi,biznes konsultant</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4} className="expert-item">
                            <Box>
                                <img src={expert2} className="image" />
                                <Typography className="expert-name">Azad Qəhrəmanov</Typography>
                                <Typography className="expert-title">Satış eksperti, Təlimçi</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4} className="expert-item">
                            <Box>
                                <img src={expert3} className="image" />
                                <Typography className="expert-name">Seymur Əhmədov</Typography>
                                <Typography className="expert-title">HR konsultant</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4} className="expert-item">
                            <Box>
                                <img src={expert5} className="image" />
                                <Typography className="expert-name">Xəyal Çərkəz</Typography>
                                <Typography className="expert-title">
                                    Biznes konsaltinq üzrə baş layihə rəhbəri
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </BounceInRight>
            </Container>
        </Root>
    );
};
