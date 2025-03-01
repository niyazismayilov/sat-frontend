import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
    Box,
    Button,
    Dialog as MuiDialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    MenuItem,
    Typography,
    useMediaQuery,
    useTheme,
    Autocomplete,
    TextField as MUITextField,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/styles';
import { DatePickerField } from 'components';
import { usePaginationDispatch } from 'context/pagination/store';
import { INITIAL_COURSE_REGISTER_FILTER_STATE } from 'context/course-register-filter/reducer';
import { useCourseRegisterFilter } from 'context/course-register-filter/store';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import {
    Enum_Courseregister_Paymentstatus,
    useCoursesQuery,
    useGroupsQuery,
    useUsersPermissionsUsersQuery,
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

export const FilterDialog: React.FC<FilterDialogProps> = ({ filterDialogOpen, onClose }) => {
    const theme = useTheme();
    const [{ filter }, dispatch] = useCourseRegisterFilter();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const paginationDispatch = usePaginationDispatch();
    const initialValues: any = {
        ...INITIAL_COURSE_REGISTER_FILTER_STATE.filter,
        ...filter,
    };

    const { data: participantsData } = useUsersPermissionsUsersQuery({
        variables: {
            pagination: {
                pageSize: 20000,
            },
        },
    });
    const { data: groupsData } = useGroupsQuery({
        variables: {
            pagination: {
                pageSize: 20000,
            },
        },
    });
    const { data: coursesData } = useCoursesQuery({
        variables: {
            pagination: {
                pageSize: 20000,
            },
        },
    });

    const participants =
        participantsData?.usersPermissionsUsers?.data
            .map((participant) => participant)
            .filter((participant) => participant.attributes?.role?.data?.attributes?.name !== 'Super Admin') || [];

    const ParticipantsOptions =
        participants?.map((participant) => ({
            label: participant.attributes?.firstName + ' ' + participant.attributes?.lastName,
            value: participant.id,
        })) || [];

    const groups = groupsData?.groups?.data.map((group) => group) || [];

    const GroupsOptions =
        groups
            ?.map((group) => ({
                label: group.attributes?.course?.data?.attributes?.name + ' - ' + group.attributes?.name,
                value: group.id,
            }))
            .sort((a, b) => (a.label > b.label ? 1 : b.label > a.label ? -1 : 0)) || [];

    const courses = coursesData?.courses?.data.map((course) => course) || [];

    const CoursesOptions =
        courses?.map((course) => ({
            label: course.attributes?.name,
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
                {({ handleSubmit, setFieldValue, setFieldTouched, values, resetForm }): React.ReactNode => {
                    const participantValue = ParticipantsOptions.find((p) => p.value === values.user) || null;
                    const groupValue = GroupsOptions.find((g) => g.value === values.group) || null;
                    const courseValue = CoursesOptions.find((c) => c.value === values.course) || null;

                    return (
                        <Form onSubmit={handleSubmit}>
                            <DialogContent className="dialog-content">
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Autocomplete
                                            options={ParticipantsOptions}
                                            onChange={(_, value) => setFieldValue('user', value && value.value)}
                                            value={participantValue}
                                            isOptionEqualToValue={(option, value) =>
                                                value === undefined ? true : option.value === value.value
                                            }
                                            renderInput={(params) => (
                                                <MUITextField
                                                    {...params}
                                                    onBlur={() => setFieldTouched('user', true)}
                                                    name="user"
                                                    variant="outlined"
                                                    label="İştirakçı"
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Autocomplete
                                            options={GroupsOptions}
                                            onChange={(_, value) => setFieldValue('group', value && value.value)}
                                            value={groupValue}
                                            isOptionEqualToValue={(option, value) =>
                                                value === undefined ? true : option.value === value.value
                                            }
                                            renderInput={(params) => (
                                                <MUITextField
                                                    {...params}
                                                    onBlur={() => setFieldTouched('group', true)}
                                                    name="group"
                                                    variant="outlined"
                                                    label="Qrup"
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
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
                                                    onBlur={() => setFieldTouched('course', true)}
                                                    name="course"
                                                    variant="outlined"
                                                    label="Kurs"
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
                                            name="paymentStatus"
                                            component={TextField}
                                            select
                                            autoComplete="off"
                                            label="Ödəniş növü"
                                            variant="outlined"
                                            fullWidth
                                        >
                                            <MenuItem value={Enum_Courseregister_Paymentstatus.Paid}>Kart</MenuItem>
                                            <MenuItem value={Enum_Courseregister_Paymentstatus.PaidByCash}>
                                                Nağd
                                            </MenuItem>
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
                                                    values: INITIAL_COURSE_REGISTER_FILTER_STATE.filter as any,
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
