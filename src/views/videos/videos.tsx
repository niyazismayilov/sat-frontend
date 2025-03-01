import { Container, Typography } from '@mui/material';
import { Page } from 'components';
import { PaginationProvider } from 'context/pagination/store';
import { useTranslation } from 'react-i18next';
import { VideoList } from './video-list';

export const Videos: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Page title={t('video:videos')}>
            <Container>
                <PaginationProvider>
                    <Typography fontSize={36} fontWeight={700} color="primary.main" mt={5} mb={5}>
                        {t('video:videos')}
                    </Typography>
                    <VideoList />
                </PaginationProvider>
            </Container>
        </Page>
    );
};
