import { Head, useForm } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { LocalizedField } from '@/components/admin/localized-field';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { dashboard } from '@/routes';
import { edit, update } from '@/routes/admin/settings';
import type { Localized } from '@/types';

type SocialLink = { platform: string; url: string };

type SettingsTree = { [key: string]: SettingsNode };
type SettingsNode = string | Localized | SettingsTree | SocialLink[];

type Settings = {
    hero: SettingsTree;
    sections: SettingsTree;
    pages: SettingsTree;
    contact: SettingsTree;
    newsletter: SettingsTree;
    social: SocialLink[];
};

const SECTIONS: { key: keyof Settings; label: string; description: string }[] =
    [
        { key: 'hero', label: 'Hero', description: 'The home page opener.' },
        {
            key: 'sections',
            label: 'Sections',
            description: 'Heading and description for each home page section.',
        },
        {
            key: 'pages',
            label: 'Pages',
            description: 'Intro copy for each inner page.',
        },
        {
            key: 'contact',
            label: 'Contact',
            description: 'Details shown in the footer and on /contact.',
        },
        {
            key: 'newsletter',
            label: 'Newsletter',
            description: 'The footer newsletter block.',
        },
        {
            key: 'social',
            label: 'Social',
            description: 'Footer social links, in display order.',
        },
    ];

// Long-form keys get a textarea instead of a single-line input.
const MULTILINE = new Set([
    'description',
    'body',
    'subtitle',
    'subtext',
    'address',
]);

/**
 * The site_settings singleton, one tab per JSON column. Field layout is
 * derived from the data itself rather than hand-written per key, the same
 * way SiteSettingRequest derives its rules — so the form, the rules, and
 * the stored shape can't drift apart.
 */
