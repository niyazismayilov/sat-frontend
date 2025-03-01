import produce, { Draft } from 'immer';
import { DateTime } from 'luxon';
import { Reducer } from 'react';
import { extractFilterFromQS } from 'ui-services/filter.ui-service';
import { setSearchParams } from 'utils/browser-utils';

// #region State
export type TRAINERS_FILTER = {
    filter: TrainerFilterState;
};

export type TrainerFilterState = Omit<any, 'status'> & {
    fullName: string;
    email: string;
    number: string;
    course: string;
    birthdayDate: DateTime | null;
    status: string;
};
export const INITIAL_TRAINER_FILTER_STATE: TRAINERS_FILTER = {
    filter: {
        fullName: '',
        email: '',
        number: '',
        course: '',
        birthdayDate: null,
        status: '',
    },
};

const setFilter = (draft: Draft<TRAINERS_FILTER>, action: any) => {
    draft.filter = action.filter;
    setSearchParams(action.filter);
};

const initFilter = (draft: Draft<TRAINERS_FILTER>) => {
    const filter = extractFilterFromQS();
    draft.filter = filter;
};

// #region Sync Actions
type SetFilterAction = { type: 'SET_FILTER'; filter: TRAINERS_FILTER };
type InitFilterAction = { type: 'INIT_FILTER' };

export type TrainerAction = SetFilterAction | InitFilterAction;

export const reducer: Reducer<TRAINERS_FILTER, TrainerAction> = produce(
    (draft: Draft<TRAINERS_FILTER>, action: TrainerAction): void => {
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
