import { Box, Grid, Typography } from '@mui/material';
import { usePaginationDispatch, usePaginationState } from 'context/pagination/store';
import { useTranslation } from 'react-i18next';
import { Enum_Video_Status, useVideosLazyQuery } from 'graphql/generated';
import { Spinner, Pagination } from 'components';
import { useEffect } from 'react';
import { extractPageFromQueryString, extractPageSizeFromQueryString } from 'utils/browser-utils';
import { useHistory } from 'react-router';
import { VideoListItem } from './video-list-item';

export const VideoList: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = usePaginationDispatch();
    const { pageSize } = usePaginationState();

    const [loadVideos, { data, loading }] = useVideosLazyQuery({
        fetchPolicy: 'cache-and-network',
        variables: {
            sort: ['createdAt:desc'],
            pagination: {
                pageSize: 6,
            },
            filters: { status: { eqi: Enum_Video_Status.Active } },
        },
    });

    const videos = data?.videos?.data || [];

    const pageCount = data?.videos?.meta.pagination?.pageCount;
    const totalCount = data?.videos?.meta.pagination?.total;

    useEffect(() => {
        if (!loading) {
            dispatch({ type: 'SET_PAGE_SIZE', pageSize: 6 });
            dispatch({ type: 'SET_PAGE_COUNT', pageCount: pageCount || 0 });
            dispatch({ type: 'SET_TOTAL_COUNT', totalCount: totalCount || 0 });
        }
    }, [loading]);

    const filterVideos = (): void => {
        const page = extractPageFromQueryString();
        const pageSize = extractPageSizeFromQueryString();

        loadVideos({
            variables: {
                pagination: {
                    page,
                    pageSize,
                },
            },
        });
    };

    const history = useHistory();
    const search = history.location.search;

    useEffect(() => {
        filterVideos();
    }, [search, pageSize]);

    if (loading) {
        return <Spinner />;
    }
    if (!loading && videos?.length === 0) {
        return <Typography>{t('common:nodatafound')}</Typography>;
    }

    return (
        <Box>
            <Grid container spacing={3}>
                {videos?.map((video) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} key={video.id}>
                            <VideoListItem video={video?.attributes} />
                        </Grid>
                    );
                })}
            </Grid>
            <Pagination />
        </Box>
    );
};
