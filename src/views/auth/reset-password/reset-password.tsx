import { Card, Grid, IconButton, Theme, Container } from '@mui/material';
import { Alert } from '@mui/material';
import { Link, PageHeader } from 'components';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuthDispatch } from 'context/auth/store';
import { useResetPasswordMutation } from 'graphql/generated';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { validationSchema } from './validationSchema';
import { styled } from '@mui/styles';
import { LoadingButton } from '@mui/lab';

const Root = styled(Container)(({ theme }: { theme: Theme }) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: theme.spacing(3),

    '& .container': {
        padding: theme.spacing(6, 0),
        marginTop: theme.spacing(5),
    },
    '& .login': {
        textDecoration: 'underline !important',
        color: theme.palette.text.secondary,
    },
    '& .MuiAlert-message': {
        display: 'flex',
    },
}));

export const ResetPassword: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAuthDispatch();
    const [success, setSuccess] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [passwordFieldType, setPasswordFieldType] = useState('password');
    const { search } = useLocation();
    const token = search.replace('?code=', '');

    const toggleShowPassword = () => {
        if (passwordFieldType === 'password') {
            setPasswordFieldType('text');
        } else {
            setPasswordFieldType('password');
        }
    };

    const [resetPassword, { loading, error }] = useResetPasswordMutation({
        onCompleted() {
            setSuccess(true);
        },
        onError() {
            setShowErrorMessage(true);
        },
    });

    const onSubmit = ({ password, passwordConfirmation }, { setSubmitting }): void => {
        setSubmitting(false);
        resetPassword({ variables: { password, passwordConfirmation, code: token } });
    };

    const disabled = success || showErrorMessage || loading;
    const translatedValidationSchema = validationSchema(t);

    return (
        <>
            <Root maxWidth="sm">
                <Card className="container">
                    <PageHeader title={t('auth:resetPassword')} />
                    <Formik
                        initialValues={{ password: '', passwordConfirmation: '' }}
                        validationSchema={translatedValidationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ handleSubmit }): React.ReactNode => (
                            <Form
                                onSubmit={handleSubmit}
                                style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                            >
                                <Grid
                                    style={{
                                        maxWidth: '70%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        padding: '10px',
                                    }}
                                    container
                                    spacing={2}
                                >
                                    {success && (
                                        <Grid item xs={12}>
                                            <Alert severity="success" sx={{ display: 'flex' }}>
                                                {t('auth:passwordSet')}&nbsp;
                                                <Link
                                                    className="login"
                                                    link
                                                    to="#"
                                                    onClick={() => dispatch({ type: 'AUTH_DIALOG_OPENED', tab: 0 })}
                                                >
                                                    {t('auth:login')}
                                                </Link>
                                            </Alert>
                                        </Grid>
                                    )}
                                    {showErrorMessage && (
                                        <Grid item xs={12}>
                                            <Alert severity="error">
                                                {t(`error:${error?.message}`) || `${t('defaultErrorMessage')}`}
                                                <Link
                                                    className="login"
                                                    link
                                                    to="#"
                                                    onClick={() => {
                                                        setTimeout(() => {
                                                            dispatch({ type: 'AUTH_DIALOG_OPENED', tab: 0 });
                                                        }, 500);
                                                    }}
                                                ></Link>
                                            </Alert>
                                        </Grid>
                                    )}
                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            fullWidth
                                            variant="outlined"
                                            name="password"
                                            label={'* ' + t('auth:newPassword')}
                                            autoComplete="off"
                                            disabled={disabled}
                                            type={passwordFieldType}
                                            InputProps={{
                                                endAdornment: (
                                                    <IconButton disabled={disabled} onClick={toggleShowPassword}>
                                                        {passwordFieldType === 'password' ? (
                                                            <VisibilityOffOutlinedIcon />
                                                        ) : (
                                                            <VisibilityIcon />
                                                        )}
                                                    </IconButton>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            fullWidth
                                            variant="outlined"
                                            name="passwordConfirmation"
                                            label={'* ' + t('auth:passwordConfirmation')}
                                            autoComplete="off"
                                            disabled={disabled}
                                            type={passwordFieldType}
                                            InputProps={{
                                                endAdornment: (
                                                    <IconButton disabled={disabled} onClick={toggleShowPassword}>
                                                        {passwordFieldType === 'password' ? (
                                                            <VisibilityOffOutlinedIcon />
                                                        ) : (
                                                            <VisibilityIcon />
                                                        )}
                                                    </IconButton>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <LoadingButton
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            loading={loading}
                                            disabled={disabled || loading}
                                        >
                                            {t('auth:reset')}
                                        </LoadingButton>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Card>
            </Root>
        </>
    );
};
