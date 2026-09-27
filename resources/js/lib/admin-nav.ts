import {
    BookOpen,
    Briefcase,
    Building2,
    CircleHelp,
    FileText,
    Flag,
    FilePlus2,
    Footprints,
    Gem,
    LayoutGrid,
    Mail,
    MessageSquareQuote,
    Newspaper,
    Settings,
    Users,
} from 'lucide-react';
import { dashboard } from '@/routes';
import { index as messages } from '@/routes/admin/messages';
import { edit as settings } from '@/routes/admin/settings';
import { index as subscribers } from '@/routes/admin/subscribers';
import type { NavItem } from '@/types';

export const overviewItems: NavItem[] = [
    { title: 'Dashboard', href: dashboard(), icon: LayoutGrid },
];

/**
 * One entry per content-type controller under app/Http/Controllers/Admin.
 * Shared by the sidebar and the command palette so the two can't drift.
 */
export const contentItems: NavItem[] = [
    { title: 'Services', href: '/admin/services', icon: Briefcase },
    { title: 'Projects', href: '/admin/projects', icon: FileText },
    {
        title: 'Testimonials',
        href: '/admin/testimonials',
        icon: MessageSquareQuote,
    },
    { title: 'Clients', href: '/admin/clients', icon: Building2 },
    {
        title: 'Process Steps',
        href: '/admin/process-steps',
        icon: Footprints,
    },
    { title: 'FAQ', href: '/admin/faq', icon: CircleHelp },
    { title: 'Posts', href: '/admin/posts', icon: Newspaper },
    { title: 'Team Members', href: '/admin/team-members', icon: Users },
    { title: 'Values', href: '/admin/values', icon: Gem },
    { title: 'Timeline', href: '/admin/timeline', icon: Flag },
];

export const siteItems: NavItem[] = [
    { title: 'Settings', href: settings(), icon: Settings },
    { title: 'Contact Messages', href: messages(), icon: Mail },
    { title: 'Newsletter Subscribers', href: subscribers(), icon: BookOpen },
];

/**
 * "Create new {singular}" quick actions for the command palette, one per
 * content type. Each content type's create route is `/admin/{slug}/create`
 * — see ContentForm's `contentUrl()` helper; there's no single Wayfinder
 * helper spanning all ten controllers, so this builds the URL the same way.
 * Singular labels are copied from each controller's `typeMeta()` so the
 * palette's wording matches the form pages exactly.
 */
export const createActions: NavItem[] = [
    { title: 'Create new Service', href: '/admin/services/create' },
    { title: 'Create new Project', href: '/admin/projects/create' },
    { title: 'Create new Testimonial', href: '/admin/testimonials/create' },
    { title: 'Create new Client', href: '/admin/clients/create' },
    {
        title: 'Create new Process step',
        href: '/admin/process-steps/create',
    },
    { title: 'Create new FAQ item', href: '/admin/faq/create' },
    { title: 'Create new Post', href: '/admin/posts/create' },
    { title: 'Create new Team member', href: '/admin/team-members/create' },
    { title: 'Create new Value', href: '/admin/values/create' },
    { title: 'Create new Milestone', href: '/admin/timeline/create' },
].map((item) => ({ ...item, icon: FilePlus2 }));
