import { GroupFilterProvider } from 'context/group-filter/store';
import { PaginationProvider } from 'context/pagination/store';
import { GroupTable } from './components/groups-table';

export const Groups: React.FC = () => {
    return (
        <GroupFilterProvider>
            <PaginationProvider>
                <GroupTable />
            </PaginationProvider>
        </GroupFilterProvider>
    );
};
