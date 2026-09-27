export type ContentLocale = 'en' | 'ar';

export type Localized = Record<ContentLocale, string>;

/** Mirrors App\Admin\Field::schema(). */
export type FieldSchema = {
    name: string;
    type:
        | 'localized'
        | 'text'
        | 'slug'
        | 'url'
        | 'image'
        | 'select'
        | 'tags'
        | 'number'
        | 'date';
    label: string;
    multiline?: boolean;
    options?: { value: string; label: string }[];
    help?: string;
    min?: number;
    max?: number;
    step?: number;
};

/** Mirrors App\Admin\ContentType::meta(). */
export type ContentTypeMeta = {
    slug: string;
    label: string;
    singular: string;
    searchable: boolean;
    paginated: boolean;
};

export type ContentColumn = {
    key: string;
    label: string;
    type: 'text' | 'localized' | 'image';
};

/** Mirrors App\Admin\ContentType::present(). */
export type ContentRecord = {
    id: string;
    order: number;
    [field: string]: unknown;
};

export type Pagination = {
    currentPage: number;
    lastPage: number;
    total: number;
    prevUrl: string | null;
    nextUrl: string | null;
};
