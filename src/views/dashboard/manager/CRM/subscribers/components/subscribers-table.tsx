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
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { FilterDialog } from './filter-dialog';

import { useSubscribersLazyQuery } from 'graphql/generated';
import { SubscribersActions } from './subscribers-actions';
import { Spinner } from 'components';
import { DateTime } from 'luxon';
import { SubscribersActionsMore } from './subscribers-actions-more';
import { usePaginationDispatch, usePaginationState } from 'context/pagination/store';
import { extractPageFromQueryString, extractPageSizeFromQueryString } from 'utils/browser-utils';
import { extractFilterFromQS } from 'ui-services/filter.ui-service';
import { useHistory } from 'react-router-dom';
import { AdminPagination } from 'components/admin-pagination';

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
}));
export const SubscribersTable: React.FC = () => {
    const dispatch = usePaginationDispatch();
    const { pageSize } = usePaginationState();
    const page = extractPageFromQueryString();
    const [filterDialogOpen, setFilterDialogOpen] = useState<boolean>(false);
    const [loadSubscribers, { data, loading, refetch }] = useSubscribersLazyQuery({
        fetchPolicy: 'cache-and-network',
        variables: {
            sort: ['createdAt:desc'],
            pagination: {
                pageSize: 20,
            },
        },
    });
    const pageCount = data?.subscribers?.meta.pagination.pageCount;
    const totalCount = data?.subscribers?.meta.pagination.total;

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
            filter[key] = isDate(qsFilter[key]) ? { gte: qsFilter[key] } : { containsi: qsFilter[key] };
        });

        const dateFilter = {};
        const { startsAt, endsAt } = qsFilter;
        startsAt ? (dateFilter['gte'] = startsAt + 'T00:00:00.265Z') : null;
        endsAt ? (dateFilter['lte'] = endsAt + 'T00:00:00.265Z') : null;
        if (Object.keys(dateFilter).length > 0) {
            filter['createdAt'] = dateFilter;
        }

        loadSubscribers({
            variables: {
                pagination: {
                    page,
                    pageSize,
                },
                filters: {
                    ...filter,
                    startsAt: undefined,
                    endsAt: undefined,
                },
            },
        });
    };

    const history = useHistory();
    const search = history.location.search;

    useEffect(() => {
        filterBlog();
    }, [search, pageSize]);

    const [selected, setSelected] = useState<string[]>([]);
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
            const newSelecteds = subscribers?.map((subscriber) => subscriber.id) || [];
            setSelected(newSelecteds as any);
            return;
        }
        setSelected([]);
    };

    const isSelected = (id: string) => selected.indexOf(id) !== -1;
    const subscribers = data?.subscribers?.data?.map((subscriber) => subscriber) || [];

    if (loading) {
        return <Spinner />;
    }

    return (
        <Root>
            <FilterDialog filterDialogOpen={filterDialogOpen} onClose={() => setFilterDialogOpen(false)} />
            <SubscribersActions openFilterDialog={() => setFilterDialogOpen(true)} />
            <TableContainer className="table-container">
                <Table sx={{ minWidth: 1200 }} aria-labelledby="tableTitle" id="subscribersTable">
                    <TableHead>
                        <TableRow>
                            <TableCell className="checkbox-cell">
                                <Checkbox
                                    color="primary"
                                    checked={subscribers.length > 0 && selected.length === subscribers.length}
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            <TableCell>ELEKTRON POÇT</TableCell>
                            <TableCell>YARADILMA TARİXİ</TableCell>
                            <TableCell colSpan={2} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {subscribers?.map((subscriber) => {
                            const isItemSelected = isSelected(subscriber.id as string);

                            return (
                                <TableRow
                                    hover
                                    onClick={() => handleClick(subscriber?.id as string)}
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={subscriber.id}
                                >
                                    <TableCell>
                                        <Checkbox checked={isItemSelected} color="primary" />
                                    </TableCell>
                                    <TableCell align="right">{subscriber?.attributes?.email}</TableCell>
                                    <TableCell align="center">
                                        {DateTime.fromISO(subscriber?.attributes?.createdAt).toFormat(
                                            'dd.MM.yyyy, HH:MM',
                                        )}
                                    </TableCell>

                                    <TableCell align="center" width={5}>
                                        <Box className="more-horiz-icon">
                                            <SubscribersActionsMore
                                                subscriberId={subscriber.id as string}
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
