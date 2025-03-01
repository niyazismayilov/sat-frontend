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
    Chip,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { FilterDialog } from '../components/filter-dialog';
import { VideosActions } from './video-actions';
import { VideosActionsMore } from './video-action-more';
import { AdminPagination } from 'components/admin-pagination';
import { Enum_Video_Status, useVideosLazyQuery } from 'graphql/generated';
import { usePaginationDispatch, usePaginationState } from 'context/pagination/store';
import { extractPageFromQueryString, extractPageSizeFromQueryString } from 'utils/browser-utils';
import { extractFilterFromQS } from 'ui-services/filter.ui-service';
import { useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';
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
    '& .blog-img': {
        width: '40px',
        height: '40px',
        borderRadius: '5px',
        objectFit: 'cover',
    },

    '& .chip-tag': {
        color: '#044AB1',
        fontWeight: 500,
        fontSize: '14px',
    },

    '& .video-tag': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

export const statusBackgroundColor = {
    [Enum_Video_Status.Active]: 'rgba(220, 252, 231, 1)',
    [Enum_Video_Status.Inactive]: 'rgba(229, 231, 235, 1)',
};

export const statusColor = {
    [Enum_Video_Status.Active]: 'rgba(21, 128, 61, 1)',
    [Enum_Video_Status.Inactive]: 'rgba(156, 163, 175, 1)',
};

export const VideoTable: React.FC = () => {
    const { t } = useTranslation();
    const [selected, setSelected] = useState<string[]>([]);
    const dispatch = usePaginationDispatch();
    const { pageSize } = usePaginationState();
    const page = extractPageFromQueryString();

    const [filterDialogOpen, setFilterDialogOpen] = useState<boolean>(false);

    const [loadVideo, { data, loading, refetch }] = useVideosLazyQuery({
        fetchPolicy: 'network-only',
        variables: {
            sort: ['createdAt:desc'],
            pagination: {
                pageSize: 20,
            },
        },
    });

    const videos = data?.videos?.data.map((video) => video) || [];

    const pageCount = data?.videos?.meta.pagination?.pageCount;
    const totalCount = data?.videos?.meta.pagination.total;

    useEffect(() => {
        if (!loading) {
            dispatch({ type: 'SET_PAGE_COUNT', pageCount: pageCount || 0 });
            dispatch({ type: 'SET_TOTAL_COUNT', totalCount: totalCount || 0 });
        }
    }, [loading]);

    const filterVideo = (): void => {
        const pageSize = extractPageSizeFromQueryString() || 20;
        const qsFilter = extractFilterFromQS();
        const isDate = (str) => str.length === 10 && str.includes('-');
        const filter: any = {};
        Object.keys(qsFilter).forEach((key) => {
            filter[key] = isDate(qsFilter[key])
                ? { gte: qsFilter[key] + 'T00:00:00.265Z' }
                : { containsi: qsFilter[key] };
        });

        loadVideo({
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
        filterVideo();
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
            const newSelecteds = videos?.map((video) => video.id) || [];
            setSelected(newSelecteds as any);
            return;
        }
        setSelected([]);
    };
    return (
        <Root>
            <FilterDialog filterDialogOpen={filterDialogOpen} onClose={() => setFilterDialogOpen(false)} />
            <VideosActions openFilterDialog={() => setFilterDialogOpen(true)} />
            <TableContainer className="table-container">
                <Table sx={{ minWidth: 768 }} aria-labelledby="tableTitle">
                    <TableHead>
                        <TableRow>
                            <TableCell className="checkbox-cell">
                                <Checkbox
                                    color="primary"
                                    checked={videos.length > 0 && selected.length === videos.length}
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            <TableCell>VIDEOLAR</TableCell>
                            <TableCell>YARADILMA TARİXİ</TableCell>
                            <TableCell>TƏQLƏR</TableCell>
                            <TableCell>STATUS</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {videos?.map((video) => {
                            const isItemSelected = isSelected(video.id as string);

                            const normalizedBlogData = video.attributes?.category;

                            const videoTag =
                                normalizedBlogData.length > 1 ? (
                                    <Box className="video-tag" sx={{ gap: 1 }}>
                                        <Chip className="chip-tag" label={normalizedBlogData[0]} />
                                        <Chip
                                            className="chip-tag"
                                            label={`+${(normalizedBlogData.length - 1).toString()}`}
                                        />
                                    </Box>
                                ) : (
                                    <Box className="video-tag">
                                        <Chip className="chip-tag" label={normalizedBlogData[0]} />
                                    </Box>
                                );
                            return (
                                <TableRow
                                    hover
                                    onClick={() => handleClick(video?.id as string)}
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={video.id}
                                >
                                    <TableCell>
                                        <Checkbox checked={isItemSelected} color="primary" />
                                    </TableCell>

                                    <TableCell align="right" width={300}>
                                        <Box
                                            sx={{
                                                paddingLeft: 2,
                                                display: 'flex',
                                                justifyContent: 'start',
                                                alignItems: 'center',
                                                gap: 2,
                                            }}
                                        >
                                            {
                                                <img
                                                    className="blog-img"
                                                    src={video.attributes?.coverImage?.data?.attributes?.url}
                                                />
                                            }
                                            {video.attributes?.title}
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right" width={300}>
                                        {DateTime.fromISO(video.attributes?.createdAt).toFormat('dd.MM.yyyy, HH:MM')}
                                    </TableCell>

                                    <TableCell align="right">{videoTag}</TableCell>
                                    <TableCell align="center">
                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontSize: 12,
                                                    backgroundColor:
                                                        statusBackgroundColor[
                                                            video.attributes?.status as Enum_Video_Status
                                                        ],
                                                    borderRadius: '20px',
                                                    height: '30px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    color: statusColor[video.attributes?.status as Enum_Video_Status],
                                                }}
                                            >
                                                {t(video.attributes?.status as string)}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center" width={5}>
                                        <Box className="more-horiz-icon">
                                            <VideosActionsMore videoId={video.id as string} refetch={refetch} />
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
