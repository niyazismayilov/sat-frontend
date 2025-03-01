import { Container } from '@mui/material';
import { Page } from 'components';
import { PaginationProvider } from 'context/pagination/store';
import { useTranslation } from 'react-i18next';
import { BroadcastSeriesList } from './boadcast-series-list';

export const BroadcastSeries: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Page title={t('broadcast:broadcasts')}>
            <Container>
                <PaginationProvider>
                    <BroadcastSeriesList />
                </PaginationProvider>
            </Container>
        </Page>
    );
};
