import { Dispatch, Reducer, useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { INITIAL_CALLBACK_FILTER_STATE, CallbackAction, reducer, CALLBACKS_FILTER } from './reducer';

const useValue = (): [CALLBACKS_FILTER, Dispatch<CallbackAction>] => {
    const [state, dispatch] = useReducer<Reducer<CALLBACKS_FILTER, CallbackAction>>(
        reducer,
        INITIAL_CALLBACK_FILTER_STATE,
    );

    return [state, dispatch];
};

export const {
    Provider: CallbacksFilterProvider,
    useTracked: useCallbacksFilter,
    useTrackedState: useCallbacksFilterState,
    useUpdate: useCallbacksFilterDispatch,
    useSelector: useCallbacksStateSelector,
} = createContainer(useValue);
