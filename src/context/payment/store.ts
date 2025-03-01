import { Dispatch, Reducer, useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { INITIAL_PAYMENT_FILTER_STATE, PaymentAction, PAYMENT_FILTER, reducer } from './reducer';

const useValue = (): [PAYMENT_FILTER, Dispatch<PaymentAction>] => {
    const [state, dispatch] = useReducer<Reducer<PAYMENT_FILTER, PaymentAction>>(reducer, INITIAL_PAYMENT_FILTER_STATE);

    return [state, dispatch];
};

export const {
    Provider: PaymentFilterProvider,
    useTracked: usePaymentFilter,
    useTrackedState: usePaymentFilterState,
    useUpdate: usePaymentFilterDispatch,
    useSelector: usePaymentStateSelector,
} = createContainer(useValue);
