import { Redirect, Route, Switch } from 'react-router-dom';
import { lazy } from 'react';

const HomePage = lazy(() => import('views/dashboard/manager/home'));

const TrainerPage = lazy(() => import('views/dashboard/manager/trainer'));
const CreateTrainerPage = lazy(() => import('views/dashboard/manager/trainer/create'));
const EditTrainerPage = lazy(() => import('views/dashboard/manager/trainer/edit'));

const ParticipantPage = lazy(() => import('views/dashboard/manager/participant'));
const CreateParticipantPage = lazy(() => import('views/dashboard/manager/participant/create'));
const EditParticipantPage = lazy(() => import('views/dashboard/manager/participant/edit'));

const BlogPage = lazy(() => import('views/dashboard/manager/helpful/blog'));
const CreateBlogPage = lazy(() => import('views/dashboard/manager/helpful/blog/create'));
const EditBlogPage = lazy(() => import('views/dashboard/manager/helpful/blog/edit'));

const SliderPage = lazy(() => import('views/dashboard/manager/helpful/show-sliders'));
const CreateSliderPage = lazy(() => import('views/dashboard/manager/helpful/show-sliders/create'));
const EditSliderShowPage = lazy(() => import('views/dashboard/manager/helpful/show-sliders/edit'));

const VideoPage = lazy(() => import('views/dashboard/manager/helpful/video'));
const CreateVideoPage = lazy(() => import('views/dashboard/manager/helpful/video/create'));
const EditVideoPage = lazy(() => import('views/dashboard/manager/helpful/video/edit'));

const EpisodesPage = lazy(() => import('views/dashboard/manager/helpful/episodes'));
const CreateEpisodePage = lazy(() => import('views/dashboard/manager/helpful/episodes/create-new-episode'));
const EditEpisodePage = lazy(() => import('views/dashboard/manager/helpful/episodes/edit-episode'));

const ManagersPage = lazy(() => import('views/dashboard/manager/settings/managers'));
const CreateManagersPage = lazy(() => import('views/dashboard/manager/settings/managers/create'));
const EditManagersPage = lazy(() => import('views/dashboard/manager/settings/managers/edit'));

const EmployeesPage = lazy(() => import('views/dashboard/manager/settings/employees'));
const CreateEmployeesPage = lazy(() => import('views/dashboard/manager/settings/employees/create'));
const EditEmployeesPage = lazy(() => import('views/dashboard/manager/settings/employees/edit'));

const SeriesPage = lazy(() => import('views/dashboard/manager/helpful/episodes/series'));
const CreateSeriesPage = lazy(() => import('views/dashboard/manager/helpful/episodes/series/create-series'));
const EditSeriesPage = lazy(() => import('views/dashboard/manager/helpful/episodes/series/edit-series'));

const CoursesPage = lazy(() => import('views/dashboard/manager/courses'));
const CreateCoursePage = lazy(() => import('views/dashboard/manager/courses/create'));
const EditCoursePage = lazy(() => import('views/dashboard/manager/courses/edit'));

const GroupsPage = lazy(() => import('views/dashboard/manager/groups'));
const CreateGroupsPage = lazy(() => import('views/dashboard/manager/groups/create'));
const EditGroupsPage = lazy(() => import('views/dashboard/manager/groups/edit'));

const TrainingRegisterPage = lazy(() => import('views/dashboard/manager/training-register'));
const CreateTrainingRegisterPage = lazy(() => import('views/dashboard/manager/training-register/create'));
const EditTrainingRegisterPage = lazy(() => import('views/dashboard/manager/training-register/edit'));

const PaymentPage = lazy(() => import('views/dashboard/manager/payment'));
const PersonalInformation = lazy(() => import('views/dashboard/manager/settings/personal-information'));
const CrmRequestPage = lazy(() => import('views/dashboard/manager/CRM/requests'));
const CrmReturnPage = lazy(() => import('views/dashboard/manager/CRM/returns'));
const CrmSubscribersPage = lazy(() => import('views/dashboard/manager/CRM/subscribers'));

const ManagerRouter: React.FC = () => {
    return (
        <Switch>
            <Route exact path="/d/home" component={HomePage} />

            <Route exact path="/d/trainers" component={TrainerPage} />
            <Route exact path="/d/trainers/create" component={CreateTrainerPage} />
            <Route exact path="/d/trainers/edit/:id" component={EditTrainerPage} />

            <Route exact path="/d/participants" component={ParticipantPage} />
            <Route exact path="/d/participants/create" component={CreateParticipantPage} />
            <Route exact path="/d/Participants/edit/:id" component={EditParticipantPage} />

            <Route exact path="/d/helpful/blog" component={BlogPage} />
            <Route exact path="/d/helpful/blog/create" component={CreateBlogPage} />
            <Route exact path="/d/helpful/blog/edit/:id" component={EditBlogPage} />

            <Route exact path="/d/helpful/sliders" component={SliderPage} />
            <Route exact path="/d/helpful/sliders/create" component={CreateSliderPage} />
            <Route exact path="/d/helpful/sliders/edit/:id" component={EditSliderShowPage} />

            <Route exact path="/d/helpful/video" component={VideoPage} />
            <Route exact path="/d/helpful/video/create" component={CreateVideoPage} />
            <Route exact path="/d/helpful/video/edit/:id" component={EditVideoPage} />

            <Route exact path="/d/helpful/episodes" component={EpisodesPage} />
            <Route exact path="/d/helpful/episodes/create-episode" component={CreateEpisodePage} />
            <Route exact path="/d/helpful/episodes/edit-episode/:id" component={EditEpisodePage} />

            <Route exact path="/d/settings/managers" component={ManagersPage} />
            <Route exact path="/d/settings/managers/create" component={CreateManagersPage} />
            <Route exact path="/d/settings/managers/edit/:id" component={EditManagersPage} />

            <Route exact path="/d/settings/employees" component={EmployeesPage} />
            <Route exact path="/d/settings/employees/create" component={CreateEmployeesPage} />
            <Route exact path="/d/settings/employees/edit/:id" component={EditEmployeesPage} />

            <Route exact path="/d/helpful/episodes/series" component={SeriesPage} />
            <Route exact path="/d/helpful/episodes/series/create-series" component={CreateSeriesPage} />
            <Route exact path="/d/helpful/episodes/series/edit-series/:id" component={EditSeriesPage} />

            <Route exact path="/d/training/courses" component={CoursesPage} />
            <Route exact path="/d/training/courses/create" component={CreateCoursePage} />
            <Route exact path="/d/training/course/edit/:id" component={EditCoursePage} />

            <Route exact path="/d/training/groups" component={GroupsPage} />
            <Route exact path="/d/training/groups/create" component={CreateGroupsPage} />
            <Route exact path="/d/training/groups/edit/:id" component={EditGroupsPage} />

            <Route exact path="/d/training/training-register" component={TrainingRegisterPage} />
            <Route exact path="/d/training/training-register/create" component={CreateTrainingRegisterPage} />
            <Route exact path="/d/training/training-register/edit/:id" component={EditTrainingRegisterPage} />

            <Route exact path="/d/payment" component={PaymentPage} />

            <Route exact path="/d/manager/CRM/requests" component={CrmRequestPage} />
            <Route exact path="/d/manager/CRM/returns" component={CrmReturnPage} />
            <Route exact path="/d/manager/CRM/subscribers" component={CrmSubscribersPage} />

            <Route exact path="/d/settings/personal-information" component={PersonalInformation} />

            <Redirect from="*" to="/d/404" />
        </Switch>
    );
};
export default ManagerRouter;
