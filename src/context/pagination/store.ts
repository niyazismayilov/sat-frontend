import { Dispatch, Reducer, useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { INITIAL_PAGINATION_STATE, PaginationAction, PaginationState, reducer } from './reducer';

const useValue = (): [PaginationState, Dispatch<PaginationAction>] => {
    const [state, dispatch] = useReducer<Reducer<PaginationState, PaginationAction>>(reducer, INITIAL_PAGINATION_STATE);

    return [state, dispatch];
};

export const {
    Provider: PaginationProvider,
    useTracked: usePagination,
    useTrackedState: usePaginationState,
    useUpdate: usePaginationDispatch,
    useSelector: usePaginationStateSelector,
} = createContainer(useValue);
