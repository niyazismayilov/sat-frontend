import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    InputAdornment,
    MenuItem,
    Theme,
    Typography,
    Autocomplete,
    TextField as MUITextField,
} from '@mui/material';
import { styled } from '@mui/styles';
import { ReactComponent as Linkedin } from 'assets/icons/manager-dashboard/social-icons/linkedin.svg';
import { ReactComponent as UploadIcon } from 'assets/icons/manager-dashboard/upload-icon.svg';
import clsx from 'clsx';
import { DatePickerField, Page, PhoneNumberField, Spinner } from 'components';
import { RichTextEditor } from 'components/formik/rich-text-editor';
import { ManagerPageHeader } from 'components/manager-page-header';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import {
    Enum_Trainer_Status,
    Gender,
    useCoursesQuery,
    useTrainerQuery,
    useUpdateTrainerMutation,
} from 'graphql/generated';
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { useParams } from 'react-router-dom';
import browserHistory from 'utils/browser-utils';
import { useNotifications } from 'context/NotificationsContext';
import { api } from 'api';
import { API_URL } from 'config';
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

export const EditTrainer: React.FC = () => {
    const [, setDragging] = useState(false);
    const [, setDraggingCompany] = useState(false);
    const [restLoading, setRestLoading] = useState<boolean>(false);
    const { id: trainerId } = useParams<{ id: string }>();
    const { notify } = useNotifications();

    const { data, loading } = useTrainerQuery({ fetchPolicy: 'network-only', variables: { trainerId } });

    const { data: coursesData } = useCoursesQuery({
        variables: {
            pagination: {
                pageSize: 999999,
            },
        },
    });

    const courseIds = data?.trainer?.data?.attributes?.courses?.data.map((trainer) => trainer.id);

    const initialValues = {
        firstName: data?.trainer?.data?.attributes?.firstName,
        lastName: data?.trainer?.data?.attributes?.lastName,
        email: data?.trainer?.data?.attributes?.email,
        phoneNumber: data?.trainer?.data?.attributes?.phoneNumber,
        gender: data?.trainer?.data?.attributes?.gender,
        profileImage: data?.trainer?.data?.attributes?.profileImage?.data?.attributes?.url,
        logoImage: data?.trainer?.data?.attributes?.logoImage?.data?.attributes?.url,
        body: data?.trainer?.data?.attributes?.body,
        link: data?.trainer?.data?.attributes?.link,
        status: data?.trainer?.data?.attributes?.status,
        position: data?.trainer?.data?.attributes?.position,
        company: data?.trainer?.data?.attributes?.company,
        birthdayDate: data?.trainer?.data?.attributes?.birthdayDate,
        courses: courseIds,
    };

    const courses = coursesData?.courses?.data.map((course) => course) || [];

    const CoursesOptions = courses?.map((course) => ({
        label: course.attributes?.name,
        value: course.id,
    }));

    const [updateTrainer] = useUpdateTrainerMutation({
        onCompleted() {
            notify({
                type: 'success',
                message: 'Təlimçi redaktə edildi',
            });
            browserHistory.push('/d/trainers');
        },
        onError(error) {
            notify({
                type: 'error',
                message: error.message,
            });
        },
    });

    const onSubmit = async (trainer: any) => {
        let profileData: any = null;
        let logoData: any = null;

        const axios = await api();
        if (typeof trainer.profileImage !== 'string' && trainer.profileImage) {
            setRestLoading(true);
            const formBody = new FormData();
            formBody.append('files', trainer.profileImage);
            const res = await axios.post(`${API_URL}/api/upload`, formBody, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            profileData = res.data;
            setRestLoading(false);
        }
        if (typeof trainer.logoImage !== 'string' && trainer.logoImage) {
            setRestLoading(true);
            const formBody = new FormData();
            formBody.append('files', trainer.logoImage);
            const res = await axios.post(`${API_URL}/api/upload`, formBody, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            logoData = res.data;
            setRestLoading(false);
        }

        updateTrainer({
            variables: {
                data: {
                    ...trainer,
                    profileImage: profileData
                        ? profileData[0].id
                        : data?.trainer?.data?.attributes?.profileImage?.data?.id,
                    logoImage: logoData ? logoData[0].id : data?.trainer?.data?.attributes?.logoImage?.data?.id,
                },
                updateTrainerId: trainerId,
            },
        });
    };

    if (loading || restLoading) {
        return <Spinner />;
    }

    return (
        <Root>
            <Page title="Təlimçi Redaktə et">
                <ManagerPageHeader title="Təlimçi Redaktə et" />
                <Divider style={{ width: '100%' }} />
                <Container>
                    <Typography sx={{ color: '#6B7280', fontWeight: 700, my: 3 }}>Şəxsi məlumatlar</Typography>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {({ setFieldValue, values, setFieldTouched, touched, errors }) => {
                            const courses =
                                CoursesOptions.filter((course) => values.courses?.includes(course.value)) || [];
                            return (
                                <Form>
                                    <Grid container spacing={3}>
                                        <Grid item xs={9}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} sm={6}>
                                                    <Field
                                                        fullWidth
                                                        component={TextField}
                                                        placeholder={'* ' + 'Ad'}
                                                        name="firstName"
                                                        autoComplete="off"
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Field
                                                        component={TextField}
                                                        name="lastName"
                                                        fullWidth
                                                        placeholder={'* ' + 'Soyad'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Field
                                                        component={TextField}
                                                        name="email"
                                                        fullWidth
                                                        placeholder={'* ' + 'Elektron poçt'}
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
                                                        fullWidth
                                                        component={TextField}
                                                        select
                                                        name="gender"
                                                        autoComplete="off"
                                                        SelectProps={{
                                                            displayEmpty: true,
                                                            renderValue: (value) => {
                                                                if (!value) {
                                                                    return (
                                                                        <Box sx={{ color: 'text.disabled' }}>Cinsi</Box>
                                                                    );
                                                                }
                                                                return value === Gender.Male ? 'Kişi' : 'Qadın';
                                                            },
                                                        }}
                                                    >
                                                        <MenuItem value={Gender.Male}>Kişi</MenuItem>
                                                        <MenuItem value={Gender.Female}>Qadın</MenuItem>
                                                    </Field>
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Field
                                                        name="birthdayDate"
                                                        component={DatePickerField}
                                                        openTo="year"
                                                        views={['year', 'month', 'day']}
                                                        placeholder="Doğum tarixi"
                                                        disableFuture
                                                        fullWidth
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Field
                                                        component={TextField}
                                                        name="company"
                                                        fullWidth
                                                        label="Çalışdığı şirkət"
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Field
                                                        component={TextField}
                                                        name="position"
                                                        fullWidth
                                                        label="Vəzifəsi"
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Autocomplete
                                                        options={CoursesOptions}
                                                        multiple
                                                        onChange={(_, value) => {
                                                            setFieldValue(
                                                                'courses',
                                                                value && value.map((v) => v.value),
                                                            );
                                                        }}
                                                        value={courses}
                                                        renderInput={(params) => (
                                                            <MUITextField
                                                                {...params}
                                                                onBlur={() => setFieldTouched('courses', true)}
                                                                name="courses"
                                                                variant="outlined"
                                                                error={touched.courses && !!errors.courses}
                                                                label="Kurslar"
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={3}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>
                                                    <Dropzone
                                                        accept={[
                                                            'image/*',
                                                            'application/pdf',
                                                            '.doc',
                                                            '.docx',
                                                            '.xls',
                                                            '.xlsx',
                                                            '.csv',
                                                            '.tsv',
                                                            '.ppt',
                                                            '.pptx',
                                                            '.pages',
                                                            '.odt',
                                                            '.rtf',
                                                        ]}
                                                        multiple={false}
                                                        onDragEnter={(): void => setDragging(true)}
                                                        onDragLeave={(): void => setDragging(false)}
                                                        onDrop={(acceptedFiles): void => {
                                                            if (acceptedFiles) {
                                                                setFieldValue('profileImage', acceptedFiles[0]);
                                                            }
                                                            setDragging(false);
                                                        }}
                                                    >
                                                        {({ getRootProps, getInputProps }): React.ReactElement => (
                                                            <section style={{ padding: 8, flex: 1 }}>
                                                                <div
                                                                    className={clsx('uploadForm', 'dragging')}
                                                                    {...getRootProps()}
                                                                >
                                                                    <input {...getInputProps()} />
                                                                    <div>
                                                                        {values.profileImage ? (
                                                                            <img
                                                                                style={{ maxWidth: '100%' }}
                                                                                src={
                                                                                    typeof values.profileImage ===
                                                                                    'string'
                                                                                        ? values.profileImage
                                                                                        : URL.createObjectURL(
                                                                                              values.profileImage,
                                                                                          )
                                                                                }
                                                                                alt={values.profileImage}
                                                                            />
                                                                        ) : (
                                                                            <Box
                                                                                sx={{
                                                                                    alignItems: 'center',
                                                                                    display: 'flex',
                                                                                    flexDirection: 'column',
                                                                                    gap: 2,
                                                                                }}
                                                                            >
                                                                                <UploadIcon />
                                                                                <Typography
                                                                                    sx={{
                                                                                        fontSize: 14,
                                                                                        textAlign: 'center',
                                                                                    }}
                                                                                >
                                                                                    <span
                                                                                        style={{
                                                                                            fontSize: 14,
                                                                                            color: 'blue',
                                                                                        }}
                                                                                    >
                                                                                        Profil şəklini
                                                                                    </span>{' '}
                                                                                    yükləyin və ya sürüşdürüb
                                                                                    yerləşdirin
                                                                                </Typography>
                                                                            </Box>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </section>
                                                        )}
                                                    </Dropzone>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Dropzone
                                                        accept={[
                                                            'image/*',
                                                            'application/pdf',
                                                            '.doc',
                                                            '.docx',
                                                            '.xls',
                                                            '.xlsx',
                                                            '.csv',
                                                            '.tsv',
                                                            '.ppt',
                                                            '.pptx',
                                                            '.pages',
                                                            '.odt',
                                                            '.rtf',
                                                        ]}
                                                        multiple={false}
                                                        onDragEnter={(): void => setDraggingCompany(true)}
                                                        onDragLeave={(): void => setDraggingCompany(false)}
                                                        onDrop={(acceptedFiles): void => {
                                                            if (acceptedFiles) {
                                                                setFieldValue('logoImage', acceptedFiles[0]);
                                                            }
                                                            setDraggingCompany(false);
                                                        }}
                                                    >
                                                        {({ getRootProps, getInputProps }): React.ReactElement => (
                                                            <section style={{ padding: 8, flex: 1 }}>
                                                                <div
                                                                    className={clsx('uploadFormCompany', 'dragging')}
                                                                    {...getRootProps()}
                                                                >
                                                                    <input {...getInputProps()} />
                                                                    <div>
                                                                        {values.logoImage ? (
                                                                            <img
                                                                                style={{ maxWidth: '100%' }}
                                                                                src={
                                                                                    typeof values.logoImage === 'string'
                                                                                        ? values.logoImage
                                                                                        : URL.createObjectURL(
                                                                                              values.logoImage,
                                                                                          )
                                                                                }
                                                                                alt={values.logoImage}
                                                                            />
                                                                        ) : (
                                                                            <Box
                                                                                sx={{
                                                                                    alignItems: 'center',
                                                                                    display: 'flex',
                                                                                    flexDirection: 'column',
                                                                                    gap: 2,
                                                                                }}
                                                                            >
                                                                                <UploadIcon />

                                                                                <Typography
                                                                                    sx={{
                                                                                        fontSize: 14,
                                                                                        textAlign: 'center',
                                                                                    }}
                                                                                >
                                                                                    Şirkətin loqosunu{' '}
                                                                                    <span
                                                                                        style={{
                                                                                            fontSize: 14,
                                                                                            color: 'blue',
                                                                                        }}
                                                                                    >
                                                                                        yükləyin
                                                                                    </span>
                                                                                </Typography>
                                                                            </Box>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </section>
                                                        )}
                                                    </Dropzone>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Typography sx={{ color: '#6B7280', fontWeight: 700, my: 3 }}>
                                                Təlimçi haqqında
                                            </Typography>
                                            <Field
                                                variant="outlined"
                                                component={RichTextEditor}
                                                name="body"
                                                noBorderTop={true}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={9}>
                                            <Typography sx={{ color: '#6B7280', fontWeight: 700, my: 3 }}>
                                                Sosial media hesabı
                                            </Typography>
                                            <Field
                                                component={TextField}
                                                name="link"
                                                fullWidth
                                                placeholder="Linkedin hesabının linki"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Linkedin />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
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
                                                            return <Box sx={{ color: 'text.disabled' }}>Status</Box>;
                                                        }
                                                        return value === Enum_Trainer_Status.Active
                                                            ? 'Aktiv'
                                                            : 'Deaktiv';
                                                    },
                                                }}
                                            >
                                                <MenuItem value={Enum_Trainer_Status.Active}>Aktiv</MenuItem>
                                                <MenuItem value={Enum_Trainer_Status.Deactive}>Deaktiv</MenuItem>
                                            </Field>
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
                                                    Yadda saxla
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
