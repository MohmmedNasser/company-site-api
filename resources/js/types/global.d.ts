import type { ContentLocale } from '@/types/admin';
import type { Auth } from '@/types/auth';
import type { FlashToast } from '@/types/ui';

declare module 'react' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            locale: string;
            contentLocales: ContentLocale[];
            [key: string]: unknown;
        };
        // Written server-side by Inertia::flash('toast', [...]); read by
        // useFlashToast() and shown through sonner.
        flashDataType: {
            toast?: FlashToast;
        };
    }
}
