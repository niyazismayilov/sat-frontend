import {
    Box,
    Button,
    Divider,
    IconButton,
    InputAdornment,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/styles';
import { ReactComponent as FilterIcon } from 'assets/icons/manager-dashboard/filter.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/manager-dashboard/plusIcon.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/manager-dashboard/search.svg';
import { Link } from 'components';
import { ManagerPageHeader } from 'components/manager-page-header';
import { usePaginationDispatch } from 'context/pagination/store';
import { Field, Form, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-mui';
import { useRef } from 'react';
import { extractFilterFromQS } from 'ui-services/filter.ui-service';
import browserHistory from 'utils/browser-utils';
import AddIcon from '@mui/icons-material/Add';
import { useCourseFilterDispatch } from 'context/course-filter/store';

type CoursesActionsProps = {
    openFilterDialog?: () => void;
};

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    '& .MuiBox-root': {
        display: 'flex',
        alignItems: 'center',
    },
    '& .button': {
        marginLeft: theme.spacing(3),
        padding: '10px 28px',
        border: '1px solid #D1D5DB',
    },
    '& .delete-button': {
        color: theme.palette.error.main,
    },

    '& .css-1o9s3wi-MuiInputBase-input-MuiOutlinedInput-input': {
        padding: '11px 14px',
    },

    '& .create-course-button': {
        padding: '10px 28px',
    },
}));

export const CoursesActions: React.FC<CoursesActionsProps> = ({ openFilterDialog }) => {
    const dispatch = useCourseFilterDispatch();
    const filter = extractFilterFromQS();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const formikRef = useRef<FormikProps<any>>(null);
    const paginationDispatch = usePaginationDispatch();
    return (
        <Root>
            <ManagerPageHeader title="Kurslar">
                <Box>
                    <Divider />
                </Box>
                {isMobile ? (
                    <>
                        <Tooltip title="Yeni kurs" arrow>
                            <IconButton
                                sx={{ ml: 3 }}
                                onClick={() => browserHistory.push('/d/training/courses/create')}
                            >
                                <AddIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="filter" arrow>
                            <IconButton sx={{ ml: 3 }} onClick={openFilterDialog}>
                                <FilterIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                ) : (
                    <>
                        <Link to="/d/training/courses/create">
                            <Button
                                startIcon={<PlusIcon />}
                                variant="contained"
                                sx={{ mr: 12 }}
                                className="create-course-button"
                            >
                                Yeni kurs
                            </Button>
                        </Link>
                        <Formik
                            initialValues={{ search: filter?.name || '' }}
                            innerRef={formikRef}
                            onSubmit={() => {
                                dispatch({
                                    type: 'SET_FILTER',
                                    filter: {
                                        ...filter,
                                        name:
                                            formikRef.current?.values.search &&
                                            formikRef.current?.values.search.toString(),
                                    },
                                });
                                paginationDispatch({ type: 'SET_PAGE', page: 1 });
                                paginationDispatch({ type: 'SET_PAGE_SIZE', pageSize: 20 });
                                formikRef.current?.setSubmitting(false);
                            }}
                        >
                            {({ handleSubmit }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Field
                                        name="search"
                                        component={TextField}
                                        placeholder="Kursun adına görə axtar"
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment
                                                    style={{ marginLeft: '10px', color: '#BFBFBF' }}
                                                    position="start"
                                                >
                                                    <SearchIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <Button style={{ display: 'none' }} type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                        <Button
                            startIcon={<FilterIcon />}
                            className="button"
                            variant="outlined"
                            onClick={openFilterDialog}
                        >
                            <Typography variant="h6" sx={{ color: '#6B7280', fontWeight: 500 }}>
                                Filter
                            </Typography>
                        </Button>
                    </>
                )}
            </ManagerPageHeader>
        </Root>
    );
};
