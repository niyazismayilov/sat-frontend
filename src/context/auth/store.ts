import { isEmpty } from 'utils/validationHelper';
import { Dispatch, Reducer, useEffect, useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { reducer, AuthState, AuthAction, INITIAL_AUTH_STATE } from './reducer';
export const ACCESS_TOKEN_KEY = '@auth/accessToken';

export const getAccessToken = (): string | null => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (isEmpty(accessToken)) {
        return null;
    }

    try {
        return JSON.parse(accessToken as string);
    } catch (_) {
        return accessToken;
    }
};

const useValue = (): [AuthState, Dispatch<AuthAction>] => {
    const [state, dispatch] = useReducer<Reducer<AuthState, AuthAction>>(reducer, INITIAL_AUTH_STATE);

    useEffect(() => {
        dispatch({ type: 'AUTH_LOADED' });
    }, []);

    return [state, dispatch];
};

export const {
    Provider: AuthProvider,
    useTracked: useAuth,
    useTrackedState: useAuthState,
    useUpdate: useAuthDispatch,
    useSelector: useAuthStateSelector,
} = createContainer(useValue);
