import { Head, Link, router } from '@inertiajs/react';
import { ArrowDown, ArrowUp, Pencil, Plus, Search, X } from 'lucide-react';
import { useState } from 'react';
import { ConfirmDelete } from '@/components/admin/confirm-delete';
import { Pagination } from '@/components/admin/pagination';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { dashboard } from '@/routes';
import type {
    ContentColumn,
    ContentRecord,
    ContentTypeMeta,
    Localized,
    Pagination as PaginationMeta,
} from '@/types';

type Props = {
    type: ContentTypeMeta;
    columns: ContentColumn[];
    records: ContentRecord[];
    pagination: PaginationMeta | null;
    filters: { search: string };
};

/**
 * Every content-type admin route follows the same shape: /admin/{slug}
 * plus an optional segment. There's no single Wayfinder helper spanning
 * all ten controllers, so this page builds the URL itself.
 */
const contentUrl = (slug: string, ...segments: (string | number)[]) =>
    ['/admin', slug, ...segments].join('/');

/**
 * The one index page for every content type: a table of records in their
 * public `order`, with search, reorder, edit, and delete. Everything
 * type-specific (columns, labels, whether search/pagination apply) comes
 * from the server's ContentType definition.
 */
export default function ContentIndex({
    type,
    columns,
    records,
    pagination,
    filters,
}: Props) {
    const [search, setSearch] = useState(filters.search);
    const searching = filters.search !== '';

    // Global position, not just position on this page — the first row of
    // page 2 can still move up.
    const isFirst = (i: number) =>
        i === 0 && (pagination?.currentPage ?? 1) === 1;
    const isLast = (i: number) =>
        i === records.length - 1 &&
        (pagination?.currentPage ?? 1) === (pagination?.lastPage ?? 1);

    const submitSearch = (value: string) =>
        router.get(contentUrl(type.slug), value ? { search: value } : {}, {
            preserveState: true,
            replace: true,
        });

    const reorder = (record: ContentRecord, direction: 'up' | 'down') =>
        router.post(
            contentUrl(type.slug, record.id, 'move'),
            { direction },
            { preserveScroll: true, preserveState: true },
        );

    return (
        <>
            <Head title={type.label} />

            <div className="flex flex-col gap-6 p-4 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <Heading
                        title={type.label}
                        description={`${pagination?.total ?? records.length} in the order the site shows them.`}
                    />
                    <Button size="sm" asChild>
                        <Link href={contentUrl(type.slug, 'create')}>
                            <Plus />
                            New {type.singular.toLowerCase()}
                        </Link>
                    </Button>
                </div>

                {type.searchable && (
                    <form
                        role="search"
                        className="flex max-w-sm items-center gap-2"
                        onSubmit={(event) => {
                            event.preventDefault();
                            submitSearch(search.trim());
                        }}
                    >
                        <div className="relative flex-1">
                            <Search className="pointer-events-none absolute start-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="search"
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Search by title (English or Arabic)"
                                aria-label={`Search ${type.label.toLowerCase()}`}
                                className="h-8 ps-8"
                            />
                        </div>
                        {searching && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setSearch('');
                                    submitSearch('');
                                }}
                            >
                                <X />
                                Clear
                            </Button>
                        )}
                    </form>
                )}

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-24">Order</TableHead>
                                {columns.map((column) => (
                                    <TableHead key={column.key}>
                                        {column.label}
                                    </TableHead>
                                ))}
                                <TableHead className="w-24 text-end">
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {records.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length + 2}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        {searching
                                            ? `No ${type.label.toLowerCase()} match “${filters.search}”.`
                                            : `No ${type.label.toLowerCase()} yet.`}
                                    </TableCell>
                                </TableRow>
                            )}

                            {records.map((record, i) => (
                                <TableRow key={record.id} className="h-9">
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <span className="w-6 text-muted-foreground tabular-nums">
                                                {record.order}
                                            </span>
                                            {/* While filtered, the row above isn't the record's real neighbour. */}
                                            {!searching && (
                                                <>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="size-7"
                                                        disabled={isFirst(i)}
                                                        onClick={() =>
                                                            reorder(
                                                                record,
                                                                'up',
                                                            )
                                                        }
                                                    >
                                                        <ArrowUp />
                                                        <span className="sr-only">
                                                            Move up
                                                        </span>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="size-7"
                                                        disabled={isLast(i)}
                                                        onClick={() =>
                                                            reorder(
                                                                record,
                                                                'down',
                                                            )
                                                        }
                                                    >
                                                        <ArrowDown />
                                                        <span className="sr-only">
                                                            Move down
                                                        </span>
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </TableCell>

                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.key}
                                            className="max-w-xs truncate"
                                        >
                                            <Cell
                                                column={column}
                                                record={record}
                                            />
                                        </TableCell>
                                    ))}

                                    <TableCell>
                                        <div className="flex justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="size-8"
                                                asChild
                                            >
                                                <Link
                                                    href={contentUrl(
                                                        type.slug,
                                                        record.id,
                                                        'edit',
                                                    )}
                                                >
                                                    <Pencil />
                                                    <span className="sr-only">
                                                        Edit{' '}
                                                        {recordTitle(
                                                            record,
                                                            columns,
                                                        )}
                                                    </span>
                                                </Link>
                                            </Button>
                                            <ConfirmDelete
                                                subject={`the ${type.singular.toLowerCase()} “${recordTitle(record, columns)}”`}
                                                action={{
                                                    url: contentUrl(
                                                        type.slug,
                                                        record.id,
                                                    ),
                                                    method: 'delete',
                                                }}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {pagination && <Pagination meta={pagination} />}
            </div>
        </>
    );
}

ContentIndex.layout = (props: Props) => ({
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: props.type.label, href: contentUrl(props.type.slug) },
    ],
});

function Cell({
    column,
    record,
}: {
    column: ContentColumn;
    record: ContentRecord;
}) {
    const value = record[column.key];

    if (column.type === 'image') {
        const url = record[`${column.key}_url`] as string | null;

        return url ? (
            <img
                src={url}
                alt=""
                className="size-8 rounded-sm border object-cover"
            />
        ) : null;
    }

    if (column.type === 'localized') {
        return <>{(value as Localized | null)?.en ?? ''}</>;
    }

    return <>{value == null ? '' : String(value)}</>;
}

/** The first localized column's English value — what the record is called. */
function recordTitle(record: ContentRecord, columns: ContentColumn[]): string {
    const column = columns.find((c) => c.type === 'localized');

    return column
        ? ((record[column.key] as Localized | null)?.en ?? record.id)
        : record.id;
}
