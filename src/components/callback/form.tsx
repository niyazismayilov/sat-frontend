import {
    Box,
    BoxProps,
    Button,
    IconButton,
    MenuItem,
    TextField as MuiTextField,
    Theme,
    Typography,
} from '@mui/material';
import { styled } from '@mui/styles';
import { PhoneNumberField } from 'components';
import { Field, Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useValidationFormSchema } from './validation-schema';
import CloseIcon from '@mui/icons-material/Close';
import { useAuthState } from 'context/auth/store';
import { useNotifications } from 'context/NotificationsContext';
import { TextField } from 'formik-mui';
import { Enum_Message_Type, useCoursesQuery, useCreateMessageMutation } from 'graphql/generated';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    border: '1px solid #F4F4F4',
    borderRadius: 8,
    padding: theme.spacing(3),
    color: '#5B5B5B',
    '& .form-wrapper': {
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: theme.spacing(3),

        '& .text': {
            fontSize: 28,
        },
        '& .MuiInputBase-input': {
            fontSize: '24px !important',
            color: '#5B5B5B',
        },
        '& .input-field': {
            margin: theme.spacing(0, 1),
            maxWidth: 250,
        },
        '& .MuiSelect-select': {
            paddingBottom: 0,
            '&:focus': {
                backgroundColor: 'transparent !important',
            },
        },
    },
    '& .submit-button': {
        padding: theme.spacing(1.5, 5),
        fontSize: 18,
        fontWeight: 700,
        marginBottom: theme.spacing(2),
    },
    '& .MuiOutlinedInput-root': {
        width: 400,
        marginRight: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            width: 200,
        },
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: '0px',
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderRadius: 0,
    },
    '& .courses-input': {
        '& .MuiOutlinedInput-notchedOutline': {
            borderBottom: '2px solid red',
        },
    },
    '& .close-icon': {
        position: 'absolute',
        right: theme.spacing(3),
    },
    '& .font-text': {
        '& css-1x51dt5-MuiInputBase-input-MuiInput-input': {
            fontSize: '28px',
        },
    },
}));

export const Form: React.FC<BoxProps & { courseId?: string; closeDialog?: () => void }> = ({
    courseId,
    closeDialog,
    ...props
}) => {
    const { t } = useTranslation();
    const { user } = useAuthState();

    const { notify } = useNotifications();

    const validationSchema = useValidationFormSchema(t);
    const { data } = useCoursesQuery();
    const courses = data?.courses?.data || [];

    const [createMessage] = useCreateMessageMutation({
        onCompleted() {
            closeDialog?.();
            notify({
                type: 'success',
                message: t('contact:messageSuccessfullySent'),
            });
        },
        onError(error) {
            notify({
                type: 'error',
                message: t(`error:${error.message}`),
            });
        },
    });

    const onSubmit = (formData, { setSubmitting }) => {
        setSubmitting(false);
        const { fullName, email, phoneNumber, coursesIds, message } = formData;

        const formInfo = {
            fullName,
            interestedCourses: coursesIds,
            type: Enum_Message_Type.Course,
            message,
        };

        const data =
            phoneNumber && email
                ? { ...formInfo, phoneNumber, email }
                : phoneNumber
                ? { ...formInfo, phoneNumber }
                : { ...formInfo, email };

        createMessage({
            variables: {
                data,
            },
        });
    };

    const fullName = user?.firstName && user?.lastName ? user?.firstName + ' ' + user?.lastName : '';

    const initialValues = {
        fullName,
        coursesIds: [],
        phoneNumber: user?.phoneNumber || '',
        email: user?.email || '',
        message: '',
    };

    return (
        <Root {...props}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ handleSubmit, values, setFieldValue, errors, isValid }) => {
                    return (
                        <>
                            <form onSubmit={handleSubmit}>
                                <Box className="form-wrapper">
                                    {closeDialog && (
                                        <IconButton size="small" onClick={() => closeDialog?.()} className="close-icon">
                                            <CloseIcon />
                                        </IconButton>
                                    )}
                                    <Typography
                                        sx={{ width: '100%', fontWeight: 500, marginBottom: 1 }}
                                        className="text"
                                    >
                                        Salam!
                                    </Typography>
                                    <Typography className="text">Mən </Typography>
                                    <Field
                                        component={TextField}
                                        name="fullName"
                                        variant="standard"
                                        fontSize={30}
                                        className="input-field"
                                        placeholder="Adınız, Soyadınız"
                                    />
                                    <Typography className="text">və mən </Typography>
                                    <MuiTextField
                                        name="coursesIds"
                                        select
                                        SelectProps={{
                                            multiple: true,
                                            value: values.coursesIds,
                                            onChange: (event) => {
                                                setFieldValue('coursesIds', event.target.value);
                                            },
                                        }}
                                        className={errors.coursesIds && 'courses-input'}
                                    >
                                        {courses.map((course) => {
                                            return (
                                                <MenuItem value={course.id?.toString()} key={course.id}>
                                                    {course.attributes?.name}
                                                </MenuItem>
                                            );
                                        })}
                                    </MuiTextField>
                                    <Typography className="text"> ilə</Typography>
                                    <Typography className="text"> maraqlanıram.</Typography>
                                    <Field
                                        name="phoneNumber"
                                        component={PhoneNumberField}
                                        variant="standard"
                                        className="input-field"
                                        placeholder="555555555"
                                        sx={{ width: 200, marginLeft: 28 }}
                                    />
                                    <Typography className="text"> mobil nömrə və ya</Typography>
                                    <Field
                                        component={TextField}
                                        name="email"
                                        variant="standard"
                                        className="input-field"
                                        placeholder="example@gmail.com"
                                    />
                                    <Typography className="text"> adresindən əlaqə saxlaya bilərsiniz!</Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                        <Typography sx={{ fontSize: 28 }}>Qeydlərim:</Typography>
                                        <Field
                                            name="message"
                                            component={TextField}
                                            variant="standard"
                                            className="input-field"
                                            autoComplete="off"
                                            // sx={{ width: 50, marginLeft: 3 }}
                                        />
                                    </Box>
                                </Box>

                                <Button variant="contained" type="submit" className="submit-button" disabled={!isValid}>
                                    {t('home:send')}
                                </Button>
                            </form>
                        </>
                    );
                }}
            </Formik>
        </Root>
    );
};
