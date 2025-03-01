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
import { Spinner } from 'components';
import { AdminPagination } from 'components/admin-pagination';
import { usePaginationDispatch, usePaginationState } from 'context/pagination/store';
import { Enum_Courseregister_Paymentstatus, useCourseRegistersLazyQuery } from 'graphql/generated';
import { useState, useEffect } from 'react';
import { RegisteredActions } from './registered-actions';
import { RegisteredActionsMore } from './registered-actions-more';
import { extractPageFromQueryString, extractPageSizeFromQueryString } from 'utils/browser-utils';
import { extractFilterFromQS } from 'ui-services/filter.ui-service';
import { useHistory } from 'react-router-dom';
import { FilterDialog } from './filter-dialog';

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

export const paymentStatus = {
    [Enum_Courseregister_Paymentstatus.Paid]: 'Kart',
    [Enum_Courseregister_Paymentstatus.PaidByCash]: 'Nağd',
};

export const RegisteredTable: React.FC = () => {
    const dispatch = usePaginationDispatch();
    const { pageSize } = usePaginationState();
    const [selected, setSelected] = useState<string[]>([]);
    const [filterDialogOpen, setFilterDialogOpen] = useState<boolean>(false);

    const [loadCourseRegisters, { data, refetch, loading }] = useCourseRegistersLazyQuery({
        fetchPolicy: 'cache-and-network',
        variables: {
            sort: ['createdAt:desc'],
            pagination: {
                pageSize: 20,
            },
        },
    });

    const courseRegisters = data?.courseRegisters?.data.map((courseRegister) => courseRegister) || [];

    const pageCount = data?.courseRegisters?.meta.pagination.pageCount;
    const totalCount = data?.courseRegisters?.meta.pagination.total;

    useEffect(() => {
        if (!loading) {
            dispatch({ type: 'SET_PAGE_COUNT', pageCount: pageCount || 0 });
            dispatch({ type: 'SET_TOTAL_COUNT', totalCount: totalCount || 0 });
        }
    }, [loading]);

    const filterCourseRegisters = (): void => {
        const page = extractPageFromQueryString();
        const pageSize = extractPageSizeFromQueryString();
        const qsFilter = extractFilterFromQS();
        const filter: any = {};
        const { group, course, startsAt, endsAt, user, paymentStatus, status, name } = qsFilter;
        const groupFilter = {};
        const userFilter = {};

        group ? (groupFilter['id'] = { eq: group }) : null;
        course ? (groupFilter['course'] = { id: { eq: course } }) : null;
        startsAt ? (groupFilter['startsAt'] = { gte: startsAt }) : null;
        endsAt ? (groupFilter['endsAt'] = { lte: endsAt }) : null;
        if (Object.keys(groupFilter).length > 0) {
            filter['group'] = groupFilter;
        }

        user ? (userFilter['id'] = { eq: user }) : null;
        name ? (userFilter['firstName'] = { containsi: name }) : null;
        if (Object.keys(userFilter).length > 0) {
            filter['user'] = userFilter;
        }

        paymentStatus ? (filter['paymentStatus'] = { eqi: paymentStatus }) : null;
        status ? (filter['status'] = { eqi: status }) : null;

        loadCourseRegisters({
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
        filterCourseRegisters();
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
            const newSelecteds = courseRegisters?.map((courseRegister) => courseRegister.id) || [];
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
            <RegisteredActions openFilterDialog={() => setFilterDialogOpen(true)} />
            <TableContainer className="table-container">
                <Table sx={{ minWidth: 1200 }} aria-labelledby="tableTitle">
                    <TableHead>
                        <TableRow>
                            <TableCell className="checkbox-cell">
                                <Checkbox
                                    color="primary"
                                    checked={courseRegisters.length > 0 && selected.length === courseRegisters.length}
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            <TableCell>İŞTİRAKÇI</TableCell>
                            <TableCell>QRUP</TableCell>
                            <TableCell>KURS</TableCell>
                            <TableCell>BAŞLAMA TARİXİ</TableCell>
                            <TableCell>BİTMƏ TARİXİ</TableCell>
                            <TableCell>ÖDƏNİŞ NÖVÜ</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courseRegisters?.map((courseRegister) => {
                            const isItemSelected = isSelected(courseRegister.id as string);
                            return (
                                <TableRow
                                    hover
                                    onClick={() => handleClick(courseRegister?.id as string)}
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={courseRegister.id}
                                >
                                    <TableCell>
                                        <Checkbox checked={isItemSelected} color="primary" />
                                    </TableCell>

                                    <TableCell align="right">
                                        {courseRegister.attributes?.user?.data?.attributes?.firstName +
                                            ' ' +
                                            courseRegister.attributes?.user?.data?.attributes?.lastName}
                                    </TableCell>
                                    <TableCell align="right">
                                        {courseRegister.attributes?.group?.data?.attributes?.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {
                                            courseRegister.attributes?.group?.data?.attributes?.course?.data?.attributes
                                                ?.name
                                        }
                                    </TableCell>

                                    <TableCell align="right">
                                        {courseRegister.attributes?.group?.data?.attributes?.startsAt}
                                    </TableCell>

                                    <TableCell align="right">
                                        {courseRegister.attributes?.group?.data?.attributes?.endsAt}
                                    </TableCell>
                                    <TableCell align="right">
                                        {
                                            paymentStatus[
                                                courseRegister.attributes
                                                    ?.paymentStatus as Enum_Courseregister_Paymentstatus
                                            ]
                                        }
                                    </TableCell>

                                    <TableCell align="center" width={5}>
                                        <Box className="more-horiz-icon">
                                            <RegisteredActionsMore
                                                courseRegisterId={courseRegister.id as string}
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
