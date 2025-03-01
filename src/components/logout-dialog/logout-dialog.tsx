import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, Dialog as MUIDialog, lighten, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Theme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/styles';

type LogoutDialogProps = {
    handleConfirm: () => void;
    handleClose: () => void;
    open: boolean;
};

export const LogoutDialog: React.FC<LogoutDialogProps> = ({ handleConfirm, handleClose, open }) => {
    const { t } = useTranslation();

    const Dialog = styled(MUIDialog)(({ theme }: { theme: Theme }) => ({
        '& .MuiPaper-root': {
            padding: '15px 10px',
        },
        '& .header': {
            display: 'flex',
            justifyContent: 'center',
            width: theme.spacing(6),
            height: theme.spacing(6),
            backgroundColor: lighten(theme.palette.warning.main, 0.9),
            alignItems: 'center',
            borderRadius: '8px',
            border: `1px solid ${theme.palette.warning.light}`,
        },
        '& .icon': {
            color: theme.palette.warning.light,
        },
        '& .content': {
            paddingBottom: theme.spacing(6.25),
        },
        '& .button-box': {
            display: 'flex',
            width: '100%',
            padding: theme.spacing(1),
            gap: theme.spacing(1),
        },
        '& .title': {
            paddingBottom: theme.spacing(4),
        },
    }));

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle className="title">
                    <Box className="header">
                        <ErrorOutlineIcon className="icon" />
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText className="content">
                        <Typography style={{ width: '75%' }} variant="h4">
                            {t('login:logoutContent')}
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <Box className="button-box">
                    <Button style={{ flexGrow: 1 }} onClick={handleClose} color="inherit">
                        {t('login:cancel')}
                    </Button>
                    <Button style={{ flexGrow: 1 }} variant="contained" color="secondary" onClick={handleConfirm}>
                        {t('login:logoutButton')}
                    </Button>
                </Box>
            </Dialog>
        </>
    );
};
