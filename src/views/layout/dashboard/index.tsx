import { lazy } from 'react';
import { useAuth } from 'context/auth/store';
const CustomerDashboardLayout = lazy(() => import('views/layout/dashboard/customer'));
const ManagerDashboardLayout = lazy(() => import('views/layout/dashboard/manager'));

const DashboardLayout: React.FC = () => {
    const [{ user }] = useAuth();
    if (user?.role['type'] === 'authenticated') {
        return <CustomerDashboardLayout />;
    } else {
        return <ManagerDashboardLayout />;
    }
};
export default DashboardLayout;
