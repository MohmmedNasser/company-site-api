import { Link } from '@inertiajs/react';
import {
    BookOpen,
    Briefcase,
    Building2,
    CircleHelp,
    FileText,
    Flag,
    Footprints,
    Gem,
    LayoutGrid,
    Mail,
    MessageSquareQuote,
    Newspaper,
    Settings,
    Users,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { index as messages } from '@/routes/admin/messages';
import { edit as settings } from '@/routes/admin/settings';
import { index as subscribers } from '@/routes/admin/subscribers';
import type { NavItem } from '@/types';

const overviewItems: NavItem[] = [
    { title: 'Dashboard', href: dashboard(), icon: LayoutGrid },
];

// One entry per content-type controller under app/Http/Controllers/Admin.
const contentItems: NavItem[] = [
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

const siteItems: NavItem[] = [
    { title: 'Settings', href: settings(), icon: Settings },
    { title: 'Contact Messages', href: messages(), icon: Mail },
    { title: 'Newsletter Subscribers', href: subscribers(), icon: BookOpen },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain label="Overview" items={overviewItems} />
                <NavMain label="Content" items={contentItems} />
                <NavMain label="Site" items={siteItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
