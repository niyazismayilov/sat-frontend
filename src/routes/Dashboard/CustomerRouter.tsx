import { Redirect, Switch, Route } from 'react-router-dom';
import { lazy } from 'react';

const CoursesPage = lazy(() => import('views/dashboard/customer/courses'));
const ProfilePage = lazy(() => import('views/dashboard/customer/profile'));
const SettingsPage = lazy(() => import('views/dashboard/customer/settings'));

const CustomerRouter: React.FC = () => (
    <Switch>
        <Route exact path="/d/kurslarim" component={CoursesPage} />
        <Route exact path="/d/profil" component={ProfilePage} />
        <Route exact path="/d/tenzimlemeler" component={SettingsPage} />
        <Redirect from="*" to="/d/404" />
    </Switch>
);

export default CustomerRouter;
