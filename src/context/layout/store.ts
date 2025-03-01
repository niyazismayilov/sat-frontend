import { Dispatch, Reducer, useReducer, useEffect } from 'react';
import { createContainer } from 'react-tracked';
import { INITIAL_LAYOUT_STATE, LayoutAction, LayoutState, reducer } from './reducer';

const useValue = (): [LayoutState, Dispatch<LayoutAction>] => {
    const [state, dispatch] = useReducer<Reducer<LayoutState, LayoutAction>>(reducer, INITIAL_LAYOUT_STATE);

    useEffect(() => {
        dispatch({ type: 'SIDEBAR_LOADED' });
    }, []);

    return [state, dispatch];
};

export const {
    Provider: LayoutProvider,
    useTracked: useLayout,
    useTrackedState: useLayoutState,
    useUpdate: useLayoutDispatch,
    useSelector: useLayoutStateSelector,
} = createContainer(useValue);
