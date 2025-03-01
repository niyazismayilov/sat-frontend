import { Grid, Box, Container, Theme, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { CertificationLottie } from './lotties/certification-lottie';
import { EducationLottie } from './lotties/education-lottie';
import { PaymentLottie } from './lotties/payment-lottie';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    padding: theme.spacing(6, 0),
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    '& .title': {
        fontSize: 36,
        fontWeight: 700,
        marginBottom: theme.spacing(3),
    },
    '& .detail': {
        fontSize: 20,
        fontWeight: 400,
        marginBottom: theme.spacing(9),
        [theme.breakpoints.up('md')]: {
            width: '60%',
        },
    },
}));

export const Advantages = () => {
    return (
        <Root>
            <Container>
                <Typography className="title">Üstünlüklərimiz</Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <EducationLottie />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <CertificationLottie />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <PaymentLottie />
                    </Grid>
                </Grid>
            </Container>
        </Root>
    );
};
