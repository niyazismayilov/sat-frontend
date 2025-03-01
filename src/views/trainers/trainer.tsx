import { Container } from '@mui/material';
import { PaginationProvider } from 'context/pagination/store';
import { TrainerList } from './trainers-list';

export const Trainer: React.FC = () => {
    return (
        <Container>
            <PaginationProvider>
                <TrainerList />
            </PaginationProvider>
        </Container>
    );
};
