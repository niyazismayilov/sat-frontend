import { Box, Button, IconButton, InputAdornment, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ManagerPageHeader } from 'components/manager-page-header';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/styles';
import { ReactComponent as FilterIcon } from 'assets/icons/manager-dashboard/filter.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/manager-dashboard/search.svg';
import { Field, Form, Formik, FormikProps } from 'formik';
import { usePaginationDispatch } from 'context/pagination/store';
import { useRef } from 'react';
import { usePaymentFilterDispatch } from 'context/payment/store';
import { extractFilterFromQS } from 'ui-services/filter.ui-service';
import { TextField } from 'formik-mui';

type PaymentsActionsProps = { openFilterDialog: () => void };

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    '& .MuiBox-root': {
        display: 'flex',
        alignItems: 'center',
    },
    '& .button': {
        marginLeft: theme.spacing(3),
        padding: '10px 28px',
        border: '1px solid #D1D5DB',
    },
    '& .css-1o9s3wi-MuiInputBase-input-MuiOutlinedInput-input': {
        padding: '11px 14px',
    },
}));
export const PaymentActions: React.FC<PaymentsActionsProps> = ({ openFilterDialog }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const formikRef = useRef<FormikProps<any>>(null);
    const dispatch = usePaymentFilterDispatch();
    const filter = extractFilterFromQS();
    const paginationDispatch = usePaginationDispatch();
    return (
        <Root>
            <ManagerPageHeader title="Ödəniş">
                {isMobile ? (
                    <>
                        <Tooltip title="filter" arrow>
                            <IconButton sx={{ ml: 3 }} onClick={openFilterDialog}>
                                <FilterIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                ) : (
                    <>
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
                                        component={TextField}
                                        placeholder="İştirakçının adına görə axtar"
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
