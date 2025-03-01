import { Dispatch, Reducer, useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { INITIAL_COURSE_FILTER_STATE, CourseAction, reducer, COURSES_FILTER } from './reducer';

const useValue = (): [COURSES_FILTER, Dispatch<CourseAction>] => {
    const [state, dispatch] = useReducer<Reducer<COURSES_FILTER, CourseAction>>(reducer, INITIAL_COURSE_FILTER_STATE);

    return [state, dispatch];
};

export const {
    Provider: CourseFilterProvider,
    useTracked: useCourseFilter,
    useTrackedState: useCourseFilterState,
    useUpdate: useCourseFilterDispatch,
    useSelector: useCourseStateSelector,
} = createContainer(useValue);
