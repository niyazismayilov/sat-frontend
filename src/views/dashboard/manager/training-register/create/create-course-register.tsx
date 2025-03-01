import {
    Box,
    Theme,
    Container,
    Grid,
    Button,
    Autocomplete,
    TextField as MUITextField,
    FormHelperText,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Page, Spinner } from 'components';
import { ManagerPageHeader } from 'components/manager-page-header';
import { Form, Formik } from 'formik';
import {
    Enum_Courseregister_Paymentstatus,
    Enum_Courseregister_Status,
    useCreateCourseRegisterMutation,
    useGroupsQuery,
    useUsersPermissionsUsersQuery,
} from 'graphql/generated';
import browserHistory from 'utils/browser-utils';
import { validationSchema } from './validationSchema';
import { useNotifications } from 'context/NotificationsContext';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    paddingRight: 20,
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

export const CreateCourseRegister: React.FC = () => {
    const { data: participantsData } = useUsersPermissionsUsersQuery({
        variables: {
            pagination: {
                pageSize: 20000,
            },
        },
    });
    const { data: groupsData } = useGroupsQuery();
    const { notify } = useNotifications();

    const participants =
        participantsData?.usersPermissionsUsers?.data
            .map((participant) => participant)
            .filter((participant) => participant.attributes?.role?.data?.attributes?.name !== 'Super Admin') || [];

    const ParticipantsOptions =
        participants?.map((participant) => ({
            label: participant.attributes?.firstName + ' ' + participant.attributes?.lastName,
            value: participant.id,
        })) || [];

    const groups = groupsData?.groups?.data.map((group) => group) || [];

    const GroupsOptions =
        groups
            ?.map((group) => ({
                label: group.attributes?.course?.data?.attributes?.name + ' - ' + group.attributes?.name,
                value: group.id,
            }))
            .sort((a, b) => (a.label > b.label ? 1 : b.label > a.label ? -1 : 0)) || [];

    const [createCourseRegister, { loading }] = useCreateCourseRegisterMutation({
        onCompleted() {
            notify({
                type: 'success',
                message: 'Qeydiyyat uğurla yaradıldı',
            });
            browserHistory.push('/d/training/training-register');
        },
        onError(error) {
            notify({
                type: 'error',
                message: error.message,
            });
        },
    });

    const onSubmit = (formData) => {
        const { participant, group, ...rest } = formData;
        if (participant.value && group.value) {
            createCourseRegister({
                variables: {
                    data: {
                        ...rest,
                        user: participant.value,
                        group: group.value,
                    },
                },
            });
        }
    };

    const initialValues = {
        participant: '',
        group: '',
        paymentStatus: Enum_Courseregister_Paymentstatus.PaidByCash.toString(),
        status: Enum_Courseregister_Status.Active,
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <Root>
            <Page title="Təlim qeydiyyatı">
                <ManagerPageHeader title="Təlim qeydiyyatı" />
                <Divider style={{ width: '100%' }} />
                <Container sx={{ mt: 3.75 }}>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {({ setFieldValue, setFieldTouched, touched, errors, values }) => (
                            <Form>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={8}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6}>
                                                <Autocomplete
                                                    options={ParticipantsOptions}
                                                    onChange={(_, value) =>
                                                        setFieldValue('participant', value && value)
                                                    }
                                                    renderInput={(params) => (
                                                        <MUITextField
                                                            {...params}
                                                            onBlur={() => setFieldTouched('participant', true)}
                                                            name="participant"
                                                            variant="outlined"
                                                            error={touched.participant && !!errors.participant}
                                                            label="İştirakçı"
                                                        />
                                                    )}
                                                />
                                                {!!errors.participant && touched.participant && (
                                                    <FormHelperText error variant="filled">
                                                        {errors.participant}
                                                    </FormHelperText>
                                                )}
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Autocomplete
                                                    options={GroupsOptions}
                                                    onChange={(_, value) => setFieldValue('group', value && value)}
                                                    renderInput={(params) => (
                                                        <MUITextField
                                                            {...params}
                                                            onBlur={() => setFieldTouched('group', true)}
                                                            name="group"
                                                            variant="outlined"
                                                            error={touched.group && !!errors.group}
                                                            label="Qoşulduğu qrup"
                                                        />
                                                    )}
                                                />
                                                {!!errors.group && touched.group && (
                                                    <FormHelperText error variant="filled">
                                                        {errors.group}
                                                    </FormHelperText>
                                                )}
                                            </Grid>
                                            <Grid item xs={12} my={3}>
                                                <Typography sx={{ color: '#6B7280' }}>Ödəniş növü:</Typography>
                                                <RadioGroup
                                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                                    name="paymentStatus"
                                                    value={values.paymentStatus.toString()}
                                                    onChange={(event) => {
                                                        setFieldValue('paymentStatus', event.currentTarget.value);
                                                    }}
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        gap: '25px',
                                                        marginTop: '10px',
                                                    }}
                                                >
                                                    <FormControlLabel
                                                        value={Enum_Courseregister_Paymentstatus.PaidByCash.toString()}
                                                        control={<Radio />}
                                                        label="Nağd"
                                                    />
                                                </RadioGroup>
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
