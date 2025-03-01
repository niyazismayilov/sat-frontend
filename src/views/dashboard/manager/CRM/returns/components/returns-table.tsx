import PhoneCallbackOutlinedIcon from '@mui/icons-material/PhoneCallbackOutlined';
import {
    Box,
    Checkbox,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Spinner } from 'components';
import { AdminPagination } from 'components/admin-pagination';
import { useNotifications } from 'context/NotificationsContext';
import { usePaginationDispatch } from 'context/pagination/store';
import { useCallbacksLazyQuery, useUpdateCallbackMutation } from 'graphql/generated';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { extractFilterFromQS } from 'ui-services/filter.ui-service';
import { extractPageFromQueryString, extractPageSizeFromQueryString } from 'utils/browser-utils';
import { FilterDialog } from './filter-dialog';
import { ReturnsActions } from './returns-actions';
import { ReturnsActionsMore } from './returns-actions-more';

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

export const ReturnsTable: React.FC = () => {
    const [filterDialogOpen, setFilterDialogOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<string[]>([]);
    const { notify } = useNotifications();
    const dispatch = usePaginationDispatch();
    const page = extractPageFromQueryString();

    const [loadCallbacks, { data, loading, refetch }] = useCallbacksLazyQuery({
        fetchPolicy: 'cache-and-network',
        variables: {
            sort: ['createdAt:desc'],
            pagination: {
                pageSize: 20,
            },
        },
    });
    const callbacks = data?.callbacks?.data.map((callback) => callback) || [];
    const pageCount = data?.callbacks?.meta.pagination.pageCount;
    const totalCount = data?.callbacks?.meta.pagination.total;

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
            if (key === 'isCalled') {
                filter[key] = { eq: qsFilter[key] === 'true' ? true : false };
                return;
            }
            filter[key] = isDate(qsFilter[key]) ? { gte: qsFilter[key] } : { containsi: qsFilter[key] };
        });
        const dateFilter = {};
        const { startsAt, endsAt } = qsFilter;
        startsAt ? (dateFilter['gte'] = startsAt + 'T00:00:00.265Z') : null;
        endsAt ? (dateFilter['lte'] = endsAt + 'T00:00:00.265Z') : null;
        if (Object.keys(dateFilter).length > 0) {
            filter['createdAt'] = dateFilter;
        }

        loadCallbacks({
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
    }, [search]);

    const [updateCallbackStatus] = useUpdateCallbackMutation({
        onCompleted() {
            refetch?.();
            notify({ type: 'success', message: 'Status uğurla dəyişdirildi' });
        },
        onError() {
            notify({ type: 'error', message: 'Uğursuz' });
        },
    });

    const respondedCall = (id, isCalled) => {
        updateCallbackStatus({
            variables: {
                updateCallbackId: id,
                data: {
                    isCalled: !isCalled,
                },
            },
        });
    };

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
            const newSelecteds = callbacks?.map((callback) => callback.id) || [];
            setSelected(newSelecteds as any);
            return;
        }
        setSelected([]);
    };

    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    if (loading) {
        return <Spinner />;
    }

    // const renderPhoneFormat = (input?: string) => {
    //     return `+994${input}`;
    // };

    return (
        <Root>
            <FilterDialog filterDialogOpen={filterDialogOpen} onClose={() => setFilterDialogOpen(false)} />
            <ReturnsActions openFilterDialog={() => setFilterDialogOpen(true)} />
            <TableContainer className="table-container">
                <Table sx={{ minWidth: 1200 }} aria-labelledby="tableTitle">
                    <TableHead>
                        <TableRow>
                            <TableCell className="checkbox-cell">
                                <Checkbox
                                    color="primary"
                                    checked={callbacks.length > 0 && selected.length === callbacks.length}
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            <TableCell>MOBİL NÖMRƏ</TableCell>
                            <TableCell>TARİX</TableCell>
                            <TableCell>STATUS</TableCell>
                            <TableCell colSpan={2} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {callbacks?.map((callback) => {
                            const isItemSelected = isSelected(callback.id as string);

                            return (
                                <TableRow
                                    hover
                                    onClick={() => handleClick(callback?.id as string)}
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={callback.id}
                                >
                                    <TableCell>
                                        <Checkbox checked={isItemSelected} color="primary" />
                                    </TableCell>

                                    <TableCell align="right">
                                        {/* {renderPhoneFormat(callback?.attributes?.phoneNumber)} */}
                                        {callback?.attributes?.phoneNumber}
                                    </TableCell>
                                    <TableCell align="right">
                                        {DateTime.fromISO(callback?.attributes?.createdAt).toFormat(
                                            'dd.MM.yyyy, HH:MM',
                                        )}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography
                                            sx={{
                                                fontSize: 12,
                                                backgroundColor:
                                                    callback?.attributes?.isCalled === true
                                                        ? 'rgba(220, 252, 231, 1)'
                                                        : 'rgba(229, 231, 235, 1)',
                                                borderRadius: '20px',
                                                height: '30px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',

                                                color:
                                                    callback?.attributes?.isCalled === true
                                                        ? 'rgba(21, 128, 61, 1)'
                                                        : 'rgba(156, 163, 175, 1)',
                                            }}
                                        >
                                            {callback?.attributes?.isCalled === true ? 'Zəng edildi' : 'Zəng edilmədi'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center" width={5}>
                                        <Box className="more-horiz-icon">
                                            <IconButton
                                                onClick={(e) => {
                                                    respondedCall(callback.id, callback.attributes?.isCalled),
                                                        e.stopPropagation();
                                                }}
                                            >
                                                <PhoneCallbackOutlinedIcon
                                                    style={{
                                                        color: callback.attributes?.isCalled ? '#3f51b5' : '#f44336',
                                                    }}
                                                />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center" width={5}>
                                        <Box className="more-horiz-icon">
                                            <ReturnsActionsMore callbackId={callback.id as string} refetch={refetch} />
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
