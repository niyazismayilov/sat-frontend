import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
    // Autocomplete,
    Box,
    Button,
    Dialog as MuiDialog,
    DialogActions,
    DialogContent,
    Grid,
    IconButton,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/styles';
import { INITIAL_SUBSCRIBER_FILTER_STATE } from 'context/subscribers-filter/reducer';
import { useSubscribersFilter } from 'context/subscribers-filter/store';
import { usePaginationDispatch } from 'context/pagination/store';

import { DatePickerField } from 'components';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';

type FilterDialogProps = {
    filterDialogOpen: boolean;
    onClose: () => void;
};

export enum isSubscribedEnum {
    is_Subscribed = 'true',
    is_Not_Subscribed = 'false',
}

const Dialog = styled(MuiDialog)(({ theme }: { theme: Theme }) => ({
    '& .dialog-title': {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    '& .MuiDialogTitle-root': {
        padding: theme.spacing(4),
    },
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2, 9),
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

export const FilterDialog: React.FC<FilterDialogProps> = ({ filterDialogOpen, onClose }) => {
    const theme = useTheme();
    const [{ filter }, dispatch] = useSubscribersFilter();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const paginationDispatch = usePaginationDispatch();
    const initialValues: any = {
        ...INITIAL_SUBSCRIBER_FILTER_STATE.filter,
        ...filter,
    };

    return (
        <Dialog open={filterDialogOpen} onClose={onClose} fullScreen={isMobile} maxWidth="md">
            <Box sx={{ py: 4 }}>
                <Typography variant="h2" sx={{ textAlign: 'start', mb: 4, ml: 9, color: '#6B7280', fontWeight: 500 }}>
                    Filter bölməsi
                </Typography>
                <IconButton
                    onClick={onClose}
                    sx={{ position: 'absolute', right: 0, top: 0, margin: theme.spacing(3, 8) }}
                >
                    <CloseOutlinedIcon />
                </IconButton>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize
                    onSubmit={(formData) => {
                        onClose();
                        dispatch({
                            type: 'SET_FILTER',
                            filter: formData,
                        });
                        paginationDispatch({ type: 'SET_PAGE', page: 1 });
                        paginationDispatch({ type: 'SET_PAGE_SIZE', pageSize: 20 });
                    }}
                >
                    {({ handleSubmit, resetForm }): React.ReactNode => {
                        return (
                            <Form onSubmit={handleSubmit}>
                                <DialogContent className="dialog-content">
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <Field
                                                component={TextField}
                                                fullWidth
                                                name="email"
                                                placeholder={'Elektron poçt'}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                name="startsAt"
                                                component={DatePickerField}
                                                label="Başlanğıc tarix"
                                                variant="outlined"
                                                openTo="year"
                                                views={['year', 'month', 'day']}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Field
                                                name="endsAt"
                                                component={DatePickerField}
                                                label="Son tarix"
                                                variant="outlined"
                                                openTo="year"
                                                views={['year', 'month', 'day']}
                                            />
                                        </Grid>
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Grid item xs={12}>
                                        <Box className="actions">
                                            <Button
                                                className="MuiButton"
                                                variant="outlined"
                                                sx={{
                                                    border: 'none',
                                                    backgroundColor: '#F4F4F4',
                                                    color: '#1F2937',
                                                    flexWrap: 'nowrap',
                                                }}
                                                onClick={() =>
                                                    resetForm({
                                                        values: INITIAL_SUBSCRIBER_FILTER_STATE.filter as any,
                                                    })
                                                }
                                            >
                                                Sıfırla
                                            </Button>
                                            <Button className="MuiButton" variant="contained" type="submit">
                                                Filterlə
                                            </Button>
                                        </Box>
                                    </Grid>
                                </DialogActions>
                            </Form>
                        );
                    }}
                </Formik>
            </Box>
        </Dialog>
    );
};
