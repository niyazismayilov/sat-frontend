import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    Theme,
    Typography,
    Radio,
    FormControlLabel,
    RadioGroup,
    MenuItem,
} from '@mui/material';
import { styled } from '@mui/styles';

import { DatePickerField, Page, PhoneNumberField, Spinner } from 'components';
import { ManagerPageHeader } from 'components/manager-page-header';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';

import { useAuth, useAuthDispatch } from 'context/auth/store';
import { useNotifications } from 'context/NotificationsContext';
import { Gender, useMeQuery, useUpdateUsersPermissionsUserMutation } from 'graphql/generated';
import React, { useEffect } from 'react';
import browserHistory from 'utils/browser-utils';
import { validationSchema } from './validationSchema';
import { LoadingButton } from 'components/loading-button';
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

export const Profile: React.FC = () => {
    const {
        data,
        loading: loadingMe,
        refetch,
    } = useMeQuery({
        fetchPolicy: 'cache-and-network',
    });
    const { notify } = useNotifications();

    const dispatch = useAuthDispatch();
    const [{ user }] = useAuth();

    useEffect(() => {
        if (data && data?.me) {
            dispatch({ type: 'CHANGE_USER_NAME', firstName: data?.me?.firstName, lastName: data?.me?.lastName });
        }
    }, [loadingMe]);

    const initialValues = {
        firstName: data?.me?.firstName,
        lastName: data?.me?.lastName,
        email: data?.me?.email,
        phoneNumber: data?.me?.phoneNumber,
        gender: data?.me?.gender,
        hasJob: data?.me?.hasJob,
        jobTitle: data?.me?.jobTitle,
        companyName: data?.me?.companyName,
        dateOfBirth: data?.me?.dateOfBirth,
        schoolName: data?.me?.schoolName,
        studyField: data?.me?.studyField,
        confirmed: data?.me?.confirmed,
    };

    const [updateUser, { loading }] = useUpdateUsersPermissionsUserMutation({
        onCompleted() {
            notify({
                type: 'success',
                message: 'Profilim redaktə edildi',
            });
            refetch();
        },
        onError(error) {
            notify({
                type: 'error',
                message: error.message,
            });
        },
    });

    const onSubmit = (me, { setSubmitting }): void => {
        setSubmitting(false);
        updateUser({
            variables: {
                data: {
                    ...me,
                },
                updateUsersPermissionsUserId: user?.id as string,
            },
        });
    };

    if (loadingMe) {
        return <Spinner />;
    }

    return (
        <Root>
            <Page title="Profilim">
                <ManagerPageHeader title="Profilim" />
                <Divider style={{ width: '100%' }} />
                <Container>
                    <Typography sx={{ color: '#6B7280', fontWeight: 700, my: 3 }}>Şəxsi məlumatlar</Typography>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {({ setFieldValue, values, handleSubmit }) => {
                            return (
                                <Form onSubmit={handleSubmit}>
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
                                            <Field
                                                component={TextField}
                                                name="lastName"
                                                fullWidth
                                                label={'* ' + 'Soyad'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Field component={TextField} name="email" fullWidth label="Elektron poçt" />
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
                                        <Grid item xs={12} my={3}>
                                            <Typography sx={{ fontWeight: 500, color: '#6B7280' }}>
                                                Sosial statusu:
                                            </Typography>
                                            <RadioGroup
                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                name="controlled-radio-buttons-group"
                                                value={values.hasJob}
                                                onChange={(e) => {
                                                    setFieldValue('hasJob', e.target.value === 'true' ? true : false);
                                                }}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    gap: '25px',
                                                    marginTop: '10px',
                                                }}
                                            >
                                                <FormControlLabel value={true} control={<Radio />} label="İşçi" />
                                                <FormControlLabel value={false} control={<Radio />} label="Tələbə" />
                                            </RadioGroup>
                                        </Grid>
                                        {values.hasJob && (
                                            <>
                                                <Grid item xs={12} sm={6}>
                                                    <Field
                                                        fullWidth
                                                        component={TextField}
                                                        placeholder="Çalışdığı şirkət"
                                                        name="companyName"
                                                        autoComplete="off"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field
                                                        fullWidth
                                                        component={TextField}
                                                        placeholder="Vəzifəsi"
                                                        name="jobTitle"
                                                        autoComplete="off"
                                                    />
                                                </Grid>
                                            </>
                                        )}
                                        {!values.hasJob && (
                                            <>
                                                <Grid item xs={12} sm={6}>
                                                    <Field
                                                        fullWidth
                                                        component={TextField}
                                                        placeholder="Təhsil qurumunun adı"
                                                        name="schoolName"
                                                        autoComplete="off"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field
                                                        fullWidth
                                                        component={TextField}
                                                        placeholder="Fakültə və ya ixtisas"
                                                        name="studyField"
                                                        autoComplete="off"
                                                    />
                                                </Grid>
                                            </>
                                        )}
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
                                                <LoadingButton
                                                    className="MuiButton"
                                                    variant="contained"
                                                    onClick={() => {
                                                        handleSubmit();
                                                    }}
                                                    loading={loading}
                                                    loadingText="Yadda saxlanır"
                                                    text="Yadda saxla"
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Form>
                            );
                        }}
                    </Formik>
                </Container>
            </Page>
        </Root>
    );
};
