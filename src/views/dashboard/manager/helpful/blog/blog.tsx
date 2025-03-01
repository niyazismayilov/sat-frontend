import { PaginationProvider } from 'context/pagination/store';
import { BlogFilterProvider } from 'context/useful/blog/store';
import { BlogTable } from './components/blog-table';

export const Blog: React.FC = () => {
    return (
        <BlogFilterProvider>
            <PaginationProvider>
                <BlogTable />
            </PaginationProvider>
        </BlogFilterProvider>
    );
};
