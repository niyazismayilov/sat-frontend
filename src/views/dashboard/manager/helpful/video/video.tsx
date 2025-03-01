import { PaginationProvider } from 'context/pagination/store';
import { VideoFilterProvider } from 'context/useful/video/store';
import { VideoTable } from './components/video-table';

export const Video: React.FC = () => {
    return (
        <VideoFilterProvider>
            <PaginationProvider>
                <VideoTable />
            </PaginationProvider>
        </VideoFilterProvider>
    );
};
