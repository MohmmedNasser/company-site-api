# Public JSON API — Contract (v1)

> **This file is the living contract between the two repositories.**
> `company-site-web` (Next.js — `src/lib/content/types.ts` and
> `repository.ts`) and `company-site-api` (Laravel — `app/Http/Resources/V1/`)
> both refer to it. Nothing keeps them in sync automatically: **any change to a
> field in `types.ts`, an API Resource, or this file must be made in all three
> by hand, in the same change.** A key that exists on one side and not the
> other is a silent bug — the frontend reads `undefined`, not an error.
>
> Mirror of the frontend contract used here: `docs/content-reference/`
> (`types.ts`, `repository.ts`, `mock/*.json`).
> Regression guard: `tests/Feature/Api/V1/PublicApiTest.php` asserts every
> endpoint deep-equals the frontend's mock JSON.

Every example response below was captured from a live call against the
Phase 10 seeded database (captured 2026-09-26 from `http://company-site-api.test`), not written by hand. Two
abridgements, both marked where they occur: **list responses show only the
first item** (the item count is given), and **strings longer than 160
characters are cut** and end in `…[truncated]`. Everything else — keys,
nesting, value types — is exactly what the API returned.

---

## 1. Conventions

### Base URL and versioning

```
http://company-site-api.test/api/v1        # local (Herd)
```

All routes live under `/api/v1`. A breaking change to any response shape
means a new `/api/v2` group beside v1, never an in-place edit of v1.

### Success envelope

Every 2xx body is `{ "data": T }`, where **`T` is exactly the return type of
the matching `ContentRepository` method** in `repository.ts`. The Phase 14
`api-repository.ts` therefore unwraps `json.data` and returns it as-is.
The one addition is `GET /posts`, which also carries a `meta` block (§3).

### Localized fields

Every field typed `Localized` in `types.ts` is returned as the full
`{ "ar": string, "en": string }` object. The API never picks a language —
the frontend's `pick()` resolves it at render time.

### Ordering

Every list is sorted by its `order` field, ascending — the same `byOrder()`
the mock repository applies.

### Not found → `null`

The three single-record getters (`getService`, `getProject`, `getPost`)
return `null` for an unknown slug. The API answers **404** with the error
envelope; `api-repository.ts` maps 404 → `null` and treats any other error
as a failure.

### Error envelope

Every non-2xx response under `/api/*` — 404, 405, 422, 429, 500 — has one
shape, produced in one place (`app/Exceptions/ApiExceptionRenderer.php`):

```ts
interface ApiError {
  error: {
    status: number;        // same as the HTTP status
    code: string;          // machine-readable, snake_case (see table)
    message: string;       // generic English status text — never shown raw to users
    fields?: Record<string, string[]>; // 422 only: field → messages
  };
}
```

| Status | `code`                  | When                                           |
| ------ | ----------------------- | ---------------------------------------------- |
| 404    | `not_found`             | unknown slug, unknown route                    |
| 405    | `method_not_allowed`    | e.g. `DELETE /api/v1/services`                 |
| 422    | `validation_failed`     | invalid POST body or invalid query param       |
| 429    | `too_many_requests`     | rate limit hit; `Retry-After` header is set    |
| 500    | `internal_server_error` | anything unexpected — details only in the log  |

`message` is always the generic status text, never the exception's own
message (which can name model classes or contain SQL). Validation messages
in `fields` are Laravel's English defaults; the frontend validates with zod
first and shows its own translated messages, so these exist only for a
caller that skips client-side validation.

Real examples:

`GET /api/v1/services/does-not-exist` → **HTTP 404**

```json
{
  "error": {
    "status": 404,
    "code": "not_found",
    "message": "Not Found"
  }
}
```

`DELETE /api/v1/services` → **HTTP 405**

```json
{
  "error": {
    "status": 405,
    "code": "method_not_allowed",
    "message": "Method Not Allowed"
  }
}
```

`POST /api/v1/contact` → **HTTP 422**

Request body:

```json
{"name": "A", "email": "not-an-email", "message": "short"}
```

Response:

```json
{
  "error": {
    "status": 422,
    "code": "validation_failed",
    "message": "The given data was invalid.",
    "fields": {
      "name": [
        "The name field must be at least 2 characters."
      ],
      "email": [
        "The email field must be a valid email address."
      ],
      "message": [
        "The message field must be at least 10 characters."
      ]
    }
  }
}
```

`POST /api/v1/contact` → **HTTP 429** (6th request inside one minute)

```http
Retry-After: 59
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 0
```

```json
{
  "error": {
    "status": 429,
    "code": "too_many_requests",
    "message": "Too Many Requests"
  }
}
```

### Rate limits

| Limiter       | Applies to                             | Limit                            |
| ------------- | -------------------------------------- | -------------------------------- |
| `api`         | every `/api/*` route                   | 120 requests / minute / IP       |
| `submissions` | `POST /contact`, `POST /newsletter`    | 5 requests / minute / IP / route (in addition to `api`) |

