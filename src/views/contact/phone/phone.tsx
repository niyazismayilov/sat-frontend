import { Box, Typography, Container, Theme, Grid, alpha, IconButton, Button } from '@mui/material';
import { styled } from '@mui/styles';
import { useEffect, useState } from 'react';
import { PhoneLottie } from './phone-lottie';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { Formik, Form, Field } from 'formik';
// import { TextField } from 'formik-mui';
import { useCreateCallbackMutation } from 'graphql/generated';
import { useNotifications } from 'context/NotificationsContext';
import { useTranslation } from 'react-i18next';
// import { PhoneNumberField } from 'components';
import { TextField } from 'formik-mui';
// import { validationSchema } from './validationSchema';
const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    padding: theme.spacing(10, 0),
    color: theme.palette.primary.main,
    backgroundColor: '#F4F4F4',
    '& .MuiFormHelperText-root': {
        color: 'red',
    },
    '& .title': {
        fontSize: '76px',
        lineHeight: '96px',
    },
    '& .phone': {
        width: 295,
        height: 600,
        backgroundColor: '#fff',
        borderRadius: 44,
        border: `${theme.spacing(1)} solid #000`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        userSelect: 'none',
    },
    '& .camera-section': {
        width: 98,
        height: 20,
        backgroundColor: '#000',
        borderRadius: theme.spacing(0, 0, 2, 2),
    },

    '& .phoneNumber': {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(1),
        marginLeft: '11%',
        fontSize: 20,
        maxWidth: '17ch',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    '& .note': {
        color: '#3A82F7',
        fontSize: 14,
        fontWeight: 500,
        marginBottom: theme.spacing(6),
        textAlign: 'center',
    },
    '& .numbers-container': {
        padding: theme.spacing(0, 4),
    },
    '& .number-item': {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: '50%',
        backgroundColor: '#E5E5E5',
        width: 56,
        height: 56,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#CECECE',
        },
        '&:active': {
            boxShadow: `0px 4px 8px 4px ${alpha('#CECECE', 0.25)}`,
        },
        '& > .letters': {
            color: '#000',
            fontWeight: 700,
            fontSize: 9,
        },
        '& > .numbers': {
            color: '#000',
            fontWeight: 400,
            fontSize: 28,
            lineHeight: '26px',
        },
    },
    '& .delete-icon': {
        color: '#B8B8B8',
        width: 20,
        height: 20,
        cursor: 'pointer',
        '&:hover': {
            color: '#A8A8A8',
        },
    },
    '& .sound-section': {
        width: 120,
        height: 3.5,
        backgroundColor: '#000',
        marginTop: theme.spacing(5),
        borderRadius: 24,
        margin: 'auto',
    },
}));

