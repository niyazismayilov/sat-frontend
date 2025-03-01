import {
    Box,
    Button,
    Card,
    Container,
    Grid,
    InputAdornment,
    MenuItem,
    Typography,
    TextField as MUITextField,
    Autocomplete,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/styles';
import { RichTextEditor } from 'components/formik/rich-text-editor';
import { ManagerPageHeader } from 'components/manager-page-header';
import { Field, Form, Formik, FieldProps } from 'formik';
import { TextField } from 'formik-mui';
import browserHistory from 'utils/browser-utils';
import Dropzone from 'react-dropzone';
import { ReactComponent as UploadIcon } from 'assets/icons/manager-dashboard/upload-icon.svg';
import clsx from 'clsx';
import { ReactComponent as VideoLinkIcon } from 'assets/icons/manager-dashboard/video-link.svg';
import { Spinner } from 'components';
import { useState } from 'react';
import { useVideoByAdminQuery, useUpdateVideoMutation, Enum_Video_Status } from 'graphql/generated';
import { useParams } from 'react-router-dom';
import { useNotifications } from 'context/NotificationsContext';
import { API_URL } from 'config';
import { api } from 'api';
import { useTranslation } from 'react-i18next';
import { validationSchema } from './validationSchema';
import slugify from 'slugify';

const Root = styled(Container)(({ theme }: { theme: Theme }) => ({
    '& .card': {
        padding: theme.spacing(4, 8),
        borderRadius: theme.spacing(3),
    },
    '& .buttons': {
        textAlign: 'end',
        marginTop: '25px',
    },

    '& .file-input': {
        '& .MuiOutlinedInput-input': {
            display: 'flex',
            flex: 1,
        },
        '& .inputButton': {
            whiteSpace: 'nowrap',
            backgroundColor: '#DEE0FD',
            color: '#3B43F2',
            display: 'flex',
            justifyContent: 'space-around',
            borderRadius: '15px',
            padding: '6px 16px',
            [theme.breakpoints.down('sm')]: {
                borderRadius: '16px',
                padding: '5px 32px',
            },
        },
    },
    '& .blog_title': {
        marginBottom: '20px',
        color: '#6B7280',
    },
    '& .title_text': {
        fontSize: '18px',
        fontWeight: '700',
        color: '#6B7280',
    },
}));

export const EditVideo: React.FC = () => {
    const { notify } = useNotifications();
    slugify.extend({ Ə: 'E', ə: 'e' });
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const [restLoading, setRestLoading] = useState<boolean>(false);

    const { data, loading } = useVideoByAdminQuery({
        fetchPolicy: 'network-only',
        variables: {
            videoId: id,
        },
    });

    const video = data?.video?.data?.attributes;

    const initialValues = {
        body: video?.body || '',
        category: video?.category || '',
        coverImage: video?.coverImage?.data?.attributes?.url,
        slug: video?.slug || '',
        status: video?.status || '',
        title: video?.title || '',
        videoId: video?.videoId || '',
    };

    const [updateVideo] = useUpdateVideoMutation({
        onCompleted() {
            notify({
                type: 'success',
                message: 'Video redaktə edildi',
            });
            browserHistory.push('/d/helpful/video');
        },
        onError(error) {
            notify({
                type: 'error',
                message: t(`error:${error.message}`),
            });
        },
    });

    const generateUID = () => {
        let firstPart: any = (Math.random() * 46656) | 0;
        let secondPart: any = (Math.random() * 46656) | 0;
        firstPart = ('000' + firstPart.toString(36)).slice(-3);
        secondPart = ('000' + secondPart.toString(36)).slice(-3);
        return firstPart + secondPart;
    };

    const onSubmit = async (video: any) => {
        let profileData: any = null;

        const axios = await api();
        if (typeof video.coverImage !== 'string' && video.coverImage) {
            setRestLoading(true);
            const formBody = new FormData();
            formBody.append('files', video.coverImage);
            const res = await axios.post(`${API_URL}/api/upload`, formBody, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            profileData = res.data;
            setRestLoading(false);
        }

        updateVideo({
            variables: {
                data: {
                    ...video,
                    coverImage: profileData ? profileData[0].id : data?.video?.data?.attributes?.coverImage?.data?.id,
                    slug: slugify(video.title) + '-' + generateUID(),
                },
                updateVideoId: id,
            },
        });
    };

    if (loading || restLoading) {
        return <Spinner />;
    }

    return (
        <Root>
            <ManagerPageHeader title={'Video redaktə et'} />
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ handleSubmit, values, setFieldValue, touched, setFieldTouched }): React.ReactNode => {
                    return (
                        <Card className="card">
                            <Form onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6} className="title">
                                        <Field
                                            name="title"
                                            component={TextField}
                                            label={'Video başlığı'}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            name="status"
                                            component={TextField}
                                            select
                                            autoComplete="off"
                                            label="Status"
                                            variant="outlined"
                                            fullWidth
                                        >
                                            <MenuItem value={Enum_Video_Status.Active}>Aktiv</MenuItem>
                                            <MenuItem value={Enum_Video_Status.Inactive}>Deaktiv</MenuItem>
                                        </Field>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Field name="category">
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
                                                            label={'* Teq əlavə et'}
                                                            variant="outlined"
                                                            onBlur={() => setFieldTouched('category', true)}
                                                            error={touched.category && !!errors.category}
                                                        />
                                                    )}
                                                />
                                            )}
                                        </Field>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
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
                                    <Grid item xs={12} className="image_card">
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
                                                    setFieldValue('coverImage', acceptedFiles[0]);
                                                }
                                            }}
                                        >
                                            {({ getRootProps, getInputProps }): React.ReactElement => (
                                                <section style={{ padding: 8, flex: 1 }}>
                                                    <div
                                                        className={clsx('uploadFormCompany', 'dragging')}
                                                        {...getRootProps()}
                                                    >
                                                        <input {...getInputProps()} />
                                                        <div>
                                                            {values.coverImage ? (
                                                                <img
                                                                    style={{ maxWidth: '100%' }}
                                                                    src={
                                                                        typeof values.coverImage === 'string'
                                                                            ? values.coverImage
                                                                            : URL.createObjectURL(values.coverImage)
                                                                    }
                                                                    alt={values.coverImage}
                                                                />
                                                            ) : (
                                                                <Box
                                                                    sx={{
                                                                        alignItems: 'center',
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        gap: 2,
                                                                        border: '1px solid #E7EAE7',
                                                                        borderRadius: '10px',
                                                                        padding: '50px',
                                                                        backgroundColor: '#F9FAFB',
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
                                                                            Video şəklini{' '}
                                                                        </span>
                                                                        yükləyin və ya <br /> sürüşdürüb yerləşdirin
                                                                    </Typography>
                                                                </Box>
                                                            )}
                                                        </div>
                                                    </div>
                                                </section>
                                            )}
                                        </Dropzone>
                                    </Grid>
                                    <Grid item xs={12} className="blog_title">
                                        <Typography className="title_text">Video Mətni</Typography>
                                    </Grid>

                                    <Grid xs={12} paddingLeft={3}>
                                        <Field
                                            variant="outlined"
                                            component={RichTextEditor}
                                            name="body"
                                            noBorderTop={true}
                                        />
                                    </Grid>
                                </Grid>

                                <Box className="buttons">
                                    <Button variant="outlined" onClick={() => browserHistory.goBack()} sx={{ ml: 2 }}>
                                        Ləğv et
                                    </Button>
                                    <Button variant="contained" type="submit" sx={{ ml: 2 }}>
                                        Yadda saxla
                                    </Button>
                                </Box>
                            </Form>
                        </Card>
                    );
                }}
            </Formik>
        </Root>
    );
};