Every response carries `X-RateLimit-Limit` and `X-RateLimit-Remaining`.
See `docs/design-decisions.md` §10 for why the IP key must change at Phase 14.

### CORS

Allowed origin: `http://localhost:3000` only (no wildcard). Methods `GET`,
`POST`; request headers `Accept`, `Content-Type`; no credentials. The
production frontend origin is added in `config/cors.php` at Phase 14.
CORS only governs browser requests — Server Components and Server Actions
calling this API from the Next.js server are not subject to it.

### Request headers

Send `Accept: application/json`. POST bodies are JSON with
`Content-Type: application/json`.

---

## 2. Repository method → endpoint

| `ContentRepository` method   | Endpoint                          | `data` type                  |
| ---------------------------- | --------------------------------- | ---------------------------- |
| `getServices()`              | `GET /api/v1/services`            | `Service[]`                  |
| `getService(slug)`           | `GET /api/v1/services/{slug}`     | `Service` (404 → `null`)     |
| `getProjects(filter?)`       | `GET /api/v1/projects?category=`  | `Project[]`                  |
| `getProject(slug)`           | `GET /api/v1/projects/{slug}`     | `Project` (404 → `null`)     |
| `getTestimonials()`          | `GET /api/v1/testimonials`        | `Testimonial[]`              |
| `getClients()`               | `GET /api/v1/clients`             | `Client[]`                   |
| `getProcessSteps()`          | `GET /api/v1/process-steps`       | `ProcessStep[]`              |
| `getFaqItems()`              | `GET /api/v1/faq-items`           | `FaqItem[]`                  |
| `getPosts(page?)`            | `GET /api/v1/posts?page=`         | `Post[]`                     |
| `getPostCount()`             | `GET /api/v1/posts` → `meta.total`| `number`                     |
| `getPost(slug)`              | `GET /api/v1/posts/{slug}`        | `Post` (404 → `null`)        |
| `getTeamMembers()`           | `GET /api/v1/team-members`        | `TeamMember[]`               |
| `getValues()`                | `GET /api/v1/values`              | `ValueItem[]`                |
| `getTimeline()`              | `GET /api/v1/timeline`            | `TimelineEntry[]`            |
| `getSettings()`              | `GET /api/v1/settings`            | `SiteSettings`               |
| `submitContact(payload)`     | `POST /api/v1/contact`            | `ContactResult`              |
| `subscribeNewsletter(payload)` | `POST /api/v1/newsletter`       | `NewsletterResult`           |

All 17 methods are covered by 16 routes: `getPostCount()` has no route of
its own — it reads `meta.total` from `GET /posts` (a separate
`/posts/count` route would collide with `/posts/{slug}`).

---

## 3. Field map — `types.ts` ↔ API Resource ↔ database

Keys are listed in `types.ts` order, which is also the order each Resource
emits them. Only the transformed keys are annotated; every other key is the
column of the same name, passed through unchanged.

| Type (`types.ts`) | Resource | Keys | DB → API transformations |
| --- | --- | --- | --- |
| `Service` | `ServiceResource` | `id` `slug` `icon` `image` `categories` `order` `title` `excerpt` `body` | none |
| `Project` | `ProjectResource` | `id` `slug` `category` `status` `client` `coverImage` `order` `title` `summary` `description` | `category` ← `category_id`; `client` ← `client_id` (a `Client.id` string, **not** an embedded object); `coverImage` ← `cover_image`; `status` ← enum `->value` |
| `Testimonial` | `TestimonialResource` | `id` `clientId` `avatar` `rating` `order` `author` `role` `quote` | `clientId` ← `client_id` (note: `clientId` here, `client` on `Project` — both per `types.ts`); `rating` ← `decimal(2,1)` cast to a JSON number |
| `Client` | `ClientResource` | `id` `logo` `url` `order` `name` | none |
| `ProcessStep` | `ProcessStepResource` | `id` `icon` `order` `title` `description` | none |
| `FaqItem` | `FaqItemResource` | `id` `order` `question` `answer` | none |
| `Post` | `PostResource` | `id` `slug` `coverImage` `publishedAt` `order` `author` `title` `excerpt` `body` | `coverImage` ← `cover_image`; `publishedAt` ← `published_at` as `YYYY-MM-DD` |
| `TeamMember` | `TeamMemberResource` | `id` `avatar` `order` `name` `role` `bio` | none |
| `ValueItem` | `ValueItemResource` | `id` `icon` `order` `title` `description` | table is `values` |
| `TimelineEntry` | `TimelineEntryResource` | `id` `year` `status` `order` `title` `description` | table is `timeline`; `status` ← enum `->value` |
| `SiteSettings` | `SiteSettingResource` | `hero` `sections` `pages` `contact` `newsletter` `social` | each is a JSON column holding its whole subtree (nested keys already camelCase); `id`/timestamps dropped |

