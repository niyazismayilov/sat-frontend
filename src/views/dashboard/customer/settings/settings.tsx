import { Box, Button, Container, Divider, Grid, Theme, Typography, IconButton, InputAdornment } from '@mui/material';
import { styled } from '@mui/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Page } from 'components';
import { ManagerPageHeader } from 'components/manager-page-header';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import React, { useState } from 'react';
import browserHistory from 'utils/browser-utils';
import { validationSchema } from './validationSchema';
import { useTranslation } from 'react-i18next';
import { useUpdateUsersPermissionsUserMutation } from 'graphql/generated';
import { useNotifications } from 'context/NotificationsContext';
import { useAuth } from 'context/auth/store';

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

const initialValues = {
    password: '',
    confirmPassword: '',
};

export const Settings: React.FC = () => {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);
    const { notify } = useNotifications();
    const [{ user }] = useAuth();

    const [updateUser] = useUpdateUsersPermissionsUserMutation({
        onCompleted() {
            notify({
                type: 'success',
                message: t('successfullyUpdated'),
            });
        },
        onError(error) {
            notify({
                type: 'error',
                message: error.message,
            });
        },
    });

    const onSubmit = (form, { setSubmitting, resetForm }): void => {
        const { password, confirmPassword } = form;
        setSubmitting(false);
        if (password === confirmPassword) {
            updateUser({
                variables: {
                    data: { password: password },
                    updateUsersPermissionsUserId: user?.id as string,
                },
            });
            resetForm();
        }
    };

    const translatedValidationSchema = validationSchema(t);
    return (
        <Root>
            <Page title="Tənzimləmələr">
                <ManagerPageHeader title={t('userMenu:settings')} />
                <Divider style={{ width: '100%' }} />
                <Container>
                    <Typography sx={{ color: '#6B7280', fontWeight: 700, my: 3 }}>{t('changePassword')}</Typography>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={translatedValidationSchema}
                        onSubmit={onSubmit}
                    >
                        {({}) => {
                            return (
                                <Form>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                component={TextField}
                                                fullWidth
                                                label="Yeni şifrə"
                                                name="password"
                                                type={visible ? 'text' : 'password'}
                                                autoComplete="new-password"
                                                margin="dense"
                                                required
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
                                                label="Yeni şifrənin təkrarı"
                                                name="confirmPassword"
                                                type={confirmPassword ? 'text' : 'password'}
                                                autoComplete="new-password"
                                                margin="dense"
                                                required
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
