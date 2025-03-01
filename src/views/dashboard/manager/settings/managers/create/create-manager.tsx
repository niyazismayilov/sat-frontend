import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Theme,
    Typography,
} from '@mui/material';
import { styled } from '@mui/styles';
import { DatePickerField, Page, PhoneNumberField } from 'components';
import { ManagerPageHeader } from 'components/manager-page-header';
import { useNotifications } from 'context/NotificationsContext';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { Gender, useRegisterMutation } from 'graphql/generated';
import React, { useState } from 'react';
import browserHistory from 'utils/browser-utils';
import { deepOmit } from 'utils/object-helper';
import { ManagerRoleDialog } from '../create/role-dialog';
import { validationSchema } from './validationSchema';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    paddingRight: 20,
    '& .uploadForm': {
        border: '2px solid #E7EAE7',
        padding: theme.spacing(1),
        display: 'flex',
        minHeight: 217,
        justifyContent: 'center',
        alignItems: 'center',
    },

    '& .dragging': {
        background: '#F9FAFB',
    },
    '& section': {
        padding: '0 !important',
    },

    '& .uploadFormCompany': {
        border: '2px solid #E7EAE7',
        padding: theme.spacing(1),
        display: 'flex',
        minHeight: 125,
        justifyContent: 'center',
        alignItems: 'center',
    },

    '& .actions': {
        marginTop: theme.spacing(6),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& .MuiButton-root': {
            boxShadow: 'none',
            padding: '6px 70px',
        },
        '& .MuiButton-root:first-child': {
            marginRight: theme.spacing(1),
        },
        '& .MuiButton-root:last-child': {
            marginLeft: theme.spacing(1),
        },
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
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

export const CreateManager: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);
    const [managerDialogOpen, setManagerDialogOpen] = useState<boolean>(false);

    const { notify } = useNotifications();

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        gender: Gender.Male,
        dateOfBirth: null,
    };

    const [CreateParticipant, { data: managerData }] = useRegisterMutation({
        onCompleted() {
            setManagerDialogOpen(true);
        },
        onError(error) {
            notify({
                type: 'error',
                message: error.message,
            });
        },
    });

    const managerId = managerData?.register.user.id;

    const onsubmit = async (formData) => {
        const { confirmPassword, ...others } = formData;

        formData = deepOmit(formData, confirmPassword);

        CreateParticipant({
            variables: {
                input: {
                    ...others,
                    username: formData.email,
                },
            },
        });
    };

    return (
        <Root>
            <Page title="Menecer yarat">
                <ManagerPageHeader title="Menecer yarat" />
                <ManagerRoleDialog
                    managerDialogOpen={managerDialogOpen}
                    onClose={() => setManagerDialogOpen(false)}
                    managerId={managerId as string}
                />
                <Divider style={{ width: '100%' }} />
                <Container>
                    <Typography sx={{ color: '#6B7280', fontWeight: 700, my: 3 }}>Şəxsi məlumatlar</Typography>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onsubmit}>
                        {({}) => (
                            <Form>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            fullWidth
                                            component={TextField}
                                            label={'* ' + 'Ad'}
                                            name="firstName"
                                            autoComplete="off"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field component={TextField} name="lastName" fullWidth label={'* ' + 'Soyad'} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            component={TextField}
                                            name="email"
                                            autoComplete="new-off"
                                            fullWidth
                                            label="* Elektron poçt"
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
                                            name="dateOfBirth"
                                            component={DatePickerField}
                                            openTo="year"
                                            views={['year', 'month', 'day']}
                                            label="* Doğum tarixi"
                                            disableFuture
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            fullWidth
                                            component={TextField}
                                            select
                                            name="gender"
                                            autoComplete="off"
                                            label="Cinsinizi seçin"
                                        >
                                            <MenuItem value={Gender.Male}>Kişi</MenuItem>
                                            <MenuItem value={Gender.Female}>Qadın</MenuItem>
                                        </Field>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            component={TextField}
                                            fullWidth
                                            label="* Şifrəni təsdiqlə"
                                            name="password"
                                            type={visible ? 'text' : 'password'}
                                            autoComplete="new-password"
                                            margin="dense"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={() => setVisible(!visible)}>
                                                            {visible ? (
                                                                <VisibilityIcon fontSize="small" />
                                                            ) : (
                                                                <VisibilityOffOutlinedIcon fontSize="small" />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            inputProps={{
                                                autoCapitalize: 'none',
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            component={TextField}
                                            fullWidth
                                            label="* Şifrəni təkrarla"
                                            name="confirmPassword"
                                            type={confirmPassword ? 'text' : 'password'}
                                            autoComplete="new-password"
                                            margin="dense"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() => setConfirmPassword(!confirmPassword)}
                                                        >
                                                            {confirmPassword ? (
                                                                <VisibilityIcon fontSize="small" />
                                                            ) : (
                                                                <VisibilityOffOutlinedIcon fontSize="small" />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            inputProps={{
                                                autoCapitalize: 'none',
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Box className="actions">
                                            <Button
                                                className="MuiButton"
                                                variant="outlined"
                                                sx={{
                                                    border: 'none',
                                                    backgroundColor: '#F4F4F4',
                                                    color: '#1F2937',
                                                }}
                                                onClick={() => browserHistory.goBack()}
                                            >
                                                Ləğv et
                                            </Button>
                                            <Button className="MuiButton" variant="contained" type="submit">
                                                Yarat
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Container>
            </Page>
        </Root>
    );
};