No API field ever exposes `created_at` / `updated_at`.

Models with no Resource, by design: `Category` (no type in `types.ts`;
projects expose its id as `Project.category`), `ContactMessage` and
`NewsletterSubscription` (write-only from the public API's side).

---

## 4. Endpoints

### `GET /api/v1/services`

`getServices()` → `Service[]`. No query params.

`GET /api/v1/services` → **HTTP 200** — 6 items; showing the first

```json
{
  "data": [
    {
      "id": "svc-web-development",
      "slug": "web-development",
      "icon": "Globe",
      "image": "https://picsum.photos/seed/web-development/1600/900",
      "categories": [
        "Next.js",
        "Performance",
        "Accessibility",
        "Content APIs"
      ],
      "order": 1,
      "title": {
        "ar": "تطوير الويب",
        "en": "Web Development"
      },
      "excerpt": {
        "ar": "مواقع وتطبيقات ويب سريعة وسهلة الوصول، مبنية على Next.js وأدوات حديثة.",
        "en": "Fast, accessible websites and web apps built on Next.js and modern tooling."
      },
      "body": {
        "ar": "نبني مواقع تعريفية ولوحات تحكم وتطبيقات ويب تُحمَّل بسرعة وتتحمل حركة زوار حقيقية، وتبقى سهلة التعديل بعد الإطلاق بأشهر. كل مشروع يخرج بمعمارية مكونات نظيفة وطب…[truncated]",
        "en": "We build marketing sites, dashboards, and web applications that load fast, hold up under real traffic, and stay easy to change six months after launch. Every pr…[truncated]"
      }
    }
  ]
}
```

### `GET /api/v1/services/{slug}`

`getService(slug)` → `Service`, or 404 (→ `null`).

`GET /api/v1/services/web-development` → **HTTP 200**

```json
{
  "data": {
    "id": "svc-web-development",
    "slug": "web-development",
    "icon": "Globe",
    "image": "https://picsum.photos/seed/web-development/1600/900",
    "categories": [
      "Next.js",
      "Performance",
      "Accessibility",
      "Content APIs"
    ],
    "order": 1,
    "title": {
      "ar": "تطوير الويب",
      "en": "Web Development"
    },
    "excerpt": {
      "ar": "مواقع وتطبيقات ويب سريعة وسهلة الوصول، مبنية على Next.js وأدوات حديثة.",
      "en": "Fast, accessible websites and web apps built on Next.js and modern tooling."
    },
    "body": {
      "ar": "نبني مواقع تعريفية ولوحات تحكم وتطبيقات ويب تُحمَّل بسرعة وتتحمل حركة زوار حقيقية، وتبقى سهلة التعديل بعد الإطلاق بأشهر. كل مشروع يخرج بمعمارية مكونات نظيفة وطب…[truncated]",
      "en": "We build marketing sites, dashboards, and web applications that load fast, hold up under real traffic, and stay easy to change six months after launch. Every pr…[truncated]"
    }
  }
}
```

### `GET /api/v1/projects`

`getProjects(filter?)` → `Project[]`.

| Query param | Type   | Notes |
| ----------- | ------ | ----- |
| `category`  | string | optional; exact match on the category id (`web`, `mobile`, `ecommerce`, `saas`). Unknown category → `[]`. |

**Not paginated.** `PROJECT-PLAN.md` sketched `?page=` here, but
`ProjectFilter` has no page field and every frontend caller (portfolio grid,
sitemap, `generateStaticParams`) needs the complete set — the `/portfolio`
filter runs client-side over it. A `page` param is ignored.

`GET /api/v1/projects?category=mobile` → **HTTP 200** — 2 items; showing the first

```json
{
  "data": [
    {
      "id": "proj-nour-mobile-banking",
      "slug": "nour-mobile-banking",
      "category": "mobile",
      "status": "shipped",
      "client": "client-nour-fintech",
      "coverImage": "https://picsum.photos/seed/nour-mobile-banking/1600/900",
      "order": 2,
      "title": {
        "ar": "تطبيق نور للخدمات المصرفية",
        "en": "Nour Mobile Banking App"
      },
      "summary": {
        "ar": "تطبيق مصرفي بReact Native مع تسجيل دخول بالبصمة وتحويلات فورية.",
        "en": "A React Native banking app with biometric login and instant transfers."
      },
      "description": {
        "ar": "احتاجت نور تطبيقًا مصرفيًا بسرعة تنافس التطبيقات الأصلية دون صيانة قاعدتي كود منفصلتين. أطلقنا تطبيق React Native واحدًا بتسجيل دخول بالبصمة، تحويلات فورية، وتخ…[truncated]",
        "en": "Nour needed a mobile banking app that felt as fast as their competitors' native apps without maintaining two separate codebases. We shipped a single React Nativ…[truncated]"
      }
    }
  ]
}
```

### `GET /api/v1/projects/{slug}`

`getProject(slug)` → `Project`, or 404 (→ `null`).

`GET /api/v1/projects/ferry-logistics-platform` → **HTTP 200**

```json
{
  "data": {
    "id": "proj-ferry-logistics-platform",
    "slug": "ferry-logistics-platform",
    "category": "web",
    "status": "shipped",
    "client": "client-ferry-logistics",
    "coverImage": "https://picsum.photos/seed/ferry-logistics-platform/1600/900",
    "order": 1,
    "title": {
      "ar": "منصة تتبع الشحنات لفيري",
      "en": "Ferry Logistics Tracking Platform"
    },
    "summary": {
      "ar": "لوحة تتبع شحنات لحظية حلّت محل مسار عمل قائم على جداول بيانات.",
      "en": "A real-time shipment tracking dashboard replacing a spreadsheet-based workflow."
    },
    "description": {
      "ar": "كانت فيري تتابع شحناتها عبر ثلاثة مستودعات باستخدام جدول بيانات مشترك يتعطل عند تجاوز 40 تحديثًا متزامنًا. بنينا لوحة تحكم بتحديثات حالة لحظية، تسجيل دخول للسائ…[truncated]",
      "en": "Ferry Logistics tracked shipments across three warehouses using a shared spreadsheet that broke down past 40 concurrent updates. We built a dashboard with live …[truncated]"
    }
  }
}
```

### `GET /api/v1/testimonials`

`getTestimonials()` → `Testimonial[]`. No query params.

`GET /api/v1/testimonials` → **HTTP 200** — 5 items; showing the first

```json
{
  "data": [
    {
      "id": "test-youssef-adel",
      "clientId": "client-ferry-logistics",
      "avatar": "/avatars/avatar1.jpg",
      "rating": 5,
      "order": 1,
      "author": {
        "ar": "يوسف عادل",
        "en": "Youssef Adel"
      },
      "role": {
        "ar": "مدير العمليات، فيري للخدمات اللوجستية",
        "en": "Operations Director, Ferry Logistics"
      },
      "quote": {
        "ar": "انتقلنا من ثلاثة أشخاص يراجعون جدول بيانات يدويًا إلى لوحة تحكم يثق بها كل موظفي المستودع. غطت تكلفتها خلال الشهر الأول.",
        "en": "We went from three people manually checking a spreadsheet to a dashboard the whole warehouse floor trusts. It paid for itself in the first month."
      }
    }
  ]
}
```

### `GET /api/v1/clients`

`getClients()` → `Client[]`. No query params. `Project.client` and
`Testimonial.clientId` are ids from this list.

`GET /api/v1/clients` → **HTTP 200** — 6 items; showing the first

```json
{
  "data": [
    {
      "id": "client-ferry-logistics",
      "logo": "/clients/ferry-logistics.svg",
      "url": "https://ferrylogistics.example",
      "order": 1,
      "name": {
        "ar": "فيري للخدمات اللوجستية",
        "en": "Ferry Logistics"
      }
    }
  ]
}
```

### `GET /api/v1/process-steps`

`getProcessSteps()` → `ProcessStep[]`. No query params.

`GET /api/v1/process-steps` → **HTTP 200** — 3 items; showing the first

```json
{
  "data": [
    {
      "id": "step-discover-define",
      "icon": "Sparkles",
      "order": 1,
      "title": {
        "ar": "الاستكشاف والتحديد",
        "en": "Discover & Define"
      },
      "description": {
        "ar": "نبدأ بفهم علامتكم التجارية وجمهوركم وأهدافكم. تركز هذه المرحلة على البحث، تحديد الموقع، ورسم اتجاه رقمي واضح.",
        "en": "We start by understanding your brand, audience, and objectives. This phase focuses on research, positioning, and defining a clear digital direction."
      }
    }
  ]
}
```

### `GET /api/v1/faq-items`

`getFaqItems()` → `FaqItem[]`. No query params.

`GET /api/v1/faq-items` → **HTTP 200** — 4 items; showing the first

```json
{
  "data": [
    {
      "id": "retainers",
      "order": 1,
      "question": {
        "ar": "كيف تعمل باقات الاشتراك الشهري فعليًا؟",
        "en": "How do retainers actually work?"
      },
      "answer": {
        "ar": "تحجز عددًا ثابتًا من الساعات كل شهر. نجتمع في بداية كل دورة لتحديد الأولويات، ثم ننفذها مباشرة، دون عقود أو موافقات منفصلة لكل تعديل صغير.",
        "en": "You reserve a fixed number of hours each month. We meet at the start of the cycle to set priorities, then work through them — no separate contracts or approvals…[truncated]"
      }
    }
  ]
}
```

### `GET /api/v1/posts`

`getPosts(page?)` → `data: Post[]`; `getPostCount()` → `meta.total`.

| Query param | Type    | Notes |
| ----------- | ------- | ----- |
| `page`      | integer | optional, default `1`, must be ≥ 1 (else 422). A page past the end returns `data: []`. |

Page size is fixed at **6** — it must equal `POSTS_PER_PAGE` in the
frontend's `repository.ts` (`PostController::PER_PAGE`). `meta`:

```ts
interface PostsMeta {
  currentPage: number;
  perPage: number;   // always 6 — POSTS_PER_PAGE
  total: number;     // getPostCount()
  lastPage: number;
}
```

This is deliberately **not** Laravel's default paginated envelope (which
uses snake_case `current_page` and adds a `links` block the frontend never
reads).

