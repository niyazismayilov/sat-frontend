import { Grid, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/system';
import { Spinner, PhoneNumberField } from 'components';
import { LoadingButton } from 'components/loading-button';
import { useAuth } from 'context/auth/store';
import { useNotifications } from 'context/NotificationsContext';
import browserHistory from 'utils/browser-utils';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { useMeQuery, useUpdateUsersPermissionsUserMutation } from 'graphql/generated';
// import { validationSchema } from '../validationSchema';
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
    '& .MuiButton': {
        padding: '10px 50px 10px 50px',
        gap: '10px',
        width: '210px',
    },
}));

export const PersonalInformationTab: React.FC = () => {
    const { notify } = useNotifications();
    const [{ user }] = useAuth();
    const {
        data,
        loading: loadingMe,
        refetch,
    } = useMeQuery({
        fetchPolicy: 'cache-and-network',
    });
    const initialValues = {
        firstName: data?.me?.firstName,
        lastName: data?.me?.lastName,
        email: data?.me?.email,
        phoneNumber: data?.me?.phoneNumber,
    };

    const [updateUser, { loading }] = useUpdateUsersPermissionsUserMutation({
        onCompleted() {
            notify({
                type: 'success',
                message: 'Profilim redaktə edildi',
            });
            refetch();
        },
        onError(error) {
            notify({
                type: 'error',
                message: error.message,
            });
        },
    });

    const onSubmit = (me, { setSubmitting }): void => {
        setSubmitting(false);
        updateUser({
            variables: {
                data: {
                    ...me,
                },
                updateUsersPermissionsUserId: user?.id as string,
            },
        });
    };

    if (loadingMe) {
        return <Spinner />;
    }
    return (
        <Root>
            <Container>
                <Formik initialValues={initialValues} onSubmit={onSubmit} /* validationSchema={validationSchema} */>
                    {({ handleSubmit }): React.ReactNode => {
                        return (
                            <Form onSubmit={handleSubmit}>
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
                                                    marginRight: '20px',
                                                }}
                                                onClick={() => browserHistory.goBack()}
                                            >
                                                Ləğv et
                                            </Button>
                                            <LoadingButton
                                                className="MuiButton"
                                                variant="contained"
                                                onClick={() => {
                                                    handleSubmit();
                                                }}
                                                loading={loading}
                                                loadingText="Yadda saxlanır"
                                                text="Yadda saxla"
                                            />
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
