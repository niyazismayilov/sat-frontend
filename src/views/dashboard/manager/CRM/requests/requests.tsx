import { MessageFilterProvider } from 'context/messages-filter/store';
import { PaginationProvider } from 'context/pagination/store';
import { RequestsTable } from './components/requests-table';

export const Requests: React.FC = () => {
    return (
        <MessageFilterProvider>
            <PaginationProvider>
                <RequestsTable />
            </PaginationProvider>
        </MessageFilterProvider>
    );
};
