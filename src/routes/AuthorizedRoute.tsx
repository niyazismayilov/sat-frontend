import { useAuth } from 'context/auth/store';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export const AuthorizedRoute: React.FC<RouteProps> = ({ location, ...rest }) => {
    const [{ isLoggedIn }] = useAuth();

    if (!isLoggedIn) {
        return (
            <Redirect
                push
                to={{
                    pathname: '/sign-in',
                    state: { from: location, redirected: true },
                }}
            />
        );
    }

    return <Route location={location} {...rest} />;
};

export default AuthorizedRoute;