`GET /api/v1/posts?page=2` → **HTTP 200** — 2 items; showing the first

```json
{
  "data": [
    {
      "id": "post-scoping-the-no",
      "slug": "the-projects-we-turn-down",
      "coverImage": "https://picsum.photos/seed/projects-we-turn-down/1600/900",
      "publishedAt": "2025-11-14",
      "order": 7,
      "author": {
        "ar": "نادية فهمي",
        "en": "Nadia Fahmy"
      },
      "title": {
        "ar": "المشاريع التي نرفضها، ولماذا نقولها مبكرًا",
        "en": "The Projects We Turn Down, and Why We Say So Early"
      },
      "excerpt": {
        "ar": "إن كانت أداة جاهزة تحل المشكلة، فقول ذلك في أول مكالمة أرخص للجميع.",
        "en": "If an off-the-shelf tool solves it, saying so in the first call is cheaper for everyone."
      },
      "body": {
        "ar": "نسبة مفاجئة من الطلبات التي تصلنا تصف مشكلة تحلها أداة جاهزة بعد ضبطها، بجزء يسير مما سنتقاضاه لبنائها. قبول هذه المشاريع مربح على المدى القصير ومُضرّ على أي مد…[truncated]",
        "en": "A surprising share of the enquiries we get describe a problem that a configured off-the-shelf tool already solves for a fraction of what we would charge to buil…[truncated]"
      }
    }
  ],
  "meta": {
    "currentPage": 2,
    "perPage": 6,
    "total": 8,
    "lastPage": 2
  }
}
```

