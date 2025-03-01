import { Box, Grid, Theme, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { ReactComponent as ArrowIcon } from 'assets/icons/arrow-right.svg';
import { ReactComponent as ClockIcon } from 'assets/icons/clock.svg';
import { ReactComponent as VideoIcon } from 'assets/icons/video.svg';
import { Link, Pagination, Spinner } from 'components';
import { usePaginationDispatch } from 'context/pagination/store';
import { Enum_Broadcastserie_Status, Enum_Broadcast_Status, useBroadcastSeriesLazyQuery } from 'graphql/generated';
import { DateTime } from 'luxon';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { extractPageFromQueryString } from 'utils/browser-utils';
import { BroadcastSeriesListItem } from './broadcast-series-list-item';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    marginTop: theme.spacing(4),
    '& .broadcast-serie': {
        marginBottom: theme.spacing(6),
    },
    '& .broadcast-serie-cover-image': {
        width: '100%',
        height: '300px',
        objectFit: 'cover',
        borderRadius: '5px',
    },
    '& .broadcast-header': {
        marginBottom: theme.spacing(4),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    '& .icon': {
        marginRight: theme.spacing(1),
    },
    '& .series': {
        bottom: 0,
        position: 'absolute',
        margin: theme.spacing(2.5),
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        border: '1px solid #EEEEEE',
        borderRadius: '5px',
        width: `calc(100% - 40px)`,
    },
    '& .minutes': {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1.5, 0, 1.5, 1.5),
    },
    '& .count': {
        display: 'flex',
        padding: theme.spacing(1.5, 1.5, 1.5, 0),
    },
    '& .see-all': {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(0.5),
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
}));

export const BroadcastSeriesList: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = usePaginationDispatch();

    const [loadBroadcastSeries, { data, loading }] = useBroadcastSeriesLazyQuery({
        fetchPolicy: 'cache-and-network',
        variables: {
            filters: { status: { eqi: Enum_Broadcastserie_Status.Active } },
            sort: ['createdAt:desc'],
        },
    });

    const broadcastSeries = data?.broadcastSeries?.data;

    const pageCount = data?.broadcastSeries?.meta.pagination?.pageCount;

    useEffect(() => {
        if (!loading) {
            dispatch({ type: 'SET_PAGE_COUNT', pageCount: pageCount || 0 });
        }
    }, [loading]);

    const filterVideos = (): void => {
        const page = extractPageFromQueryString();

        loadBroadcastSeries({
            variables: {
                pagination: {
                    page,
                },
            },
        });
    };

    const history = useHistory();
    const search = history.location.search;

    useEffect(() => {
        filterVideos();
    }, [search]);

    if (loading) {
        return <Spinner style={{ height: '100vh' }} />;
    }
    if (!loading && broadcastSeries?.length === 0) {
        return <Typography>{t('common:noDataFound')}</Typography>;
    }

    return (
        <Root>
            {broadcastSeries?.map((broadcastSerie) => (
                <Box key={broadcastSerie?.id} className="broadcast-serie">
                    <Box className="broadcast-header">
                        <Typography fontSize={36} fontWeight={700} color="primary.main">
                            {broadcastSerie.attributes?.title}
                        </Typography>
                        <Link to={`verilis-seriyalari/${broadcastSerie?.attributes?.slug}`}>
                            <Box className="see-all">
                                <Typography fontWeight={500}>{t('broadcast:all')}</Typography>
                                <ArrowIcon />
                            </Box>
                        </Link>
                    </Box>
                    {broadcastSerie?.attributes?.broadcasts && (
                        <Grid container rowSpacing={5} columnSpacing={3}>
                            <Grid item xs={12} md={4}>
                                <Link to={`verilis-seriyalari/${broadcastSerie?.attributes?.slug}`}>
                                    <Box style={{ position: 'relative' }}>
                                        <img
                                            src={broadcastSerie?.attributes?.coverImage?.data?.attributes?.url}
                                            className="broadcast-serie-cover-image"
                                        />
                                        <Box className="series">
                                            <Box className="minutes">
                                                <ClockIcon className="icon" />
                                                <Typography color="#374151" fontSize={14}>
                                                    {DateTime.fromISO(broadcastSerie?.attributes.createdAt).toFormat(
                                                        'dd.MM.yyyy',
                                                    )}
                                                </Typography>
                                            </Box>
                                            <Box className="count">
                                                <VideoIcon className="icon" />
                                                <Typography color="#374151" fontSize={14}>
                                                    {broadcastSerie?.attributes?.broadcasts.data.filter(
                                                        (broadcast) =>
                                                            broadcast.attributes?.status ===
                                                            Enum_Broadcast_Status.Active,
                                                    ).length +
                                                        ' ' +
                                                        t('broadcast:epizod')}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Link>
                            </Grid>
                            {broadcastSerie.attributes.broadcasts.data
                                .filter((broadcast) => broadcast.attributes?.status === Enum_Broadcast_Status.Active)
                                .slice(0, 2)
                                .map((broadcast) => (
                                    <Grid item xs={12} md={4} key={broadcast.id}>
                                        <BroadcastSeriesListItem broadcast={broadcast?.attributes} />
                                    </Grid>
                                ))}
                        </Grid>
                    )}
                </Box>
            ))}
            <Pagination />
        </Root>
    );
};
