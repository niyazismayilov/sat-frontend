import { Page } from 'components';
import { useTranslation } from 'react-i18next';
import { Customers } from 'views/home/customers';
import { Testimonial } from 'views/home/profit/testimonial';
import { GeneralInfo } from './general-info';
import { WhyConsulting } from './why-consulting';
import { Experts } from './experts';

export const Consulting: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Page title={t('home:consulting')}>
            <GeneralInfo />
            <WhyConsulting />
            <Customers />
            <Experts />
            <Testimonial />
        </Page>
    );
};
