import {
    Autocomplete,
    Box,
    Button,
    Card,
    Container,
    Grid,
    MenuItem,
    TextField as MUITextField,
    Typography,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/styles';
import { api } from 'api';
import { ReactComponent as UploadIcon } from 'assets/icons/manager-dashboard/upload-icon.svg';
import clsx from 'clsx';
import { Spinner } from 'components';
import { RichTextEditor } from 'components/formik/rich-text-editor';
import { ManagerPageHeader } from 'components/manager-page-header';
import { API_URL } from 'config';
import { useNotifications } from 'context/NotificationsContext';
import { Field, FieldProps, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { Enum_Blog_Status, useCreateBlogMutation } from 'graphql/generated';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import browserHistory from 'utils/browser-utils';
import { validationSchema } from './validationSchema';

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

export const CreateBlog: React.FC = () => {
    const { notify } = useNotifications();
    const [restLoading, setRestLoading] = useState<boolean>(false);

    const initialValues = {
        body: '',
        coverImage: null,
        category: [],
        status: Enum_Blog_Status.Active,
    };

    const [CreateBlog, { loading }] = useCreateBlogMutation({
        onCompleted() {
            notify({
                type: 'success',
                message: 'Bloq uğurla yaradıldı',
            });
            browserHistory.push('/d/helpful/blog');
        },
        onError(error) {
            notify({
                type: 'error',
                message: error.message,
            });
        },
    });

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

        CreateBlog({
            variables: {
                data: {
                    ...others,
                    coverImage: coverImageData ? coverImageData[0].id : coverImageData,
                },
            },
        });
    };
    if (loading || restLoading) {
        return <Spinner />;
    }

    return (
        <Root>
            <ManagerPageHeader title={'Bloq yarat'} />
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ handleSubmit, values, setFieldValue, touched, setFieldTouched }): React.ReactNode => {
                    return (
                        <Card className="card">
                            <Form onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} className="title">
                                        <Field
                                            name="title"
                                            component={TextField}
                                            label={'* Bloq başlığı'}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
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
                                    <Grid item xs={12}>
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
                                                        return <Box sx={{ color: 'text.disabled' }}>Status</Box>;
                                                    }
                                                    return value === Enum_Blog_Status.Active ? 'Aktiv' : 'Deaktiv';
                                                },
                                            }}
                                        >
                                            <MenuItem value={Enum_Blog_Status.Active}>Aktiv</MenuItem>
                                            <MenuItem value={Enum_Blog_Status.Inactive}>Deaktiv</MenuItem>
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
                                                                        padding: '50px',
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
                                    <Grid item xs={12} className="blog_title">
                                        <Typography className="title_text">* Bloq Mətni</Typography>
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
