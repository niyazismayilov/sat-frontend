import { Enum_Courseregister_Paymentstatus, Enum_Transaction_Status } from 'graphql/generated';
import produce, { Draft } from 'immer';
import { DateTime } from 'luxon';
import { Reducer } from 'react';
import { extractFilterFromQS } from 'ui-services/filter.ui-service';
import { setSearchParams } from 'utils/browser-utils';

// #region State
export type PAYMENT_FILTER = {
    filter: PaymentFilterState;
};

export type PaymentFilterState = Omit<any, 'status'> & {
    user: string;
    group: string;
    course: string;
    status: Enum_Transaction_Status | string;
    orderId: string;
    maxPrice: number;
    minPrice: number;
    startsAt: DateTime | null;
    endsAt: DateTime | null;
    paymentStatus: Enum_Courseregister_Paymentstatus | string;
    name: string;
};

export const INITIAL_PAYMENT_FILTER_STATE: PAYMENT_FILTER = {
    filter: {
        user: '',
        group: '',
        course: '',
        status: '',
        orderId: '',
        maxPrice: 0,
        minPrice: 0,
        startsAt: null,
        endsAt: null,
        paymentStatus: '',
        name: '',
    },
};

const setFilter = (draft: Draft<PAYMENT_FILTER>, action: any) => {
    draft.filter = action.filter;
    setSearchParams(action.filter);
};

const initFilter = (draft: Draft<PAYMENT_FILTER>) => {
    const filter = extractFilterFromQS();
    const fromDate = filter.fromDate || null;
    const toDate = filter.toDate || null;
    draft.filter = { fromDate, toDate, ...filter };
};

// #region Sync Actions
type SetFilterAction = { type: 'SET_FILTER'; filter: PAYMENT_FILTER };
type InitFilterAction = { type: 'INIT_FILTER' };

export type PaymentAction = SetFilterAction | InitFilterAction;

export const reducer: Reducer<PAYMENT_FILTER, PaymentAction> = produce(
    (draft: Draft<PAYMENT_FILTER>, action: PaymentAction): void => {
        switch (action.type) {
            case 'SET_FILTER':
                setFilter(draft, action);
                break;
            case 'INIT_FILTER':
                initFilter(draft);
                break;
            default:
                break;
        }
    },
);
// #endregion
