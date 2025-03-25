import { Container, Box, Theme, Typography, Grid } from '@mui/material';
import { styled } from '@mui/styles';
import { Spinner } from 'components';
import { Enum_Broadcast_Status, useBroadcastQuery, useBroadcastsLazyQuery } from 'graphql/generated';
import { DateTime } from 'luxon';
import { useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { BroadcastSeriesListItem } from 'views/broadcast-series/boadcast-series-list/broadcast-series-list-item';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    margin: theme.spacing(6, 0),
    '& .broadcast-detail-categories': {
        display: 'flex',
        marginBottom: theme.spacing(3),
    },
    '& .broadcast-detail-category': {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        borderRadius: '4px',
        marginRight: theme.spacing(1.5),
        padding: theme.spacing(0.5, 1.25),
    },
    '& .video-url': {
        marginBottom: theme.spacing(3),
    },
    '& .title': {
        fontSize: 36,
        fontWeight: 600,
        marginBottom: theme.spacing(10),
    },
}));

export const Broadcast = () => {
    const { slug } = useParams<{ slug: string }>();
    // const { t } = useTranslation();

    const { data, loading } = useBroadcastQuery({
        fetchPolicy: 'network-only',
        variables: { filters: { status: { eqi: Enum_Broadcast_Status.Active }, slug: { eq: slug } } },
    });

    const broadcast = data?.broadcasts?.data[0].attributes;
    const publishedDate = DateTime.fromISO(broadcast?.createdAt).toFormat('dd.MM.yyyy HH:MM');

    const [loadBroadcasts, { data: broadcastsData, loading: broadcastsLoading }] = useBroadcastsLazyQuery({
        fetchPolicy: 'network-only',
        variables: {
            filters: { status: { eqi: Enum_Broadcast_Status.Active } },
        },
    });

    const broadcasts = broadcastsData?.broadcasts?.data;

    const broadcastSerieSlug = broadcast?.broadcast_sery?.data?.attributes?.slug;

    useEffect(() => {
        if (broadcast?.broadcast_sery?.data?.attributes?.slug) {
            loadBroadcasts({
                variables: {
                    filters: {
                        broadcast_sery: {
                            slug: {
                                eq: broadcastSerieSlug,
                            },
                        },
                        status: { eqi: Enum_Broadcast_Status.Active },
                    },
                },
            });
        }
    }, [broadcast]);

    function videoUrlGetID(url) {
        let ID = '';
        url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if (url[2] !== undefined) {
            ID = url[2].split(/[^0-9a-z_\-]/i);
            ID = ID[0];
        } else {
            ID = url;
        }
        return ID;
    }

    if (!broadcast) {
        return null;
    }
    if (loading) {
        return <Spinner />;
    }
    return (
        <Root>
            <Container>
                <Box className="video-url">
                    <iframe
                        width="100%"
                        height="700"
                        src={`https://www.youtube.com/embed/${videoUrlGetID(broadcast?.videoId)}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    />
                </Box>

                <Box className="broadcast-detail-categories">
                    {broadcast?.category?.map((categoryItem, index) => (
                        <Box key={index} className="broadcast-detail-category">
                            <Typography fontWeight={400}>{categoryItem}</Typography>
                        </Box>
                    ))}
                </Box>
                <Typography className="title">{broadcast?.title}</Typography>

                <Typography color="#9CA3AF" mb={2.5}>
                    {publishedDate}
                </Typography>
                {broadcastsLoading && <Spinner />}
                {broadcasts && broadcasts.length !== 0 ? (
                    <Grid container spacing={3}>
                        {broadcasts.map((broadcast) => (
                            <Grid item xs={12} sm={6} md={4} key={broadcast.id}>
                                <BroadcastSeriesListItem broadcast={broadcast?.attributes} />
                            </Grid>
                        ))}
                    </Grid>
                ) : null}
            </Container>
        </Root>
    );
};
