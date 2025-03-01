import { PaginationProvider } from 'context/pagination/store';
import { BroadcastsFilterProvider } from 'context/useful/broadcast/store';
import { EpisodeTable } from './components/episode-table';

export const Episodes: React.FC = () => {
    return (
        <BroadcastsFilterProvider>
            <PaginationProvider>
                <EpisodeTable />
            </PaginationProvider>
        </BroadcastsFilterProvider>
    );
};
