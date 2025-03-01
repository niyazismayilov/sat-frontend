import { Box, Button, Card, Container, Grid, InputAdornment, MenuItem, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/styles';
import { ManagerPageHeader } from 'components/manager-page-header';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import browserHistory from 'utils/browser-utils';
import { ReactComponent as VideoLinkIcon } from 'assets/icons/manager-dashboard/video-link.svg';
import Dropzone from 'react-dropzone';
import { ReactComponent as UploadIcon } from 'assets/icons/manager-dashboard/upload-icon.svg';
import clsx from 'clsx';
import { Spinner } from 'components';
import { useState } from 'react';
import { Enum_Broadcast_Status, useCreateBroadcastMutation, useBroadcastSeriesQuery } from 'graphql/generated';
import { API_URL } from 'config';
import { useNotifications } from 'context/NotificationsContext';
import { validationSchema } from './validationSchema';
import { api } from 'api';
import slugify from 'slugify';

const Root = styled(Container)(({ theme }: { theme: Theme }) => ({
    '& .card': {
        padding: theme.spacing(4, 8),
        borderRadius: theme.spacing(3),
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

export const CreateEpisode: React.FC = () => {
    const { notify } = useNotifications();
    const [restLoading, setRestLoading] = useState<boolean>(false);
    slugify.extend({ Ə: 'E', ə: 'e' });

    const initialValues = {
        title: '',
        broadcast_sery: '',
        coverImage: undefined,
        videoId: '',
        status: Enum_Broadcast_Status.Active,
        slug: '',
    };
    const [createBroadcast, { loading }] = useCreateBroadcastMutation({
        onCompleted() {
            notify({
                type: 'success',
                message: 'Epizod uğurla yaradıldı',
            });
            browserHistory.push('/d/helpful/episodes');
        },
        onError(error) {
            notify({
                type: 'error',
                message: error.message,
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

    const { data } = useBroadcastSeriesQuery({ fetchPolicy: 'network-only' });

    const broadcastSeries = data?.broadcastSeries?.data.map((broadcastSerie) => broadcastSerie);

    const onSubmit = async (formData) => {
        const axios = await api();

        const { coverImage, ...others } = formData;

        let coverImageData: any = null;

        if (coverImage) {
            setRestLoading(true);
            const formBody = new FormData();
            formBody.append('files', coverImage);
            const res = await axios.post(`${API_URL}/api/upload`, formBody, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            coverImageData = res.data;
            setRestLoading(false);
        }

        createBroadcast({
            variables: {
                data: {
                    ...others,
                    coverImage: coverImageData ? coverImageData[0].id : coverImageData,
                    slug: slugify(formData.title) + '-' + generateUID(),
                },
            },
        });
    };

    if (loading || restLoading) {
        return <Spinner />;
    }
    return (
        <Root>
            <ManagerPageHeader title={'Yeni Epizod'} />
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ handleSubmit, values, setFieldValue }): React.ReactNode => {
                    return (
                        <Card className="card">
                            <Form onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            name="title"
                                            component={TextField}
                                            label={'* Epizodun adı'}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            name="broadcast_sery"
                                            component={TextField}
                                            label={'* Veriliş seçin'}
                                            variant="outlined"
                                            fullWidth
                                            select
                                        >
                                            {broadcastSeries?.map((broadcastSerie) => (
                                                <MenuItem
                                                    key={broadcastSerie.id as string}
                                                    value={broadcastSerie.id as string}
                                                >
                                                    {broadcastSerie.attributes?.title}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            name="videoId"
                                            component={TextField}
                                            label={'* Epizodun  linkini əlavə et'}
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
                                            <MenuItem value={Enum_Broadcast_Status.Active}>Aktiv</MenuItem>
                                            <MenuItem value={Enum_Broadcast_Status.Inactive}>Deaktiv</MenuItem>
                                        </Field>
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
                                                                    src={URL.createObjectURL(values.coverImage)}
                                                                    alt={(values.coverImage as File).name}
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
                                                                        padding: '70px',
                                                                        backgroundColor: '#F9FAFB',
                                                                        cursor: 'pointer',
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
                                                                            Epizod şəklini{' '}
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
                                </Grid>
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
                            </Form>
                        </Card>
                    );
                }}
            </Formik>
        </Root>
    );
};