### `GET /api/v1/posts/{slug}`

`getPost(slug)` → `Post`, or 404 (→ `null`).

`GET /api/v1/posts/why-we-chose-nextjs` → **HTTP 200**

```json
{
  "data": {
    "id": "post-why-nextjs",
    "slug": "why-we-chose-nextjs",
    "coverImage": "https://picsum.photos/seed/why-we-chose-nextjs/1600/900",
    "publishedAt": "2026-06-15",
    "order": 1,
    "author": {
      "ar": "منى هشام",
      "en": "Mona Hesham"
    },
    "title": {
      "ar": "لماذا اخترنا Next.js لمشاريع عملائنا",
      "en": "Why We Chose Next.js for Client Projects"
    },
    "excerpt": {
      "ar": "App Router، العرض الثابت، وإطار عمل واحد لكل من المواقع التسويقية ولوحات التحكم.",
      "en": "App Router, static rendering, and one framework for both marketing sites and dashboards."
    },
    "body": {
      "ar": "في معظم مشاريع العملاء لا نحتاج إطار خلفية مخصصًا بالكامل من اليوم الأول — نحتاج صفحات تُعرض بسرعة، ولوحة تحكم يمكن إضافتها لاحقًا، وقصة نشر لا تتطلب توظيف مهند…[truncated]",
      "en": "For most client projects we don't need a fully custom backend framework on day one — we need pages that render fast, an admin surface that can come later, and a…[truncated]"
    }
  }
}
```

### `GET /api/v1/team-members`

`getTeamMembers()` → `TeamMember[]`. No query params.

`GET /api/v1/team-members` → **HTTP 200** — 4 items; showing the first

```json
{
  "data": [
    {
      "id": "team-nadia-fahmy",
      "avatar": "https://picsum.photos/seed/team-nadia-fahmy/640/640",
      "order": 1,
      "name": {
        "ar": "نادية فهمي",
        "en": "Nadia Fahmy"
      },
      "role": {
        "ar": "المؤسِّسة، هندسة المنتج",
        "en": "Founder, Product Engineering"
      },
      "bio": {
        "ar": "قضت ثماني سنوات في بناء أنظمة لوجستية قبل تأسيس الاستوديو. تقود مرحلة الاستكشاف في كل مشروع، وتكتب وثيقة المعمارية التي يلتزم بها البناء كله.",
        "en": "Spent eight years shipping logistics software before starting the studio. Runs discovery on every engagement and writes the architecture note the whole build an…[truncated]"
      }
    }
  ]
}
```

### `GET /api/v1/values`

`getValues()` → `ValueItem[]`. No query params.

`GET /api/v1/values` → **HTTP 200** — 6 items; showing the first

