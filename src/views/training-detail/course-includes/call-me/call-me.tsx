import { Button, Dialog } from '@mui/material';
import { Form } from 'components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const CallMe: React.FC<{ courseId: string }> = ({ courseId }) => {
    const { t } = useTranslation();
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <Form courseId={courseId} closeDialog={() => setOpenDialog(false)} />
            </Dialog>
            <Button variant="outlined" fullWidth className="button" onClick={() => setOpenDialog(true)}>
                {t('training:callMe')}
            </Button>
        </>
    );
};
