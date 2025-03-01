import { Box, Typography, Alert } from '@mui/material';
import { styled } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { useAuthState } from 'context/auth/store';
import * as Yup from 'yup';
import { useForgotPasswordMutation } from 'graphql/generated';
import { useState } from 'react';
import { useNotifications } from 'context/NotificationsContext';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
});

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    '& .title': {
        textAlign: 'center',
    },
    '& .subTitle': {
        marginBottom: theme.spacing(3),
        textAlign: 'center',
    },
    '& .MuiPaper-root ': {
        width: 'initial',
    },
}));

export const ForgotPassword: React.FC = () => {
    const { notify } = useNotifications();
    const { t } = useTranslation();

    const { email } = useAuthState();

    const forceEmail = sessionStorage.getItem('FORCE_RESET_EMAIL');
    const [success, setSuccess] = useState<boolean>(false);

    const initialValues = {
        email: email || forceEmail || '',
    };

    const [sendPassworResetEmail, { loading }] = useForgotPasswordMutation({
        onCompleted() {
            setSuccess(true);
        },
        onError(error) {
            notify({
                type: 'error',
                message: error.message,
            });
        },
    });

    const onSubmit = ({ email }, { setSubmitting }): void => {
        setSubmitting(false);
        sendPassworResetEmail({ variables: { email } });
    };

    return (
        <Root>
            <Typography variant="h2" className="title">
                {t('auth:forgotPassword')}
            </Typography>
            <Typography color="textSecondary" className="subTitle">
                {t('auth:enterYourMailBelow')}
            </Typography>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ handleSubmit }): any => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            {success && (
                                <Alert sx={{ mb: 4.5 }} severity="info">
                                    {t('auth:weSendEmailToResetYourPassword')}
                                </Alert>
                            )}
                            <Box mb={4.5}>
                                <Field
                                    component={TextField}
                                    placeholder={'* ' + t('auth:yourEmail')}
                                    variant="outlined"
                                    id="email"
                                    name="email"
                                    autoComplete="off"
                                    autoFocus
                                    fullWidth
                                    inputProps={{
                                        autoCapitalize: 'none',
                                    }}
                                />
                            </Box>
                            <LoadingButton
                                type="submit"
                                sx={{ width: '100%' }}
                                variant="contained"
                                color="primary"
                                loading={loading}
                            >
                                {t('auth:send')}
                            </LoadingButton>
                        </Form>
                    );
                }}
            </Formik>
        </Root>
    );
};
