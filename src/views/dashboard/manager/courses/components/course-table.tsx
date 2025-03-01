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
import { usePaginationDispatch, usePaginationState } from 'context/pagination/store';
import { Enum_Course_Status, useCoursesLazyQuery, useCoursesQuery } from 'graphql/generated';
import { useEffect, useState } from 'react';
import { Spinner } from 'components';
import { AdminPagination } from 'components/admin-pagination';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { extractFilterFromQS } from 'ui-services/filter.ui-service';
import { extractPageFromQueryString, extractPageSizeFromQueryString } from 'utils/browser-utils';
import { CoursesActionsMore } from './coures-actions-more';
import { CoursesActions } from './courses-actions';
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

export type Action = {
    icon: React.ReactNode;
    title: string;
    onClick: () => void;
};

export const statusBackgroundColor = {
    [Enum_Course_Status.Active]: 'rgba(220, 252, 231, 1)',
    [Enum_Course_Status.Inactive]: 'rgba(229, 231, 235, 1)',
};

export const statusColor = {
    [Enum_Course_Status.Active]: 'rgba(21, 128, 61, 1)',
    [Enum_Course_Status.Inactive]: 'rgba(156, 163, 175, 1)',
};

export const CourseTable: React.FC = () => {
    const dispatch = usePaginationDispatch();
    const { pageSize } = usePaginationState();
    const page = extractPageFromQueryString();
    const { t } = useTranslation();
    const [selected, setSelected] = useState<string[]>([]);
    const [filterDialogOpen, setFilterDialogOpen] = useState<boolean>(false);

    const [loadCourses, { data: newData, loading: newLoading, refetch }] = useCoursesLazyQuery({
        fetchPolicy: 'network-only',
        variables: {
            sort: ['createdAt:desc'],
        },
    });

    const { data: oldData, loading: oldLoading } = useCoursesQuery({
        variables: {
            pagination: {
                pageSize: 20,
            },
        },
    });

    const data = newData ?? oldData;

    const courses = data?.courses?.data.map((course) => course) || [];

    const pageCount = data?.courses?.meta.pagination?.pageCount;
    const totalCount = data?.courses?.meta.pagination.total;

    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    useEffect(() => {
        if (!newLoading || !oldLoading) {
            dispatch({ type: 'SET_PAGE_COUNT', pageCount: pageCount || 0 });
            dispatch({ type: 'SET_TOTAL_COUNT', totalCount: totalCount || 0 });
        }
    }, [newLoading, oldLoading]);

    const filterCourses = (): void => {
        const pageSize = extractPageSizeFromQueryString() || 20;
        const qsFilter = extractFilterFromQS();
        const {
            category,
            course,
            trainers,
            duration,
            durationType,
            capacity,
            minPrice,
            maxPrice,
            count,
            status,
            name,
        } = qsFilter;
        const courseFilter = {};
        const priceFilter = {};
        category ? (courseFilter['category'] = { eqi: category }) : null;
        course ? (courseFilter['id'] = { eqi: course }) : null;
        trainers ? (courseFilter['trainers'] = { id: { eqi: trainers } }) : null;
        duration && parseInt(duration) !== 0 ? (courseFilter['duration'] = { eqi: parseInt(duration) }) : null;
        durationType ? (courseFilter['durationType'] = { eqi: durationType }) : null;
        capacity && parseInt(capacity) !== 0 ? (courseFilter['capacity'] = { eqi: parseInt(capacity) }) : null;
        count && parseInt(count) !== 0 ? (courseFilter['count'] = { eqi: parseInt(count) }) : null;
        status ? (courseFilter['status'] = { eqi: status }) : null;
        minPrice && parseInt(minPrice) !== 0 ? (priceFilter['gte'] = parseFloat(minPrice)) : null;
        maxPrice && parseInt(maxPrice) !== 0 ? (priceFilter['lte'] = parseFloat(maxPrice)) : null;
        if (Object.keys(priceFilter).length > 0) {
            courseFilter['price'] = priceFilter;
        }
        name ? (courseFilter['name'] = { containsi: name }) : null;
        const filter: any = { ...courseFilter };

        loadCourses({
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
        filterCourses();
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
            const newSelecteds = courses?.map((course) => course.id) || [];
            setSelected(newSelecteds as any);
            return;
        }
        setSelected([]);
    };

    if (newLoading || oldLoading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Spinner />
            </Box>
        );
    }

    return (
        <Root>
            <FilterDialog filterDialogOpen={filterDialogOpen} onClose={() => setFilterDialogOpen(false)} />
            <CoursesActions openFilterDialog={() => setFilterDialogOpen(true)} />
            <TableContainer className="table-container">
                <Table sx={{ minWidth: 1200 }} aria-labelledby="tableTitle">
                    <TableHead>
                        <TableRow>
                            <TableCell className="checkbox-cell">
                                <Checkbox
                                    color="primary"
                                    checked={courses.length > 0 && selected.length === courses.length}
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            <TableCell>KATEQORİYA</TableCell>
                            <TableCell>KURS</TableCell>
                            <TableCell>TƏLİMÇİ</TableCell>
                            <TableCell>TƏLİM MÜDDƏTİ</TableCell>
                            <TableCell>MAKSİMUM İŞTİRAKÇI</TableCell>
                            <TableCell>QİYMƏT</TableCell>
                            <TableCell>TƏLİM SAYI</TableCell>
                            <TableCell>STATUS</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courses?.map((course) => {
                            const isItemSelected = isSelected(course.id as string);
                            const normalizedTrainers =
                                course.attributes?.trainers?.data
                                    .map(
                                        (trainer) => trainer.attributes?.firstName + ' ' + trainer.attributes?.lastName,
                                    )
                                    .join(', ') || [];

                            let fullName = normalizedTrainers;
                            if (fullName?.length > 50) fullName = fullName?.slice(0, 50) + '...';

                            return (
                                <TableRow
                                    hover
                                    onClick={() => handleClick(course?.id as string)}
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={course.id}
                                >
                                    <TableCell>
                                        <Checkbox checked={isItemSelected} color="primary" />
                                    </TableCell>

                                    <TableCell align="right">{course.attributes?.category}</TableCell>
                                    <TableCell align="right">{course.attributes?.name}</TableCell>
                                    <TableCell align="right">{fullName}</TableCell>

                                    <TableCell align="right">
                                        {course.attributes?.duration} {t(`enums:${course.attributes?.durationType}`)}
                                    </TableCell>

                                    <TableCell align="right">{course.attributes?.capacity} nəfər</TableCell>
                                    <TableCell align="right">{course.attributes?.price} ₼</TableCell>
                                    <TableCell align="right">{course.attributes?.count}</TableCell>

                                    <TableCell align="center">
                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontSize: 12,
                                                    backgroundColor:
                                                        statusBackgroundColor[
                                                            course.attributes?.status as Enum_Course_Status
                                                        ],
                                                    borderRadius: '20px',
                                                    height: '30px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    color: statusColor[course.attributes?.status as Enum_Course_Status],
                                                }}
                                            >
                                                {t(course.attributes?.status as string)}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center" width={5}>
                                        <Box className="more-horiz-icon">
                                            <CoursesActionsMore courseId={course.id as string} refetch={refetch} />
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