```json
{
  "data": [
    {
      "id": "value-ship-it",
      "icon": "Rocket",
      "order": 1,
      "title": {
        "ar": "التسليم قبل الكمال",
        "en": "Shipped beats perfect"
      },
      "description": {
        "ar": "ميزة تعمل في الإنتاج تعلّمك في أسبوع أكثر مما يعلّمك نموذج أولي في ثلاثة أشهر. نقلّص النطاق قبل أن نقلّص الجودة، ونضع العمل أمام مستخدمين حقيقيين مبكرًا.",
        "en": "A feature in production teaches you more in a week than a prototype teaches you in a quarter. We cut scope before we cut quality, and we put things in front of …[truncated]"
      }
    }
  ]
}
```

### `GET /api/v1/timeline`

`getTimeline()` → `TimelineEntry[]`. No query params.

`GET /api/v1/timeline` → **HTTP 200** — 5 items; showing the first

```json
{
  "data": [
    {
      "id": "milestone-founded",
      "year": "2019",
      "status": "done",
      "order": 1,
      "title": {
        "ar": "شخصان وعميل واحد",
        "en": "Two people and one client"
      },
      "description": {
        "ar": "بدأنا بعقد مع شركة نقل في القاهرة كانت تدير جدول رحلاتها على ملف Excel. ذلك المشروع موّل سنتنا الثانية.",
        "en": "Started as a contract for a Cairo logistics operator whose dispatch board still ran on a spreadsheet. That build paid for the second year."
      }
    }
  ]
}
```

### `GET /api/v1/settings`

`getSettings()` → `SiteSettings`. A single object (the `site_settings`
singleton row), not a list. Shown in full, long strings cut.

`GET /api/v1/settings` → **HTTP 200**

