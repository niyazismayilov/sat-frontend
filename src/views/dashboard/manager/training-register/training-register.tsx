import { PaginationProvider } from 'context/pagination/store';
import { CourseRegisterFilterProvider } from 'context/course-register-filter/store';
import { RegisteredTable } from './components/registered-table';

export const TrainingRegister: React.FC = () => {
    return (
        <CourseRegisterFilterProvider>
            <PaginationProvider>
                <RegisteredTable />
            </PaginationProvider>
        </CourseRegisterFilterProvider>
    );
};
