import { Box, Button, Container, Divider, Grid, MenuItem, Theme, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { api } from 'api';
import { ReactComponent as UploadIcon } from 'assets/icons/manager-dashboard/upload-icon.svg';
import clsx from 'clsx';
import { Page, Spinner } from 'components';
import { ManagerPageHeader } from 'components/manager-page-header';
import { API_URL } from 'config';
import { useNotifications } from 'context/NotificationsContext';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { Enum_Employee_Status, useCreateEmployeeMutation } from 'graphql/generated';
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
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

export const CreateEmployee: React.FC = () => {
    const [restLoading, setRestLoading] = useState<boolean>(false);
    const [, setDragging] = useState(false);

    const { notify } = useNotifications();

    const initialValues = {
        firstName: '',
        lastName: '',
        position: '',
        image: null,
        status: Enum_Employee_Status.Active,
    };

    const [createEmployee, { loading }] = useCreateEmployeeMutation({
        onCompleted() {
            notify({
                type: 'success',
                message: 'Əməkdaş uğurla yaradıldı',
            });
            browserHistory.push('/d/settings/employees');
        },
        onError(error) {
            notify({
                type: 'error',
                message: error.message,
            });
        },
    });

    const onSubmit = async (formData) => {
        const axios = await api();

        const { image, ...others } = formData;

        let profileData: any = null;

        if (image) {
            setRestLoading(true);
            const formBody = new FormData();
            formBody.append('files', image);
            const res = await axios.post(`${API_URL}/api/upload`, formBody, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            profileData = res.data;
            setRestLoading(false);
        }

        createEmployee({
            variables: {
                data: {
                    ...others,
                    image: profileData ? profileData[0].id : profileData,
                },
            },
        });
    };

    if (loading || restLoading) {
        return <Spinner />;
    }

    return (
        <Root>
            <Page title="Əməkdaş yarat">
                <ManagerPageHeader title="Əməkdaş yarat" />

                <Divider style={{ width: '100%' }} />
                <Container>
                    <Typography sx={{ color: '#6B7280', fontWeight: 700, my: 3 }}>Şəxsi məlumatlar</Typography>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {({ setFieldValue, values }) => (
                            <Form>
                                <Grid container spacing={3}>
                                    <Grid item xs={9}>
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
                                                <Field
                                                    component={TextField}
                                                    name="position"
                                                    autoComplete="new-off"
                                                    fullWidth
                                                    label="* Vəzifə"
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
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
                                                                return (
                                                                    <Box sx={{ color: 'text.disabled' }}>Status</Box>
                                                                );
                                                            }
                                                            return value === Enum_Employee_Status.Active
                                                                ? 'Aktiv'
                                                                : 'Deaktiv';
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value={Enum_Employee_Status.Active}>Aktiv</MenuItem>
                                                    <MenuItem value={Enum_Employee_Status.Deactive}>Deaktiv</MenuItem>
                                                </Field>
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
                                                            setFieldValue('image', acceptedFiles[0]);
                                                        }
                                                        setDragging(false);
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
                                                                    {values.image ? (
                                                                        <img
                                                                            style={{ maxWidth: '100%' }}
                                                                            src={URL.createObjectURL(values.image)}
                                                                            alt={(values.image as File).name}
                                                                        />
                                                                    ) : (
                                                                        <Box
                                                                            sx={{
                                                                                alignItems: 'center',
                                                                                display: 'flex',
                                                                                flexDirection: 'column',
                                                                                gap: 2,
                                                                                cursor: 'pointer',
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
                                                                                yükləyin və ya sürüşdürüb yerləşdirin
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
