import { Dialog as MUIDialog, DialogContent, DialogTitle, useMediaQuery, useTheme, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useAuth } from 'context/auth/store';
import SignInForm from 'components/form/auth/sign-in-form';
import { SignUpForm } from 'components/form/auth/sign-up-form';
import { useTranslation } from 'react-i18next';
import { ForgotPassword } from 'views/auth/forgot-password';

const Dialog = styled(MUIDialog)(({ theme }) => ({
    '& .MuiPaper-root': {
        width: 500,
    },
    '& .MuiDialogTitle-root': {
        padding: 0,
        marginBottom: theme.spacing(4),
    },

    '& .auth-buttons': {
        display: 'flex',
    },

    '& .login-button': {
        width: '100%',
        borderRadius: '10px 0 0 0',
        border: '1px solid #E5E7EB',
    },
    '& .register-button': {
        width: '100%',
        borderColor: '#E5E7EB',
        borderWidth: '1px 1px 1px 0px',
        borderStyle: 'solid',
        borderRadius: '0 10px 0 0',
    },
}));

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
};

export const AuthDialog: React.FC = () => {
    const [{ authDialogOpen: signInDialogOpen, selectedTab }, dispatch] = useAuth();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { t } = useTranslation();

    return (
        <Dialog fullScreen={isMobile} open={signInDialogOpen} onClose={() => dispatch({ type: 'AUTH_DIALOG_CLOSED' })}>
            <DialogTitle sx={{ mb: 1 }}>
                <Box className="auth-buttons">
                    <Button
                        className="login-button"
                        onClick={() => {
                            dispatch({ type: 'SELECT_TAB', tab: 0 });
                        }}
                    >
                        {t('auth:login')}
                    </Button>
                    <Button
                        className="register-button"
                        onClick={() => {
                            dispatch({ type: 'SELECT_TAB', tab: 1 });
                        }}
                    >
                        {t('auth:register')}
                    </Button>
                </Box>
            </DialogTitle>
            <DialogContent>
                <TabPanel value={selectedTab} index={0}>
                    <SignInForm />
                </TabPanel>
                <TabPanel value={selectedTab} index={1}>
                    <SignUpForm />
                </TabPanel>
                <TabPanel value={selectedTab} index={2}>
                    <ForgotPassword />
                </TabPanel>
            </DialogContent>
        </Dialog>
    );
};
