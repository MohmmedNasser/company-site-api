import { Head, Link, useForm } from '@inertiajs/react';
import { ContentField } from '@/components/admin/content-field';
import type { FieldValue } from '@/components/admin/content-field';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { dashboard } from '@/routes';
import type {
    ContentRecord,
    ContentTypeMeta,
    FieldSchema,
    Localized,
} from '@/types';

type Props = {
    type: ContentTypeMeta;
    fields: FieldSchema[];
    /** null on create. */
    record: ContentRecord | null;
};

/**
 * Every content-type admin route follows the same shape: /admin/{slug}
 * plus an optional segment. There's no single Wayfinder helper spanning
 * all ten controllers, so this page builds the URL itself.
 */
const contentUrl = (slug: string, ...segments: (string | number)[]) =>
    ['/admin', slug, ...segments].join('/');

function initialValue(
    field: FieldSchema,
    record: ContentRecord | null,
): FieldValue {
    const value = record?.[field.name];

    switch (field.type) {
        case 'localized':
            return (value as Localized | undefined) ?? { en: '', ar: '' };
        case 'tags':
            return (value as string[] | undefined) ?? [];
        case 'image':
            // Never pre-filled: null means "keep the saved image".
            return null;
        default:
            return (value as string | number | undefined) ?? '';
    }
}

/**
 * The one create/edit form for every content type, rendered from the
 * field schema the server sends.
 */
export default function ContentForm({ type, fields, record }: Props) {
    const form = useForm<Record<string, FieldValue>>(
        Object.fromEntries(
            fields.map((field) => [field.name, initialValue(field, record)]),
        ),
    );

    const errors = form.errors as Record<string, string | undefined>;

    const submit = (event: React.FormEvent) => {
        event.preventDefault();

        if (record === null) {
            form.post(contentUrl(type.slug), { preserveScroll: true });

            return;
        }

        // A file upload must be multipart, and PHP only parses multipart
        // bodies on POST — so the update is sent as POST with Laravel's
        // `_method` override, which routes it to the PUT route.
        form.transform((data) => ({ ...data, _method: 'put' }));
        form.post(contentUrl(type.slug, record.id), {
            preserveScroll: true,
        });
    };

    const title = record
        ? `Edit ${type.singular.toLowerCase()}`
        : `New ${type.singular.toLowerCase()}`;

    return (
        <>
            <Head title={`${title} · ${type.label}`} />

            <form
                onSubmit={submit}
                className="flex max-w-3xl flex-col gap-6 p-4 md:p-6"
            >
                <Heading
                    title={title}
                    description={
                        record
                            ? `ID ${record.id} · position ${record.order}`
                            : 'Added at the end of the list; reorder it from the index.'
                    }
                />

                {fields.map((field) => (
                    <ContentField
                        key={field.name}
                        field={field}
                        record={record}
                        value={form.data[field.name]}
                        onChange={(value) => form.setData(field.name, value)}
                        errors={errors}
                    />
                ))}

                <div className="flex items-center gap-2 border-t pt-6">
                    <Button type="submit" size="sm" disabled={form.processing}>
                        {form.processing && <Spinner />}
                        {record
                            ? 'Save changes'
                            : `Create ${type.singular.toLowerCase()}`}
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={contentUrl(type.slug)}>Cancel</Link>
                    </Button>
                    {form.progress && (
                        <span className="text-xs text-muted-foreground tabular-nums">
                            Uploading… {form.progress.percentage}%
                        </span>
                    )}
                </div>
            </form>
        </>
    );
}

ContentForm.layout = (props: Props) => ({
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: props.type.label, href: contentUrl(props.type.slug) },
        {
            title: props.record ? 'Edit' : 'New',
            href: contentUrl(props.type.slug),
        },
    ],
});
