// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
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
import { TrainersActions } from './trainer-actions';
import { usePaginationDispatch, usePaginationState } from 'context/pagination/store';
import { useEffect, useState } from 'react';
import { FilterDialog } from '../components/filter-dialog';
import { TrainersActionsMore } from './trainers-actions-more';
import { Enum_Trainer_Status, useTrainersLazyQuery } from 'graphql/generated';
import { extractPageFromQueryString, extractPageSizeFromQueryString } from 'utils/browser-utils';
import { useHistory } from 'react-router-dom';
import { extractFilterFromQS } from 'ui-services/filter.ui-service';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'components';

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
    [Enum_Trainer_Status.Active]: 'rgba(220, 252, 231, 1)',
    [Enum_Trainer_Status.Deactive]: 'rgba(229, 231, 235, 1)',
};

export const statusColor = {
    [Enum_Trainer_Status.Active]: 'rgba(21, 128, 61, 1)',
    [Enum_Trainer_Status.Deactive]: 'rgba(156, 163, 175, 1)',
};

export const TrainerTable: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = usePaginationDispatch();
    const { pageSize } = usePaginationState();
    const [selected, setSelected] = useState<string[]>([]);
    const [filterDialogOpen, setFilterDialogOpen] = useState<boolean>(false);

    const [loadTrainers, { data, refetch, loading }] = useTrainersLazyQuery({
        fetchPolicy: 'cache-and-network',
        variables: {
            sort: ['createdAt:desc'],
        },
    });

    const trainers = data?.trainers?.data.map((trainer) => trainer) || [];

    const pageCount = data?.trainers?.meta.pagination?.pageCount;
    const totalCount = data?.trainers?.meta.pagination.total;

    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    useEffect(() => {
        if (!loading) {
            dispatch({ type: 'SET_PAGE_COUNT', pageCount: pageCount || 0 });
            dispatch({ type: 'SET_TOTAL_COUNT', totalCount: totalCount || 0 });
        }
    }, [loading]);

    const filterTrainers = (): void => {
        const page = extractPageFromQueryString();
        const pageSize = extractPageSizeFromQueryString();
        const qsFilter = extractFilterFromQS();
        const isDate = (str) => str.length === 10 && str.includes('-');
        const filter: any = {};
        Object.keys(qsFilter).forEach((key) => {
            if (key === 'course') {
                filter['courses'] = { id: { eq: qsFilter[key] } };
                return;
            }
            if (key === 'status') {
                filter[key] = { eqi: qsFilter[key] };
                return;
            }
            filter[key] = isDate(qsFilter[key]) ? { eqi: qsFilter[key] } : { containsi: qsFilter[key] };
        });

        loadTrainers({
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
        filterTrainers();
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
            const newSelecteds = trainers?.map((trainer) => trainer.id) || [];
            setSelected(newSelecteds as any);
            return;
        }
        setSelected([]);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Spinner />
            </Box>
        );
    }

    return (
        <Root>
            <FilterDialog filterDialogOpen={filterDialogOpen} onClose={() => setFilterDialogOpen(false)} />
            <TrainersActions openFilterDialog={() => setFilterDialogOpen(true)} />
            <TableContainer className="table-container">
                <Table sx={{ minWidth: 1200 }} aria-labelledby="tableTitle">
                    <TableHead>
                        <TableRow>
                            <TableCell className="checkbox-cell">
                                <Checkbox
                                    color="primary"
                                    checked={trainers.length > 0 && selected.length === trainers.length}
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            <TableCell>TƏLİMÇİ</TableCell>
                            <TableCell>ELEKTRON POÇT</TableCell>
                            <TableCell>DOĞUM TARİXİ</TableCell>
                            <TableCell>MOBİL NÖMRƏ</TableCell>
                            <TableCell>KURS</TableCell>
                            <TableCell>STATUS</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {trainers?.map((trainer) => {
                            const isItemSelected = isSelected(trainer.id as string);
                            return (
                                <TableRow
                                    hover
                                    onClick={() => handleClick(trainer?.id as string)}
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={trainer.id}
                                >
                                    <TableCell>
                                        <Checkbox checked={isItemSelected} color="primary" />
                                    </TableCell>

                                    <TableCell align="right">
                                        {trainer.attributes?.firstName} {trainer.attributes?.lastName}
                                    </TableCell>
                                    <TableCell align="right">{trainer.attributes?.email}</TableCell>
                                    <TableCell align="right">{trainer.attributes?.birthdayDate}</TableCell>
                                    <TableCell align="right">{trainer.attributes?.phoneNumber}</TableCell>

                                    <TableCell align="right">
                                        {trainer.attributes?.courses?.data.length
                                            ? trainer.attributes?.courses?.data
                                                  .map((course) => course.attributes?.name)
                                                  .join(', ')
                                            : '-'}
                                    </TableCell>

                                    <TableCell align="center">
                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontSize: 12,
                                                    backgroundColor:
                                                        statusBackgroundColor[
                                                            trainer.attributes?.status as Enum_Trainer_Status
                                                        ],
                                                    borderRadius: '20px',
                                                    height: '30px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    color: statusColor[
                                                        trainer.attributes?.status as Enum_Trainer_Status
                                                    ],
                                                }}
                                            >
                                                {t(trainer.attributes?.status as string)}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center" width={5}>
                                        <Box className="more-horiz-icon">
                                            <TrainersActionsMore trainerId={trainer.id as string} refetch={refetch} />
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
