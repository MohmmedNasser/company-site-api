import { Head } from '@inertiajs/react';
import { Download } from 'lucide-react';
import { Pagination } from '@/components/admin/pagination';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { dashboard } from '@/routes';
import { exportMethod, index } from '@/routes/admin/subscribers';
import type { Pagination as PaginationMeta } from '@/types';

type Props = {
    subscribers: { id: number; email: string; createdAt: string }[];
    pagination: PaginationMeta;
};

const dateFormat = new Intl.DateTimeFormat('en', { dateStyle: 'medium' });

/** Read-only list of POST /api/v1/newsletter sign-ups. */
export default function SubscribersIndex({ subscribers, pagination }: Props) {
    return (
        <>
            <Head title="Newsletter subscribers" />

            <div className="flex flex-col gap-6 p-4 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <Heading
                        title="Newsletter subscribers"
                        description={`${pagination.total} subscribed.`}
                    />
                    <Button variant="outline" size="sm" asChild>
                        <a href={exportMethod.url()} download>
                            <Download />
                            Export CSV
                        </a>
                    </Button>
                </div>

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Email</TableHead>
                                <TableHead>Subscribed</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subscribers.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={2}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        No subscribers yet.
                                    </TableCell>
                                </TableRow>
                            )}
                            {subscribers.map((subscriber) => (
                                <TableRow key={subscriber.id} className="h-9">
                                    <TableCell dir="ltr">
                                        {subscriber.email}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {dateFormat.format(
                                            new Date(subscriber.createdAt),
                                        )}
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

SubscribersIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Newsletter subscribers', href: index() },
    ],
};
