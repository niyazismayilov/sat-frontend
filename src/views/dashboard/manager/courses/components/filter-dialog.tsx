import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
    Autocomplete,
    Box,
    Button,
    Dialog as MuiDialog,
    DialogActions,
    DialogContent,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    TextField as MUITextField,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/styles';
import { INITIAL_COURSE_FILTER_STATE } from 'context/course-filter/reducer';
import { useCourseFilter } from 'context/course-filter/store';
import { usePaginationDispatch } from 'context/pagination/store';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import {
    Enum_Course_Category,
    Enum_Course_Durationtype,
    Enum_Course_Status,
    useCoursesQuery,
    useTrainersQuery,
} from 'graphql/generated';

type FilterDialogProps = {
    filterDialogOpen: boolean;
    onClose: () => void;
};

const Dialog = styled(MuiDialog)(({ theme }: { theme: Theme }) => ({
    '& .dialog-title': {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    '& .MuiDialogTitle-root': {
        padding: theme.spacing(4),
    },
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2, 9),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(4, 9),
    },
    '& .customer-field .MuiOutlinedInput-root': {
        paddingBottom: 0,
    },

    '& .actions': {
        marginTop: theme.spacing(6),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& .MuiButton-root': {
            boxShadow: 'none',
            padding: '6px 42px',
        },
        '& .MuiButton-root:first-child': {
            marginRight: theme.spacing(1),
        },
        '& .MuiButton-root:last-child': {
            marginLeft: theme.spacing(1),
        },
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            padding: '6px 38px',
            marginTop: theme.spacing(0),
            '& .MuiButton-root': {
                width: '100%',
            },
            '& .MuiButton-root:first-child': {
                marginRight: 0,
                marginBottom: theme.spacing(2),
            },
            '& .MuiButton-root:last-child': {
                marginLeft: 0,
            },
        },
    },
    '& .MuiButton': {
        height: '47px',
    },
}));

const SerialNumberField = styled(TextField)(() => {
    return {
        '& .MuiInputBase-root': {
            paddingLeft: 15,
            paddingRight: '0 !important',
        },
    };
});

const SerialCodeField = styled(TextField)(() => {
    return {
        '& fieldset': {
            border: 'none',
            borderRadius: 0,
            borderRight: '1px solid rgba(0,0,0,0.23)',
            marginRight: 100,
        },
    };
});

