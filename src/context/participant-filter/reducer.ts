import produce, { Draft } from 'immer';
import { DateTime } from 'luxon';
import { Reducer } from 'react';
import { extractFilterFromQS } from 'ui-services/filter.ui-service';
import { setSearchParams } from 'utils/browser-utils';

// #region State
export type PARTICIPANTS_FILTER = {
    filter: ParticipantFilterState;
};

export type ParticipantFilterState = Omit<any, 'status'> & {
    user: string;
    email: string;
    phoneNumber: string;
    gender: string;
    dateOfBirth: DateTime | null;
    confirmed: boolean | null;
};
export const INITIAL_PARTICIPANT_FILTER_STATE: PARTICIPANTS_FILTER = {
    filter: {
        user: '',
        email: '',
        phoneNumber: '',
        gender: '',
        dateOfBirth: null,
        confirmed: null,
    },
};

const setFilter = (draft: Draft<PARTICIPANTS_FILTER>, action: any) => {
    draft.filter = action.filter;
    setSearchParams(action.filter);
};

const initFilter = (draft: Draft<PARTICIPANTS_FILTER>) => {
    const filter = extractFilterFromQS();
    draft.filter = filter;
};

// #region Sync Actions
type SetFilterAction = { type: 'SET_FILTER'; filter: PARTICIPANTS_FILTER };
type InitFilterAction = { type: 'INIT_FILTER' };

export type ParticipantAction = SetFilterAction | InitFilterAction;

export const reducer: Reducer<PARTICIPANTS_FILTER, ParticipantAction> = produce(
    (draft: Draft<PARTICIPANTS_FILTER>, action: ParticipantAction): void => {
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
