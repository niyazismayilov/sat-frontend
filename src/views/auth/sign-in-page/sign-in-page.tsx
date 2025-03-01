import { Box, Container, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SignInForm from '../../../components/form/auth/sign-in-form';
import { useEmailConfirmationMutation } from 'graphql/generated';

const Root = styled(Container)(({ theme }: { theme: Theme }) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
    '& .paper': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    '& .subTitle': {
        textAlign: 'center',
        paddingTop: '16px',
        marginBottom: '48px',
    },
}));

export const SignInPage: React.FC = () => {
    const { t } = useTranslation();
    const { search } = useLocation();
    const token = search.replace('?token=', '');
    const [emailConfirm] = useEmailConfirmationMutation();

    useEffect(() => {
        if (token) {
            emailConfirm({ variables: { confirmation: token } });
        }
    }, []);

    return (
        <Root maxWidth="sm">
            <Box className="paper">
                <Typography variant="h2" className="title">
                    {t('auth:login')}
                </Typography>
                <Typography color="textSecondary" className="subTitle">
                    {t('auth:enterYourEmailandPasswordToLogIn')}
                </Typography>
            </Box>

            <SignInForm />
        </Root>
    );
};
