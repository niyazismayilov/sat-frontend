import { Grid, Box, Container, InputAdornment, IconButton, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { useState } from 'react';
import { useAuth } from 'context/auth/store';
import { useNotifications } from 'context/NotificationsContext';
import { useUpdateUsersPermissionsUserMutation } from 'graphql/generated';
import { useTranslation } from 'react-i18next';

const Root = styled(Box)(() => ({
    '& .Mui-buttons': {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '12%',
        padding: '0 10px',
    },
    '& .MuiButton:hover ': {
        border: 'none',
    },
    '& .password-title': {
        paddingTop: '30px',
    },
    '& .MuiButton': {
        padding: '10px 50px 10px 50px',
        gap: '10px',
        width: '210px',
    },
}));

export const ChangePasswordTab: React.FC = () => {
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
    const initialValues = {
        password: '',
        confirmPassword: '',
    };
    return (
        <Root>
            <Container>
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({ handleSubmit }): React.ReactNode => {
                        return (
                            <Form onSubmit={handleSubmit}>
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
                                </Grid>
                                <Box className="Mui-buttons">
                                    <Grid item xs={12}>
                                        <Box className="actions">
                                            <Button
                                                className="MuiButton"
                                                variant="outlined"
                                                sx={{
                                                    border: 'none',
                                                    backgroundColor: '#F4F4F4',
                                                    color: '#1F2937',
                                                    flexWrap: 'nowrap',
                                                    marginRight: '20px',
                                                }}
                                            >
                                                Ləğv et
                                            </Button>
                                            <Button className="MuiButton" variant="contained" type="submit">
                                                Yadda saxla
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Box>
                            </Form>
                        );
                    }}
                </Formik>
            </Container>
        </Root>
    );
};
