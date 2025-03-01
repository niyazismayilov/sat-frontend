import {
    Box,
    Button,
    Divider,
    IconButton,
    InputAdornment,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/styles';
import { ReactComponent as FilterIcon } from 'assets/icons/manager-dashboard/filter.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/manager-dashboard/plusIcon.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/manager-dashboard/search.svg';
import { Link } from 'components';
import { ManagerPageHeader } from 'components/manager-page-header';
import { usePaginationDispatch } from 'context/pagination/store';
import { useBroadcastsFilterDispatch } from 'context/useful/broadcast/store';
import { Field, Form, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-mui';
import { useRef } from 'react';
import { extractFilterFromQS } from 'ui-services/filter.ui-service';
import browserHistory from 'utils/browser-utils';
import AddIcon from '@mui/icons-material/Add';

type CustomersActionsProps = {
    openFilterDialog: () => void;
};

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    '& .MuiBox-root': {
        display: 'flex',
        alignItems: 'center',
    },
    '& .button': {
        marginLeft: theme.spacing(3),
        padding: '13px 28px',
        border: '1px solid #D1D5DB',
    },
    '& .delete-button': {
        color: theme.palette.error.main,
    },

    '& .css-1o9s3wi-MuiInputBase-input-MuiOutlinedInput-input': {
        padding: '14px 14px',
    },

    '& .create-button': {
        marginRight: '20px',
        width: '170px',
        borderRadius: '5px',
    },
    '& .search': {
        marginLeft: '10px',
    },
}));

export const EpisodeActions: React.FC<CustomersActionsProps> = ({ openFilterDialog }) => {
    const dispatch = useBroadcastsFilterDispatch();
    const filter = extractFilterFromQS();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const formikRef = useRef<FormikProps<any>>(null);
    const paginationDispatch = usePaginationDispatch();

    return (
        <Root>
            <ManagerPageHeader title="Epizodlar">
                <Box sx={{ marginRight: '20px' }}>
                    <Divider />
                </Box>
                {isMobile ? (
                    <>
                        <Tooltip title="Yeni epizod" arrow>
                            <IconButton
                                sx={{ ml: 3 }}
                                onClick={() => browserHistory.push('/d/helpful/series/create-episode')}
                            >
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Yeni veriliş" arrow>
                            <IconButton
                                sx={{ ml: 3 }}
                                onClick={() => browserHistory.push('/d/helpful/series/create-series')}
                            >
                                <AddIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="filter" arrow>
                            <IconButton sx={{ ml: 3 }} onClick={openFilterDialog}>
                                <FilterIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                ) : (
                    <>
                        <Link to="/d/helpful/episodes/create-episode">
                            <Button
                                startIcon={<PlusIcon />}
                                variant="contained"
                                sx={{ mr: 12 }}
                                className="create-button"
                            >
                                Yeni epizod
                            </Button>
                        </Link>
                        <Link to="/d/helpful/episodes/series/create-series">
                            <Button
                                startIcon={<PlusIcon />}
                                variant="contained"
                                sx={{ mr: 12 }}
                                className="create-button"
                            >
                                Yeni veriliş
                            </Button>
                        </Link>

                        <Link to="/d/helpful/episodes/series">
                            <Button
                                startIcon={<PlusIcon />}
                                variant="outlined"
                                sx={{ whiteSpace: 'nowrap', ml: 3 }}
                                className="create-button"
                            >
                                Verilişləri göstər
                            </Button>
                        </Link>
                        <Formik
                            initialValues={{ search: filter?.name || '' }}
                            innerRef={formikRef}
                            onSubmit={() => {
                                dispatch({
                                    type: 'SET_FILTER',
                                    filter: {
                                        ...filter,
                                        name:
                                            formikRef.current?.values.search &&
                                            formikRef.current?.values.search.toString(),
                                    },
                                });
                                paginationDispatch({ type: 'SET_PAGE', page: 1 });
                                paginationDispatch({ type: 'SET_PAGE_SIZE', pageSize: 20 });
                                formikRef.current?.setSubmitting(false);
                            }}
                        >
                            {({ handleSubmit }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Field
                                        name="search"
                                        className="search"
                                        component={TextField}
                                        placeholder="Epizodun adına görə axtar"
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment
                                                    style={{ marginLeft: '10px', color: '#BFBFBF' }}
                                                    position="start"
                                                >
                                                    <SearchIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <Button style={{ display: 'none' }} type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                        <Button
                            startIcon={<FilterIcon />}
                            className="button"
                            variant="outlined"
                            onClick={openFilterDialog}
                        >
                            <Typography variant="h6" sx={{ color: '#6B7280', fontWeight: 500 }}>
                                Filter
                            </Typography>
                        </Button>
                    </>
                )}
            </ManagerPageHeader>
        </Root>
    );
};
