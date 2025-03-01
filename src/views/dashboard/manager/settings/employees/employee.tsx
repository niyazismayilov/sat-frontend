import { EmployeeFilterProvider } from 'context/employee-filter/store';
import { EmployeeTable } from './components/employee-table';
import { PaginationProvider } from 'context/pagination/store';

export const Employee: React.FC = () => {
    return (
        <EmployeeFilterProvider>
            <PaginationProvider>
                <EmployeeTable />
            </PaginationProvider>
        </EmployeeFilterProvider>
    );
};
