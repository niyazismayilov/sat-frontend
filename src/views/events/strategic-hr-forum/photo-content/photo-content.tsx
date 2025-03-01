import { Box, Theme, Container } from '@mui/material';
import Grid from '@mui/material/Grid';
// import CalendarItemBox from 'assets/events/Icon.svg';
import { styled } from '@mui/styles';
import strategicHrForumPhotoGrid_1 from 'assets/events/strategicHrForum/strategicHrForumPhotoGrid-1.jpg';
import strategicHrForumPhotoGrid_2 from 'assets/events/strategicHrForum/strategicHrForumPhotoGrid-2.jpg';
import strategicHrForumPhotoGrid_3 from 'assets/events/strategicHrForum/strategicHrForumPhotoGrid-3.jpg';
import strategicHrForumPhotoGrid_4 from 'assets/events/strategicHrForum/strategicHrForumPhotoGrid-4.jpg';
import strategicHrForumPhotoGridMain from 'assets/events/strategicHrForum/strategicHrForumMain.jpg';
import strategicHrForumPhotoGrid_5 from 'assets/events/strategicHrForum/strategicHrForumPhotoGrid-5.jpg';

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
                            <img className="image" src={strategicHrForumPhotoGrid_1} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <img className="image" src={strategicHrForumPhotoGrid_2} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <img className="image" src={strategicHrForumPhotoGrid_3} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <img className="image" src={strategicHrForumPhotoGrid_4} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <img className="image" src={strategicHrForumPhotoGridMain} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <img className="image" src={strategicHrForumPhotoGrid_5} />
                        </Grid>
                    </Grid>
                </Container>
            </Root>
        </>
    );
};
