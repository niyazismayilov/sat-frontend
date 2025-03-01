import { Box, Theme, Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/styles';
import businessAdministrationPhotoGrid_1 from 'assets/events/businessAdministration/businessAdministrationPhotoGrid-1.jpg';
import businessAdministrationPhotoGrid_2 from 'assets/events/businessAdministration/businessAdministrationPhotoGrid-2.jpg';
import businessAdministrationPhotoGrid_3 from 'assets/events/businessAdministration/businessAdministrationPhotoGrid-3.jpg';
import businessAdministrationPhotoGrid_4 from 'assets/events/businessAdministration/businessAdministrationPhotoGrid-4.jpg';
import businessAdministrationPhotoGridMain from 'assets/events/businessAdministration/businessAdministrationMain.jpg';
import businessAdministrationPhotoGrid_5 from 'assets/events/businessAdministration/businessAdministrationPhotoGrid-5.jpg';

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
                            <img className="image" src={businessAdministrationPhotoGrid_1} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <img className="image" src={businessAdministrationPhotoGrid_2} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <img className="image" src={businessAdministrationPhotoGrid_3} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <img className="image" src={businessAdministrationPhotoGrid_4} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <img className="image" src={businessAdministrationPhotoGridMain} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <img className="image" src={businessAdministrationPhotoGrid_5} />
                        </Grid>
                    </Grid>
                </Container>
            </Root>
        </>
    );
};
