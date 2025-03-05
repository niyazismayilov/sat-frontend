import { styled } from '@mui/styles';
import { Box, Container, Grid, Theme, Typography } from '@mui/material';
import { Form } from '../../../components/callback';
import { BounceInRight, BounceInLeft } from 'components';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    padding: theme.spacing(6, 0),
}));

export const Callback: React.FC = () => {
    return (
        <Root>
            <Container>
                <Grid container spacing={6} display="flex" alignItems="center">
                    <Grid item xs={12} md={5}>
                        <BounceInLeft duration={0.5}>
                            <Typography fontSize={60} fontWeight="400px" color="primary.main">
                                Forumu doldur,
                                <br /> <span style={{ fontWeight: 'bold' }}>Özünə uyğun təlimi tap!</span>
                            </Typography>
                        </BounceInLeft>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <BounceInRight duration={0.5}>
                            <Form style={{ backgroundColor: '#F4F4F4' }} />
                        </BounceInRight>
                    </Grid>
                </Grid>
            </Container>
        </Root>
    );
};
