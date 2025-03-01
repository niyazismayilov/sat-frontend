import { Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/styles';
import { api } from 'api/index';
import { ReactComponent as UploadIcon } from 'assets/icons/manager-dashboard/upload-icon.svg';
import clsx from 'clsx';
import { Spinner } from 'components';
import { RichTextEditor } from 'components/formik/rich-text-editor';
import { ManagerPageHeader } from 'components/manager-page-header';
import { API_URL } from 'config';
import { useNotifications } from 'context/NotificationsContext';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { useSliderShowQuery, useUpdateSliderShowMutation } from 'graphql/generated';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { useParams } from 'react-router';
import browserHistory from 'utils/browser-utils';
// import { validationSchema } from './validationSchema';

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
    '& .slider-title': {
        marginBottom: '20px',
        color: '#6B7280',
    },
    '& .title_text': {
        fontSize: '18px',
        fontWeight: '700',
        color: '#6B7280',
    },
}));

export const EditSliderShowPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { notify } = useNotifications();
    const [restLoading, setRestLoading] = useState<boolean>(false);

    const { data, loading } = useSliderShowQuery({
        fetchPolicy: 'network-only',
        variables: {
            sliderShowId: id,
        },
    });

    const sliderData = data?.sliderShow?.data?.attributes;

    const initialValues = {
        content: sliderData?.content || '',
        coverImage: sliderData?.coverImage?.data?.attributes?.url,
        title: sliderData?.title || '',
    };

    const [updateSlider] = useUpdateSliderShowMutation({
        onCompleted() {
            notify({
                type: 'success',
                message: 'Slayd redaktə edildi',
            });
            browserHistory.push('/d/helpful/sliders');
        },
        onError(error) {
            notify({
                type: 'error',
                message: error.message,
            });
        },
    });

    const onSubmit = async (blog: any) => {
        let profileData: any = null;

        const axios = await api();
        if (typeof blog.coverImage !== 'string' && blog.coverImage) {
            setRestLoading(true);
            const formBody = new FormData();
            formBody.append('files', blog.coverImage);
            const res = await axios.post(`${API_URL}/api/upload`, formBody, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            profileData = res.data;
            setRestLoading(false);
        }

        updateSlider({
            variables: {
                data: {
                    ...blog,
                    coverImage: profileData
                        ? profileData[0].id
                        : data?.sliderShow?.data?.attributes?.coverImage?.data?.id,
                },
                updateSliderShowId: id,
            },
        });
    };

    if (loading || restLoading) {
        return <Spinner />;
    }

    return (
        <Root>
            <ManagerPageHeader title={'Bloqu redaktə et'} />
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({ handleSubmit, values, setFieldValue }): React.ReactNode => {
                    return (
                        <Card className="card">
                            <Form onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} className="slider-title">
                                        <Typography className="title_text">Slayd başlığı</Typography>
                                    </Grid>

                                    <Grid xs={12} paddingLeft={3}>
                                        <Field
                                            variant="outlined"
                                            component={RichTextEditor}
                                            name="title"
                                            noBorderTop={true}
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
                                                                            Bloq şəklini{' '}
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

                                    <Grid item xs={12} className="title">
                                        <Field
                                            name="content"
                                            component={TextField}
                                            label="Slayd Məzmunu"
                                            variant="outlined"
                                            fullWidth
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