export const FilterDialog: React.FC<FilterDialogProps> = ({ filterDialogOpen, onClose }) => {
    const theme = useTheme();
    const [{ filter }, dispatch] = useCourseFilter();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const paginationDispatch = usePaginationDispatch();
    const initialValues: any = {
        ...INITIAL_COURSE_FILTER_STATE.filter,
        ...filter,
    };

    const { data: coursesData } = useCoursesQuery({
        variables: {
            pagination: {
                pageSize: 20000,
            },
        },
    });
    const { data: trainersData } = useTrainersQuery({
        variables: {
            pagination: {
                pageSize: 20000,
            },
        },
    });

    const courses = coursesData?.courses?.data.map((course) => course) || [];

    const CoursesOptions =
        courses?.map((course) => ({
            label: course.attributes?.name,
            value: course.id,
        })) || [];

    const trainers = trainersData?.trainers?.data.map((trainers) => trainers) || [];

    const TrainersOptions =
        trainers?.map((trainers) => ({
            label: trainers.attributes?.fullName,
            value: trainers.id,
        })) || [];

    return (
        <Dialog open={filterDialogOpen} onClose={onClose} fullScreen={isMobile} maxWidth="md">
            <Box sx={{ py: 4 }}>
                <Typography variant="h2" sx={{ textAlign: 'start', mb: 4, ml: 9, color: '#6B7280', fontWeight: 500 }}>
                    Filter bölməsi
                </Typography>
                <IconButton
                    onClick={onClose}
                    sx={{ position: 'absolute', right: 0, top: 0, margin: theme.spacing(3, 8) }}
                >
                    <CloseOutlinedIcon />
                </IconButton>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize
                    onSubmit={(formData) => {
                        onClose();
                        dispatch({
                            type: 'SET_FILTER',
                            filter: formData,
                        });
                        paginationDispatch({ type: 'SET_PAGE', page: 1 });
                        paginationDispatch({ type: 'SET_PAGE_SIZE', pageSize: 20 });
                    }}
                >
                    {({ handleSubmit, values, setFieldValue, resetForm }): React.ReactNode => {
                        const trainersValue = TrainersOptions.find((to) => to.value === values.trainers) || null;
                        const courseValue = CoursesOptions.find((c) => c.value === values.course) || null;
                        return (
                            <Form onSubmit={handleSubmit}>
                                <DialogContent className="dialog-content">
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                name="category"
                                                component={TextField}
                                                label="Kateqoriya"
                                                fullWidth
                                                select
                                            >
                                                <MenuItem value={Enum_Course_Category.Management}>İdarəetmə</MenuItem>
                                                <MenuItem value={Enum_Course_Category.Marketing}>Marketinq</MenuItem>
                                                <MenuItem value={Enum_Course_Category.Sales}> Satış</MenuItem>
                                                <MenuItem value={Enum_Course_Category.Satacademy}>SAT Academy</MenuItem>
                                                <MenuItem value={Enum_Course_Category.Others}>Digər</MenuItem>
                                            </Field>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                type="number"
                                                name="capacity"
                                                component={TextField}
                                                label="Maksimum iştirakçı"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Autocomplete
                                                options={CoursesOptions}
                                                onChange={(_, value) => setFieldValue('course', value && value.value)}
                                                value={courseValue}
                                                isOptionEqualToValue={(option, value) =>
                                                    value === undefined ? true : option.value === value.value
                                                }
                                                renderInput={(params) => (
                                                    <MUITextField
                                                        {...params}
                                                        name="course"
                                                        variant="outlined"
                                                        label="Kurs"
                                                    />
                                                )}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={3}>
                                            <Field
                                                name="minPrice"
                                                component={TextField}
                                                label="Min qiymət"
                                                disableFuture
                                                fullWidth
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={3}>
                                            <Field
                                                name="maxPrice"
                                                component={TextField}
                                                label="Max qiymət"
                                                disableFuture
                                                fullWidth
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Autocomplete
                                                options={TrainersOptions}
                                                onChange={(_, value) => setFieldValue('trainers', value && value.value)}
                                                value={trainersValue}
                                                isOptionEqualToValue={(option, value) =>
                                                    value === undefined ? true : option.value === value.value
                                                }
                                                renderInput={(params) => (
                                                    <MUITextField
                                                        {...params}
                                                        name="trainers"
                                                        variant="outlined"
                                                        label="Təlimçilər"
                                                    />
                                                )}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                name="count"
                                                component={TextField}
                                                label="Təlim sayı"
                                                fullWidth
                                                type="number"
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                component={SerialNumberField}
                                                name="duration"
                                                type="number"
                                                fullWidth
                                                label="Təlim müddəti"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <Field
                                                                component={SerialCodeField}
                                                                select
                                                                name="durationType"
                                                                margin="none"
                                                            >
                                                                <MenuItem value={Enum_Course_Durationtype.Day}>
                                                                    Gün
                                                                </MenuItem>
                                                                <MenuItem value={Enum_Course_Durationtype.Week}>
                                                                    Həftə
                                                                </MenuItem>
                                                                <MenuItem value={Enum_Course_Durationtype.Month}>
                                                                    Ay
                                                                </MenuItem>
                                                            </Field>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            ></Field>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                name="status"
                                                component={TextField}
                                                select
                                                autoComplete="off"
                                                label="Status"
                                                variant="outlined"
                                                fullWidth
                                            >
                                                <MenuItem value={Enum_Course_Status.Active}>Aktiv</MenuItem>
                                                <MenuItem value={Enum_Course_Status.Inactive}>Deaktiv</MenuItem>
                                            </Field>
                                        </Grid>
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Grid item xs={12}>
                                        <Box className="actions">
                                            <Button
                                                className="MuiButton"
                                                variant="outlined"
                                                sx={{
                                                    border: 'none',
                                                    backgroundColor: '#F4F4F4',
                                                    color: '#1F2937',
                                                    flexWrap: 'nowrap',
                                                }}
                                                onClick={() =>
                                                    resetForm({
                                                        values: INITIAL_COURSE_FILTER_STATE.filter as any,
                                                    })
                                                }
                                            >
                                                Sıfırla
                                            </Button>
                                            <Button className="MuiButton" variant="contained" type="submit">
                                                Filterlə
                                            </Button>
                                        </Box>
                                    </Grid>
                                </DialogActions>
                            </Form>
                        );
                    }}
                </Formik>
            </Box>
        </Dialog>
    );
};
