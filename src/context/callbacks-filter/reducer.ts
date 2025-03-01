import { DateTime } from 'luxon';
import produce, { Draft } from 'immer';
import { Reducer } from 'react';
import { extractFilterFromQS } from 'ui-services/filter.ui-service';
import { setSearchParams } from 'utils/browser-utils';

// #region State
export type CALLBACKS_FILTER = {
    filter: CallbackFilterState;
};

export type CallbackFilterState = Omit<any, 'status'> & {
    phoneNumber: string;
    startsAt: DateTime | null;
    endsAt: DateTime | null;
    isCalled: boolean | null;
};
export const INITIAL_CALLBACK_FILTER_STATE: CALLBACKS_FILTER = {
    filter: {
        phoneNumber: '',
        isCalled: null,
        startsAt: null,
        endsAt: null,
    },
};

const setFilter = (draft: Draft<CALLBACKS_FILTER>, action: any) => {
    draft.filter = action.filter;
    setSearchParams(action.filter);
};

const initFilter = (draft: Draft<CALLBACKS_FILTER>) => {
    const filter = extractFilterFromQS();
    draft.filter = filter;
};

// #region Sync Actions
type SetFilterAction = { type: 'SET_FILTER'; filter: CALLBACKS_FILTER };
type InitFilterAction = { type: 'INIT_FILTER' };

export type CallbackAction = SetFilterAction | InitFilterAction;

export const reducer: Reducer<CALLBACKS_FILTER, CallbackAction> = produce(
    (draft: Draft<CALLBACKS_FILTER>, action: CallbackAction): void => {
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