```json
{
  "data": {
    "hero": {
      "title": {
        "ar": "نصنع مستقبلك الرقمي",
        "en": "Shaping Digital Futures"
      },
      "trust": {
        "rating": "4.9",
        "ratingScale": "5",
        "clientsCount": "100+",
        "clientsLabel": {
          "ar": "عميل سعيد",
          "en": "Happy clients"
        }
      },
      "subtitle": {
        "ar": "نتجاوز العروض الطويلة والاجتماعات غير المنتجة. نقدم لك مواقع فائقة الأداء، برمجيات قابلة للتوسع، وتصاميم ابتكارية ينفذها خبراء ليكونوا امتداداً حقيقياً لفريقك..",
        "en": "We skip the fluff, pitch decks, and endless meetings. Just high-performing websites, scalable software, and stunning social media designs built by senior expert…[truncated]"
      },
      "ctaPrimary": {
        "ar": "ابدأ مشروعك",
        "en": "Start a project"
      },
      "ctaSecondary": {
        "ar": "شاهد أعمالنا",
        "en": "See our work"
      }
    },
    "sections": {
      "faq": {
        "heading": {
          "ar": "الأسئلة الشائعة",
          "en": "FAQ"
        },
        "description": {
          "ar": "كل ما تبقى من تساؤلاتك.",
          "en": "Everything else you're wondering."
        }
      },
      "about": {
        "heading": {
          "ar": "من نحن",
          "en": "About us"
        },
        "description": {
          "ar": "فريق صغير يسلّم برمجيات جاهزة للإنتاج، لا نماذج أولية.",
          "en": "A small team that ships production software, not prototypes."
        }
      },
      "clients": {
        "heading": {
          "ar": "يثق بنا",
          "en": "Trusted by"
        },
        "description": {
          "ar": "فرق من قطاعات اللوجستيات، التقنية المالية، التجزئة، والرعاية الصحية.",
          "en": "Teams across logistics, fintech, retail, and healthcare."
        }
      },
      "contact": {
        "heading": {
          "ar": "لنبنِ شيئًا يستحق الإطلاق.",
          "en": "Let's build something worth shipping."
        },
        "description": {
          "ar": "أخبرنا عن مشروعك — نرد عادة خلال يوم واحد.",
          "en": "Tell us about the project — we usually reply within a day."
        }
      },
      "process": {
        "heading": {
          "ar": "نصنع علامات تجارية تتواصل بما هو أبعد من المظهر",
          "en": "Creating brands that connect beyond visuals"
        },
        "ctaLabel": {
          "ar": "ناقش موقعك معنا",
          "en": "Discuss about Website"
        },
        "description": {
          "ar": "نهج منظم يجمع بين الاستراتيجية والتصميم والتنفيذ لبناء مواقع تتواصل مع الجمهور وتدعم أهداف العمل الحقيقية.",
          "en": "A structured approach that blends strategy, design, and execution to create websites that connect with audiences and support real business goals."
        }
      },
      "approach": {
        "heading": {
          "ar": "لا نبدأ بالكود. نبدأ بالقيد الذي يحدد المنتج فعلاً — موعد تسليم، ميزانية، أو خطوة عمل لا تحتمل الخطأ. وكل ما نبنيه بعد ذلك يخدم هذا القيد.",
          "en": "We don't start with code. We start with the one constraint that actually decides the product — a deadline, a budget, a workflow that cannot break. Everything we…[truncated]"
        },
        "description": {
          "ar": "الاستكشاف والتصميم والتسليم مسار واحد — نفس الفريق من أول مكالمة حتى الإطلاق.",
          "en": "Discovery, architecture, and delivery run as one track — the same senior team from the first call to the production deploy."
        }
      },
      "services": {
        "heading": {
          "ar": "الخدمات",
          "en": "Services"
        },
        "description": {
          "ar": "نعمل على المنتج بالكامل، من أول قرار استراتيجي إلى البنية التحتية التي يعمل عليها في الإنتاج. كل مشروع يُصمَّم حول هدف عمل حقيقي، لا قائمة تسليمات عامة. ستة مجا…[truncated]",
          "en": "We work across the full stack, from the first line of product strategy to the infrastructure it runs on in production. Every engagement is scoped around a real …[truncated]"
        }
      },
      "portfolio": {
        "heading": {
          "ar": "أعمال مختارة",
          "en": "Selected work"
        },
        "description": {
          "ar": "بعض المنتجات التي سلّمناها لعملائنا.",
          "en": "A few of the products we've shipped for clients."
        }
      },
      "testimonials": {
        "heading": {
          "ar": "ماذا يقول عملاؤنا",
          "en": "What clients say"
        },
        "description": {
          "ar": "بكلماتهم، لا بكلماتنا.",
          "en": "In their words, not ours."
        }
      }
    },
    "pages": {
      "blog": {
        "intro": {
          "heading": {
            "ar": "ملاحظات من داخل العمل.",
            "en": "Notes from the build."
          },
          "description": {
            "ar": "قرارات اضطررنا لاتخاذها في مشاريع حقيقية، كتبناها وهي ما زالت طازجة — بما فيها ما كنا سنقرره اليوم بشكل مختلف.",
            "en": "Decisions we had to make on real projects, written up while they were still fresh — including the ones we would make differently now."
          }
        }
      },
      "about": {
        "team": {
          "heading": {
            "ar": "من سيعمل على مشروعك",
            "en": "The people on your project"
          },
          "description": {
            "ar": "ليست قائمة بكل من عمل معنا يومًا — هؤلاء الأربعة هم من ستقابلهم فعلًا.",
            "en": "Not a directory of everyone who has ever worked here — these are the four you will actually meet."
          }
        },
        "intro": {
          "heading": {
            "ar": "استوديو صغير يبقى مسؤولًا حتى النهاية.",
            "en": "A small studio that stays on the hook."
          },
          "description": {
            "ar": "اثنا عشر مهندسًا ومصممًا في القاهرة، نبني برمجيات جاهزة للإنتاج لفرق تحتاجها أن تعمل من اليوم الأول، لا بعد إعادة كتابتها ثلاث مرات.",
            "en": "Twelve engineers and designers in Cairo, building production software for teams who need it to work on the first day, not the third rewrite."
          }
        },
        "story": {
          "body": {
            "ar": "في 2019 كنا نعمل داخل شركات تبيع المشاريع بطريقة وتنفّذها بطريقة أخرى. فريق خبير يقود العرض، وفريق أقل خبرة يرث الموعد النهائي، ويكتشف العميل الفجوة في الأسبوع …[truncated]",
            "en": "In 2019 we were both working inside agencies that sold projects one way and built them another. A senior team ran the pitch, a junior team inherited the deadlin…[truncated]"
          },
          "heading": {
            "ar": "بدأنا لأن التسليمات كانت تفشل.",
            "en": "We started because handovers kept failing."
          },
          "description": {
            "ar": "سبع سنوات، ومبدأ واحد: من يخطّط للعمل هو من يسلّمه.",
            "en": "Seven years, one operating principle: the people who plan the work are the people who ship it."
          }
        },
        "values": {
          "heading": {
            "ar": "كيف نعمل",
            "en": "How we work"
          },
          "description": {
            "ar": "ستة التزامات نتمسّك بها حتى حين يضيق المشروع. إن كان أيٌّ منها لا يناسب فريقك، فالأفضل أن نعرف الآن.",
            "en": "Six commitments we will hold to even when a project gets tight. If any of them sounds like a problem for your team, better to find out now."
          }
        },
        "timeline": {
          "heading": {
            "ar": "سبع سنوات، وخمس محطات",
            "en": "Seven years, five turning points"
          },
          "description": {
            "ar": "اللحظات التي غيّرت طريقة عمل الاستوديو، بما فيها ما هو جارٍ الآن وما لم يحدث بعد.",
            "en": "The moments that changed how the studio operates, including the one still in progress and the one that hasn't happened yet."
          }
        }
      },
      "contact": {
        "intro": {
          "heading": {
            "ar": "أخبرنا بما تبنيه.",
            "en": "Tell us what you're building."
          },
          "description": {
            "ar": "يقرأ كل رسالة أحد المهندسين الذين سيعملون على المشروع فعلًا. نرد خلال يوم عمل واحد، وسنخبرك في أول مكالمة إن لم نكن الاستوديو المناسب له.",
            "en": "One of the engineers who would actually work on it reads every message. We reply within a working day, and we will tell you in the first call if we are not the …[truncated]"
          }
        }
      },
      "services": {
        "intro": {
          "heading": {
            "ar": "ستة أشياء نتقنها، ولا شيء غيرها.",
            "en": "Six things we do, and nothing else."
          },
          "description": {
            "ar": "كل خدمة منها مشروع كامل لا بند في عرض سعر: نحدّد نطاقها ونبنيها وننشرها ونظل متاحين بعد التسليم. وإن كان مشروعك يحتاج شيئًا خارج هذه القائمة، سنرشدك إلى من يتقن…[truncated]",
            "en": "Each one is a full engagement, not a line item: we scope it, build it, deploy it, and stay reachable after handover. If your project needs something outside thi…[truncated]"
          }
        }
      },
      "portfolio": {
        "intro": {
          "heading": {
            "ar": "ستة منتجات، وكلها ما زالت تعمل.",
            "en": "Six products, all still running."
          },
          "description": {
            "ar": "كل مشروع هنا أُطلق وما زال يعمل. ذكرنا اسم العميل حيث سُمح لنا، وتركنا الأرقام التي تخصّه دون ذكر بدل أن نخترع نسبة مئوية.",
            "en": "Every project here went live and stayed live. Where we can name the client we have; where the numbers are theirs to share, we have left them out rather than inv…[truncated]"
          }
        }
      }
    },
    "contact": {
      "city": {
        "ar": "غزة",
        "en": "Gaza"
      },
      "email": "info@codexastudio.vercel.app",
      "phone": "+972598059394",
      "address": {
        "ar": "غزة، فلسطين",
        "en": "Gaza, Palestine"
      }
    },
    "newsletter": {
      "heading": {
        "ar": "ابقَ على اطلاع.",
        "en": "Keep you in the loop."
      },
      "subtext": {
        "ar": "أحدث الأخبار والرؤى تصل مباشرة إلى بريدك.",
        "en": "Get the latest news and insights, straight to your inbox."
      }
    },
    "social": [
      {
        "url": "https://facebook.com/codexastudio",
        "platform": "facebook"
      },
      {
        "url": "https://linkedin.com/company/codexastudio",
        "platform": "linkedin"
      },
      {
        "url": "https://x.com/codexastudio",
        "platform": "X"
      },
      {
        "url": "https://youtube.com/@codexastudio",
        "platform": "youtube"
      }
    ]
  }
}
```

