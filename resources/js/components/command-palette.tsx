import * as DialogPrimitive from '@radix-ui/react-dialog';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandInput,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import { contentItems, createActions, siteItems } from '@/lib/admin-nav';
import { toUrl } from '@/lib/utils';
import type { NavItem } from '@/types';

/**
 * Global Cmd/Ctrl+K navigator. Mounted once in AppLayout so it's reachable
 * from every authenticated admin page. Deliberately un-animated (no
 * fade/zoom classes on the overlay or content) per the command palette's
 * "instant open" requirement — every other admin dialog keeps its 150ms
 * transition, this one doesn't.
 */
export function CommandPalette() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                setOpen((value) => !value);
            }
        }

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    const go = (href: NavItem['href']) => {
        setOpen(false);
        router.visit(toUrl(href));
    };

    return (
        <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80" />
                <DialogPrimitive.Content
                    className="fixed top-[50%] left-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-lg border bg-popover p-0 shadow-lg"
                    aria-describedby={undefined}
                >
                    <DialogPrimitive.Title className="sr-only">
                        Command palette
                    </DialogPrimitive.Title>
                    <Command>
                        <CommandInput placeholder="Jump to…" autoFocus />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>

                            <CommandGroup heading="Content">
                                {contentItems.map((item) => (
                                    <CommandItem
                                        key={item.title}
                                        value={item.title}
                                        onSelect={() => go(item.href)}
                                    >
                                        {item.icon && <item.icon />}
                                        {item.title}
                                    </CommandItem>
                                ))}
                            </CommandGroup>

                            <CommandSeparator />

                            <CommandGroup heading="Site">
                                {siteItems.map((item) => (
                                    <CommandItem
                                        key={item.title}
                                        value={item.title}
                                        onSelect={() => go(item.href)}
                                    >
                                        {item.icon && <item.icon />}
                                        {item.title}
                                    </CommandItem>
                                ))}
                            </CommandGroup>

                            <CommandSeparator />

                            <CommandGroup heading="Actions">
                                {createActions.map((item) => (
                                    <CommandItem
                                        key={item.title}
                                        value={item.title}
                                        onSelect={() => go(item.href)}
                                    >
                                        {item.icon && <item.icon />}
                                        {item.title}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}
