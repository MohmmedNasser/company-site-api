import ServiceController from './ServiceController'
import ProjectController from './ProjectController'
import TestimonialController from './TestimonialController'
import ClientController from './ClientController'
import ProcessStepController from './ProcessStepController'
import FaqItemController from './FaqItemController'
import PostController from './PostController'
import TeamMemberController from './TeamMemberController'
import ValueItemController from './ValueItemController'
import TimelineEntryController from './TimelineEntryController'
import SiteSettingController from './SiteSettingController'
import ContactController from './ContactController'
import NewsletterController from './NewsletterController'
const V1 = {
    ServiceController: Object.assign(ServiceController, ServiceController),
ProjectController: Object.assign(ProjectController, ProjectController),
TestimonialController: Object.assign(TestimonialController, TestimonialController),
ClientController: Object.assign(ClientController, ClientController),
ProcessStepController: Object.assign(ProcessStepController, ProcessStepController),
FaqItemController: Object.assign(FaqItemController, FaqItemController),
PostController: Object.assign(PostController, PostController),
TeamMemberController: Object.assign(TeamMemberController, TeamMemberController),
ValueItemController: Object.assign(ValueItemController, ValueItemController),
TimelineEntryController: Object.assign(TimelineEntryController, TimelineEntryController),
SiteSettingController: Object.assign(SiteSettingController, SiteSettingController),
ContactController: Object.assign(ContactController, ContactController),
NewsletterController: Object.assign(NewsletterController, NewsletterController),
}

export default V1