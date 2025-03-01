import { Dispatch, Reducer, useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { INITIAL_PARTICIPANT_FILTER_STATE, ParticipantAction, reducer, PARTICIPANTS_FILTER } from './reducer';

const useValue = (): [PARTICIPANTS_FILTER, Dispatch<ParticipantAction>] => {
    const [state, dispatch] = useReducer<Reducer<PARTICIPANTS_FILTER, ParticipantAction>>(
        reducer,
        INITIAL_PARTICIPANT_FILTER_STATE,
    );

    return [state, dispatch];
};

export const {
    Provider: ParticipantFilterProvider,
    useTracked: useParticipantFilter,
    useTrackedState: useParticipantFilterState,
    useUpdate: useParticipantFilterDispatch,
    useSelector: useParticipantStateSelector,
} = createContainer(useValue);
