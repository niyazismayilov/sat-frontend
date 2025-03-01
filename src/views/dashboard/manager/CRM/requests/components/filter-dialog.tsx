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
    MenuItem,
    TextField as MUITextField,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/styles';
import { DatePickerField, PhoneNumberField } from 'components';
import { INITIAL_MESSAGE_FILTER_STATE } from 'context/messages-filter/reducer';
import { useMessageFilter } from 'context/messages-filter/store';
import { usePaginationDispatch } from 'context/pagination/store';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { Enum_Message_Type, useCoursesQuery } from 'graphql/generated';
import { useTranslation } from 'react-i18next';

export enum Read {
    read = 'true',
    not_read = 'false',
}

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
    const [{ filter }, dispatch] = useMessageFilter();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const paginationDispatch = usePaginationDispatch();
    const initialValues: any = {
        ...INITIAL_MESSAGE_FILTER_STATE.filter,
        ...filter,
    };

    const { t } = useTranslation();

    const consultings = t('consulting:content').split('&nbsp;');

    const { data: coursesData } = useCoursesQuery({
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
                        const courseValue = CoursesOptions.find((c) => c.value === values.course) || null;

                        return (
                            <Form onSubmit={handleSubmit}>
                                <DialogContent className="dialog-content">
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                name="startsAt"
                                                component={DatePickerField}
                                                label="Başlanğıc tarixi"
                                                variant="outlined"
                                                openTo="year"
                                                views={['year', 'month', 'day']}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                name="endsAt"
                                                component={DatePickerField}
                                                label="Son tarix"
                                                variant="outlined"
                                                openTo="year"
                                                views={['year', 'month', 'day']}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                component={TextField}
                                                name="fullName"
                                                fullWidth
                                                label="Müştərinin adı və ya soyadı"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                name="type"
                                                component={TextField}
                                                select
                                                autoComplete="off"
                                                label="Məhsul tipi"
                                                variant="outlined"
                                                fullWidth
                                            >
                                                <MenuItem value={Enum_Message_Type.Consulting}>Konsaltinq</MenuItem>
                                                <MenuItem value={Enum_Message_Type.Course}>Təlim</MenuItem>
                                            </Field>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field component={TextField} name="email" fullWidth label="Elektron poçt" />
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
                                                        label="Maraqlandığı kurs"
                                                    />
                                                )}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                fullWidth
                                                name="phoneNumber"
                                                component={PhoneNumberField}
                                                inputProps={{ variant: 'outlined' }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                name="interestedConsultings"
                                                component={TextField}
                                                select
                                                label="Maraqlandığı konsaltinq"
                                                variant="outlined"
                                                fullWidth
                                            >
                                                {consultings.map((consulting, index) => (
                                                    <MenuItem value={consulting} key={index}>
                                                        {consulting}
                                                    </MenuItem>
                                                ))}
                                            </Field>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                name="isRead"
                                                component={TextField}
                                                select
                                                autoComplete="off"
                                                label="Status"
                                                variant="outlined"
                                                fullWidth
                                            >
                                                <MenuItem value={Read.read}>Oxundu</MenuItem>
                                                <MenuItem value={Read.not_read}>Oxunmadı</MenuItem>
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
                                                        values: INITIAL_MESSAGE_FILTER_STATE.filter as any,
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
