import { Box, Container, Theme, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { Enum_Broadcast_Status, useBroadcastsQuery } from 'graphql/generated';
import { Spinner } from 'components';
import { styled } from '@mui/styles';
import { BroadcastSeriesListItem } from 'views/broadcast-series/boadcast-series-list/broadcast-series-list-item';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    margin: theme.spacing(6, 0),
    '& .blog-detail-cover-image': {
        height: 366,
        width: '100%',
        marginBottom: theme.spacing(5),
        objectFit: 'cover',
    },
    '& .blog-detail-categories': {
        display: 'flex',
        marginBottom: theme.spacing(2.5),
    },
    '& .blog-detail-category': {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        borderRadius: '4px',
        marginRight: theme.spacing(1.5),
        padding: theme.spacing(0.5, 1.25),
    },
    '& .blog-detail-icons': {
        display: 'flex',
        gap: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            gap: theme.spacing(0.5),
        },
    },
    '& .icon': {
        backgroundColor: theme.palette.primary.main,
    },
    '& .blog-detail-body': {
        marginBottom: theme.spacing(6),
        color: '#374151',
    },
}));

export const BroadcastSerie = () => {
    const { slug } = useParams<{ slug: string }>();

    const { data, loading } = useBroadcastsQuery({
        fetchPolicy: 'network-only',
        variables: {
            filters: {
                broadcast_sery: {
                    slug: {
                        eq: slug,
                    },
                },
                status: { eqi: Enum_Broadcast_Status.Active },
            },
        },
    });

    if (loading) {
        return <Spinner style={{ textAlign: 'center' }} />;
    }
    if (data?.broadcasts?.data?.length === 0) {
        return null;
    }

    return (
        <Root>
            <Container>
                <Box mb={3}>
                    <Typography fontSize={36} fontWeight={700} color="primary.main">
                        {data?.broadcasts?.data[0].attributes?.broadcast_sery?.data?.attributes?.title}
                    </Typography>
                </Box>
                <Grid container spacing={6}>
                    {data?.broadcasts?.data?.map((broadcast) => (
                        <Grid item xs={12} sm={4} key={broadcast.id}>
                            <BroadcastSeriesListItem broadcast={broadcast.attributes} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Root>
    );
};
