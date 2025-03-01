import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { LoadingButton } from '@mui/lab';
import {
    Box,
    FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Radio,
    RadioGroup,
    Typography,
} from '@mui/material';
import { PhoneNumberField } from 'components';
import { DatePickerField } from 'components/formik';
import { useNotifications } from 'context/NotificationsContext';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { Gender, useRegisterMutation, UsersPermissionsRegisterInput } from 'graphql/generated';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { deepOmit } from 'utils/object-helper';
import { useValidationSignupSchema } from './validationSchema';
import browserHistory from 'utils/browser-utils';
import { useAuthDispatch } from 'context/auth/store';

type RegisterFormValues = UsersPermissionsRegisterInput & {
    confirmPassword: string;
};

const initialValues: RegisterFormValues = {
    username: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    hasJob: true,
    companyName: '',
    jobTitle: '',
    schoolName: '',
    studyField: '',
    dateOfBirth: '',
};

export const SignUpForm: React.FC = () => {
    const { t } = useTranslation();
    const { notify } = useNotifications();

    const validationSignupSchema = useValidationSignupSchema(t);
    const [visible, setVisible] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);
    const dispatch = useAuthDispatch();

    const [register, { loading }] = useRegisterMutation();

    const onSubmit = async (formData, { setSubmitting }) => {
        setSubmitting(false);

        const userData: UsersPermissionsRegisterInput = deepOmit(
            formData,
            formData.hasjob
                ? ['schoolName', 'studyField', 'confirmPassword']
                : ['companyName', 'jobTitle', 'confirmPassword'],
        );

        userData.firstName = userData.firstName.replace(/^\w/, (firstLetter) => firstLetter.toUpperCase());
        userData.lastName = userData.lastName.replace(/^\w/, (firstLetter) => firstLetter.toUpperCase());
        userData.username = userData.email;

        try {
            await register({ variables: { input: userData } });

            setTimeout(() => {
                browserHistory.push('/');
                dispatch({ type: 'AUTH_DIALOG_OPENED', email: formData.email, tab: 0 });
            }, 1000);

            notify({
                type: 'success',
                message: t('auth:successFullySignedUp'),
            });
        } catch (error) {
            notify({
                type: 'error',
                message: `${error}`,
            });
        }
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSignupSchema} onSubmit={onSubmit}>
            {({ handleSubmit, values, setFieldValue }): React.ReactNode => {
                return (
                    <Form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Field
                                    fullWidth
                                    component={TextField}
                                    placeholder={'* ' + t('auth:firstName')}
                                    name="firstName"
                                    autoComplete="off"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Field
                                    fullWidth
                                    component={TextField}
                                    placeholder={'* ' + t('auth:lastName')}
                                    name="lastName"
                                    autoComplete="off"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    fullWidth
                                    component={TextField}
                                    placeholder={'* ' + t('auth:email')}
                                    name="email"
                                    autoComplete="off"
                                    inputProps={{
                                        autoCapitalize: 'none',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    fullWidth
                                    name="phoneNumber"
                                    component={PhoneNumberField}
                                    inputProps={{ variant: 'outlined' }}
                                />
                            </Grid>
                            <Grid item xs={6}>
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
                                                    <Box sx={{ color: 'text.disabled' }}>
                                                        {t('auth:chooseYourGender')}
                                                    </Box>
                                                );
                                            }
                                            return t(`enums:${value}`);
                                        },
                                    }}
                                >
                                    <MenuItem value={Gender.Male}>Kişi</MenuItem>
                                    <MenuItem value={Gender.Female}>Qadın</MenuItem>
                                </Field>
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    fullWidth
                                    name="dateOfBirth"
                                    component={DatePickerField}
                                    openTo="year"
                                    views={['year', 'month', 'day']}
                                    placeholder="* 01.01.1970"
                                    disableFuture
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={values.hasJob}
                                    onChange={(e) => {
                                        setFieldValue('hasJob', e.target.value === 'true' ? true : false);
                                    }}
                                    sx={{ display: 'flex', flexDirection: 'row' }}
                                >
                                    <FormControlLabel value={true} control={<Radio />} label={t('auth:iamworking')} />
                                    <FormControlLabel value={false} control={<Radio />} label={t('auth:iamstudent')} />
                                </RadioGroup>
                            </Grid>
                            {values.hasJob && (
                                <>
                                    <Grid item xs={12}>
                                        <Field
                                            fullWidth
                                            component={TextField}
                                            placeholder={t('auth:companyName')}
                                            name="companyName"
                                            autoComplete="off"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            fullWidth
                                            component={TextField}
                                            placeholder={t('auth:jobTitle')}
                                            name="jobTitle"
                                            autoComplete="off"
                                        />
                                    </Grid>
                                </>
                            )}
                            {!values.hasJob && (
                                <>
                                    <Grid item xs={12}>
                                        <Field
                                            fullWidth
                                            component={TextField}
                                            placeholder={t('auth:schoolName')}
                                            name="schoolName"
                                            autoComplete="off"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            fullWidth
                                            component={TextField}
                                            placeholder={t('auth:studyField')}
                                            name="studyField"
                                            autoComplete="off"
                                        />
                                    </Grid>
                                </>
                            )}

                            <Grid item xs={12}>
                                <Field
                                    fullWidth
                                    component={TextField}
                                    placeholder={'* ' + t('auth:enterPassword')}
                                    name="password"
                                    type={visible ? 'text' : 'password'}
                                    autoComplete="current-password"
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

                            <Grid item xs={12}>
                                <Field
                                    fullWidth
                                    component={TextField}
                                    placeholder={'* ' + t('auth:enterPasswordAgain')}
                                    name="confirmPassword"
                                    type={confirmPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setConfirmPassword(!confirmPassword)}>
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
                            <Grid item xs={6}>
                                <LoadingButton
                                    loading={loading}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    {t('auth:register')}
                                </LoadingButton>
                            </Grid>
                            <Grid item xs={6}>
                                <LoadingButton
                                    variant="outlined"
                                    color="primary"
                                    onClick={(): void => {
                                        dispatch({ type: 'AUTH_DIALOG_CLOSED' });
                                    }}
                                    loading={loading}
                                    fullWidth
                                >
                                    <Typography color="#000">Ləğv et</Typography>
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};
