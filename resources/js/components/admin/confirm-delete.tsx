import { router } from '@inertiajs/react';
import type { UrlMethodPair } from '@inertiajs/core';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

type Props = {
    /** What is being deleted, shown in the dialog: "the service “Web Development”". */
    subject: string;
    action: UrlMethodPair;
};

/**
 * A delete button that opens a confirmation dialog first. In a monochrome
 * admin the destructive button can't lean on red, so the dialog — naming
 * exactly what goes and saying it can't be undone — is the safeguard.
 */
export function ConfirmDelete({ subject, action }: Props) {
    const [processing, setProcessing] = useState(false);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                    <Trash2 />
                    <span className="sr-only">Delete {subject}</span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete {subject}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This permanently removes it from the site. It can’t be
                        undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel size="sm">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        variant="destructive"
                        size="sm"
                        disabled={processing}
                        onClick={() =>
                            router.visit(action, {
                                preserveScroll: true,
                                onStart: () => setProcessing(true),
                                onFinish: () => setProcessing(false),
                            })
                        }
                    >
                        <Trash2 />
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
