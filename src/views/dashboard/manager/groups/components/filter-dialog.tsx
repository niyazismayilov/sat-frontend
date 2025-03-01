import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
    Autocomplete,
    Box,
    Button,
    Dialog as MuiDialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField as MUITextField,
    Grid,
    IconButton,
    MenuItem,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/styles';
import { DatePickerField } from 'components';
import { usePaginationDispatch } from 'context/pagination/store';
import { INITIAL_GROUP_FILTER_STATE } from 'context/group-filter/reducer';
import { useGroupFilter } from 'context/group-filter/store';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { Enum_Group_Status, useGroupsQuery, useCoursesQuery } from 'graphql/generated';
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

export const FilterDialog: React.FC<FilterDialogProps> = ({ filterDialogOpen, onClose }) => {
    const theme = useTheme();
    const [{ filter }, dispatch] = useGroupFilter();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const paginationDispatch = usePaginationDispatch();
    const initialValues: any = {
        ...INITIAL_GROUP_FILTER_STATE.filter,
        ...filter,
    };

    const { data: GroupData } = useGroupsQuery();

    const groups = GroupData?.groups?.data.map((group) => group);

    const groupOptions =
        groups?.map((group) => ({
            name: group.attributes?.course?.data?.attributes?.name + ' - ' + group.attributes?.name,
            value: group.id,
        })) || [];

    const { data: CourseData } = useCoursesQuery();
    const courses = CourseData?.courses?.data.map((course) => course);

    const courseOptions =
        courses?.map((course) => ({
            name: course.attributes?.name,
            value: course.id,
        })) || [];

    return (
        <Dialog open={filterDialogOpen} onClose={onClose} fullScreen={isMobile} maxWidth="xs">
            <DialogTitle className="dialog-title">
                <Typography variant="h3" sx={{ color: '#6B7280', fontWeight: 500 }}>
                    Filter bölməsi
                </Typography>
                <IconButton onClick={onClose}>
                    <CloseOutlinedIcon />
                </IconButton>
            </DialogTitle>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={(formData) => {
                    onClose();
                    dispatch({ type: 'SET_FILTER', filter: formData });
                    paginationDispatch({ type: 'SET_PAGE', page: 1 });
                    paginationDispatch({ type: 'SET_PAGE_SIZE', pageSize: 20 });
                }}
            >
                {({ handleSubmit, setFieldValue, values, resetForm }): React.ReactNode => {
                    const groupValue = groupOptions.find((g) => g.value === values.group) || null;
                    const courseValue = courseOptions.find((c) => c.value === values.course) || null;

                    return (
                        <Form onSubmit={handleSubmit}>
                            <DialogContent className="dialog-content">
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Autocomplete
                                            options={groupOptions}
                                            getOptionLabel={(groupOptions): any => groupOptions.name}
                                            onChange={(_, value) => setFieldValue('group', value && value.value)}
                                            value={groupValue}
                                            renderInput={(params) => (
                                                <MUITextField
                                                    {...params}
                                                    name="group"
                                                    variant="outlined"
                                                    label="Qruplar"
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Autocomplete
                                            options={courseOptions}
                                            getOptionLabel={(courseOptions): any => courseOptions.name}
                                            onChange={(_, value) => setFieldValue('course', value && value.value)}
                                            value={courseValue}
                                            renderInput={(params) => (
                                                <MUITextField
                                                    {...params}
                                                    name="course"
                                                    variant="outlined"
                                                    label="Kurslar"
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            name="startsAt"
                                            component={DatePickerField}
                                            label="Başlanğıc tarixi"
                                            variant="outlined"
                                            openTo="year"
                                            views={['year', 'month', 'day']}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field
                                            name="endsAt"
                                            component={DatePickerField}
                                            label="Son tarix"
                                            variant="outlined"
                                            openTo="year"
                                            views={['year', 'month', 'day']}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            fullWidth
                                            component={TextField}
                                            select
                                            name="status"
                                            autoComplete="off"
                                            SelectProps={{
                                                displayEmpty: true,
                                                renderValue: (value) => {
                                                    if (!value) {
                                                        return <Box>Status</Box>;
                                                    }
                                                    return value === Enum_Group_Status.Active ? 'Aktiv' : 'Deaktiv';
                                                },
                                            }}
                                        >
                                            <MenuItem value={Enum_Group_Status.Active}>Aktiv</MenuItem>
                                            <MenuItem value={Enum_Group_Status.Inactive}>Deaktiv</MenuItem>
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
                                                    values: INITIAL_GROUP_FILTER_STATE.filter as any,
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
        </Dialog>
    );
};
