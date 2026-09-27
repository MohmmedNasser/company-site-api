import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Pagination as PaginationMeta } from '@/types';

/** Prev/next pager. Renders nothing when everything fits on one page. */
export function Pagination({ meta }: { meta: PaginationMeta }) {
    if (meta.lastPage <= 1) {
        return null;
    }

    return (
        <nav
            aria-label="Pagination"
            className="flex items-center justify-between gap-4 text-sm text-muted-foreground"
        >
            <span>
                Page {meta.currentPage} of {meta.lastPage} · {meta.total} total
            </span>
            <div className="flex gap-2">
                <PageLink href={meta.prevUrl} label="Previous">
                    <ChevronLeft className="rtl:rotate-180" />
                </PageLink>
                <PageLink href={meta.nextUrl} label="Next">
                    <ChevronRight className="rtl:rotate-180" />
                </PageLink>
            </div>
        </nav>
    );
}

function PageLink({
    href,
    label,
    children,
}: {
    href: string | null;
    label: string;
    children: React.ReactNode;
}) {
    if (!href) {
        return (
            <Button variant="outline" size="icon" className="size-8" disabled>
                {children}
                <span className="sr-only">{label}</span>
            </Button>
        );
    }

    return (
        <Button variant="outline" size="icon" className="size-8" asChild>
            <Link href={href} preserveScroll>
                {children}
                <span className="sr-only">{label}</span>
            </Link>
        </Button>
    );
}