export default function SettingsEdit({ settings }: { settings: Settings }) {
    const form = useForm<Settings>(settings);
    const errors = form.errors as Record<string, string | undefined>;

    const setPath = (path: string[], value: SettingsNode) =>
        form.setData((data) => setIn(data, path, value) as Settings);

    return (
        <>
            <Head title="Site settings" />

            <form
                className="flex max-w-3xl flex-col gap-6 p-4 md:p-6"
                onSubmit={(event) => {
                    event.preventDefault();
                    form.put(update.url(), { preserveScroll: true });
                }}
            >
                <Heading
                    title="Site settings"
                    description="Copy and details the public site reads from GET /api/v1/settings."
                />

                <Tabs defaultValue="hero">
                    <TabsList className="flex-wrap">
                        {SECTIONS.map((section) => (
                            <TabsTrigger key={section.key} value={section.key}>
                                {section.label}
                                {hasErrorUnder(errors, section.key) && (
                                    <span
                                        aria-hidden
                                        className="size-1.5 rounded-full bg-foreground"
                                    />
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {SECTIONS.map((section) => (
                        <TabsContent
                            key={section.key}
                            value={section.key}
                            className="mt-4 flex flex-col gap-6"
                        >
                            <p className="text-sm text-muted-foreground">
                                {section.description}
                            </p>
                            {section.key === 'social' ? (
                                <SocialEditor
                                    links={form.data.social}
                                    onChange={(links) =>
                                        form.setData('social', links)
                                    }
                                    errors={errors}
                                />
                            ) : (
                                <TreeFields
                                    node={form.data[section.key]}
                                    path={[section.key]}
                                    onChange={setPath}
                                    errors={errors}
                                />
                            )}
                        </TabsContent>
                    ))}
                </Tabs>

                <div className="border-t pt-6">
                    <Button type="submit" size="sm" disabled={form.processing}>
                        Save settings
                    </Button>
                </div>
            </form>
        </>
    );
}

SettingsEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Site settings', href: edit() },
    ],
};

function TreeFields({
    node,
    path,
    onChange,
    errors,
}: {
    node: SettingsTree;
    path: string[];
    onChange: (path: string[], value: SettingsNode) => void;
    errors: Record<string, string | undefined>;
}) {
    return (
        <>
            {Object.entries(node).map(([key, value]) => {
                const childPath = [...path, key];
                const dotted = childPath.join('.');
                const id = `settings-${childPath.join('-')}`;

                if (isLocalized(value)) {
                    return (
                        <LocalizedField
                            key={key}
                            id={id}
                            label={humanize(key)}
                            value={value}
                            multiline={MULTILINE.has(key)}
                            onChange={(next) => onChange(childPath, next)}
                            errors={{
                                en: errors[`${dotted}.en`],
                                ar: errors[`${dotted}.ar`],
                            }}
                        />
                    );
                }

                if (typeof value === 'string') {
                    return (
                        <div key={key} className="grid gap-2">
                            <Label htmlFor={id}>{humanize(key)}</Label>
                            <Input
                                id={id}
                                className="h-8"
                                dir="ltr"
                                value={value}
                                onChange={(event) =>
                                    onChange(childPath, event.target.value)
                                }
                                aria-invalid={errors[dotted] ? true : undefined}
                            />
                            <InputError message={errors[dotted]} />
                        </div>
                    );
                }

                return (
                    <fieldset
                        key={key}
                        className="flex flex-col gap-6 rounded-lg border p-4"
                    >
                        <legend className="px-1 text-sm font-medium">
                            {humanize(key)}
                        </legend>
                        <TreeFields
                            node={value as SettingsTree}
                            path={childPath}
                            onChange={onChange}
                            errors={errors}
                        />
                    </fieldset>
                );
            })}
        </>
    );
}

function SocialEditor({
    links,
    onChange,
    errors,
}: {
    links: SocialLink[];
    onChange: (links: SocialLink[]) => void;
    errors: Record<string, string | undefined>;
}) {
    const set = (i: number, patch: Partial<SocialLink>) =>
        onChange(
            links.map((link, j) => (j === i ? { ...link, ...patch } : link)),
        );

    return (
        <div className="flex flex-col gap-3">
            {links.map((link, i) => (
                <div
                    key={i}
                    className="grid grid-cols-[10rem_1fr_auto] items-start gap-2"
                >
                    <div className="grid gap-1">
                        <Input
                            className="h-8"
                            aria-label={`Link ${i + 1} platform`}
                            placeholder="Platform"
                            value={link.platform}
                            onChange={(event) =>
                                set(i, { platform: event.target.value })
                            }
                        />
                        <InputError message={errors[`social.${i}.platform`]} />
                    </div>
                    <div className="grid gap-1">
                        <Input
                            className="h-8"
                            dir="ltr"
                            type="url"
                            aria-label={`Link ${i + 1} URL`}
                            placeholder="https://"
                            value={link.url}
                            onChange={(event) =>
                                set(i, { url: event.target.value })
                            }
                        />
                        <InputError message={errors[`social.${i}.url`]} />
                    </div>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        onClick={() =>
                            onChange(links.filter((_, j) => j !== i))
                        }
                    >
                        <Trash2 />
                        <span className="sr-only">Remove link {i + 1}</span>
                    </Button>
                </div>
            ))}
            <InputError message={errors.social} />
            <div>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                        onChange([...links, { platform: '', url: '' }])
                    }
                >
                    <Plus />
                    Add link
                </Button>
            </div>
        </div>
    );
}

function isLocalized(value: unknown): value is Localized {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return false;
    }

    const keys = Object.keys(value).sort();

    return keys.length === 2 && keys[0] === 'ar' && keys[1] === 'en';
}

function hasErrorUnder(
    errors: Record<string, string | undefined>,
    prefix: string,
): boolean {
    return Object.keys(errors).some(
        (key) => key === prefix || key.startsWith(`${prefix}.`),
    );
}

/** ctaPrimary → "Cta primary", clientsCount → "Clients count". */
function humanize(key: string): string {
    const words = key.replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLowerCase();

    return words.charAt(0).toUpperCase() + words.slice(1);
}

function setIn(target: unknown, path: string[], value: unknown): unknown {
    if (path.length === 0) {
        return value;
    }

    const [head, ...rest] = path;
    const node = (target ?? {}) as Record<string, unknown>;

    return { ...node, [head]: setIn(node[head], rest, value) };
}
