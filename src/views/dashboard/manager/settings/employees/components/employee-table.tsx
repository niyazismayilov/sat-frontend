import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import {
    Box,
    IconButton,
    TableCell as MUITableCell,
    Table,
    TableBody,
    TableCellProps,
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
import { usePaginationDispatch, usePaginationState } from 'context/pagination/store';
import {
    EmployeeEntity,
    Enum_Employee_Status,
    useEmployeesLazyQuery,
    useUpdateEmployeeMutation,
} from 'graphql/generated';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { extractFilterFromQS } from 'ui-services/filter.ui-service';
import { extractPageFromQueryString, extractPageSizeFromQueryString } from 'utils/browser-utils';
import { EmployeeActions } from './employee-actions';
import { EmployeeActionsMore } from './employee-actions-more';
import { FilterDialog } from './filter-dialog';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacing(3.5),
    },

    '& .MuiTableCell-root': {
        padding: `${theme.spacing(1)} !important`,
    },
}));

export type Action = {
    icon: React.ReactNode;
    title: string;
    onClick: () => void;
};

export const statusBackgroundColor = {
    [Enum_Employee_Status.Active]: 'rgba(220, 252, 231, 1)',
    [Enum_Employee_Status.Deactive]: 'rgba(229, 231, 235, 1)',
};

export const statusColor = {
    [Enum_Employee_Status.Active]: 'rgba(21, 128, 61, 1)',
    [Enum_Employee_Status.Deactive]: 'rgba(156, 163, 175, 1)',
};

