import { Dispatch, Reducer, useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { INITIAL_BLOG_FILTER_STATE, BlogAction, reducer, BLOG_FILTER } from './reducer';

const useValue = (): [BLOG_FILTER, Dispatch<BlogAction>] => {
    const [state, dispatch] = useReducer<Reducer<BLOG_FILTER, BlogAction>>(reducer, INITIAL_BLOG_FILTER_STATE);

    return [state, dispatch];
};

export const {
    Provider: BlogFilterProvider,
    useTracked: useBlogFilter,
    useTrackedState: useBlogFilterState,
    useUpdate: useBlogFilterDispatch,
    useSelector: useBlogStateSelector,
} = createContainer(useValue);
