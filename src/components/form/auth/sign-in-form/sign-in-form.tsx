import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/styles';
import { useAuthDispatch, useAuthState } from 'context/auth/store';
import { useNotifications } from 'context/NotificationsContext';
import { Field, Form, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-mui';
import { useLoginMutation, useMeLazyQuery } from 'graphql/generated';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SigninSchema } from './validationSchema';
import browserHistory from 'utils/browser-utils';
import { ACCESS_TOKEN_KEY } from 'context/auth/reducer';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    '& .social-button': {
        padding: theme.spacing(1.5, 2.5),
        justifyContent: 'flex-start',
        fontSize: '12px',
        fontStyle: 'normal',
        fontWeight: '500',
        color: theme.palette.text.primary,
        whiteSpace: 'nowrap',
        '& svg': {
            width: 23,
            height: 23,
        },
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
        },
    },
    '& .verify': {
        textDecoration: 'underline !important',
    },
    '& .forgot-password': {
        color: theme.palette.primary.main,
        cursor: 'pointer',
        fontSize: '.875rem',
        fontWeight: 500,
    },
}));

type SigninFormProps = {
    pageUsage?: boolean;
};

export const SignInForm: React.FC<SigninFormProps> = () => {
    const { t } = useTranslation();
    const { email } = useAuthState();
    const dispatch = useAuthDispatch();
    const { notify } = useNotifications();
    const [hasVerifyError, setHasVerifyError] = useState<boolean>(false);
    const formikRef = useRef<FormikProps<any>>(null);

    const initialValues = {
        email: email || '',
        password: '',
    };

    const [loadUser] = useMeLazyQuery({
        fetchPolicy: 'network-only',
    });

    const onLoginSuccess = async (accessToken: string) => {
        try {
            const {
                data: {
                    me: { id, username, email, confirmed, blocked, lastName, firstName, phoneNumber, role },
                },
            }: any = await loadUser();
            dispatch({
                type: 'LOGGED_IN',
                accessToken,
                user: { id, username, email, confirmed, blocked, lastName, firstName, phoneNumber, role },
            });
            dispatch({ type: 'AUTH_DIALOG_CLOSED' });
            if (role?.type && role?.type === 'super_admin') {
                browserHistory.push('/d/home');
            } else {
                browserHistory.push('/d/kurslarim');
            }
            notify({
                type: 'success',
                message: t('login:login'),
            });
        } catch (err) {
            console.log(err);
        }
    };

    const [logIn, { loading }] = useLoginMutation({
        onCompleted({ login: { jwt } }) {
            localStorage.setItem(ACCESS_TOKEN_KEY, jwt as string);
            if (jwt) {
                onLoginSuccess(jwt);
            }
        },
        onError(err) {
            notify({
                type: 'error',
                message: t(`login:${err.message}`),
            });
            switch (err.message) {
                case 'EMAIL_NOT_VERIFIED':
                    setHasVerifyError(true);
                    break;
                    break;
                default:
                    setHasVerifyError(false);
            }
        },
    });

    const onSubmit = (formData): void => {
        logIn({
            variables: {
                input: {
                    identifier: formData.email,
                    password: formData.password,
                    provider: 'local',
                },
            },
        });
    };

    const [visible, setVisible] = useState(false);

    const translatedSigninSchema = SigninSchema(t);

    return (
        <Root>
            <Grid container spacing={{ xs: 1.5, sm: 3 }}>
                <Formik
                    innerRef={formikRef}
                    initialValues={initialValues}
                    validationSchema={translatedSigninSchema}
                    onSubmit={onSubmit}
                >
                    {({ handleSubmit }): any => {
                        return (
                            <>
                                {(email || hasVerifyError) && (
                                    <Grid item xs={12}>
                                        <Alert style={{ width: '100%' }} severity="info">
                                            {t('auth:submitYourEmailToActivateYourAccount')}
                                        </Alert>
                                    </Grid>
                                )}
                                <Grid item xs={12}>
                                    <Form onSubmit={handleSubmit}>
                                        <Grid container spacing={{ xs: 1.5, sm: 3 }}>
                                            <Grid item xs={12}>
                                                <Field
                                                    component={TextField}
                                                    placeholder="*  Emailiniz"
                                                    id="email"
                                                    name="email"
                                                    autoComplete="off"
                                                    autoFocus
                                                    disabled={loading}
                                                    fullWidth
                                                    inputProps={{
                                                        autoCapitalize: 'none',
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field
                                                    component={TextField}
                                                    placeholder="* Şifrənizi daxil edin"
                                                    name="password"
                                                    type={visible ? 'text' : 'password'}
                                                    id="password"
                                                    autoComplete="current-password"
                                                    disabled={loading}
                                                    fullWidth
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
                                                <Typography
                                                    display="flex"
                                                    justifyContent="flex-end"
                                                    onClick={(): void => {
                                                        dispatch({ type: 'AUTH_DIALOG_OPENED', tab: 2 });
                                                    }}
                                                    className="forgot-password"
                                                >
                                                    {t('auth:didYouForgetYourPassword')}
                                                </Typography>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <LoadingButton
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    loading={loading}
                                                    fullWidth
                                                >
                                                    <Typography color="#FFFFFF">{t('auth:login')}</Typography>
                                                </LoadingButton>
                                            </Grid>
                                            <Grid item xs={12}>
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
                                </Grid>
                            </>
                        );
                    }}
                </Formik>
            </Grid>
        </Root>
    );
};
