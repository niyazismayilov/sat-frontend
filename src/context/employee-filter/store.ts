import { Dispatch, Reducer, useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { INITIAL_EMPLOYEE_FILTER_STATE, EmployeeAction, reducer, EMPLOYEE_FILTER } from './reducer';

const useValue = (): [EMPLOYEE_FILTER, Dispatch<EmployeeAction>] => {
    const [state, dispatch] = useReducer<Reducer<EMPLOYEE_FILTER, EmployeeAction>>(
        reducer,
        INITIAL_EMPLOYEE_FILTER_STATE,
    );

    return [state, dispatch];
};

export const {
    Provider: EmployeeFilterProvider,
    useTracked: useEmployeeFilter,
    useTrackedState: useEmployeeFilterState,
    useUpdate: useEmployeeFilterDispatch,
    useSelector: useEmployeeStateSelector,
} = createContainer(useValue);
