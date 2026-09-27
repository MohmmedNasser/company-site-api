import settings from './settings'
import messages from './messages'
import subscribers from './subscribers'
import services from './services'
import projects from './projects'
import testimonials from './testimonials'
import clients from './clients'
import processSteps from './process-steps'
import faq from './faq'
import posts from './posts'
import teamMembers from './team-members'
import values from './values'
import timeline from './timeline'
const admin = {
    settings: Object.assign(settings, settings),
messages: Object.assign(messages, messages),
subscribers: Object.assign(subscribers, subscribers),
services: Object.assign(services, services),
projects: Object.assign(projects, projects),
testimonials: Object.assign(testimonials, testimonials),
clients: Object.assign(clients, clients),
processSteps: Object.assign(processSteps, processSteps),
faq: Object.assign(faq, faq),
posts: Object.assign(posts, posts),
teamMembers: Object.assign(teamMembers, teamMembers),
values: Object.assign(values, values),
timeline: Object.assign(timeline, timeline),
}

export default admin