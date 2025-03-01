import { Box, Theme, Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/styles';
import vendorFactoryPhotoGrid_1 from 'assets/project/vendorFactoryPhotoGrid_1.jpg';
import vendorFactoryPhotoGrid_2 from 'assets/project/vendorFactoryPhotoGrid_2.jpg';
import vendorFactoryPhotoGrid_3 from 'assets/project/vendorFactoryPhotoGrid_3.jpg';
import vendorFactoryPhotoGrid_4 from 'assets/project/vendorFactoryPhotoGrid_4.jpg';
import vendorFactoryPhotoGrid_5 from 'assets/project/vendorFactoryPhotoGrid_5.jpg';
import vendorFactoryPhotoGrid_6 from 'assets/project/vendorFactoryPhotoGrid_6.jpg';

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
                            <img className="image" src={vendorFactoryPhotoGrid_1} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <img className="image" src={vendorFactoryPhotoGrid_2} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <img className="image" src={vendorFactoryPhotoGrid_3} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <img className="image" src={vendorFactoryPhotoGrid_4} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <img className="image" src={vendorFactoryPhotoGrid_5} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <img className="image" src={vendorFactoryPhotoGrid_6} />
                        </Grid>
                    </Grid>
                </Container>
            </Root>
        </>
    );
};
