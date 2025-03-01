import { Box, Button, Container, Divider, Grid, MenuItem, Theme } from '@mui/material';
import { styled } from '@mui/styles';
import { Page, Spinner } from 'components';
import { ManagerPageHeader } from 'components/manager-page-header';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import browserHistory from 'utils/browser-utils';
import { DatePickerField } from 'components';
import { useNotifications } from 'context/NotificationsContext';
import { useCoursesQuery, useUpdateGroupMutation, useGroupQuery, Enum_Group_Status } from 'graphql/generated';
import { useParams } from 'react-router-dom';
import { validationSchema } from './validationSchema';
const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    paddingRight: 20,
    [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacing(3.5),
    },
    '& .uploadForm': {
        border: '2px solid #E7EAE7',
        padding: theme.spacing(1),
        display: 'flex',
        minHeight: 217,
        justifyContent: 'center',
        alignItems: 'center',
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

export const EditGroup: React.FC = () => {
    const { notify } = useNotifications();
    const { data, loading: courseLoading } = useCoursesQuery();
    const { id: groupId } = useParams<{ id: string }>();
    const { data: groupData, loading: loadingGroup } = useGroupQuery({
        fetchPolicy: 'network-only',
        variables: { groupId: groupId },
    });

    const courses = data?.courses?.data.map((course) => course) || [];

    const groups = groupData?.group?.data?.attributes;

    const initialValues = {
        name: groups?.name,
        startsAt: groups?.startsAt,
        endsAt: groups?.endsAt,
        course: groups?.course?.data?.id,
        capacity: groups?.capacity,
        status: groups?.status,
    };

    const [updateGroup] = useUpdateGroupMutation({
        onCompleted() {
            notify({
                type: 'success',
                message: 'Qrup uğurla redaktə edildi',
            });
            browserHistory.push('/d/Training/groups');
        },
        onError(error) {
            notify({
                type: 'error',
                message: error.message,
            });
        },
    });

    const onSubmit = (formData) => {
        updateGroup({
            variables: {
                data: formData,
                updateGroupId: groupId,
            },
        });
    };

    if (loadingGroup || courseLoading) {
        return <Spinner />;
    }

    return (
        <Root>
            <Page title="Qrupu redaktə et">
                <ManagerPageHeader title="Qrupu redaktə et" />
                <Divider style={{ width: '100%' }} />
                <Container sx={{ marginTop: '20px' }}>
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                    >
                        {({}) => {
                            return (
                                <Form>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} sm={6}>
                                                    <Field
                                                        component={TextField}
                                                        name="name"
                                                        fullWidth
                                                        label={'* ' + 'Qrupun adı'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Field
                                                        component={TextField}
                                                        name="course"
                                                        fullWidth
                                                        label="Kurs"
                                                        select
                                                    >
                                                        {courses.map((course) => (
                                                            <MenuItem
                                                                key={course.id as string}
                                                                value={course.id as string}
                                                            >
                                                                {course?.attributes?.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Field>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field
                                                        name="startsAt"
                                                        component={DatePickerField}
                                                        label="Başlama tarixi"
                                                        variant="outlined"
                                                        openTo="year"
                                                        views={['year', 'month', 'day']}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Field
                                                        name="endsAt"
                                                        component={DatePickerField}
                                                        label="Bitmə tarixi"
                                                        variant="outlined"
                                                        openTo="year"
                                                        views={['year', 'month', 'day']}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Field
                                                        component={TextField}
                                                        name="capacity"
                                                        type="number"
                                                        fullWidth
                                                        label={'* ' + 'İştirakçı sayı'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Field
                                                        fullWidth
                                                        component={TextField}
                                                        select
                                                        label="Status"
                                                        name="status"
                                                        autoComplete="off"
                                                        SelectProps={{
                                                            displayEmpty: true,
                                                            renderValue: (value) => {
                                                                if (!value) {
                                                                    return (
                                                                        <Box sx={{ color: 'text.disabled' }}>
                                                                            Status
                                                                        </Box>
                                                                    );
                                                                }
                                                                return value === Enum_Group_Status.Active
                                                                    ? 'Aktiv'
                                                                    : 'Deaktiv';
                                                            },
                                                        }}
                                                    >
                                                        <MenuItem value={Enum_Group_Status.Active}>Aktiv</MenuItem>
                                                        <MenuItem value={Enum_Group_Status.Inactive}>Deaktiv</MenuItem>
                                                    </Field>
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
