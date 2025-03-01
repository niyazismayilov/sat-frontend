import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    MenuItem,
    Dialog as MuiDialog,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/styles';
import { INITIAL_EMPLOYEE_FILTER_STATE } from 'context/employee-filter/reducer';
import { useEmployeeFilter } from 'context/employee-filter/store';
import { usePaginationDispatch } from 'context/pagination/store';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { Enum_Employee_Status } from 'graphql/generated';

export enum Gender {
    male = 'male',
    female = 'female',
}

type FilterDialogProps = {
    filterDialogOpen: boolean;
    onClose: () => void;
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
    const [{ filter }, dispatch] = useEmployeeFilter();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const paginationDispatch = usePaginationDispatch();
    const initialValues: any = {
        ...INITIAL_EMPLOYEE_FILTER_STATE.filter,
        ...filter,
    };

    // const { data: employeesData } = useEmployeesQuery({
    //     variables: {
    //         pagination: {
    //             pageSize: 20000,
    //         },
    //     },
    // });

    // const employees = employeesData?.employees?.data.map((employee) => employee) || [];

    // const employeesOptions =
    //     employees?.map((employee) => ({
    //         label: employee.attributes?.firstName + ' ' + employee.attributes?.lastName,
    //         value: employee.id,
    //     })) || [];

    return (
        <Dialog open={filterDialogOpen} onClose={onClose} fullScreen={isMobile} maxWidth="xs">
            <DialogTitle className="dialog-title">
                <Typography variant="h3" sx={{ color: '#6B7280', fontWeight: 500 }}>
                    Filter bölməsi
                </Typography>
                <IconButton onClick={onClose}>
                    <CloseOutlinedIcon />
                </IconButton>
            </DialogTitle>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={(formData) => {
                    onClose();
                    dispatch({ type: 'SET_FILTER', filter: formData });
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
                                            name="firstName"
                                            variant="outlined"
                                            label="Adı'"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            fullWidth
                                            name="lastName"
                                            variant="outlined"
                                            label="Soyadı'"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            fullWidth
                                            name="position"
                                            variant="outlined"
                                            label="Vəzifə'"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field
                                            name="status"
                                            component={TextField}
                                            select
                                            autoComplete="off"
                                            label="Status"
                                            variant="outlined"
                                            fullWidth
                                        >
                                            <MenuItem value={Enum_Employee_Status.Active}>Aktiv</MenuItem>
                                            <MenuItem value={Enum_Employee_Status.Deactive}>Deaktiv</MenuItem>
                                        </Field>
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
                                                    values: INITIAL_EMPLOYEE_FILTER_STATE.filter as any,
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
        </Dialog>
    );
};
