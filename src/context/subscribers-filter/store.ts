import { Dispatch, Reducer, useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { INITIAL_SUBSCRIBER_FILTER_STATE, SubscriberAction, reducer, SUBSCRIBERS_FILTER } from './reducer';

const useValue = (): [SUBSCRIBERS_FILTER, Dispatch<SubscriberAction>] => {
    const [state, dispatch] = useReducer<Reducer<SUBSCRIBERS_FILTER, SubscriberAction>>(
        reducer,
        INITIAL_SUBSCRIBER_FILTER_STATE,
    );

    return [state, dispatch];
};

export const {
    Provider: SubscribersFilterProvider,
    useTracked: useSubscribersFilter,
    useTrackedState: useSubscribersFilterState,
    useUpdate: useSubscribersFilterDispatch,
    useSelector: useSubscribersStateSelector,
} = createContainer(useValue);
