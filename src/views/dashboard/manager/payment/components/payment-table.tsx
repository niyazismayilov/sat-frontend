import {
    Box,
    Checkbox,
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
import { useEffect, useState } from 'react';
import { PaymentActions } from './payment-actions';
import { FilterDialog } from '../components/filter-dialog';
import { AdminPagination } from 'components/admin-pagination';
import {
    useTransactionsLazyQuery,
    Enum_Transaction_Status,
    Enum_Courseregister_Paymentstatus,
} from 'graphql/generated';
import { usePaginationDispatch } from 'context/pagination/store';
import { useHistory } from 'react-router-dom';
import { extractPageSizeFromQueryString, extractPageFromQueryString } from 'utils/browser-utils';
import { extractFilterFromQS } from 'ui-services/filter.ui-service';
import { DateTime } from 'luxon';

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

export const statusBackgroundColor = {
    [Enum_Transaction_Status.Pending]: '#E5E7EB',
    [Enum_Transaction_Status.Approved]: '#DCFCE7',
    [Enum_Transaction_Status.Canceled]: '#FEE2E2',
    [Enum_Transaction_Status.Declined]: '#FEE2E2',
};

export const statusColor = {
    [Enum_Transaction_Status.Pending]: '#9CA3AF',
    [Enum_Transaction_Status.Approved]: '#15803D',
    [Enum_Transaction_Status.Canceled]: '#F87171',
    [Enum_Transaction_Status.Declined]: '#F87171',
};

export const transactionStatus = {
    [Enum_Transaction_Status.Pending]: 'Gözlənilir',
    [Enum_Transaction_Status.Approved]: 'Ödənilib',
    [Enum_Transaction_Status.Canceled]: 'Ləğv edildi',
    [Enum_Transaction_Status.Declined]: 'Rədd edildi',
};

export const paymentStatus = {
    [Enum_Courseregister_Paymentstatus.Paid]: 'Kart',
    [Enum_Courseregister_Paymentstatus.PaidByCash]: 'Nağd',
};

export const PaymentTable: React.FC = () => {
    const [selected, setSelected] = useState<string[]>([]);
    const [filterDialogOpen, setFilterDialogOpen] = useState<boolean>(false);
    const pageSize = extractPageSizeFromQueryString();
    const dispatch = usePaginationDispatch();

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

    const [loadPayment, { data, loading }] = useTransactionsLazyQuery({
        fetchPolicy: 'network-only',
        variables: {
            sort: ['createdAt:desc'],
            pagination: {
                pageSize: 20,
            },
        },
    });

    const payments = data?.transactions?.data.map((payment) => payment) || [];

    const pageCount = data?.transactions?.meta.pagination?.pageCount;
    const totalCount = data?.transactions?.meta.pagination.total;

    useEffect(() => {
        if (!loading) {
            dispatch({ type: 'SET_PAGE_COUNT', pageCount: pageCount || 0 });
            dispatch({ type: 'SET_TOTAL_COUNT', totalCount: totalCount || 0 });
        }
    }, [loading]);

    const filterPayment = (): void => {
        const page = extractPageFromQueryString();
        const pageSize = extractPageSizeFromQueryString();
        const qsFilter = extractFilterFromQS();
        const { name, user, group, startsAt, endsAt, course, minPrice, maxPrice, paymentStatus, orderId, status } =
            qsFilter;
        const filter: any = {};
        const userFilter = {};
        const groupFilter = {};
        const dateFilter = {};
        const amountFilter = {};

        user ? (userFilter['id'] = { eq: user }) : null;
        name ? (userFilter['firstName'] = { containsi: name }) : null;
        if (Object.keys(userFilter).length > 0) {
            filter['user'] = userFilter;
        }

        group ? (groupFilter['id'] = { eq: group }) : null;
        course ? (groupFilter['course'] = { id: { eq: course } }) : null;
        paymentStatus ? (groupFilter['course_registers'] = { paymentStatus: { eqi: paymentStatus } }) : null;
        if (Object.keys(groupFilter).length > 0) {
            filter['group'] = groupFilter;
        }

        startsAt ? (dateFilter['gte'] = startsAt + 'T00:00:00.265Z') : null;
        endsAt ? (dateFilter['lte'] = endsAt + 'T00:00:00.265Z') : null;
        if (Object.keys(dateFilter).length > 0) {
            filter['createdAt'] = dateFilter;
        }

        minPrice && parseInt(minPrice) !== 0 ? (amountFilter['gte'] = parseFloat(minPrice)) : null;
        maxPrice && parseInt(maxPrice) !== 0 ? (amountFilter['lte'] = parseFloat(maxPrice)) : null;
        if (Object.keys(amountFilter).length > 0) {
            filter['amount'] = amountFilter;
        }

        orderId ? (filter['orderId'] = { containsi: orderId }) : null;
        status ? (filter['status'] = { eqi: status }) : null;

        loadPayment({
            variables: {
                pagination: {
                    page,
                    pageSize,
                },
                filters: filter,
            },
        });
    };

    const history = useHistory();
    const search = history.location.search;

    useEffect(() => {
        filterPayment();
    }, [search, pageSize]);

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = payments?.map((payment) => payment.id) || [];
            setSelected(newSelecteds as any);
            return;
        }
        setSelected([]);
    };

    return (
        <Root>
            <FilterDialog filterDialogOpen={filterDialogOpen} onClose={() => setFilterDialogOpen(false)} />
            <PaymentActions openFilterDialog={() => setFilterDialogOpen(true)} />
            <TableContainer className="table-container">
                <Table sx={{ minWidth: 1200 }} aria-labelledby="tableTitle">
                    <TableHead>
                        <TableRow>
                            <TableCell className="checkbox-cell">
                                <Checkbox
                                    color="primary"
                                    checked={payments.length > 0 && selected.length === payments.length}
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            <TableCell>İŞTİRAKÇI</TableCell>
                            <TableCell>QRUP</TableCell>
                            <TableCell>KURS</TableCell>
                            <TableCell>TARIXI</TableCell>
                            <TableCell>MƏBLƏĞ</TableCell>
                            <TableCell>ÖDƏNİŞ NÖVÜ</TableCell>
                            <TableCell>ORDER ID</TableCell>
                            <TableCell>STATUS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {payments?.map((payment) => {
                            const isItemSelected = isSelected(payment.id as string);
                            return (
                                <TableRow
                                    hover
                                    onClick={() => handleClick(payment?.id as string)}
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={payment.id}
                                >
                                    <TableCell>
                                        <Checkbox checked={isItemSelected} color="primary" />
                                    </TableCell>
                                    <TableCell align="right">
                                        {payment?.attributes?.user?.data?.attributes?.firstName +
                                            ' ' +
                                            payment?.attributes?.user?.data?.attributes?.lastName}
                                    </TableCell>
                                    <TableCell align="right">
                                        {payment?.attributes?.group?.data?.attributes?.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {payment?.attributes?.group?.data?.attributes?.course?.data?.attributes?.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {DateTime.fromISO(payment?.attributes?.createdAt).toFormat('dd.MM.yyyy hh:mm')}
                                    </TableCell>
                                    <TableCell align="right">
                                        {payment?.attributes?.amount + ' ' + payment?.attributes?.currency}
                                    </TableCell>
                                    <TableCell align="right">
                                        {
                                            paymentStatus[
                                                payment?.attributes?.group?.data?.attributes?.course_registers?.data[0]
                                                    ?.attributes?.paymentStatus as Enum_Courseregister_Paymentstatus
                                            ]
                                        }
                                    </TableCell>
                                    <TableCell align="right">{payment?.attributes?.orderId}</TableCell>
                                    <TableCell align="center">
                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontSize: 12,
                                                    backgroundColor:
                                                        statusBackgroundColor[
                                                            payment?.attributes?.status as Enum_Transaction_Status
                                                        ],
                                                    borderRadius: '20px',
                                                    height: '30px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    color: statusColor[
                                                        payment?.attributes?.status as Enum_Transaction_Status
                                                    ],
                                                }}
                                            >
                                                {
                                                    transactionStatus[
                                                        payment?.attributes?.status as Enum_Transaction_Status
                                                    ]
                                                }
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <AdminPagination />
        </Root>
    );
};
