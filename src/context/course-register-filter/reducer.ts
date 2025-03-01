import { Enum_Courseregister_Paymentstatus } from 'graphql/generated';
import produce, { Draft } from 'immer';
import { DateTime } from 'luxon';
import { Reducer } from 'react';
import { extractFilterFromQS } from 'ui-services/filter.ui-service';
import { setSearchParams } from 'utils/browser-utils';

// #region State
export type COURSE_REGISTER_FILTER = {
    filter: CourseRegisterFilterState;
};

export type CourseRegisterFilterState = Omit<any, 'status'> & {
    name: string;
    user: string;
    group: string;
    course: string;
    startsAt: DateTime | null;
    endsAt: DateTime | null;
    paymentStatus: Enum_Courseregister_Paymentstatus | string;
};
export const INITIAL_COURSE_REGISTER_FILTER_STATE: COURSE_REGISTER_FILTER = {
    filter: {
        name: '',
        user: '',
        group: '',
        course: '',
        startsAt: null,
        endsAt: null,
        paymentStatus: '',
    },
};

const setFilter = (draft: Draft<COURSE_REGISTER_FILTER>, action: any) => {
    draft.filter = action.filter;
    setSearchParams(action.filter);
};

const initFilter = (draft: Draft<COURSE_REGISTER_FILTER>) => {
    const filter = extractFilterFromQS();
    draft.filter = filter;
};

// #region Sync Actions
type SetFilterAction = { type: 'SET_FILTER'; filter: COURSE_REGISTER_FILTER };
type InitFilterAction = { type: 'INIT_FILTER' };

export type CourseRegisterAction = SetFilterAction | InitFilterAction;

export const reducer: Reducer<COURSE_REGISTER_FILTER, CourseRegisterAction> = produce(
    (draft: Draft<COURSE_REGISTER_FILTER>, action: CourseRegisterAction): void => {
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
