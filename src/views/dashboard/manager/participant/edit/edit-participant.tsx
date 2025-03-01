import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    MenuItem,
    Theme,
    Typography,
    Radio,
    FormControlLabel,
    RadioGroup,
} from '@mui/material';
import { styled } from '@mui/styles';

import { DatePickerField, Page, PhoneNumberField, Spinner } from 'components';
import { ManagerPageHeader } from 'components/manager-page-header';
import { useNotifications } from 'context/NotificationsContext';
import { Field, Form, Formik } from 'formik';
import { Switch, TextField } from 'formik-mui';
import { Gender, useUsersPermissionsUserQuery, useUpdateUsersPermissionsUserMutation } from 'graphql/generated';
import React from 'react';
import { useParams } from 'react-router-dom';
import browserHistory from 'utils/browser-utils';
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

export const EditParticipant: React.FC = () => {
    const { id: usersPermissionsUserId } = useParams<{ id: string }>();
    const { data, loading } = useUsersPermissionsUserQuery({
        fetchPolicy: 'network-only',
        variables: { usersPermissionsUserId },
    });
    const { notify } = useNotifications();

    const initialValues = {
        firstName: data?.usersPermissionsUser?.data?.attributes?.firstName,
        lastName: data?.usersPermissionsUser?.data?.attributes?.lastName,
        email: data?.usersPermissionsUser?.data?.attributes?.email,
        phoneNumber: data?.usersPermissionsUser?.data?.attributes?.phoneNumber,
        gender: data?.usersPermissionsUser?.data?.attributes?.gender,
        hasJob: data?.usersPermissionsUser?.data?.attributes?.hasJob,
        jobTitle: data?.usersPermissionsUser?.data?.attributes?.jobTitle,
        companyName: data?.usersPermissionsUser?.data?.attributes?.companyName,
        dateOfBirth: data?.usersPermissionsUser?.data?.attributes?.dateOfBirth,
        schoolName: data?.usersPermissionsUser?.data?.attributes?.schoolName,
        studyField: data?.usersPermissionsUser?.data?.attributes?.studyField,
        confirmed: data?.usersPermissionsUser?.data?.attributes?.confirmed,
    };

    const [updateTrainer] = useUpdateUsersPermissionsUserMutation({
        onCompleted() {
            notify({
                type: 'success',
                message: 'İştirakçı redaktə edildi',
            });
            browserHistory.push('/d/participants');
        },
        onError(error) {
            notify({
                type: 'error',
                message: error.message,
            });
        },
    });

    const onSubmit = (trainer): void => {
        updateTrainer({
            variables: {
                data: {
                    ...trainer,
                },
                updateUsersPermissionsUserId: usersPermissionsUserId,
            },
        });
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <Root>
            <Page title="İştirakçı Redaktə et">
                <ManagerPageHeader title="İştirakçı Redaktə et" />
                <Divider style={{ width: '100%' }} />
                <Container>
                    <Typography sx={{ color: '#6B7280', fontWeight: 700, my: 3 }}>Şəxsi məlumatlar</Typography>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {({ setFieldValue, values }) => {
                            return (
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
                                                name="birthdayDate"
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

                                        <Grid item xs={12} sm={6}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'flex-start',
                                                }}
                                            >
                                                <Typography>Hesabı təsdiqlə</Typography>
                                                <Field
                                                    component={Switch}
                                                    type="checkbox"
                                                    name={`confirmed`}
                                                    label="Hesabı təsdiqlə"
                                                />
                                            </Box>
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
                            );
                        }}
                    </Formik>
                </Container>
            </Page>
        </Root>
    );
};
