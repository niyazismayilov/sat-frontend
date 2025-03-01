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
import { Enum_Group_Status, useGroupsLazyQuery } from 'graphql/generated';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { extractFilterFromQS } from 'ui-services/filter.ui-service';
import { extractPageFromQueryString, extractPageSizeFromQueryString } from 'utils/browser-utils';
import { FilterDialog } from './filter-dialog';
import { GroupActions } from './groups-actions';
import { GroupActionsMore } from './groups-actions-more';
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
}));

export type Action = {
    icon: React.ReactNode;
    title: string;
    onClick: () => void;
};

export const statusBackgroundColor = {
    [Enum_Group_Status.Active]: 'rgba(220, 252, 231, 1)',
    [Enum_Group_Status.Inactive]: 'rgba(229, 231, 235, 1)',
};

export const statusColor = {
    [Enum_Group_Status.Active]: 'rgba(21, 128, 61, 1)',
    [Enum_Group_Status.Inactive]: 'rgba(156, 163, 175, 1)',
};

export const GroupTable: React.FC = () => {
    const { t } = useTranslation();
    const [selected, setSelected] = useState<string[]>([]);
    const [filterDialogOpen, setFilterDialogOpen] = useState<boolean>(false);
    const dispatch = usePaginationDispatch();
    const { pageSize } = usePaginationState();
    const page = extractPageFromQueryString();

    const [loadGroups, { data, loading, refetch }] = useGroupsLazyQuery({
        fetchPolicy: 'network-only',
        variables: {
            sort: ['createdAt:desc'],
            pagination: {
                pageSize: 20,
            },
        },
    });

    const groupdata = data?.groups?.data.map((group) => group) || [];

    const pageCount = data?.groups?.meta.pagination.pageCount;
    const totalCount = data?.groups?.meta.pagination.total;

    useEffect(() => {
        if (!loading) {
            dispatch({ type: 'SET_PAGE_COUNT', pageCount: pageCount || 0 });
            dispatch({ type: 'SET_TOTAL_COUNT', totalCount: totalCount || 0 });
        }
    }, [loading]);

    const filterGroups = (): void => {
        const pageSize = extractPageSizeFromQueryString();
        const qsFilter = extractFilterFromQS();
        const { group, course, startsAt, endsAt, status, name } = qsFilter;
        const groupFilter = {};
        group ? (groupFilter['id'] = { eq: group }) : null;
        course ? (groupFilter['course'] = { id: { eq: course } }) : null;
        startsAt ? (groupFilter['startsAt'] = { gte: startsAt }) : null;
        endsAt ? (groupFilter['endsAt'] = { lte: endsAt }) : null;
        status ? (groupFilter['status'] = { eqi: status }) : null;
        name ? (groupFilter['name'] = { containsi: name }) : null;
        const filter: any = { ...groupFilter };

        loadGroups({
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
        filterGroups();
    }, [search, pageSize]);

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

    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = groupdata?.map((group) => group.id) || [];
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
            <GroupActions openFilterDialog={() => setFilterDialogOpen(true)} />
            <TableContainer className="table-container">
                <Table sx={{ minWidth: 1200 }} aria-labelledby="tableTitle">
                    <TableHead>
                        <TableRow>
                            <TableCell className="checkbox-cell">
                                <Checkbox
                                    color="primary"
                                    checked={groupdata.length > 0 && selected.length === groupdata.length}
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            <TableCell>QRUP</TableCell>
                            <TableCell>KURS</TableCell>
                            <TableCell>İŞTİRAKÇI SAYI (NƏFƏR)</TableCell>
                            <TableCell>BAŞLAMA TARİXİ</TableCell>
                            <TableCell>BİTMƏ TARİXİ</TableCell>
                            <TableCell>QİYMƏT</TableCell>
                            <TableCell>STATUS</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {groupdata.map((group) => {
                            const isItemSelected = isSelected(group.id as string);
                            return (
                                <React.Fragment key={group.id}>
                                    <TableRow
                                        hover
                                        onClick={() => handleClick(group?.id as string)}
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={group.id}
                                    >
                                        <TableCell>
                                            <Checkbox checked={isItemSelected} color="primary" />
                                        </TableCell>

                                        <TableCell align="right">{group.attributes?.name}</TableCell>
                                        <TableCell align="right">
                                            {group.attributes?.course?.data?.attributes?.name}
                                        </TableCell>
                                        <TableCell align="right">
                                            {group.attributes?.course_registers?.data.length}/
                                            {group.attributes?.capacity} nəfər
                                        </TableCell>

                                        <TableCell align="right">{group.attributes?.startsAt}</TableCell>

                                        <TableCell align="right">{group.attributes?.endsAt}</TableCell>
                                        <TableCell align="right">
                                            {group.attributes?.course?.data?.attributes?.price} ₼
                                        </TableCell>

                                        <TableCell align="center">
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        fontSize: 12,
                                                        backgroundColor:
                                                            statusBackgroundColor[
                                                                group.attributes?.status as Enum_Group_Status
                                                            ],
                                                        borderRadius: '20px',
                                                        height: '30px',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        color: statusColor[
                                                            group.attributes?.status as Enum_Group_Status
                                                        ],
                                                    }}
                                                >
                                                    {t(group.attributes?.status as string)}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" width={5}>
                                            <Box className="more-horiz-icon">
                                                <GroupActionsMore groupId={group.id as string} refetch={refetch} />
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
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
