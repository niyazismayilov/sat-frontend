import { Dispatch, Reducer, useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { INITIAL_VIDEO_FILTER_STATE, VideoAction, reducer, VIDEO_FILTER } from './reducer';

const useValue = (): [VIDEO_FILTER, Dispatch<VideoAction>] => {
    const [state, dispatch] = useReducer<Reducer<VIDEO_FILTER, VideoAction>>(reducer, INITIAL_VIDEO_FILTER_STATE);

    return [state, dispatch];
};

export const {
    Provider: VideoFilterProvider,
    useTracked: useVideoFilter,
    useTrackedState: useVideoFilterState,
    useUpdate: useVideoFilterDispatch,
    useSelector: useVideoStateSelector,
} = createContainer(useValue);
