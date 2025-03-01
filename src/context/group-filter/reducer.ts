import { Enum_Group_Status } from 'graphql/generated';
import produce, { Draft } from 'immer';
import { Reducer } from 'react';
import { extractFilterFromQS } from 'ui-services/filter.ui-service';
import { setSearchParams } from 'utils/browser-utils';

// #region State
export type GROUPS_FILTER = {
    filter: GroupFilterState;
};

export type GroupFilterState = Omit<any, 'status'> & {
    name: string;
    group: string;
    course: string;
    startsAt: null;
    endsAt: null;
    status: Enum_Group_Status | string;
};

export const INITIAL_GROUP_FILTER_STATE: GROUPS_FILTER = {
    filter: {
        name: '',
        group: '',
        course: '',
        startsAt: null,
        endsAt: null,
        status: '',
    },
};

const setFilter = (draft: Draft<GROUPS_FILTER>, action: any) => {
    draft.filter = action.filter;
    setSearchParams(action.filter);
};

const initFilter = (draft: Draft<GROUPS_FILTER>) => {
    const filter = extractFilterFromQS();
    draft.filter = filter;
};

// #region Sync Actions
type SetFilterAction = { type: 'SET_FILTER'; filter: GROUPS_FILTER };
type InitFilterAction = { type: 'INIT_FILTER' };

export type GroupAction = SetFilterAction | InitFilterAction;

export const reducer: Reducer<GROUPS_FILTER, GroupAction> = produce(
    (draft: Draft<GROUPS_FILTER>, action: GroupAction): void => {
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
