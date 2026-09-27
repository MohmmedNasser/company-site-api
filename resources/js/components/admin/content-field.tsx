import { useState } from 'react';
import { ImageField } from '@/components/admin/image-field';
import { LocalizedField } from '@/components/admin/localized-field';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { ContentRecord, FieldSchema, Localized } from '@/types';

export type FieldValue = string | number | string[] | Localized | File | null;

type Props = {
    field: FieldSchema;
    value: FieldValue;
    onChange: (value: FieldValue) => void;
    errors: Record<string, string | undefined>;
    record: ContentRecord | null;
};

/**
 * Renders one server-described field (App\Admin\Field::schema()) with the
 * matching input. Every `localized` field goes through <LocalizedField>.
 */
export function ContentField({
    field,
    value,
    onChange,
    errors,
    record,
}: Props) {
    const id = `field-${field.name}`;
    const error = errors[field.name];

    switch (field.type) {
        case 'localized':
            return (
                <LocalizedField
                    id={id}
                    label={field.label}
                    value={value as Localized}
                    onChange={onChange}
                    multiline={field.multiline}
                    help={field.help}
                    errors={{
                        en: errors[`${field.name}.en`] ?? error,
                        ar: errors[`${field.name}.ar`],
                    }}
                />
            );

        case 'image':
            return (
                <ImageField
                    id={id}
                    label={field.label}
                    currentUrl={
                        (record?.[`${field.name}_url`] as string | null) ?? null
                    }
                    file={value as File | null}
                    onChange={onChange}
                    error={error}
                    help={field.help}
                />
            );

        case 'select':
            return (
                <FieldShell id={id} field={field} error={error}>
                    <Select
                        value={(value as string) || undefined}
                        onValueChange={onChange}
                    >
                        <SelectTrigger
                            id={id}
                            className="h-8"
                            aria-invalid={error ? true : undefined}
                        >
                            <SelectValue placeholder="Choose…" />
                        </SelectTrigger>
                        <SelectContent>
                            {field.options?.map((option) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FieldShell>
            );

        case 'tags':
            return (
                <FieldShell
                    id={id}
                    field={field}
                    error={
                        error ??
                        Object.entries(errors).find(([key]) =>
                            key.startsWith(`${field.name}.`),
                        )?.[1]
                    }
                >
                    <TagsInput
                        id={id}
                        value={value as string[]}
                        onChange={onChange}
                    />
                </FieldShell>
            );

        default:
            return (
                <FieldShell id={id} field={field} error={error}>
                    <Input
                        id={id}
                        className="h-8"
                        type={inputType(field.type)}
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        value={(value as string | number | null) ?? ''}
                        onChange={(event) => onChange(event.target.value)}
                        aria-invalid={error ? true : undefined}
                        dir={
                            field.type === 'slug' || field.type === 'url'
                                ? 'ltr'
                                : undefined
                        }
                    />
                </FieldShell>
            );
    }
}

function inputType(type: FieldSchema['type']): string {
    switch (type) {
        case 'url':
            return 'url';
        case 'number':
            return 'number';
        case 'date':
            return 'date';
        default:
            return 'text';
    }
}

function FieldShell({
    id,
    field,
    error,
    children,
}: {
    id: string;
    field: FieldSchema;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="grid gap-2">
            <Label htmlFor={id}>{field.label}</Label>
            {children}
            {field.help && (
                <p className="text-xs text-muted-foreground">{field.help}</p>
            )}
            <InputError message={error} />
        </div>
    );
}

/**
 * Comma-separated tags. Keeps its own text so typing "Next.js, " isn't
 * immediately normalised away; the parsed array is what the form submits.
 */
function TagsInput({
    id,
    value,
    onChange,
}: {
    id: string;
    value: string[];
    onChange: (value: string[]) => void;
}) {
    const [text, setText] = useState(value.join(', '));

    return (
        <Input
            id={id}
            className="h-8"
            value={text}
            placeholder="Next.js, Performance, Accessibility"
            onChange={(event) => {
                setText(event.target.value);
                onChange(
                    event.target.value
                        .split(',')
                        .map((tag) => tag.trim())
                        .filter(Boolean),
                );
            }}
        />
    );
}
