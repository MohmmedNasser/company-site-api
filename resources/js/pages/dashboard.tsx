import { Head, Link } from '@inertiajs/react';
import Heading from '@/components/heading';
import { dashboard } from '@/routes';
import { index as messagesIndex } from '@/routes/admin/messages';
import { index as subscribersIndex } from '@/routes/admin/subscribers';

type Props = {
    content: { slug: string; label: string; count: number }[];
    unreadMessages: number;
    subscribers: number;
};

export default function Dashboard({
    content,
    unreadMessages,
    subscribers,
}: Props) {
    return (
        <>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-8 p-4 md:p-6">
                <Heading
                    title="Dashboard"
                    description="What's on the site right now."
                />

                <section aria-labelledby="inbox-heading" className="grid gap-3">
                    <h2
                        id="inbox-heading"
                        className="text-sm font-medium text-muted-foreground"
                    >
                        Inbox
                    </h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                        <StatCard
                            href={messagesIndex().url}
                            label="Unread messages"
                            value={unreadMessages}
                        />
                        <StatCard
                            href={subscribersIndex().url}
                            label="Newsletter subscribers"
                            value={subscribers}
                        />
                    </div>
                </section>

                <section
                    aria-labelledby="content-heading"
                    className="grid gap-3"
                >
                    <h2
                        id="content-heading"
                        className="text-sm font-medium text-muted-foreground"
                    >
                        Content
                    </h2>
                    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
                        {content.map((type) => (
                            <StatCard
                                key={type.slug}
                                href={`/admin/${type.slug}`}
                                label={type.label}
                                value={type.count}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};

/** Elevation by border, not fill — the monochrome system's rule. */
function StatCard({
    href,
    label,
    value,
}: {
    href: string;
    label: string;
    value: number;
}) {
    return (
        <Link
            href={href}
            className="grid gap-1 rounded-lg border bg-card p-4 transition-colors duration-150 hover:border-foreground/30 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none motion-reduce:transition-none"
        >
            <span className="text-2xl font-semibold tabular-nums">{value}</span>
            <span className="text-sm text-muted-foreground">{label}</span>
        </Link>
    );
}
