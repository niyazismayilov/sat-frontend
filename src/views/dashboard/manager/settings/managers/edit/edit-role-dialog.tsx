import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
    Box,
    Button,
    Dialog as MuiDialog,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    MenuItem,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/styles';
import { Spinner } from 'components';
import { useNotifications } from 'context/NotificationsContext';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import {
    useUpdateUsersPermissionsUserMutation,
    useUsersPermissionsRolesQuery,
    useUsersPermissionsUserQuery,
} from 'graphql/generated';
import browserHistory from 'utils/browser-utils';

type ManagerDialogProps = {
    managerDialogOpen: boolean;
    onClose: () => void;
    managerId: string;
};

const Dialog = styled(MuiDialog)(({ theme }: { theme: Theme }) => ({
    '& .dialog-title': {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    '& .MuiDialogTitle-root': {
        padding: theme.spacing(4),
    },

    '& .MuiDialogActions-root': {
        padding: theme.spacing(4, 9),
    },
    '& .customer-field .MuiOutlinedInput-root': {
        paddingBottom: 0,
    },

    '& .actions': {
        marginTop: theme.spacing(6),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& .MuiButton-root': {
            boxShadow: 'none',
            padding: '6px 42px',
        },
        '& .MuiButton-root:first-child': {
            marginRight: theme.spacing(1),
        },
        '& .MuiButton-root:last-child': {
            marginLeft: theme.spacing(1),
        },
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            padding: '6px 38px',
            marginTop: theme.spacing(0),
            '& .MuiButton-root': {
                width: '100%',
            },
            '& .MuiButton-root:first-child': {
                marginRight: 0,
                marginBottom: theme.spacing(2),
            },
            '& .MuiButton-root:last-child': {
                marginLeft: 0,
            },
        },
    },
    '& .MuiButton': {
        height: '47px',
    },
}));

export const ManagerEditRoleDialog: React.FC<ManagerDialogProps> = ({ managerDialogOpen, onClose, managerId }) => {
    const theme = useTheme();
    const { notify } = useNotifications();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

    const { data: managerData, loading: managerLoading } = useUsersPermissionsUserQuery({
        fetchPolicy: 'network-only',
        variables: { usersPermissionsUserId: managerId },
    });

    const managerRole = managerData?.usersPermissionsUser?.data?.attributes?.role?.data;

    const { data } = useUsersPermissionsRolesQuery({
        fetchPolicy: 'cache-and-network',
    });

    const initialValues = {
        role: managerRole?.id || '',
    };

    const roles =
        data?.usersPermissionsRoles?.data
            .map((role) => role)
            .filter((admin) => admin.attributes?.name !== 'Authenticated' && admin.attributes?.name !== 'Public') || [];

    const [updateManagerRole, { loading }] = useUpdateUsersPermissionsUserMutation({
        onCompleted() {
            notify({
                type: 'success',
                message: 'Menecer uğurla redaktə edildi',
            });
            browserHistory.push('/d/settings/managers');
        },
        onError(error) {
            notify({
                type: 'error',
                message: error.message,
            });
        },
    });

    const onSubmit = (formData) => {
        updateManagerRole({
            variables: {
                updateUsersPermissionsUserId: managerId,
                data: formData,
            },
        });
    };

    if (loading || managerLoading) {
        return <Spinner />;
    }

    return (
        <Dialog open={managerDialogOpen} fullScreen={isMobile} maxWidth="xs">
            <DialogTitle className="dialog-title">
                <Typography variant="h3" sx={{ color: '#6B7280', fontWeight: 500 }}>
                    Menecer rolu redaktə et
                </Typography>
                <IconButton onClick={onClose}>
                    <CloseOutlinedIcon />
                </IconButton>
            </DialogTitle>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({ handleSubmit }): React.ReactNode => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            <DialogContent className="dialog-content">
                                <Grid item xs={12}>
                                    <Field component={TextField} name="role" fullWidth label={'* ' + 'Rol'} select>
                                        {roles?.map((role) => (
                                            <MenuItem key={role.id as string} value={role.id as string}>
                                                {role.attributes?.name}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </Grid>
                            </DialogContent>
                            <Grid item xs={12}>
                                <Box className="actions">
                                    <Button
                                        className="MuiButton"
                                        variant="contained"
                                        sx={{
                                            mb: 3,
                                        }}
                                        type="submit"
                                    >
                                        Yadda saxla
                                    </Button>
                                </Box>
                            </Grid>
                        </Form>
                    );
                }}
            </Formik>
        </Dialog>
    );
};
