import { Box, Theme, Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/styles';
import satForumPhotoGrid_1 from 'assets/events/satForum/satForumPhotoGrid-1.jpg';
import satForumPhotoGrid_2 from 'assets/events/satForum/satForumPhotoGrid-2.jpg';
import satForumPhotoGrid_3 from 'assets/events/satForum/satForumPhotoGrid-3.jpg';
import satForumPhotoGrid_4 from 'assets/events/satForum/satForumPhotoGrid-4.jpg';
import satForumPhotoGrid_5 from 'assets/events/satForum/satForumPhotoGrid-5.jpg';
import satForumPhotoGrid_6 from 'assets/events/satForum/satForumPhotoGrid-6.jpg';

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
            height: '50vh',
            objectPosition: '50% 0',
        },
    },
}));

export const PhotoContent: React.FC = () => {
    return (
        <>
            <Root>
                <Container>
                    <Grid container spacing={1} mt={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <img className="image" src={satForumPhotoGrid_1} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <img className="image" src={satForumPhotoGrid_2} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <img className="image" src={satForumPhotoGrid_3} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6} md={4}>
                            <img className="image" src={satForumPhotoGrid_4} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <img className="image" src={satForumPhotoGrid_5} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <img className="image" src={satForumPhotoGrid_6} />
                        </Grid>
                    </Grid>
                </Container>
            </Root>
        </>
    );
};
