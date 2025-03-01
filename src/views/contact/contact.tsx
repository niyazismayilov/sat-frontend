import { Page } from 'components';
import { useTranslation } from 'react-i18next';
import { ContactUs } from './contact-us';
import { Map } from './map';
import { Phone } from './phone';

export const Contact: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Page title={t('contact:pageName')}>
            <Phone />
            <ContactUs />
            <Map />
        </Page>
    );
};