export const EmployeeTable: React.FC = () => {
    const [selected, setSelected] = useState<string[]>([]);
    const [filterDialogOpen, setFilterDialogOpen] = useState<boolean>(false);
    const dispatch = usePaginationDispatch();
    const { notify } = useNotifications();
    const { pageSize } = usePaginationState();
    const { t } = useTranslation();

    const [employees, setEmployees] = useState<EmployeeEntity[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const [loadEmploye, { data, refetch, loading }] = useEmployeesLazyQuery({
        fetchPolicy: 'cache-and-network',
        variables: {
            sort: ['rank:asc'],
            pagination: {
                pageSize: 777777,
            },
        },
        onCompleted(data) {
            setEmployees((data.employees?.data || []) as EmployeeEntity[]);
        },
    });

    const [reorder] = useUpdateEmployeeMutation({
        onCompleted() {
            notify({
                type: 'success',
                message: 'Ardıcıllıq uğurla dəyişdirildi',
            });
        },

        onError(error) {
            notify({
                type: 'error',
                message: error.message,
            });
        },
    });

    const pageCount = data?.employees?.meta.pagination?.pageCount;
    const totalCount = data?.employees?.meta.pagination.total;

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

        loadEmploye({
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

    const onBeforeDragStart = () => {
        setIsDragging(true);
    };

    const onDragEnd = (result): void => {
        setIsDragging(false);
        const { destination, source, reason } = result;
        if (!destination || reason === 'CANCEL') {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const dropped = employees[source.index];

        const sortedEmployees = [...employees];

        sortedEmployees.splice(source.index, 1);
        sortedEmployees.splice(destination.index, 0, dropped);

        sortedEmployees.forEach((employee, index) => {
            const oldEmployee = employees.find((oe) => oe.id === employee.id);

            if (index !== oldEmployee?.attributes?.rank) {
                reorder({ variables: { updateEmployeeId: employee.id as string, data: { rank: index } } });
            }
        });

        setEmployees(sortedEmployees);
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <Root>
            <EmployeeActions openFilterDialog={() => setFilterDialogOpen(true)} />
            <FilterDialog filterDialogOpen={filterDialogOpen} onClose={() => setFilterDialogOpen(false)} />
            <DragDropContext onDragEnd={onDragEnd} onBeforeDragStart={onBeforeDragStart}>
                <TableContainer className="table-container">
                    <Table sx={{ minWidth: 1200 }} aria-labelledby="tableTitle">
                        <TableHead>
                            <TableRow>
                                <MUITableCell className="checkbox-cell" />
                                <MUITableCell width={400}>ƏMƏKDAŞLAR</MUITableCell>
                                <MUITableCell>VƏZİFƏSİ</MUITableCell>
                                <MUITableCell>STATUS</MUITableCell>
                                <MUITableCell className="checkbox-cell" />
                            </TableRow>
                        </TableHead>
                        <Droppable droppableId="rows">
                            {(droppableRows) => (
                                <TableBody ref={droppableRows.innerRef} {...droppableRows.droppableProps}>
                                    {employees?.map((data, index) => (
                                        <Draggable key={data.id} draggableId={data.id} index={index}>
                                            {(draggable) => (
                                                <TableRow
                                                    ref={draggable.innerRef}
                                                    {...draggable.draggableProps}
                                                    {...draggable.dragHandleProps}
                                                    hover
                                                    onClick={() => handleClick(data?.id as string)}
                                                    tabIndex={-1}
                                                    key={data.id}
                                                >
                                                    <TableCell isDragOccurring={isDragging}>
                                                        <IconButton disableFocusRipple disabled={!draggable}>
                                                            <DragIndicatorIcon />
                                                        </IconButton>
                                                    </TableCell>

                                                    <TableCell align="right" isDragOccurring={isDragging}>
                                                        {data.attributes?.firstName} {data.attributes?.lastName}
                                                    </TableCell>
                                                    <TableCell align="right" isDragOccurring={isDragging}>
                                                        {data.attributes?.position}
                                                    </TableCell>

                                                    <TableCell align="center" isDragOccurring={isDragging}>
                                                        <Box>
                                                            <Typography
                                                                sx={{
                                                                    fontSize: 12,
                                                                    backgroundColor:
                                                                        statusBackgroundColor[
                                                                            data.attributes
                                                                                ?.status as Enum_Employee_Status
                                                                        ],
                                                                    borderRadius: '20px',
                                                                    height: '30px',
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    color: statusColor[
                                                                        data.attributes?.status as Enum_Employee_Status
                                                                    ],
                                                                }}
                                                            >
                                                                {t(data.attributes?.status as string)}
                                                            </Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell isDragOccurring={isDragging}>
                                                        <EmployeeActionsMore
                                                            employeeId={data.id as string}
                                                            refetch={refetch}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </Draggable>
                                    ))}
                                    {droppableRows.placeholder}
                                </TableBody>
                            )}
                        </Droppable>
                    </Table>
                </TableContainer>
            </DragDropContext>

            <Box sx={{ mt: 3 }}>
                <Typography sx={{ color: '#9CA3AF' }}>
                    {selected.length > 0 ? `(${selected.length} seçilib)` : null}
                </Typography>
            </Box>
            <AdminPagination />
        </Root>
    );
};

class TableCell extends React.Component<TableCellProps & { isDragOccurring: boolean }> {
    ref;

    getSnapshotBeforeUpdate(prevProps) {
        if (!this.ref) {
            return null;
        }

        const isDragStarting = this.props.isDragOccurring && !prevProps.isDragOccurring;

        if (!isDragStarting) {
            return null;
        }

        const { width, height } = this.ref.getBoundingClientRect();

        const snapshot = {
            width,
            height,
        };

        return snapshot;
    }

    componentDidUpdate(_prevProps, _prevState, snapshot) {
        const ref = this.ref;
        if (!ref) {
            return;
        }

        if (snapshot) {
            if (ref.style.width === snapshot.width) {
                return;
            }
            ref.style.width = `${snapshot.width}px`;
            ref.style.height = `${snapshot.height}px`;
            return;
        }

        if (this.props.isDragOccurring) {
            return;
        }

        // inline styles not applied
        if (ref.style.width == null) {
            return;
        }

        // no snapshot and drag is finished - clear the inline styles
        ref.style.removeProperty('height');
        ref.style.removeProperty('width');
    }

    setRef = (ref) => {
        this.ref = ref;
    };

    render() {
        return <MUITableCell ref={this.setRef}>{this.props.children}</MUITableCell>;
    }
}
