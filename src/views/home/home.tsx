import { Page } from 'components';
import { useTranslation } from 'react-i18next';
import { Introduction } from './introduction';
import { Statistics } from './statistics';
import { Services } from './services';
import { Advantages } from './advantages';
import { Customers } from './customers';
import { Profit } from './profit';
import { Callback } from './callback';
import { Callback } from './location';

export const Home: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Page title={t('home:homePage')}>
            <Introduction />
            <Statistics />
            <Services />
            <Advantages />
            <Customers />
            <Profit />
            <Callback />
            <Location />
        </Page>
    );
};
