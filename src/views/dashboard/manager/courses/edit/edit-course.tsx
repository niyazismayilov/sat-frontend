import CloseIcon from '@mui/icons-material/Close';
import {
    Autocomplete,
    Box,
    Button,
    Container,
    Divider,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    TextField as MUITextField,
    MenuItem,
    Paper,
    Theme,
    Typography,
} from '@mui/material';
import { ReactComponent as UploadIcon } from 'assets/icons/manager-dashboard/upload-icon.svg';
import { styled } from '@mui/styles';
import { ReactComponent as VideoLinkIcon } from 'assets/icons/manager-dashboard/video-link.svg';
import { Page, Spinner } from 'components';
import { ManagerPageHeader } from 'components/manager-page-header';
import { useNotifications } from 'context/NotificationsContext';
import { Field, FieldArray, FieldProps, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';

import {
    Enum_Course_Category,
    Enum_Course_Durationtype,
    Enum_Course_Status,
    useCourseQuery,
    useTrainersQuery,
    useUpdateCourseMutation,
} from 'graphql/generated';
import { useParams } from 'react-router-dom';
import browserHistory from 'utils/browser-utils';
import { validationSchema } from './validationSchema';
import { useState } from 'react';
import { API_URL } from 'config';
import { api } from 'api';
import Dropzone from 'react-dropzone';
import clsx from 'clsx';

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
        justifyContent: 'center',
        display: 'flex',
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

const DurationField = styled(TextField)(() => {
    return {
        '& .MuiInputBase-root': {
            paddingLeft: 15,
            paddingRight: '0 !important',
        },
    };
});

const DurationTypeField = styled(TextField)(() => {
    return {
        '& fieldset': {
            border: 'none',
            borderRadius: 0,
            borderRight: '1px solid rgba(0,0,0,0.23)',
            marginRight: 100,
        },
    };
});

export const EditCourse: React.FC = () => {
    const { notify } = useNotifications();
    const { data: trainerData } = useTrainersQuery({
        variables: {
            pagination: {
                pageSize: 999999,
            },
        },
    });
    const { id: courseId } = useParams<{ id: string }>();
    const [restLoading, setRestLoading] = useState<boolean>(false);
    const { data, loading } = useCourseQuery({ fetchPolicy: 'network-only', variables: { courseId } });

    const course = data?.course?.data?.attributes;
    const trainersIds = course?.trainers?.data.map((trainer) => trainer.id);
    const initialValues = {
        trainers: trainersIds,
        benefits: course?.benefits || [],
        includedPayment: course?.includedPayment || [],
        availableProficiencies: course?.availableProficiencies || [],
        capacity: course?.capacity || 0,
        count: course?.count || 0,
        name: course?.name || '',
        durationType: course?.durationType,
        duration: course?.duration,
        price: course?.price || 0,
        description: course?.description || '',
        status: course?.status,
        courseImage: course?.courseImage?.data?.attributes?.url,
        category: course?.category || '',
        syllabus: course?.syllabus,
        videoId: course?.videoId || '',
    };

    const trainers = trainerData?.trainers?.data.map((trainer) => trainer) || [];

    const [updateCourse] = useUpdateCourseMutation({
        onCompleted() {
            notify({
                type: 'success',
                message: 'Kurs redaktə edildi',
            });
            browserHistory.push('/d/training/courses');
        },
        onError(error) {
            notify({
                type: 'error',
                message: error.message,
            });
        },
    });

    const onSubmit = async (course: any) => {
        let profileData: any = null;

        const axios = await api();
        if (typeof course.courseImage !== 'string' && course.courseImage) {
            setRestLoading(true);
            const formBody = new FormData();
            formBody.append('files', course.courseImage);
            const res = await axios.post(`${API_URL}/api/upload`, formBody, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            profileData = res.data;
            setRestLoading(false);
        }

        updateCourse({
            variables: {
                data: {
                    ...course,
                    courseImage: profileData
                        ? profileData[0].id
                        : data?.course?.data?.attributes?.courseImage?.data?.id,
                },
                updateCourseId: courseId,
            },
        });
    };

    const TrainerOptions = trainers?.map((trainer) => ({
        name: trainer.attributes?.fullName,
        value: trainer.id,
    }));

    if (loading || restLoading) {
        return <Spinner />;
    }

    return (
        <Root>
            <Page title="Kursu redaktə et">
                <ManagerPageHeader title="Kursu redaktə et" />
                <Divider style={{ width: '100%' }} />
                <Container>
                    <Typography sx={{ color: '#6B7280', fontWeight: 700, my: 3 }}>Şəxsi məlumatlar</Typography>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {({ setFieldValue, errors, touched, setFieldTouched, values }) => {
                            const trainers =
                                TrainerOptions.filter((trainer) => values.trainers?.includes(trainer.value)) || [];

                            return (
                                <Form>
                                    <Grid container spacing={3}>
                                        <Grid xs={9}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} sm={6}>
                                                    <Field
                                                        name="category"
                                                        component={TextField}
                                                        label="Kateqoriya"
                                                        fullWidth
                                                        select
                                                    >
                                                        <MenuItem value={Enum_Course_Category.Management}>
                                                            İdarəetmə
                                                        </MenuItem>
                                                        <MenuItem value={Enum_Course_Category.Sales}>Satış</MenuItem>
                                                        <MenuItem value={Enum_Course_Category.Marketing}>Marketinq</MenuItem>
                                                        <MenuItem value={Enum_Course_Category.Satacademy}>SAT Academy</MenuItem>
                                                        <MenuItem value={Enum_Course_Category.Nartio}>Nartio</MenuItem>
                                                        <MenuItem value={Enum_Course_Category.Others}>Digər</MenuItem>
                                                    </Field>
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Field
                                                        component={TextField}
                                                        name="name"
                                                        fullWidth
                                                        label={'* ' + 'Kursun adı'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Field
                                                        component={DurationField}
                                                        name="duration"
                                                        type="number"
                                                        fullWidth
                                                        label="Təlim müddəti"
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <Field
                                                                        component={DurationTypeField}
                                                                        select
                                                                        name="durationType"
                                                                        margin="none"
                                                                    >
                                                                        <MenuItem value={Enum_Course_Durationtype.Day}>
                                                                            Gün
                                                                        </MenuItem>
                                                                        <MenuItem value={Enum_Course_Durationtype.Week}>
                                                                            Həftə
                                                                        </MenuItem>
                                                                        <MenuItem
                                                                            value={Enum_Course_Durationtype.Month}
                                                                        >
                                                                            Ay
                                                                        </MenuItem>
                                                                    </Field>
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    ></Field>
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Field
                                                        component={TextField}
                                                        type="number"
                                                        name="count"
                                                        fullWidth
                                                        label="Təlim sayı"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <Autocomplete
                                                        options={TrainerOptions}
                                                        getOptionLabel={(TrainerOptions): any => TrainerOptions.name}
                                                        multiple
                                                        onChange={(_, value) => {
                                                            setFieldValue(
                                                                'trainers',
                                                                value && value.map((v) => v.value),
                                                            );
                                                        }}
                                                        value={trainers}
                                                        renderInput={(params) => (
                                                            <MUITextField
                                                                {...params}
                                                                onBlur={() => setFieldTouched('trainers', true)}
                                                                name="trainers"
                                                                variant="outlined"
                                                                error={touched.trainers && !!errors.trainers}
                                                                label="* Təlimçi"
                                                            />
                                                        )}
                                                    />

                                                    {!!errors.trainers && touched.trainers && (
                                                        <FormHelperText error variant="filled">
                                                            {errors.trainers}
                                                        </FormHelperText>
                                                    )}
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Field
                                                        name="price"
                                                        type="number"
                                                        component={TextField}
                                                        fullWidth
                                                        label="Qiyməti"
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <Typography>AZN</Typography>
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Field
                                                        name="capacity"
                                                        type="number"
                                                        component={TextField}
                                                        label="Maksimum iştirakçı"
                                                        fullWidth
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
                                                                return value === Enum_Course_Status.Active
                                                                    ? 'Aktiv'
                                                                    : 'Deaktiv';
                                                            },
                                                        }}
                                                    >
                                                        <MenuItem value={Enum_Course_Status.Active}>Aktiv</MenuItem>
                                                        <MenuItem value={Enum_Course_Status.Inactive}>Deaktiv</MenuItem>
                                                    </Field>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field
                                                        name="videoId"
                                                        component={TextField}
                                                        label={'Video linkini əlavə et'}
                                                        variant="outlined"
                                                        fullWidth
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <VideoLinkIcon />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field name="includedPayment">
                                                        {({
                                                            field: { name: fieldName, value },
                                                            form: { setFieldValue, errors },
                                                        }: FieldProps): React.ReactNode => (
                                                            <Autocomplete
                                                                freeSolo
                                                                multiple
                                                                value={value}
                                                                onChange={(_, newValue: string[]): void => {
                                                                    setFieldValue(fieldName, newValue);
                                                                }}
                                                                options={[]}
                                                                renderInput={(params) => (
                                                                    <MUITextField
                                                                        {...params}
                                                                        helperText={errors[fieldName]}
                                                                        label={'Ödənişə daxildir'}
                                                                        variant="outlined"
                                                                        onBlur={() =>
                                                                            setFieldTouched('includedPayment', true)
                                                                        }
                                                                        error={
                                                                            touched.includedPayment &&
                                                                            !!errors.includedPayment
                                                                        }
                                                                    />
                                                                )}
                                                            />
                                                        )}
                                                    </Field>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Field name="benefits">
                                                        {({
                                                            field: { name: fieldName, value },
                                                            form: { setFieldValue, errors },
                                                        }: FieldProps): React.ReactNode => (
                                                            <Autocomplete
                                                                freeSolo
                                                                multiple
                                                                value={value}
                                                                onChange={(_, newValue: string[]): void => {
                                                                    setFieldValue(fieldName, newValue);
                                                                }}
                                                                options={[]}
                                                                renderInput={(params) => (
                                                                    <MUITextField
                                                                        {...params}
                                                                        helperText={errors[fieldName]}
                                                                        label={'Kursun faydaları'}
                                                                        variant="outlined"
                                                                        onBlur={() => setFieldTouched('benefits', true)}
                                                                        error={touched.benefits && !!errors.benefits}
                                                                    />
                                                                )}
                                                            />
                                                        )}
                                                    </Field>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Field name="availableProficiencies">
                                                        {({
                                                            field: { name: fieldName, value },
                                                            form: { setFieldValue, errors },
                                                        }: FieldProps): React.ReactNode => (
                                                            <Autocomplete
                                                                freeSolo
                                                                multiple
                                                                value={value}
                                                                onChange={(_, newValue: string[]): void => {
                                                                    setFieldValue(fieldName, newValue);
                                                                }}
                                                                options={[]}
                                                                renderInput={(params) => (
                                                                    <MUITextField
                                                                        {...params}
                                                                        helperText={errors[fieldName]}
                                                                        label={'Kurs kimlər üçündür'}
                                                                        variant="outlined"
                                                                        onBlur={() =>
                                                                            setFieldTouched(
                                                                                'availableProficiencies',
                                                                                true,
                                                                            )
                                                                        }
                                                                        error={
                                                                            touched.availableProficiencies &&
                                                                            !!errors.availableProficiencies
                                                                        }
                                                                    />
                                                                )}
                                                            />
                                                        )}
                                                    </Field>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12}>
                                                            <Typography>Kursun proqramı:</Typography>
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <FieldArray name="syllabus">
                                                                {({ remove, push }) => {
                                                                    return (
                                                                        <Grid container spacing={2}>
                                                                            {values.syllabus.map((_cp, idx) => (
                                                                                <Grid item xs={12} key={idx}>
                                                                                    <Paper style={{ padding: 24 }}>
                                                                                        <Grid container spacing={2}>
                                                                                            <Grid item xs={12}>
                                                                                                <Box
                                                                                                    display="flex"
                                                                                                    justifyContent="space-between"
                                                                                                    alignItems="center"
                                                                                                >
                                                                                                    <Typography>
                                                                                                        program{' '}
                                                                                                        {idx + 1}
                                                                                                    </Typography>
                                                                                                    <IconButton
                                                                                                        onClick={() =>
                                                                                                            remove(idx)
                                                                                                        }
                                                                                                    >
                                                                                                        <CloseIcon />
                                                                                                    </IconButton>
                                                                                                </Box>
                                                                                            </Grid>
                                                                                            <Grid item xs={12}>
                                                                                                <Field
                                                                                                    name={`syllabus[${idx}].title`}
                                                                                                    variant="outlined"
                                                                                                    component={
                                                                                                        TextField
                                                                                                    }
                                                                                                    label="Başlıq"
                                                                                                    fullWidth
                                                                                                />
                                                                                            </Grid>
                                                                                            <Grid item xs={12}>
                                                                                                <Field
                                                                                                    name={`syllabus[${idx}].body`}
                                                                                                    variant="outlined"
                                                                                                    multiline
                                                                                                    rows={3}
                                                                                                    component={
                                                                                                        TextField
                                                                                                    }
                                                                                                    label="Açıqlama mətni"
                                                                                                    fullWidth
                                                                                                />
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </Paper>
                                                                                </Grid>
                                                                            ))}
                                                                            <Grid item xs={12}>
                                                                                <Button
                                                                                    onClick={() =>
                                                                                        push({ title: '', body: '' })
                                                                                    }
                                                                                >
                                                                                    + Yeni başlıq
                                                                                </Button>
                                                                            </Grid>
                                                                        </Grid>
                                                                    );
                                                                }}
                                                            </FieldArray>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field
                                                        name="description"
                                                        component={TextField}
                                                        label="Qeyd"
                                                        fullWidth
                                                        multiline
                                                        rows={4}
                                                    />
                                                </Grid>
                                            </Grid>{' '}
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>
                                                    <Dropzone
                                                        accept={[
                                                            'image/*',
                                                            'application/pdf',
                                                            '.doc',
                                                            '.docx',
                                                            '.xls',
                                                            '.xlsx',
                                                            '.csv',
                                                            '.tsv',
                                                            '.ppt',
                                                            '.pptx',
                                                            '.pages',
                                                            '.odt',
                                                            '.rtf',
                                                        ]}
                                                        multiple={false}
                                                        onDrop={(acceptedFiles): void => {
                                                            if (acceptedFiles) {
                                                                setFieldValue('courseImage', acceptedFiles[0]);
                                                            }
                                                        }}
                                                    >
                                                        {({ getRootProps, getInputProps }): React.ReactElement => (
                                                            <section style={{ padding: 8, flex: 1 }}>
                                                                <div
                                                                    className={clsx('uploadForm', 'dragging')}
                                                                    {...getRootProps()}
                                                                >
                                                                    <input {...getInputProps()} />
                                                                    <div>
                                                                        {values.courseImage ? (
                                                                            <img
                                                                                style={{ maxWidth: '100%' }}
                                                                                src={
                                                                                    typeof values.courseImage ===
                                                                                        'string'
                                                                                        ? values.courseImage
                                                                                        : URL.createObjectURL(
                                                                                            values.courseImage,
                                                                                        )
                                                                                }
                                                                                alt={values.courseImage}
                                                                            />
                                                                        ) : (
                                                                            <Box
                                                                                sx={{
                                                                                    alignItems: 'center',
                                                                                    display: 'flex',
                                                                                    flexDirection: 'column',
                                                                                    gap: 2,
                                                                                }}
                                                                            >
                                                                                <UploadIcon />
                                                                                <Typography
                                                                                    sx={{
                                                                                        fontSize: 14,
                                                                                        textAlign: 'center',
                                                                                    }}
                                                                                >
                                                                                    <span
                                                                                        style={{
                                                                                            fontSize: 14,
                                                                                            color: 'blue',
                                                                                        }}
                                                                                    >
                                                                                        Profil şəklini
                                                                                    </span>{' '}
                                                                                    yükləyin və ya sürüşdürüb
                                                                                    yerləşdirin
                                                                                </Typography>
                                                                            </Box>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </section>
                                                        )}
                                                    </Dropzone>
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
