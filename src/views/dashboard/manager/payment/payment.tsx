import { PaymentTable } from './components/payment-table';
import { PaginationProvider } from 'context/pagination/store';
import { PaymentFilterProvider } from 'context/payment/store';

export const Payment: React.FC = () => {
    return (
        <PaymentFilterProvider>
            <PaginationProvider>
                <PaymentTable />
            </PaginationProvider>
        </PaymentFilterProvider>
    );
};
