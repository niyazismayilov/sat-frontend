import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Checkbox,
    Theme,
} from '@mui/material';
import { Enum_Blog_Status, useBlogsLazyQuery } from 'graphql/generated';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { FilterDialog } from '../components/filter-dialog';
import { BlogsActions } from './blog-actions';
import Chip from '@mui/material/Chip';
import { AdminPagination } from 'components/admin-pagination';
import { BlogsActionsMore } from './blog-actions-more';
import { DateTime } from 'luxon';
import { Spinner } from 'components';
import { usePaginationDispatch, usePaginationState } from 'context/pagination/store';
import { extractPageFromQueryString, extractPageSizeFromQueryString } from 'utils/browser-utils';
import { extractFilterFromQS } from 'ui-services/filter.ui-service';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacing(3.5),
    },

    '& .MuiTableCell-root': {
        padding: `${theme.spacing(1)} !important`,
    },
    '& .more-horiz-icon': {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    },

    '& .chip-tag': {
        color: '#044AB1',
        fontWeight: 500,
        fontSize: '14px',
    },

    '& .blog-tag': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    '& .blog-img': {
        width: '40px',
        height: '40px',
        borderRadius: '5px',
        objectFit: 'cover',
    },
}));

export const statusBackgroundColor = {
    [Enum_Blog_Status.Active]: 'rgba(220, 252, 231, 1)',
    [Enum_Blog_Status.Inactive]: 'rgba(229, 231, 235, 1)',
};

export const statusColor = {
    [Enum_Blog_Status.Active]: 'rgba(21, 128, 61, 1)',
    [Enum_Blog_Status.Inactive]: 'rgba(156, 163, 175, 1)',
};

export const BlogTable: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = usePaginationDispatch();
    const { pageSize } = usePaginationState();
    const page = extractPageFromQueryString();

    const [selected, setSelected] = useState<string[]>([]);
    const [filterDialogOpen, setFilterDialogOpen] = useState<boolean>(false);

    const [loadBlog, { data, loading, refetch }] = useBlogsLazyQuery({
        fetchPolicy: 'network-only',
        variables: {
            sort: ['createdAt:desc'],
            pagination: {
                pageSize: 20,
            },
        },
    });

    const blogs = data?.blogs?.data.map((blog) => blog) || [];

    const pageCount = data?.blogs?.meta.pagination?.pageCount;
    const totalCount = data?.blogs?.meta.pagination.total;

    useEffect(() => {
        if (!loading) {
            dispatch({ type: 'SET_PAGE_COUNT', pageCount: pageCount || 0 });
            dispatch({ type: 'SET_TOTAL_COUNT', totalCount: totalCount || 0 });
        }
    }, [loading]);

    const filterBlog = (): void => {
        const pageSize = extractPageSizeFromQueryString() || 20;
        const qsFilter = extractFilterFromQS();
        const isDate = (str) => str.length === 10 && str.includes('-');
        const filter: any = {};
        Object.keys(qsFilter).forEach((key) => {
            if (key === 'name') {
                filter['title'] = { containsi: qsFilter[key] };
            } else {
                filter[key] = isDate(qsFilter[key]) ? { gte: qsFilter[key] } : { containsi: qsFilter[key] };
            }
        });

        loadBlog({
            variables: {
                pagination: {
                    page,
                    pageSize,
                },
                filters: {
                    ...filter,
                    status: filter?.status?.containsi ? { eqi: filter?.status?.containsi } : undefined,
                },
            },
        });
    };

    const history = useHistory();
    const search = history.location.search;

    useEffect(() => {
        filterBlog();
    }, [search, pageSize]);

    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    const handleClick = (id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: string[] = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = blogs?.map((blog) => blog.id) || [];
            setSelected(newSelecteds as any);
            return;
        }
        setSelected([]);
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <Root>
            <FilterDialog filterDialogOpen={filterDialogOpen} onClose={() => setFilterDialogOpen(false)} />
            <BlogsActions openFilterDialog={() => setFilterDialogOpen(true)} />
            <TableContainer className="table-container">
                <Table sx={{ minWidth: 1200 }} aria-labelledby="tableTitle">
                    <TableHead>
                        <TableRow>
                            <TableCell className="checkbox-cell">
                                <Checkbox
                                    color="primary"
                                    checked={blogs?.length > 0 && selected.length === blogs.length}
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            <TableCell>ŞƏKİL</TableCell>
                            <TableCell>BLOQLAR</TableCell>
                            <TableCell>YARADILMA TARİXİ</TableCell>
                            <TableCell>TEQLƏR</TableCell>
                            <TableCell>STATUS</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {blogs?.map((blog) => {
                            const isItemSelected = isSelected(blog.id as string);
                            const normalizedBlogData = blog.attributes?.category;

                            const blogTag =
                                normalizedBlogData.length > 1 ? (
                                    <Box className="blog-tag" sx={{ gap: 1 }}>
                                        <Chip className="chip-tag" label={normalizedBlogData[0]} />
                                        <Chip
                                            className="chip-tag"
                                            label={`+${(normalizedBlogData.length - 1).toString()}`}
                                        />
                                    </Box>
                                ) : (
                                    <Box className="blog-tag">
                                        <Chip className="chip-tag" label={normalizedBlogData[0]} />
                                    </Box>
                                );

                            return (
                                <TableRow
                                    hover
                                    onClick={() => handleClick(blog?.id as string)}
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={blog.id}
                                >
                                    <TableCell>
                                        <Checkbox checked={isItemSelected} color="primary" />
                                    </TableCell>

                                    <TableCell align="right" width={100}>
                                        <img
                                            className="blog-img"
                                            src={blog.attributes?.coverImage?.data?.attributes?.url}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        {blog?.attributes?.title && blog?.attributes?.title?.length > 50
                                            ? blog.attributes?.title?.slice(0, 50) + '...'
                                            : blog.attributes?.title}
                                    </TableCell>
                                    <TableCell align="right">
                                        {DateTime.fromISO(blog.attributes?.createdAt).toFormat('dd.MM.yyyy, HH:MM')}
                                    </TableCell>
                                    <TableCell align="right" width={250}>
                                        {blogTag}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontSize: 12,
                                                    backgroundColor:
                                                        statusBackgroundColor[
                                                            blog.attributes?.status as Enum_Blog_Status
                                                        ],
                                                    borderRadius: '20px',
                                                    height: '30px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    color: statusColor[blog.attributes?.status as Enum_Blog_Status],
                                                }}
                                            >
                                                {t(blog.attributes?.status as string)}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center" width={5}>
                                        <Box className="more-horiz-icon">
                                            <BlogsActionsMore blogId={blog.id as string} refetch={refetch} />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ mt: 3 }}>
                <Typography sx={{ color: '#9CA3AF' }}>
                    {selected.length > 0 ? `(${selected.length} seçilib)` : null}
                </Typography>
            </Box>
            <AdminPagination />
        </Root>
    );
};
