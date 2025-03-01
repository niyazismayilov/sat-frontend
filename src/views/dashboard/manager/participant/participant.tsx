import { PaginationProvider } from 'context/pagination/store';
import { ParticipantFilterProvider } from 'context/participant-filter/store';
import { ParticipantTable } from './components/participant-table';

export const Participant: React.FC = () => {
    return (
        <ParticipantFilterProvider>
            <PaginationProvider>
                <ParticipantTable />
            </PaginationProvider>
        </ParticipantFilterProvider>
    );
};
