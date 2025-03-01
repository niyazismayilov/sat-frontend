import { PaginationProvider } from 'context/pagination/store';
import { TrainerFilterProvider } from 'context/trainer-filter/store';
import { TrainerTable } from './components/trainer-table';

export const Trainer: React.FC = () => {
    return (
        <TrainerFilterProvider>
            <PaginationProvider>
                <TrainerTable />
            </PaginationProvider>
        </TrainerFilterProvider>
    );
};
