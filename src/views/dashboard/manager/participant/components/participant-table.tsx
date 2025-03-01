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
import { AdminPagination } from 'components/admin-pagination';
import { usePaginationDispatch, usePaginationState } from 'context/pagination/store';
import { useUsersPermissionsUsersLazyQuery } from 'graphql/generated';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { extractFilterFromQS } from 'ui-services/filter.ui-service';
import { extractPageFromQueryString, extractPageSizeFromQueryString } from 'utils/browser-utils';
import { FilterDialog } from '../components/filter-dialog';
import { ParticipantActions } from './participant-actions';
import { ParticipantsActionsMore } from './participants-actions-more';

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

export const ParticipantTable: React.FC = () => {
    const dispatch = usePaginationDispatch();
    const { pageSize } = usePaginationState();
    const [selected, setSelected] = useState<string[]>([]);
    const [filterDialogOpen, setFilterDialogOpen] = useState<boolean>(false);

    const [loadParticipants, { data, loading, refetch }] = useUsersPermissionsUsersLazyQuery({
        fetchPolicy: 'cache-and-network',
        variables: {
            sort: ['createdAt:desc'],
            pagination: {
                pageSize: 20,
            },
        },
    });

    const participants = data?.usersPermissionsUsers?.data.map((participant) => participant) || [];

    const pageCount = data?.usersPermissionsUsers?.meta.pagination?.pageCount;
    const totalCount = data?.usersPermissionsUsers?.meta.pagination.total;

    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    useEffect(() => {
        if (!loading) {
            dispatch({ type: 'SET_PAGE_COUNT', pageCount: pageCount || 0 });
            dispatch({ type: 'SET_TOTAL_COUNT', totalCount: totalCount || 0 });
        }
    }, [loading]);

    const filterParticipants = (): void => {
        const page = extractPageFromQueryString();
        const pageSize = extractPageSizeFromQueryString();
        const qsFilter = extractFilterFromQS();
        const isDate = (str) => str.length === 10 && str.includes('-');
        const filter: any = {};
        Object.keys(qsFilter).forEach((key) => {
            if (key === 'user') {
                filter['id'] = { eq: qsFilter[key] };
                return;
            }
            if (key === 'confirmed') {
                filter[key] = { eq: qsFilter[key] === 'true' ? true : false };
                return;
            }
            filter[key] = isDate(qsFilter[key]) ? { eqi: qsFilter[key] } : { containsi: qsFilter[key] };
        });

        loadParticipants({
            variables: {
                pagination: {
                    page,
                    pageSize,
                },
                filters: {
                    ...filter,
                    role: {
                        type: {
                            eqi: 'authenticated',
                        },
                    },
                },
            },
        });
    };

    const history = useHistory();
    const search = history.location.search;

    useEffect(() => {
        filterParticipants();
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

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = participants?.map((participant) => participant.id) || [];
            setSelected(newSelecteds as any);
            return;
        }
        setSelected([]);
    };

    return (
        <Root>
            <FilterDialog filterDialogOpen={filterDialogOpen} onClose={() => setFilterDialogOpen(false)} />
            <ParticipantActions openFilterDialog={() => setFilterDialogOpen(true)} />
            <TableContainer className="table-container">
                <Table sx={{ minWidth: 1200 }} aria-labelledby="tableTitle">
                    <TableHead>
                        <TableRow>
                            <TableCell className="checkbox-cell">
                                <Checkbox
                                    color="primary"
                                    checked={participants.length > 0 && selected.length === participants.length}
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            <TableCell>İŞTİRAKÇILAR</TableCell>
                            <TableCell>ELEKTRON POÇT</TableCell>
                            <TableCell>DOĞUM TARİXİ</TableCell>
                            <TableCell>MOBİL NÖMRƏ</TableCell>
                            <TableCell>CİNSİ</TableCell>
                            <TableCell>STATUS</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {participants?.map((participant) => {
                            const isItemSelected = isSelected(participant.id as string);
                            return (
                                <TableRow
                                    hover
                                    onClick={() => handleClick(participant?.id as string)}
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={participant.id}
                                >
                                    <TableCell>
                                        <Checkbox checked={isItemSelected} color="primary" />
                                    </TableCell>

                                    <TableCell align="right">
                                        {participant.attributes?.firstName} {participant.attributes?.lastName}
                                    </TableCell>
                                    <TableCell align="right">{participant.attributes?.email}</TableCell>
                                    <TableCell align="right">{participant.attributes?.dateOfBirth}</TableCell>
                                    <TableCell align="right">{participant.attributes?.phoneNumber}</TableCell>

                                    <TableCell align="right">
                                        {participant.attributes?.gender === 'MALE' ? 'Kişi' : 'Qadın'}
                                    </TableCell>

                                    <TableCell align="center">
                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontSize: 12,
                                                    backgroundColor:
                                                        participant.attributes?.confirmed === true
                                                            ? 'rgba(220, 252, 231, 1)'
                                                            : 'rgba(229, 231, 235, 1)',
                                                    borderRadius: '20px',
                                                    height: '30px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',

                                                    color:
                                                        participant.attributes?.confirmed === true
                                                            ? 'rgba(21, 128, 61, 1)'
                                                            : 'rgba(156, 163, 175, 1)',
                                                }}
                                            >
                                                {participant.attributes?.confirmed === true ? 'Aktiv' : 'Deaktiv'}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center" width={5}>
                                        <Box className="more-horiz-icon">
                                            <ParticipantsActionsMore
                                                participantId={participant.id as string}
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
