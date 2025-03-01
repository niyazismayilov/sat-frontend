import { DateTime } from 'luxon';
import produce, { Draft } from 'immer';
import { Reducer } from 'react';
import { extractFilterFromQS } from 'ui-services/filter.ui-service';
import { setSearchParams } from 'utils/browser-utils';

// #region State
export type SUBSCRIBERS_FILTER = {
    filter: SubscriberFilterState;
};

export type SubscriberFilterState = Omit<any, 'status'> & {
    email: string;
    startsAt: DateTime | null;
    endsAt: DateTime | null;
};
export const INITIAL_SUBSCRIBER_FILTER_STATE: SUBSCRIBERS_FILTER = {
    filter: {
        email: '',
        startsAt: null,
        endsAt: null,
    },
};

const setFilter = (draft: Draft<SUBSCRIBERS_FILTER>, action: any) => {
    draft.filter = action.filter;
    setSearchParams(action.filter);
};

const initFilter = (draft: Draft<SUBSCRIBERS_FILTER>) => {
    const filter = extractFilterFromQS();
    draft.filter = filter;
};

// #region Sync Actions
type SetFilterAction = { type: 'SET_FILTER'; filter: SUBSCRIBERS_FILTER };
type InitFilterAction = { type: 'INIT_FILTER' };

export type SubscriberAction = SetFilterAction | InitFilterAction;

export const reducer: Reducer<SUBSCRIBERS_FILTER, SubscriberAction> = produce(
    (draft: Draft<SUBSCRIBERS_FILTER>, action: SubscriberAction): void => {
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
