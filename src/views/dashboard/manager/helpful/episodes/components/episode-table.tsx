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
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { FilterDialog } from '../components/filter-dialog';
import { EpisodeActions } from './episode-actions';
import { EpisodeActionsMore } from './episode-action-more';
import { AdminPagination } from 'components/admin-pagination';
import { Enum_Broadcast_Status, useBroadcastsLazyQuery } from 'graphql/generated';
import { DateTime } from 'luxon';
import { Spinner } from 'components';
import { useHistory } from 'react-router-dom';
import { extractPageFromQueryString, extractPageSizeFromQueryString } from 'utils/browser-utils';
import { extractFilterFromQS } from 'ui-services/filter.ui-service';
import { usePaginationDispatch, usePaginationState } from 'context/pagination/store';
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

    '& .broadcast-sery': {
        width: '40px',
        height: '40px',
        borderRadius: '5px',
        objectFit: 'cover',
    },
}));

export const statusBackgroundColor = {
    [Enum_Broadcast_Status.Active]: 'rgba(220, 252, 231, 1)',
    [Enum_Broadcast_Status.Inactive]: 'rgba(229, 231, 235, 1)',
};

export const statusColor = {
    [Enum_Broadcast_Status.Active]: 'rgba(21, 128, 61, 1)',
    [Enum_Broadcast_Status.Inactive]: 'rgba(156, 163, 175, 1)',
};

export const EpisodeTable: React.FC = () => {
    const { t } = useTranslation();
    const [selected, setSelected] = useState<string[]>([]);
    const [filterDialogOpen, setFilterDialogOpen] = useState<boolean>(false);
    const dispatch = usePaginationDispatch();
    const { pageSize } = usePaginationState();
    const page = extractPageFromQueryString();

    const [loadBroadcast, { data, refetch, loading }] = useBroadcastsLazyQuery({
        fetchPolicy: 'cache-and-network',
        variables: {
            sort: ['createdAt:desc'],
            pagination: {
                pageSize: 20,
            },
        },
    });

    const broadcasts = data?.broadcasts?.data.map((broadcast) => broadcast) || [];

    const pageCount = data?.broadcasts?.meta.pagination?.pageCount;
    const totalCount = data?.broadcasts?.meta.pagination.total;

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
            if (key === 'name') {
                filter['title'] = { containsi: qsFilter[key] };
            } else {
                filter[key] = isDate(qsFilter[key])
                    ? { gte: qsFilter[key] + 'T00:00:00.265Z' }
                    : { containsi: qsFilter[key] };
            }
        });

        loadBroadcast({
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
            const newSelecteds = broadcasts?.map((broadcast) => broadcast.id) || [];
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
            <EpisodeActions openFilterDialog={() => setFilterDialogOpen(true)} />
            <TableContainer className="table-container">
                <Table sx={{ minWidth: 768 }} aria-labelledby="tableTitle">
                    <TableHead>
                        <TableRow>
                            <TableCell className="checkbox-cell">
                                <Checkbox
                                    color="primary"
                                    checked={broadcasts.length > 0 && selected.length === broadcasts.length}
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            <TableCell>EPİZODUN ADI</TableCell>
                            <TableCell>VERİLİŞİN ADI</TableCell>
                            <TableCell>YARADILMA TARİXİ</TableCell>
                            <TableCell>STATUS</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {broadcasts?.map((broadcast) => {
                            const isItemSelected = isSelected(broadcast.id as string);
                            return (
                                <TableRow
                                    hover
                                    onClick={() => handleClick(broadcast?.id as string)}
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={broadcast.id}
                                >
                                    <TableCell>
                                        <Checkbox checked={isItemSelected} color="primary" />
                                    </TableCell>
                                    <TableCell align="right">
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
                                                    className="broadcast-sery"
                                                    src={broadcast.attributes?.coverImage.data?.attributes?.url}
                                                />
                                            }
                                            {broadcast.attributes?.title}
                                        </Box>
                                    </TableCell>

                                    <TableCell align="right">
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
                                                    className="broadcast-sery"
                                                    src={
                                                        broadcast.attributes?.broadcast_sery?.data?.attributes
                                                            ?.coverImage.data?.attributes?.url
                                                    }
                                                />
                                            }
                                            {broadcast.attributes?.broadcast_sery?.data?.attributes?.title}
                                        </Box>
                                    </TableCell>

                                    <TableCell align="right">
                                        {DateTime.fromISO(broadcast.attributes?.createdAt).toFormat(
                                            'dd.MM.yyyy, HH:MM',
                                        )}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontSize: 12,
                                                    backgroundColor:
                                                        statusBackgroundColor[
                                                            broadcast.attributes?.status as Enum_Broadcast_Status
                                                        ],
                                                    borderRadius: '20px',
                                                    height: '30px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    color: statusColor[
                                                        broadcast.attributes?.status as Enum_Broadcast_Status
                                                    ],
                                                }}
                                            >
                                                {t(broadcast.attributes?.status as string)}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center" width={5}>
                                        <Box className="more-horiz-icon">
                                            <EpisodeActionsMore
                                                broadcastId={broadcast.id as string}
                                                refetch={refetch}
                                            />
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
