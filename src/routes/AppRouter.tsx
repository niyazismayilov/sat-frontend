import { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Nartio from 'views/nartio';

const TrainerDetailPage = lazy(() => import('views/trainer-detail'));
const TrainersPage = lazy(() => import('views/trainers'));
const HomePage = lazy(() => import('views/home'));
const ContactPage = lazy(() => import('views/contact'));
const SignInPage = lazy(() => import('views/auth/sign-in-page'));
const ResetPasswordPage = lazy(() => import('views/auth/reset-password'));
const TrainingDetailPage = lazy(() => import('views/training-detail'));
const BlogsPage = lazy(() => import('views/blogs'));
const BlogDetailPage = lazy(() => import('views/blog-detail'));
const VideosPage = lazy(() => import('views/videos'));
const VideoDetailPage = lazy(() => import('views/video-detail'));
const BroadcastSeriesPage = lazy(() => import('views/broadcast-series'));
const BroadcastSeriePage = lazy(() => import('views/broadcast-serie'));
const BroadcastPage = lazy(() => import('views/broadcast'));
const ConsultingPage = lazy(() => import('views/consultings/what-is-consulting'));
const MarketResearchPage = lazy(() => import('views/consultings/market-research'));
const StrategyPage = lazy(() => import('views/consultings/strategy'));
const BusinessModelPage = lazy(() => import('views/consultings/busines-model'));
const SalesSystemPage = lazy(() => import('views/consultings/sales-system'));
const MarketingSystemPage = lazy(() => import('views/consultings/marketing-system'));
const HumanResourcePage = lazy(() => import('views/consultings/human-resources'));
const JobAnalysisPage = lazy(() => import('views/consultings/job-analysis'));
const ManagementStructurePage = lazy(() => import('views/consultings/management-structure'));
const ResponsibilitiesPage = lazy(() => import('views/consultings/responsibilities'));
const SalarySystemPage = lazy(() => import('views/consultings/salary-system'));
const PerformanceSystemPage = lazy(() => import('views/consultings/performance-system'));
const RecruitmentPage = lazy(() => import('views/consultings/recruitment'));
const AboutUsPage = lazy(() => import('views/about-us'));
const SatForumPage = lazy(() => import('views/events/sat-forum'));
const BusinessAdministrationForumPage = lazy(() => import('views/events/business-administration-forum'));
const StrategicHrForumPage = lazy(() => import('views/events/strategic-hr-forum'));
const MasterClassPage = lazy(() => import('views/events/master-class'));
const LeagueOfCompaniesPage = lazy(() => import('views/project/league-of-companies'));
const VendorFactoryPage = lazy(() => import('views/project/vendor-factory'));
const CustomerReferansPage = lazy(() => import('views/home/customers/components'));

const AppRouter: React.FC = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/elaqe" component={ContactPage} />
            <Route exact path="/sign-in" component={SignInPage} />
            <Route exact path="/reset-password" component={ResetPasswordPage} />
            <Route exact path="/telimler/:slug" component={TrainingDetailPage} />
            <Route exact path="/bloq" component={BlogsPage} />
            <Route exact path="/bloq/:slug" component={BlogDetailPage} />
            <Route exact path="/video" component={VideosPage} />
            <Route exact path="/video/:slug" component={VideoDetailPage} />
            <Route exact path="/telimciler/:slug" component={TrainerDetailPage} />
            <Route exact path="/telimciler" component={TrainersPage} />
            <Route exact path="/verilis-seriyalari" component={BroadcastSeriesPage} />
            <Route exact path="/verilis-seriyalari/:slug" component={BroadcastSeriePage} />
            <Route exact path="/verilis/:slug/" component={BroadcastPage} />
            <Route exact path="/konsaltinq/konsaltinq-nedir" component={ConsultingPage} />
            <Route exact path="/konsaltinq/bazar-arasdirmalari" component={MarketResearchPage} />
            <Route exact path="/konsaltinq/strategiyanin-hazirlanmasi" component={StrategyPage} />
            <Route exact path="/konsaltinq/biznes-modelin-tekmillesdirilmesi" component={BusinessModelPage} />
            <Route exact path="/konsaltinq/satis-sisteminin-qurulmasi" component={SalesSystemPage} />
            <Route exact path="/konsaltinq/marketing-sisteminin-qurulmasi" component={MarketingSystemPage} />
            <Route exact path="/konsaltinq/insan-resurslari-konsaltinqi" component={HumanResourcePage} />
            <Route exact path="/konsaltinq/is-analizi" component={JobAnalysisPage} />
            <Route exact path="/konsaltinq/idareetme-strukturu" component={ManagementStructurePage} />
            <Route exact path="/konsaltinq/vezife-ohdelikleri" component={ResponsibilitiesPage} />
            <Route exact path="/konsaltinq/emek-haqqi-ve-motivasiya-sistemi" component={SalarySystemPage} />
            <Route exact path="/konsaltinq/performans-menecment-sistemi" component={PerformanceSystemPage} />
            <Route exact path="/konsaltinq/ise-qebul-sistemi" component={RecruitmentPage} />
            <Route exact path="/tedbirler/sat-forum" component={SatForumPage} />
            <Route exact path="/tedbirler/biznes-idareciliyi-forumu" component={BusinessAdministrationForumPage} />
            <Route exact path="/tedbirler/stratejik-hr-forumu" component={StrategicHrForumPage} />
            <Route exact path="/tedbirler/master-klass" component={MasterClassPage} />
            <Route exact path="/layiheler/sirketler-liqasi" component={LeagueOfCompaniesPage} />
            <Route exact path="/layiheler/satici-fabriki" component={VendorFactoryPage} />
            <Route exact path="/customers-referans/:id" component={CustomerReferansPage} />

            <Route exact path="/niye-biz" component={AboutUsPage} />
            <Route exact path="/nartio" component={Nartio} />

            {/* <Route exact path="/404" component={NotFoundPage} /> */}
        </Switch>
    );
};
export default AppRouter;
