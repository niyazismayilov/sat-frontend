/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, useContext, createContext, ReactNode } from 'react';
import { Snackbar } from 'components/snackbar';
import { SnackbarType } from 'components/snackbar/snackbar';
// import { useTranslation } from 'react-i18next';
import { ConfirmDialog } from 'components';
import { ConfirmDialogType } from 'components/confirm-dialog/confirm-dialog';
import { SnackbarCloseReason } from '@mui/material';

type notifyType = {
    duration?: number | null;
    message: string;
    type: SnackbarType;
};

type ConfirmType = {
    open: boolean;
    confirmText?: string;
    description?: string;
    onConfirm: any;
    type?: ConfirmDialogType;
};

type NotificationsContextProps = {
    notify: ({ duration, message, type }: notifyType) => void;
    confirm: ({ confirmText, description, onConfirm, type }: Omit<ConfirmType, 'open'>) => void;
    close: () => void;
};

const NotificationsContext = createContext<NotificationsContextProps>({
    notify: () => {},
    close: () => {},
    confirm: () => {},
});
export const useNotifications = (): NotificationsContextProps =>
    useContext<NotificationsContextProps>(NotificationsContext);

const DEFAULT_SNACK_STATE = {
    open: false,
    autoHideDuration: 6000,
    message: '',
    type: 'success' as SnackbarType,
};

export const NotificationsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // const { t } = useTranslation();

    const DEFAULT_CONFIRM_STATE: ConfirmType = {
        type: 'error',
        open: false,
        confirmText: 'Razısınız?',
        onConfirm: (): void => {},
    };
    const [snack, setSnackState] = useState(DEFAULT_SNACK_STATE);
    const [confirmProp, setConfirmProps] = useState<ConfirmType>(DEFAULT_CONFIRM_STATE);

    const notify = ({ duration, message, type }: notifyType): void => {
        const newState = {
            open: true,
            autoHideDuration: duration || 6000,
            type: type || 'info',
            message,
        };
        setSnackState(newState);
    };

    const close = (): void => setSnackState((prev) => ({ ...prev, open: false }));

    const onClose = (_?: any, reason?: SnackbarCloseReason): void => {
        if (reason === 'clickaway') {
            return;
        }
        close();
    };

    const confirm = ({ confirmText, description, type, onConfirm }: Omit<ConfirmType, 'open'>): void => {
        const newState = {
            open: true,
            confirmText: confirmText || DEFAULT_CONFIRM_STATE.confirmText,
            description: description || DEFAULT_CONFIRM_STATE.description,
            type: type,
            onConfirm: (): void => {
                setConfirmProps(DEFAULT_CONFIRM_STATE);
                onConfirm();
            },
        };
        setConfirmProps(newState);
    };

    const onDialogClose = (type, description): void => {
        setConfirmProps({ ...DEFAULT_CONFIRM_STATE, type, description });
    };

    return (
        <NotificationsContext.Provider value={{ notify, confirm, close }}>
            {children}
            <ConfirmDialog {...confirmProp} onClose={onDialogClose} />
            <Snackbar {...snack} onClose={onClose} />
        </NotificationsContext.Provider>
    );
};
