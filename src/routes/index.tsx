import { lazy, Suspense } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import browserHistory from 'utils/browser-utils';
import AuthorizedRoute from './AuthorizedRoute';

const AppLayout = lazy(() => import('views/layout/app'));
const DashboardLayout = lazy(() => import('views/layout/dashboard'));

const Routes: React.FC = () => {
    return (
        <Router history={browserHistory}>
            <Suspense fallback={<></>}>
                <Switch>
                    <AuthorizedRoute path="/d" component={DashboardLayout} />
                    <Route path="/" component={AppLayout} />\
                </Switch>
            </Suspense>
        </Router>
    );
};

export default Routes;
