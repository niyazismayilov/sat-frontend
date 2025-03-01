import { Dispatch, Reducer, useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { INITIAL_TRAINER_FILTER_STATE, TrainerAction, reducer, TRAINERS_FILTER } from './reducer';

const useValue = (): [TRAINERS_FILTER, Dispatch<TrainerAction>] => {
    const [state, dispatch] = useReducer<Reducer<TRAINERS_FILTER, TrainerAction>>(
        reducer,
        INITIAL_TRAINER_FILTER_STATE,
    );

    return [state, dispatch];
};

export const {
    Provider: TrainerFilterProvider,
    useTracked: useTrainerFilter,
    useTrackedState: useTrainerFilterState,
    useUpdate: useTrainerFilterDispatch,
    useSelector: useTrainerStateSelector,
} = createContainer(useValue);
