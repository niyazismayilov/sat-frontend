import { CallbacksFilterProvider } from 'context/callbacks-filter/store';
import { PaginationProvider } from 'context/pagination/store';
import { ReturnsTable } from './components/returns-table';

export const Returns: React.FC = () => {
    return (
        <CallbacksFilterProvider>
            <PaginationProvider>
                <ReturnsTable />
            </PaginationProvider>
        </CallbacksFilterProvider>
    );
};
