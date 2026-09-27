import { ContentLocaleProvider } from '@/components/admin/content-locale';
import { CommandPalette } from '@/components/command-palette';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem } from '@/types';

export default function AppLayout({
    breadcrumbs = [],
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs}>
            <ContentLocaleProvider>{children}</ContentLocaleProvider>
            <CommandPalette />
        </AppLayoutTemplate>
    );
}
