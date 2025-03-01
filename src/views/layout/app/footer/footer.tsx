// import { useState } from 'react';
import { Box, Button, Container, Divider, Grid, Theme, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { ReactComponent as SendIcon } from 'assets/common-icons/send.svg';
import { Link, SocialIcons } from 'components';
import { logo } from 'config';
import { useNotifications } from 'context/NotificationsContext';
import { useAuthState } from 'context/auth/store';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { useCreateSubscriberMutation } from 'graphql/generated';
import { useTranslation } from 'react-i18next';
const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    backgroundColor: '#F4F4F4',
    padding: theme.spacing(8, 0),
    '&  p': {
        color: '#9CA3AF',
    },
    '& .logo': {
        marginBottom: theme.spacing(6),
        width: 130,
    },
    '& .subscribe-input': {
        width: '100%',
    },
    '& .subscribe-button': {
        width: 200,
        padding: theme.spacing(2, 1.75),
    },
    '& .MuiOutlinedInput-root': {
        paddingRight: 0,
        color: '#9CA3AF',
        borderRadius: 5,
        backgroundColor: '#FAFAFA',
    },
    '& .footer-list-header': {
        color: '#6B7280',
        fontWeight: 600,
        marginBottom: theme.spacing(2),
    },
    '& .footer-list-item': {
        fontWeight: 500,
        marginBottom: theme.spacing(1),
        '&:hover': {
            color: '#6B7280',
        },
    },
    '& .facebook-icon': {
        backgroundColor: '#1877F2',
        '&:hover': {
            backgroundColor: '#1877F2',
        },
    },
    '& .twitter-icon': {
        backgroundColor: '#1DA1F2',
        '&:hover': {
            backgroundColor: '#1DA1F2',
        },
    },
    '& .instagram-icon': {
        backgroundColor: '#F00073',
        '&:hover': {
            backgroundColor: '#F00073',
        },
    },
    '& .linkedin-icon': {
        backgroundColor: '#2867B2',
        '&:hover': {
            backgroundColor: '#2867B2',
        },
    },
    '& .footer-bottom': {
        display: 'flex',
        justifyContent: 'space-between',
    },
    '& .icons': {
        display: 'flex',
        gap: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            gap: theme.spacing(0.5),
        },
    },
}));

export const Footer: React.FC = () => {
    // const [value, setValue] = useState();
    const { t } = useTranslation();
    const { notify } = useNotifications();

    const { user } = useAuthState();
    const [createSubscriber] = useCreateSubscriberMutation({
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

    const onSubmit = (formData, { setSubmitting }) => {
        setSubmitting(false);
        createSubscriber({
            variables: {
                data: {
                    email: formData.email,
                },
            },
        });
    };

    const initialValues = {
        email: user?.email || '',
    };

    return (
        <Root>
            <Container>
                <Grid container spacing={6} mb={6}>
                    <Grid item xs={12} sm={5}>
                        <img src={logo} className="logo" />
                        <Typography color="#9CA3AF" mb={3}>
                            Yeniliklərdən xəbərdar olmaq üçün abunə olun.
                        </Typography>
                        <Formik initialValues={initialValues} onSubmit={onSubmit}>
                            {({ handleSubmit }) => {
                                return (
                                    <Form onSubmit={handleSubmit}>
                                        <Field
                                            className="subscribe-input"
                                            component={TextField}
                                            placeholder="Email"
                                            name="email"
                                            InputProps={{
                                                endAdornment: (
                                                    <Button
                                                        variant="contained"
                                                        endIcon={<SendIcon />}
                                                        className="subscribe-button"
                                                        type="submit"
                                                    >
                                                        {t('footer:subscribe')}
                                                    </Button>
                                                ),
                                            }}
                                        />
                                    </Form>
                                );
                            }}
                        </Formik>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <Typography className="footer-list-header">{t('footer:menu')}</Typography>
                                <Link to="/">
                                    <Typography className="footer-list-item">{t('footer:homePage')}</Typography>
                                </Link>
                                <Link to="/niye-biz">
                                    <Typography className="footer-list-item">{t('footer:whyUs')}</Typography>
                                </Link>
                                <Link to="/telimciler">
                                    <Typography className="footer-list-item">{t('footer:trainers')}</Typography>
                                </Link>
                                <Link to="/partnyorlar">
                                    <Typography className="footer-list-item">{t('footer:partners')}</Typography>
                                </Link>
                                <Link to="/elaqe">
                                    <Typography className="footer-list-item">{t('footer:contact')}</Typography>
                                </Link>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography className="footer-list-header">{t('footer:events')}</Typography>
                                <Link to="/tedbirler/sat-forum">
                                    <Typography className="footer-list-item">{t('footer:SATForum')}</Typography>
                                </Link>
                                <Link to="/tedbirler/biznes-idareciliyi-forumu">
                                    <Typography className="footer-list-item">
                                        {t('footer:businessAdministrationForum')}
                                    </Typography>
                                </Link>
                                <Link to="/tedbirler/stratejik-hr-forumu">
                                    <Typography className="footer-list-item">{t('footer:strategicHRForum')}</Typography>
                                </Link>
                                <Link to="/layiheler/sirketler-liqasi">
                                    <Typography className="footer-list-item">
                                        {t('footer:leagueOfCompanies')}
                                    </Typography>
                                </Link>
                                <Link to="/tedbirler/master-klass">
                                    <Typography className="footer-list-item">{t('footer:masterClass')}</Typography>
                                </Link>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography className="footer-list-header">{t('footer:helpful')}</Typography>
                                <Link to="/bloq">
                                    <Typography className="footer-list-item">{t('footer:blog')}</Typography>
                                </Link>
                                <Link to="/video">
                                    <Typography className="footer-list-item">{t('footer:videos')}</Typography>
                                </Link>
                                <Link to="/verilis-seriyalari">
                                    <Typography className="footer-list-item">{t('footer:broadcast')}</Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider sx={{ mb: 5 }} />
                <Box className="footer-bottom">
                    <Typography>
                        © 2022 All rights reserved Powered by{' '}
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://morpho.az/"
                            style={{ textDecoration: 'none', color: '#044AB1', fontWeight: 400 }}
                        >
                            Morpho.az
                        </a>
                    </Typography>
                    <Box className="icons">
                        <SocialIcons />
                    </Box>
                </Box>
            </Container>
        </Root>
    );
};
