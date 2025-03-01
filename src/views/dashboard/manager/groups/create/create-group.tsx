import { Box, Button, Container, Divider, Grid, MenuItem, Theme } from '@mui/material';
import { styled } from '@mui/styles';
import { Page, Spinner } from 'components';
import { ManagerPageHeader } from 'components/manager-page-header';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import browserHistory from 'utils/browser-utils';
import { validationSchema } from './validationSchema';
import { DatePickerField } from 'components';
import { useNotifications } from 'context/NotificationsContext';
import { useCoursesQuery, useCreateGroupMutation, Enum_Group_Status } from 'graphql/generated';

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

export const CreateGroup: React.FC = () => {
    const { notify } = useNotifications();
    const { data } = useCoursesQuery();

    const courses = data?.courses?.data.map((course) => course) || [];

    // const CoursesOptions =
    //     courses?.map((course) => ({
    //         label: course.attributes?.name,
    //         value: course.id,
    //     })) || [];

    const initialValues = {
        name: '',
        startsAt: '',
        endsAt: '',
        course: '',
        status: Enum_Group_Status.Active,
        capacity: 0,
    };

    const [CreateGroup, { loading }] = useCreateGroupMutation({
        onCompleted() {
            notify({
                type: 'success',
                message: 'Qrup uğurla yaradıldı',
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
        CreateGroup({
            variables: {
                data: formData,
            },
        });
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <Root>
            <Page title="Qrup yarat">
                <ManagerPageHeader title="Qrup yarat" />
                <Divider style={{ width: '100%' }} />
                <Container sx={{ marginTop: '20px' }}>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
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
                                                        label={'* ' + 'İştirakçı sayı MAX'}
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
