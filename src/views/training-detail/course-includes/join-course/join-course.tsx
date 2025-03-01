import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { GroupRelationResponseCollection } from 'graphql/generated';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    groupId: Yup.string().required('Required'),
});

export const JoinCourse: React.FC<{ groups: GroupRelationResponseCollection | null | undefined }> = ({ groups }) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [openDialog, setOpenDialog] = useState(false);
    const groupsData = groups?.data;

    const joinCourse = () => {
        //
    };

    if (!groupsData) {
        return null;
    }

    return (
        <>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullScreen={isMobile}>
                <DialogTitle mb={3}>
                    <Typography fontWeight={500} fontSize={18} mb={1}>
                        {t('training:joinCourse')}
                    </Typography>
                    <Typography color="#6B7280">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{ groupId: '' }}
                        onSubmit={() => {
                            //
                        }}
                        validationSchema={validationSchema}
                    >
                        {({ isValid }) => (
                            <Form>
                                <Field
                                    name="groupId"
                                    component={TextField}
                                    select
                                    fullWidth
                                    label={t('training:selectGroup')}
                                    style={{ marginBottom: 32 }}
                                >
                                    {groupsData.map((group) => (
                                        <MenuItem
                                            key={group.id}
                                            value={group.id?.toString()}
                                            disabled={!group.attributes?.isActive}
                                        >
                                            {group.attributes?.name}
                                        </MenuItem>
                                    ))}
                                </Field>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', gap: 1 }}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => setOpenDialog(false)}
                                        sx={{ padding: '8px 28px' }}
                                    >
                                        {t('common:cancel')}
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={joinCourse}
                                        type="submit"
                                        disabled={!isValid}
                                        sx={{ padding: '8px 28px' }}
                                    >
                                        {t('common:submit')}
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
            <Button variant="contained" fullWidth onClick={() => setOpenDialog(true)}>
                {t('training:joinCourse')}
            </Button>
        </>
    );
};
