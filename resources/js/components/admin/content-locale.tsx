import { usePage } from '@inertiajs/react';
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { ContentLocale } from '@/types';

type ContentLocaleState = {
    locales: ContentLocale[];
    locale: ContentLocale;
    setLocale: (locale: ContentLocale) => void;
};

const ContentLocaleContext = createContext<ContentLocaleState | null>(null);

/**
 * Which language every <LocalizedField> on the page is showing. Shared, so
 * switching one field's tab switches them all: an editor reviews a whole
 * record in Arabic, then in English, instead of flipping thirty tabs.
 * Opens on the shared `locale` prop (the admin UI language).
 */
export function ContentLocaleProvider({ children }: { children: ReactNode }) {
    const { locale, contentLocales } = usePage().props;
    const [active, setActive] = useState<ContentLocale>(
        contentLocales.includes(locale as ContentLocale)
            ? (locale as ContentLocale)
            : contentLocales[0],
    );

    return (
        <ContentLocaleContext
            value={{
                locales: contentLocales,
                locale: active,
                setLocale: setActive,
            }}
        >
            {children}
        </ContentLocaleContext>
    );
}

export function useContentLocale(): ContentLocaleState {
    const state = useContext(ContentLocaleContext);

    if (!state) {
        throw new Error(
            'useContentLocale must be used inside <ContentLocaleProvider>.',
        );
    }

    return state;
}

export const LOCALE_NAMES: Record<ContentLocale, string> = {
    en: 'English',
    ar: 'العربية',
};
