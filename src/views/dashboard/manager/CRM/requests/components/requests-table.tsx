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
    IconButton,
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { FilterDialog } from './filter-dialog';
import { Enum_Message_Type, useMessagesLazyQuery, useUpdateMessageMutation } from 'graphql/generated';
import { RequestsActions } from './requests-actions';
import { DateTime } from 'luxon';
import { RequestsActionsMore } from './requests-actions-more';
import { Spinner } from 'components';
import { useNotifications } from 'context/NotificationsContext';
import { AdminPagination } from 'components/admin-pagination';
import { usePaginationDispatch, usePaginationState } from 'context/pagination/store';
import { extractPageFromQueryString, extractPageSizeFromQueryString } from 'utils/browser-utils';
import { useHistory } from 'react-router-dom';
import { extractFilterFromQS } from 'ui-services/filter.ui-service';

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

export const serviceType = {
    [Enum_Message_Type.Consulting]: 'Konsaltinq',
    [Enum_Message_Type.Course]: 'Təlim',
};
export const RequestsTable: React.FC = () => {
    const dispatch = usePaginationDispatch();
    const { pageSize } = usePaginationState();
    const page = extractPageFromQueryString();
    const [filterDialogOpen, setFilterDialogOpen] = useState<boolean>(false);
    const { notify } = useNotifications();
    const [selected, setSelected] = useState<string[]>([]);

    const [loadMessages, { data, loading, refetch }] = useMessagesLazyQuery({
        fetchPolicy: 'cache-and-network',
        variables: {
            sort: ['createdAt:desc'],
            pagination: {
                pageSize: 20,
            },
        },
    });

    const pageCount = data?.messages?.meta.pagination.pageCount;
    const totalCount = data?.messages?.meta.pagination.total;

    useEffect(() => {
        if (!loading) {
            dispatch({ type: 'SET_PAGE_COUNT', pageCount: pageCount || 0 });
            dispatch({ type: 'SET_TOTAL_COUNT', totalCount: totalCount || 0 });
        }
    }, [loading]);

    const filterBlog = (): void => {
        const pageSize = extractPageSizeFromQueryString() || 20;
        const qsFilter = extractFilterFromQS();
        const { startsAt, endsAt } = qsFilter;
        const isDate = (str) => str.length === 10 && str.includes('-');
        const filter: any = {};
        const dateFilter = {};
        startsAt ? (dateFilter['gte'] = startsAt + 'T00:00:00.265Z') : null;
        endsAt ? (dateFilter['lte'] = endsAt + 'T00:00:00.265Z') : null;
        if (Object.keys(dateFilter).length > 0) {
            filter['createdAt'] = dateFilter;
        }
        Object.keys(qsFilter).forEach((key) => {
            if (key === 'course') {
                filter['interestedCourses'] = { id: { eq: qsFilter[key] } };
                return;
            }
            if (key === 'phoneNumber') {
                filter[key] = { containsi: qsFilter[key].replace(/[-()\s]/g, '') };
                return;
            }
            if (key === 'isRead') {
                filter[key] = { eq: qsFilter[key] === 'true' ? true : false };
                return;
            }
            filter[key] = isDate(qsFilter[key]) ? { gte: qsFilter[key] } : { containsi: qsFilter[key] };
        });

        loadMessages({
            variables: {
                pagination: {
                    page,
                    pageSize,
                },
                filters: {
                    ...filter,
                    status: filter?.status?.containsi ? { eqi: filter?.status?.containsi } : undefined,
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

    const [updateMessageStatus] = useUpdateMessageMutation({
        onCompleted() {
            refetch?.();
            notify({ type: 'success', message: 'Status uğurla dəyişdirildi' });
        },
        onError() {
            notify({ type: 'error', message: 'Uğursuz' });
        },
    });

    const readMessage = (id, isRead) => {
        updateMessageStatus({
            variables: {
                updateMessageId: id,
                data: {
                    isRead: !isRead,
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
            const newSelecteds = messages?.map((message) => message.id) || [];
            setSelected(newSelecteds as any);
            return;
        }
        setSelected([]);
    };

    const isSelected = (id: string) => selected.indexOf(id) !== -1;
    const messages = data?.messages?.data?.map((message) => message) || [];

    if (loading) {
        return <Spinner />;
    }

    return (
        <Root>
            <FilterDialog filterDialogOpen={filterDialogOpen} onClose={() => setFilterDialogOpen(false)} />
            <RequestsActions openFilterDialog={() => setFilterDialogOpen(true)} />
            <TableContainer className="table-container">
                <Table sx={{ minWidth: 1200 }} aria-labelledby="tableTitle">
                    <TableHead>
                        <TableRow>
                            <TableCell className="checkbox-cell">
                                <Checkbox
                                    color="primary"
                                    checked={messages.length > 0 && selected.length === messages.length}
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            <TableCell>TARİXİ</TableCell>
                            <TableCell>MESAJ</TableCell>
                            <TableCell>MÜŞTƏRİ</TableCell>
                            <TableCell>ELEKTRON POÇT</TableCell>
                            <TableCell>MOBİL NÖMRƏ</TableCell>
                            <TableCell>MƏHSULUN TİPİ</TableCell>
                            <TableCell>MARAQLANDIĞI KURS</TableCell>
                            <TableCell>MARAQLANDIĞI KONSALTİNQ</TableCell>
                            <TableCell>STATUS</TableCell>
                            <TableCell colSpan={2} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {messages?.map((message) => {
                            const isItemSelected = isSelected(message.id as string);
                            const courseName = message?.attributes?.interestedCourses?.data.length
                                ? message?.attributes?.interestedCourses?.data
                                      .map((course) => course.attributes?.name)
                                      .join(', ')
                                : '-';

                            return (
                                <TableRow
                                    hover
                                    onClick={() => handleClick(message?.id as string)}
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={message.id}
                                >
                                    <TableCell>
                                        <Checkbox checked={isItemSelected} color="primary" />
                                    </TableCell>

                                    <TableCell align="right">
                                        {DateTime.fromISO(message?.attributes?.createdAt).toFormat('dd.MM.yyyy, HH:MM')}
                                    </TableCell>
                                    <TableCell align="right">{message?.attributes?.message}</TableCell>
                                    <TableCell align="right">{message?.attributes?.fullName}</TableCell>
                                    <TableCell align="right">{message?.attributes?.email}</TableCell>
                                    <TableCell align="right">{message?.attributes?.phoneNumber}</TableCell>
                                    <TableCell align="right">
                                        {serviceType[message?.attributes?.type as Enum_Message_Type]}
                                    </TableCell>
                                    <TableCell align="right">{courseName}</TableCell>
                                    <TableCell align="right">
                                        {message?.attributes?.interestedConsultings
                                            ? message?.attributes?.interestedConsultings.join(', ')
                                            : '-'}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontSize: 12,
                                                    backgroundColor:
                                                        message?.attributes?.isRead === true
                                                            ? 'rgba(220, 252, 231, 1)'
                                                            : 'rgba(229, 231, 235, 1)',
                                                    borderRadius: '20px',
                                                    height: '30px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',

                                                    color:
                                                        message?.attributes?.isRead === true
                                                            ? 'rgba(21, 128, 61, 1)'
                                                            : 'rgba(156, 163, 175, 1)',
                                                }}
                                            >
                                                {message?.attributes?.isRead === true ? 'Oxundu' : 'Oxunmadı'}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center" width={5}>
                                        <Box className="more-horiz-icon">
                                            <IconButton
                                                onClick={(e) => {
                                                    readMessage(message.id, message.attributes?.isRead),
                                                        e.stopPropagation();
                                                }}
                                            >
                                                <EmailOutlinedIcon
                                                    style={{
                                                        color: message.attributes?.isRead ? '#3f51b5' : '#f44336',
                                                    }}
                                                />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center" width={5}>
                                        <Box className="more-horiz-icon">
                                            <RequestsActionsMore messageId={message.id as string} refetch={refetch} />
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