export const Phone: React.FC = () => {
    const [value, setValue] = useState('');
    const { t } = useTranslation();
    const { notify } = useNotifications();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string>('');

    const [createCallback] = useCreateCallbackMutation({
        onCompleted() {
            notify({
                type: 'success',
                message: t('contact:messageSuccessfullySent'),
            });
        },
        onError(error) {
            notify({
                type: 'error',
                message: `${error}`,
            });
        },
    });

    const initialValues = {};

    useEffect(() => {
        setError(value.length === 9 ? '' : isSubmitted ? 'Nömrə düzgün yazılmayıb' : '');
    }, [value]);

    const onSubmit = (_, { setSubmitting }) => {
        setSubmitting(false);
        setIsSubmitted(true);
        if (value.length !== 9) {
            setError('Nömrə düzgün yazılmayıb');
            return;
        }
        setError('');
        createCallback({
            variables: {
                data: {
                    phoneNumber: '+994' + value,
                },
            },
        });
    };

    return (
        <Root>
            <Container>
                <Grid container display="flex" alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <Typography fontWeight={300} className="title">
                            Nömrənizi <br /> qeyd edin,
                        </Typography>
                        <Typography fontWeight={700} className="title" mb={6}>
                            Sizə zəng edək!
                        </Typography>
                        <Typography fontWeight={400} fontSize={20} mb={{ xs: 6 }}>
                            Rəqəmlərə “klik” edərək, nömrənizi daxil edin. Zəng düyməsini sıxaraq nömrənizi bizə
                            göndərin.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} display="flex" justifyContent="center">
                        <Box className="phone">
                            <Box className="camera-section" />
                            <Formik
                                initialValues={initialValues}
                                onSubmit={onSubmit}
                                // validationSchema={validationSchema}
                            >
                                {({ handleSubmit }) => {
                                    return (
                                        <Form onSubmit={handleSubmit}>
                                            <Field
                                                // component={PhoneNumberField}
                                                component={TextField}
                                                placeholder="+994 12 345 67 89"
                                                name="phoneNumber"
                                                value={'+994' + value}
                                                className="phoneNumber"
                                                helperText={error}
                                                InputProps={{
                                                    error: !!error,
                                                }}
                                                inputProps={{
                                                    maxLength: 9,
                                                }}
                                            />

                                            <Typography className="note">Nömrəni qeyd et</Typography>
                                            <Grid container className="numbers-container" spacing={2}>
                                                <Grid item xs={4}>
                                                    <Box
                                                        className="number-item"
                                                        onClick={() => setValue((val) => val + '1')}
                                                    >
                                                        <Typography className="numbers">1</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Box
                                                        className="number-item"
                                                        onClick={() => setValue((val) => val + '2')}
                                                    >
                                                        <Typography className="numbers">2</Typography>
                                                        <Typography className="letters">A B C</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Box
                                                        className="number-item"
                                                        onClick={() => setValue((val) => val + '3')}
                                                    >
                                                        <Typography className="numbers">3</Typography>
                                                        <Typography className="letters">D E F</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Box
                                                        className="number-item"
                                                        onClick={() => setValue((val) => val + '4')}
                                                    >
                                                        <Typography className="numbers">4</Typography>
                                                        <Typography className="letters">G H I</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Box
                                                        className="number-item"
                                                        onClick={() => setValue((val) => val + '5')}
                                                    >
                                                        <Typography className="numbers">5</Typography>
                                                        <Typography className="letters">J K L</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Box
                                                        className="number-item"
                                                        onClick={() => setValue((val) => val + '6')}
                                                    >
                                                        <Typography className="numbers">6</Typography>
                                                        <Typography className="letters">M N O</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Box
                                                        className="number-item"
                                                        onClick={() => setValue((val) => val + '7')}
                                                    >
                                                        <Typography className="numbers">7</Typography>
                                                        <Typography className="letters">P Q R S</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Box
                                                        className="number-item"
                                                        onClick={() => setValue((val) => val + '8')}
                                                    >
                                                        <Typography className="numbers">8</Typography>
                                                        <Typography className="letters">T U V</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Box
                                                        className="number-item"
                                                        onClick={() => setValue((val) => val + '9')}
                                                    >
                                                        <Typography className="numbers">9</Typography>
                                                        <Typography className="letters">W X Y Z</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Box
                                                        className="number-item"
                                                        onClick={() => setValue((val) => val + '*')}
                                                    >
                                                        <Typography className="numbers">*</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Box
                                                        className="number-item"
                                                        onClick={() => setValue((val) => val + '0')}
                                                    >
                                                        <Typography className="numbers">0</Typography>
                                                        <Typography className="letters">+</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Box
                                                        className="number-item"
                                                        onClick={() => setValue((val) => val + '#')}
                                                    >
                                                        <Typography className="numbers">#</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={4} />
                                                <Grid item xs={4} sx={{ cursor: 'pointer' }}>
                                                    <IconButton sx={{ padding: 0 }} type="submit">
                                                        <PhoneLottie />
                                                    </IconButton>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={4}
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                >
                                                    <IconButton>
                                                        <BackspaceIcon
                                                            className="delete-icon"
                                                            onClick={() =>
                                                                setValue((val) => val.slice(0, val.length - 1))
                                                            }
                                                        />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                            <Button type="submit">
                                                <Box className="sound-section" />
                                            </Button>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Root>
    );
};
