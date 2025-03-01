import { Enum_Message_Type } from 'graphql/generated';
import produce, { Draft } from 'immer';
import { DateTime } from 'luxon';
import { Reducer } from 'react';
import { extractFilterFromQS } from 'ui-services/filter.ui-service';
import { setSearchParams } from 'utils/browser-utils';

// #region State
export type MESSAGE_FILTER = {
    filter: MessageFilterState;
};

export type MessageFilterState = {
    fullName: string;
    email: string;
    course: string;
    interestedConsultings: string;
    phoneNumber: string;
    startsAt: DateTime | null;
    endsAt: DateTime | null;
    type: string | Enum_Message_Type;
    isRead: boolean | null;
};
export const INITIAL_MESSAGE_FILTER_STATE: MESSAGE_FILTER = {
    filter: {
        fullName: '',
        email: '',
        course: '',
        interestedConsultings: '',
        phoneNumber: '',
        startsAt: null,
        endsAt: null,
        type: '',
        isRead: null,
    },
};

const setFilter = (draft: Draft<MESSAGE_FILTER>, action: any) => {
    draft.filter = action.filter;
    setSearchParams(action.filter);
};

const initFilter = (draft: Draft<MESSAGE_FILTER>) => {
    const filter = extractFilterFromQS();
    draft.filter = filter;
};

// #region Sync Actions
type SetFilterAction = { type: 'SET_FILTER'; filter: MESSAGE_FILTER };
type InitFilterAction = { type: 'INIT_FILTER' };

export type MessageAction = SetFilterAction | InitFilterAction;

export const reducer: Reducer<MESSAGE_FILTER, MessageAction> = produce(
    (draft: Draft<MESSAGE_FILTER>, action: MessageAction): void => {
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
