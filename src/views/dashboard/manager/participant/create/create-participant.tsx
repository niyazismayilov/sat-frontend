import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import {
    Box,
    Button,
    Container,
    Divider,
    FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Radio,
    RadioGroup,
    Theme,
    Typography,
} from '@mui/material';
import { styled } from '@mui/styles';
// import { api } from 'api/index';
// import { ReactComponent as UploadIcon } from 'assets/icons/manager-dashboard/upload-icon.svg';
// import clsx from 'clsx';
import { DatePickerField, Page, PhoneNumberField, Spinner } from 'components';
import { ManagerPageHeader } from 'components/manager-page-header';
// import { API_URL } from 'config';
import { useNotifications } from 'context/NotificationsContext';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { Gender, useRegisterMutation } from 'graphql/generated';
import React, { useState } from 'react';
// import Dropzone from 'react-dropzone';
import browserHistory from 'utils/browser-utils';
import { deepOmit } from 'utils/object-helper';
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

export const CreateParticipant: React.FC = () => {
    // const [restLoading, setRestLoading] = useState<boolean>(false);                         // NOT DELETE

    const [visible, setVisible] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);

    const { notify } = useNotifications();

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        gender: Gender.Male,
        hasJob: true,
        password: '',
        confirmPassword: '',
        userPicture: null,
        companyName: '',
        jobTitle: '',
        schoolName: '',
        studyField: '',
        dateOfBirth: null,
    };

    const [CreateParticipant, { loading }] = useRegisterMutation({
        onCompleted() {
            notify({
                type: 'success',
                message: 'İştirakçı uğurla yaradıldı',
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

    const onsubmit = async (formData) => {
        // const axios = await api();                                           // NOT DELETE

        const { confirmPassword, ...others } = formData;

        formData = deepOmit(formData, confirmPassword);

        // let profileData: any = null;

        // if (userPicture) {                                                     // NOT DELETE
        //     setRestLoading(true);
        //     const formBody = new FormData();
        //     formBody.append('files', userPicture);
        //     const res = await axios.post(`${API_URL}/api/upload`, formBody, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //     });
        //     profileData = res.data;
        //     setRestLoading(false);
        // }

        CreateParticipant({
            variables: {
                input: {
                    ...others,
                    username: formData.email,
                    // userPicture: profileData ? profileData[0].id : profileData,         // NOT DELETE
                },
            },
        });
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <Root>
            <Page title="İştirakçı yarat">
                <ManagerPageHeader title="İştirakçı yarat" />
                <Divider style={{ width: '100%' }} />
                <Container>
                    <Typography sx={{ color: '#6B7280', fontWeight: 700, my: 3 }}>Şəxsi məlumatlar</Typography>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onsubmit}>
                        {({ setFieldValue, values }) => (
                            <Form>
                                {/* <Grid container spacing={3}>              /// Not DELETE*/}
                                {/* <Grid item xs={12} sm={10}>               /// Not DELETE */}
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
                                            label="Elektron poçt"
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
                                                    label="Çalışdığı şirkət"
                                                    name="companyName"
                                                    autoComplete="off"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Field
                                                    fullWidth
                                                    component={TextField}
                                                    label="Vəzifəsi"
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
                                                    label="Təhsil qurumunun adı"
                                                    name="schoolName"
                                                    autoComplete="off"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Field
                                                    fullWidth
                                                    component={TextField}
                                                    label="Fakültə və ya ixtisas"
                                                    name="studyField"
                                                    autoComplete="off"
                                                />
                                            </Grid>
                                        </>
                                    )}
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            component={TextField}
                                            fullWidth
                                            label="Şifrənizi daxil edin"
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
                                            label="Şifrənizi təkrar daxil edin"
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
                                    {/* </Grid>                                         /// Not DELETE
                                    </Grid> */}
                                    {/* <Grid item xs={12} sm={2}>
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
                                                    onDrop={(acceptedFiles): void => {
                                                        if (acceptedFiles) {
                                                            setFieldValue('userPicture', acceptedFiles[0]);
                                                        }
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
                                                                    {values.userPicture ? (
                                                                        <img
                                                                            style={{
                                                                                width: '100%',
                                                                                height: '100%',
                                                                                objectFit: 'fill',
                                                                            }}
                                                                            src={URL.createObjectURL(
                                                                                values.userPicture,
                                                                            )}
                                                                            alt={(values.userPicture as File).name}
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
                                    </Grid> */}
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
