import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
    Autocomplete,
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
    TextField as MUITextField,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/styles';
import { DatePickerField } from 'components';
import { PhoneNumberField } from 'components/formik/input-mask/input-mask';
import { usePaginationDispatch } from 'context/pagination/store';
import { INITIAL_PARTICIPANT_FILTER_STATE } from 'context/participant-filter/reducer';
import { useParticipantFilter } from 'context/participant-filter/store';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { useUsersPermissionsUsersQuery } from 'graphql/generated';

export enum Confirmed {
    confirmed = 'true',
    not_confirmed = 'false',
}

export enum Gender {
    male = 'male',
    female = 'female',
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
    const [{ filter }, dispatch] = useParticipantFilter();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const paginationDispatch = usePaginationDispatch();
    const initialValues: any = {
        ...INITIAL_PARTICIPANT_FILTER_STATE.filter,
        ...filter,
    };

    const { data: participantsData } = useUsersPermissionsUsersQuery({
        variables: {
            pagination: {
                pageSize: 20000,
            },
        },
    });

    const participants =
        participantsData?.usersPermissionsUsers?.data
            .map((participant) => participant)
            .filter((participant) => participant.attributes?.role?.data?.attributes?.name === 'Authenticated') || [];

    const ParticipantsOptions =
        participants?.map((participant) => ({
            label: participant.attributes?.firstName + ' ' + participant.attributes?.lastName,
            value: participant.id,
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
                    const participantValue = ParticipantsOptions.find((p) => p.value === values.user) || null;
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
                                                    name="user"
                                                    variant="outlined"
                                                    label="İştirakçı"
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field name="email" component={TextField} label="Elektron poçt" fullWidth />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            type="number"
                                            name="phoneNumber"
                                            component={PhoneNumberField}
                                            label="Telefon Nömrəsi"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            name="gender"
                                            component={TextField}
                                            select
                                            autoComplete="off"
                                            label="Cinsi"
                                            variant="outlined"
                                            fullWidth
                                        >
                                            <MenuItem value={Gender.male}>Kişi</MenuItem>
                                            <MenuItem value={Gender.female}>Qadın</MenuItem>
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            name="dateOfBirth"
                                            component={DatePickerField}
                                            label="Doğum tarixi"
                                            openTo="year"
                                            views={['year', 'month', 'day']}
                                            variant="outlined"
                                            disableFuture
                                            fullWidth
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field
                                            name="confirmed"
                                            component={TextField}
                                            select
                                            autoComplete="off"
                                            label="Status"
                                            variant="outlined"
                                            fullWidth
                                        >
                                            <MenuItem value={Confirmed.confirmed}>Aktiv</MenuItem>
                                            <MenuItem value={Confirmed.not_confirmed}>Deaktiv</MenuItem>
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
                                                    values: INITIAL_PARTICIPANT_FILTER_STATE.filter as any,
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
