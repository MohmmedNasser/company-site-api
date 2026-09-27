import {
    LOCALE_NAMES,
    useContentLocale,
} from '@/components/admin/content-locale';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import type { ContentLocale, Localized } from '@/types';

type Props = {
    id: string;
    label: string;
    value: Localized;
    onChange: (value: Localized) => void;
    /** Validation messages keyed by locale, e.g. from errors['title.ar']. */
    errors?: Partial<Record<ContentLocale, string>>;
    multiline?: boolean;
    help?: string;
};

/**
 * The one editor for every `{ ar, en }` value in the admin — content-type
 * forms and site settings alike. One component, two inputs behind an
 * en/ar tab pair; which tab is showing comes from ContentLocaleProvider.
 *
 * Errors for BOTH languages render under the tabs regardless of which one
 * is active, and the tab of a language with an error is marked, so a
 * missing Arabic value can't hide behind the English tab.
 */
export function LocalizedField({
    id,
    label,
    value,
    onChange,
    errors = {},
    multiline = false,
    help,
}: Props) {
    const { locales, locale, setLocale } = useContentLocale();
    const Control = multiline ? Textarea : Input;

    return (
        <div className="grid gap-2">
            <Tabs
                value={locale}
                onValueChange={(next) => setLocale(next as ContentLocale)}
                className="gap-1.5"
            >
                <div className="flex items-end justify-between gap-4">
                    <Label htmlFor={`${id}-${locale}`}>{label}</Label>
                    <TabsList className="h-7">
                        {locales.map((code) => (
                            <TabsTrigger
                                key={code}
                                value={code}
                                className="px-2 text-xs"
                                aria-label={`${label}, ${LOCALE_NAMES[code]}${errors[code] ? ', has an error' : ''}`}
                            >
                                {code.toUpperCase()}
                                {errors[code] && (
                                    <span
                                        aria-hidden
                                        className="size-1.5 rounded-full bg-foreground"
                                    />
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                {locales.map((code) => (
                    <TabsContent key={code} value={code}>
                        <Control
                            id={`${id}-${code}`}
                            lang={code}
                            dir={code === 'ar' ? 'rtl' : 'ltr'}
                            value={value?.[code] ?? ''}
                            onChange={(event) =>
                                onChange({
                                    ...value,
                                    [code]: event.target.value,
                                })
                            }
                            aria-invalid={errors[code] ? true : undefined}
                            className={multiline ? 'min-h-24' : undefined}
                        />
                    </TabsContent>
                ))}
            </Tabs>

            {help && <p className="text-xs text-muted-foreground">{help}</p>}

            {/* The server's attributes() already name the language
                ("The Title (Arabic) field is required."). */}
            {locales.map((code) => (
                <InputError key={code} message={errors[code]} />
            ))}
        </div>
    );
}
