import { Dispatch, Reducer, useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { INITIAL_COURSE_REGISTER_FILTER_STATE, CourseRegisterAction, reducer, COURSE_REGISTER_FILTER } from './reducer';

const useValue = (): [COURSE_REGISTER_FILTER, Dispatch<CourseRegisterAction>] => {
    const [state, dispatch] = useReducer<Reducer<COURSE_REGISTER_FILTER, CourseRegisterAction>>(
        reducer,
        INITIAL_COURSE_REGISTER_FILTER_STATE,
    );

    return [state, dispatch];
};

export const {
    Provider: CourseRegisterFilterProvider,
    useTracked: useCourseRegisterFilter,
    useTrackedState: useCourseRegisterFilterState,
    useUpdate: useCourseRegisterFilterDispatch,
    useSelector: useCourseRegisterStateSelector,
} = createContainer(useValue);
