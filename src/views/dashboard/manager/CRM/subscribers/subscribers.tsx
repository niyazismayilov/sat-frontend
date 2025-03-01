import { PaginationProvider } from 'context/pagination/store';
import { SubscribersFilterProvider } from 'context/subscribers-filter/store';
import { SubscribersTable } from './components/subscribers-table';

export const Subscribers: React.FC = () => {
    return (
        <SubscribersFilterProvider>
            <PaginationProvider>
                <SubscribersTable />
            </PaginationProvider>
        </SubscribersFilterProvider>
    );
};
