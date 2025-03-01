import { Box, Theme, Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/styles';
import leagueOfCompaniesPhotoGrid_1 from 'assets/events/leagueOfCompanies/leagueOfCompaniesPhotoGrid-1.jpg';
import leagueOfCompaniesPhotoGrid_2 from 'assets/events/leagueOfCompanies/leagueOfCompaniesPhotoGrid-2.jpg';
import leagueOfCompaniesPhotoGrid_3 from 'assets/events/leagueOfCompanies/leagueOfCompaniesPhotoGrid-3.jpg';
import leagueOfCompaniesPhotoGrid_4 from 'assets/events/leagueOfCompanies/leagueOfCompaniesPhotoGrid-4.jpg';
import leagueOfCompaniesMain from 'assets/events/leagueOfCompanies/leagueOfCompaniesMain.jpg';
import leagueOfCompaniesPhotoGrid_5 from 'assets/events/leagueOfCompanies/leagueOfCompaniesPhotoGrid-5.jpg';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('lg')]: {
        marginTop: theme.spacing(6),
    },

    '& .image': {
        width: '100%',
        objectFit: 'cover',
        borderRadius: '5px',
        [theme.breakpoints.up('lg')]: {
            height: '270px',
        },
        [theme.breakpoints.down('lg')]: {
            height: '80vh',
            objectPosition: '80% 0',
        },
    },
}));

export const PhotoContent: React.FC = () => {
    return (
        <>
            <Root>
                <Container>
                    <Grid container spacing={2} mt={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <img className="image" src={leagueOfCompaniesPhotoGrid_1} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <img className="image" src={leagueOfCompaniesPhotoGrid_2} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <img className="image" src={leagueOfCompaniesPhotoGrid_3} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <img className="image" src={leagueOfCompaniesPhotoGrid_4} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <img className="image" src={leagueOfCompaniesMain} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <img className="image" src={leagueOfCompaniesPhotoGrid_5} />
                        </Grid>
                    </Grid>
                </Container>
            </Root>
        </>
    );
};
