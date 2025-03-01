import { Dispatch, Reducer, useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { INITIAL_BROADCASTS_FILTER_STATE, BroadcastsAction, reducer, BROADCASTS_FILTER } from './reducer';

const useValue = (): [BROADCASTS_FILTER, Dispatch<BroadcastsAction>] => {
    const [state, dispatch] = useReducer<Reducer<BROADCASTS_FILTER, BroadcastsAction>>(
        reducer,
        INITIAL_BROADCASTS_FILTER_STATE,
    );

    return [state, dispatch];
};

export const {
    Provider: BroadcastsFilterProvider,
    useTracked: useBroadcastsFilter,
    useTrackedState: useBroadcastsFilterState,
    useUpdate: useBroadcastsFilterDispatch,
    useSelector: useBroadcastsStateSelector,
} = createContainer(useValue);
