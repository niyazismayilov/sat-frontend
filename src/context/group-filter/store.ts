import { Dispatch, Reducer, useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { INITIAL_GROUP_FILTER_STATE, GroupAction, reducer, GROUPS_FILTER } from './reducer';

const useValue = (): [GROUPS_FILTER, Dispatch<GroupAction>] => {
    const [state, dispatch] = useReducer<Reducer<GROUPS_FILTER, GroupAction>>(reducer, INITIAL_GROUP_FILTER_STATE);

    return [state, dispatch];
};

export const {
    Provider: GroupFilterProvider,
    useTracked: useGroupFilter,
    useTrackedState: useGroupFilterState,
    useUpdate: useGroupFilterDispatch,
    useSelector: useGroupStateSelector,
} = createContainer(useValue);
