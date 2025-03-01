import { Dispatch, Reducer, useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { INITIAL_MESSAGE_FILTER_STATE, MessageAction, reducer, MESSAGE_FILTER } from './reducer';

const useValue = (): [MESSAGE_FILTER, Dispatch<MessageAction>] => {
    const [state, dispatch] = useReducer<Reducer<MESSAGE_FILTER, MessageAction>>(reducer, INITIAL_MESSAGE_FILTER_STATE);

    return [state, dispatch];
};

export const {
    Provider: MessageFilterProvider,
    useTracked: useMessageFilter,
    useTrackedState: useMessageFilterState,
    useUpdate: useMessageFilterDispatch,
    useSelector: useMessageStateSelector,
} = createContainer(useValue);
