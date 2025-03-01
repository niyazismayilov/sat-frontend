import { Dispatch, Reducer, useEffect, useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { reducer, SettingsState, SettingsAction, INITIAL_SETTINGS_STATE } from './reducer';
// import { useTranslation } from 'react-i18next';

const useValue = (): [SettingsState, Dispatch<SettingsAction>] => {
    const [state, dispatch] = useReducer<Reducer<SettingsState, SettingsAction>>(reducer, INITIAL_SETTINGS_STATE);

    useEffect(() => {
        dispatch({ type: 'SETTINGS_LOADED' });
    }, []);

    return [state, dispatch];
};

export const {
    Provider: SettingsProvider,
    useTracked: useSettings,
    useTrackedState: useSettingsState,
    useUpdate: useSettingsDispatch,
    useSelector: useSettingsStateSelector,
} = createContainer(useValue);
