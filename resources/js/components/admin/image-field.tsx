import { ImageIcon } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
    id: string;
    label: string;
    /** URL of the image already saved (legacy URL or uploaded file). */
    currentUrl: string | null;
    file: File | null;
    onChange: (file: File | null) => void;
    error?: string;
    help?: string;
};

/**
 * File input with a thumbnail. Shows the newly picked file if there is one,
 * otherwise the saved image. Leaving it empty on edit keeps the saved image
 * — the server only replaces the column when a file is actually sent.
 */
export function ImageField({
    id,
    label,
    currentUrl,
    file,
    onChange,
    error,
    help,
}: Props) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // The blob URL is made when the file is picked (not in an effect), and
    // the previous one is released each time a new file replaces it.
    const pick = (next: File | null) => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }

        setPreviewUrl(next ? URL.createObjectURL(next) : null);
        onChange(next);
    };

    const shown = (file && previewUrl) ?? currentUrl;

    return (
        <div className="grid gap-2">
            <Label htmlFor={id}>{label}</Label>
            <div className="flex items-center gap-4">
                <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-card">
                    {shown ? (
                        <img
                            src={shown}
                            alt=""
                            className="size-full object-cover"
                        />
                    ) : (
                        <ImageIcon className="size-5 text-muted-foreground" />
                    )}
                </div>
                <div className="grid min-w-0 flex-1 gap-1">
                    <Input
                        id={id}
                        type="file"
                        accept="image/*"
                        onChange={(event) =>
                            pick(event.target.files?.[0] ?? null)
                        }
                        aria-invalid={error ? true : undefined}
                    />
                    <p className="truncate text-xs text-muted-foreground">
                        {file
                            ? `New file: ${file.name}`
                            : currentUrl
                              ? `Current: ${currentUrl}`
                              : 'No image yet.'}
                    </p>
                </div>
            </div>
            {help && <p className="text-xs text-muted-foreground">{help}</p>}
            <InputError message={error} />
        </div>
    );
}
