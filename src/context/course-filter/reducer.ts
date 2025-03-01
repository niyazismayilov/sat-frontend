import { Enum_Course_Durationtype, Enum_Course_Status } from 'graphql/generated';
import produce, { Draft } from 'immer';
import { Reducer } from 'react';
import { extractFilterFromQS } from 'ui-services/filter.ui-service';
import { setSearchParams } from 'utils/browser-utils';

// #region State
export type COURSES_FILTER = {
    filter: CourseFilterState;
};

export type CourseFilterState = Omit<any, 'status'> & {
    status: Enum_Course_Status | string;
    category: string;
    capacity: string;
    name: string;
    trainers: string;
    count: number;
    duration: number;
    durationType: Enum_Course_Durationtype | string;
    maxPrice: number;
    minPrice: number;
    course: string;
};

export const INITIAL_COURSE_FILTER_STATE: COURSES_FILTER = {
    filter: {
        course: '',
        capacity: '',
        category: '',
        name: '',
        count: 0,
        status: '',
        trainers: '',
        duration: 0,
        durationType: '',
        maxPrice: 0,
        minPrice: 0,
    },
};

const setFilter = (draft: Draft<COURSES_FILTER>, action: any) => {
    draft.filter = action.filter;
    setSearchParams(action.filter);
};

const initFilter = (draft: Draft<COURSES_FILTER>) => {
    const filter = extractFilterFromQS();
    draft.filter = filter;
};

// #region Sync Actions
type SetFilterAction = { type: 'SET_FILTER'; filter: COURSES_FILTER };
type InitFilterAction = { type: 'INIT_FILTER' };

export type CourseAction = SetFilterAction | InitFilterAction;

export const reducer: Reducer<COURSES_FILTER, CourseAction> = produce(
    (draft: Draft<COURSES_FILTER>, action: CourseAction): void => {
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
