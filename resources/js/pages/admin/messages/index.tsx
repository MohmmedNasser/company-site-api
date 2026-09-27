import { Head, Link, router } from '@inertiajs/react';
import {
    Archive,
    ArchiveRestore,
    Download,
    Mail,
    MailOpen,
} from 'lucide-react';
import { ConfirmDelete } from '@/components/admin/confirm-delete';
import { Pagination } from '@/components/admin/pagination';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';
import {
    archive,
    destroy,
    exportMethod,
    index,
    read,
} from '@/routes/admin/messages';
import type { Pagination as PaginationMeta } from '@/types';

type Message = {
    id: number;
    name: string;
    email: string;
    service: string | null;
    budget: string | null;
    message: string;
    read: boolean;
    archived: boolean;
    createdAt: string;
};

type Filter = 'inbox' | 'archived' | 'all';

type Props = {
    messages: Message[];
    pagination: PaginationMeta;
    filter: Filter;
    unreadCount: number;
};

const FILTERS: { value: Filter; label: string }[] = [
    { value: 'inbox', label: 'Inbox' },
    { value: 'archived', label: 'Archived' },
    { value: 'all', label: 'All' },
];

const dateFormat = new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
});

/**
 * Read-only inbox for POST /api/v1/contact submissions. Unread rows are
 * marked by weight and a dot, not colour.
 */
export default function MessagesIndex({
    messages,
    pagination,
    filter,
    unreadCount,
}: Props) {
    const patch = (action: { url: string; method: 'patch' }) =>
        router.visit(action, { preserveScroll: true, preserveState: true });

    return (
        <>
            <Head title="Contact messages" />

            <div className="flex flex-col gap-6 p-4 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <Heading
                        title="Contact messages"
                        description={`${unreadCount} unread in the inbox.`}
                    />
                    {/* A file download, not an Inertia visit — plain <a>. */}
                    <Button variant="outline" size="sm" asChild>
                        <a href={exportMethod.url({ query: { filter } })} download>
                            <Download />
                            Export CSV
                        </a>
                    </Button>
                </div>

                <nav aria-label="Message filter" className="flex gap-1">
                    {FILTERS.map((option) => (
                        <Button
                            key={option.value}
                            variant={
                                filter === option.value ? 'secondary' : 'ghost'
                            }
                            size="sm"
                            asChild
                        >
                            <Link
                                href={index({
                                    query: { filter: option.value },
                                })}
                                aria-current={
                                    filter === option.value ? 'page' : undefined
                                }
                            >
                                {option.label}
                            </Link>
                        </Button>
                    ))}
                </nav>

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>From</TableHead>
                                <TableHead>Message</TableHead>
                                <TableHead>Service · Budget</TableHead>
                                <TableHead>Received</TableHead>
                                <TableHead className="text-end">
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {messages.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        Nothing here.
                                    </TableCell>
                                </TableRow>
                            )}

                            {messages.map((message) => (
                                <TableRow
                                    key={message.id}
                                    className={cn(
                                        'h-9',
                                        !message.read && 'font-semibold',
                                    )}
                                >
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span
                                                aria-hidden
                                                className={cn(
                                                    'size-1.5 shrink-0 rounded-full',
                                                    message.read
                                                        ? 'bg-transparent'
                                                        : 'bg-foreground',
                                                )}
                                            />
                                            <div className="min-w-0">
                                                <div className="truncate">
                                                    {message.name}
                                                    {!message.read && (
                                                        <span className="sr-only">
                                                            {' '}
                                                            (unread)
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="truncate text-xs font-normal text-muted-foreground">
                                                    {message.email}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="max-w-xs">
                                        <MessageDialog message={message} />
                                    </TableCell>
                                    <TableCell className="font-normal text-muted-foreground">
                                        {[message.service, message.budget]
                                            .filter(Boolean)
                                            .join(' · ') || '—'}
                                    </TableCell>
                                    <TableCell className="font-normal whitespace-nowrap text-muted-foreground">
                                        {dateFormat.format(
                                            new Date(message.createdAt),
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="size-8"
                                                onClick={() =>
                                                    patch(read(message.id))
                                                }
                                            >
                                                {message.read ? (
                                                    <Mail />
                                                ) : (
                                                    <MailOpen />
                                                )}
                                                <span className="sr-only">
                                                    Mark{' '}
                                                    {message.read
                                                        ? 'unread'
                                                        : 'read'}
                                                </span>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="size-8"
                                                onClick={() =>
                                                    patch(archive(message.id))
                                                }
                                            >
                                                {message.archived ? (
                                                    <ArchiveRestore />
                                                ) : (
                                                    <Archive />
                                                )}
                                                <span className="sr-only">
                                                    {message.archived
                                                        ? 'Move to inbox'
                                                        : 'Archive'}
                                                </span>
                                            </Button>
                                            <ConfirmDelete
                                                subject={`the message from ${message.name}`}
                                                action={destroy(message.id)}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <Pagination meta={pagination} />
            </div>
        </>
    );
}

MessagesIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Contact messages', href: index() },
    ],
};

/** Opening the full text doesn't change read state — that stays an explicit action. */
function MessageDialog({ message }: { message: Message }) {
    return (
        <Dialog>
            <DialogTrigger className="block w-full truncate text-start underline-offset-4 hover:underline">
                {message.message}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{message.name}</DialogTitle>
                    <DialogDescription>
                        <a
                            href={`mailto:${message.email}`}
                            className="underline underline-offset-4"
                        >
                            {message.email}
                        </a>
                        {' · '}
                        {dateFormat.format(new Date(message.createdAt))}
                    </DialogDescription>
                </DialogHeader>
                <p className="text-sm whitespace-pre-line" dir="auto">
                    {message.message}
                </p>
            </DialogContent>
        </Dialog>
    );
}