### `POST /api/v1/contact`

`submitContact(payload)` → `ContactResult`. Rate-limited (`submissions`).

Body — `ContactPayload`:

| Field     | Rules                                  |
| --------- | -------------------------------------- |
| `name`    | required, string, 2–255 chars          |
| `email`   | required, valid email, ≤ 255 chars     |
| `service` | optional (nullable), string, ≤ 255     |
| `budget`  | optional (nullable), string, ≤ 255     |
| `message` | required, string, 10–5000 chars        |

Minimum lengths mirror the frontend's zod schema. Unknown keys are ignored.
The honeypot is not part of the payload (the Server Action handles it).
Success is **201**.

`POST /api/v1/contact` → **HTTP 201**

Request body:

```json
{"name": "Contract Example", "email": "contract@example.com", "service": "web-development", "budget": "10k-25k", "message": "Captured for docs/api-contract.md."}
```

Response:

```json
{
  "data": {
    "success": true
  }
}
```

Invalid body → 422, see §1 "Error envelope".

### `POST /api/v1/newsletter`

`subscribeNewsletter(payload)` → `NewsletterResult`. Rate-limited
(`submissions`).

Body — `NewsletterPayload`:

| Field   | Rules                               |
| ------- | ----------------------------------- |
| `email` | required, valid email, ≤ 255 chars; lower-cased before storing |

Idempotent: an address that is already subscribed gets the same **200**
success (no "already subscribed" error, so the endpoint can't be used to
probe who is on the list).

`POST /api/v1/newsletter` → **HTTP 200**

Request body:

```json
{"email": "Contract@Example.com"}
```

Response:

```json
{
  "data": {
    "success": true
  }
}
```

`POST /api/v1/newsletter` → **HTTP 422**

Request body:

```json
{"email": "nope"}
```

Response:

```json
{
  "error": {
    "status": 422,
    "code": "validation_failed",
    "message": "The given data was invalid.",
    "fields": {
      "email": [
        "The email field must be a valid email address."
      ]
    }
  }
}
```
