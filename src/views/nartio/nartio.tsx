import { Page } from 'components';
import { useTranslation } from 'react-i18next';
import { GeneralInfo } from './general-info';
import { DetailedInfo } from './detailed-info';
import { AssessmentCases } from './assessment-cases';
import { AssessmentForms } from './assessment-forms';

export const Nartio = () => {
    const { t } = useTranslation(); // Keep this as it's used

    return (
        <Page title={t('home:nartio')}>
            <div>
                <GeneralInfo />
                <DetailedInfo />
                <AssessmentCases />
                <AssessmentForms />
            </div>
        </Page>
    );
};
