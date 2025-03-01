import { CourseFilterProvider } from 'context/course-filter/store';
import { PaginationProvider } from 'context/pagination/store';
import { CourseTable } from './components/course-table';

export const Courses: React.FC = () => {
    return (
        <CourseFilterProvider>
            <PaginationProvider>
                <CourseTable />
            </PaginationProvider>
        </CourseFilterProvider>
    );
};
