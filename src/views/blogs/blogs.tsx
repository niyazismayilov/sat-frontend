import { Container, Typography } from '@mui/material';
import { Page } from 'components';
import { PaginationProvider } from 'context/pagination/store';
import { useTranslation } from 'react-i18next';
import { BlogList } from './blog-list';

export const Blogs: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Page title={t('blog:blogs')}>
            <Container>
                <PaginationProvider>
                    <Typography fontSize={36} fontWeight={700} color="primary.main" mt={5} mb={5}>
                        {t('blog:blogs')}
                    </Typography>
                    <BlogList />
                </PaginationProvider>
            </Container>
        </Page>
    );
};
