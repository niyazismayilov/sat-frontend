import produce, { Draft } from 'immer';
import { Reducer } from 'react';
import { extractFilterFromQS } from 'ui-services/filter.ui-service';
import { setSearchParams } from 'utils/browser-utils';

// #region State
export type EMPLOYEE_FILTER = {
    filter: EmployeeFilterState;
};

export type EmployeeFilterState = Omit<any, 'status'> & {
    user: string;
    position: string;
    status: string;
};
export const INITIAL_EMPLOYEE_FILTER_STATE: EMPLOYEE_FILTER = {
    filter: {
        user: '',
        position: '',
        status: '',
    },
};

const setFilter = (draft: Draft<EMPLOYEE_FILTER>, action: any) => {
    draft.filter = action.filter;
    setSearchParams(action.filter);
};

const initFilter = (draft: Draft<EMPLOYEE_FILTER>) => {
    const filter = extractFilterFromQS();
    draft.filter = filter;
};

// #region Sync Actions
type SetFilterAction = { type: 'SET_FILTER'; filter: EMPLOYEE_FILTER };
type InitFilterAction = { type: 'INIT_FILTER' };

export type EmployeeAction = SetFilterAction | InitFilterAction;

export const reducer: Reducer<EMPLOYEE_FILTER, EmployeeAction> = produce(
    (draft: Draft<EMPLOYEE_FILTER>, action: EmployeeAction): void => {
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
