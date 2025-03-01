import { Container, Grid, Box } from '@mui/material';
import { referanceOfCustomers } from './customer-logos';
import { useParams } from 'react-router';

export const referanceLetter = (id) => {
    return referanceOfCustomers.filter((referance) => referance.id === id);
};

export const CustomersReferance: React.FC = () => {
    const { id: customerLogoId } = useParams<{ id: string }>();

    return (
        <Container>
            <Grid container spacing={3} mt={3}>
                {referanceLetter(customerLogoId).map((ref) => (
                    <Grid item xs={12} key={ref.id}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={ref.referance} style={{ width: '550px' }} />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};
