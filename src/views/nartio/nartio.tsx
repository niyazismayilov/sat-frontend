import { Page } from 'components';
import { useTranslation } from 'react-i18next';
import { GeneralInfo } from './general-info';

export const Nartio = () => {
    const { t } = useTranslation(); // Keep this as it's used

    return (
        <Page title={t('home:nartio')}>
            <div>
                <GeneralInfo />
            </div>
        </Page>
    );
};
