import produce, { Draft } from 'immer';
import { DateTime } from 'luxon';
import { Reducer } from 'react';
import { extractFilterFromQS } from 'ui-services/filter.ui-service';
import { setSearchParams } from 'utils/browser-utils';

// #region State
export type BROADCASTS_FILTER = {
    filter: BroadcastsFilterState;
};

export type BroadcastsFilterState = Omit<any, 'status'> & {
    title: string;
    name: string;
    createdAt: DateTime | null;
    status: string;
};
export const INITIAL_BROADCASTS_FILTER_STATE: BROADCASTS_FILTER = {
    filter: {
        title: '',
        name: '',
        createdAt: null,
        status: '',
    },
};

const setFilter = (draft: Draft<BROADCASTS_FILTER>, action: any) => {
    draft.filter = action.filter;
    setSearchParams(action.filter);
};

const initFilter = (draft: Draft<BROADCASTS_FILTER>) => {
    const filter = extractFilterFromQS();
    draft.filter = filter;
};

// #region Sync Actions
type SetFilterAction = { type: 'SET_FILTER'; filter: BROADCASTS_FILTER };
type InitFilterAction = { type: 'INIT_FILTER' };

export type BroadcastsAction = SetFilterAction | InitFilterAction;

export const reducer: Reducer<BROADCASTS_FILTER, BroadcastsAction> = produce(
    (draft: Draft<BROADCASTS_FILTER>, action: BroadcastsAction): void => {
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
