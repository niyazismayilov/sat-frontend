import { Box, Grid } from '@mui/material';
import { usePaginationDispatch, usePaginationState } from 'context/pagination/store';
import { Enum_Blog_Status, useBlogsLazyQuery } from 'graphql/generated';
import { Spinner, Pagination } from 'components';
import { useEffect } from 'react';
import { extractPageFromQueryString, extractPageSizeFromQueryString } from 'utils/browser-utils';
import { useHistory } from 'react-router';
import { BlogListItem } from './blog-list-item';

export const BlogList: React.FC = () => {
    const dispatch = usePaginationDispatch();
    const { pageSize } = usePaginationState();

    const [loadBlogs, { data, loading }] = useBlogsLazyQuery({
        fetchPolicy: 'cache-and-network',
        variables: {
            sort: ['createdAt:desc'],
            pagination: {
                pageSize: 6,
            },
            filters: { status: { eqi: Enum_Blog_Status.Active } },
        },
    });

    const blogs = data?.blogs?.data || [];

    const pageCount = data?.blogs?.meta.pagination?.pageCount;
    const totalCount = data?.blogs?.meta.pagination?.total;

    useEffect(() => {
        if (!loading) {
            dispatch({ type: 'SET_PAGE_SIZE', pageSize: 6 });
            dispatch({ type: 'SET_PAGE_COUNT', pageCount: pageCount || 0 });
            dispatch({ type: 'SET_TOTAL_COUNT', totalCount: totalCount || 0 });
        }
    }, [loading]);

    const filterBlogs = (): void => {
        const page = extractPageFromQueryString();
        const pageSize = extractPageSizeFromQueryString();

        loadBlogs({
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
        filterBlogs();
    }, [search, pageSize]);

    if (loading) {
        return <Spinner />;
    }
    if (!loading && blogs?.length === 0) {
        return null;
    }

    return (
        <Box>
            <Grid container spacing={3}>
                {blogs?.map((blog) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} key={blog.id}>
                            <BlogListItem blog={blog} />
                        </Grid>
                    );
                })}
            </Grid>
            <Pagination />
        </Box>
    );
};
