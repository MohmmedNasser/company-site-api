# أعمدة JSON للحقول المترجمة، والـ trait المشترك `HasLocalizedFields`

## ما هو؟

`app/Concerns/HasLocalizedFields.php:5-23` هو trait فيه دالة واحدة:

```php
public function localized(string $field, ?string $locale = null): string
{
    $locale ??= app()->getLocale();
    $value = $this->{$field} ?? [];
    return $value[$locale]
        ?? $value[config('app.fallback_locale')]
        ?? '';
}
```

كل موديل محتوى فيه نص قابل للترجمة يستخدمه — `Service.php:15` و`Project.php:17`
و`Testimonial.php:16` و`Client.php:16` و`Category.php:16` والبقية — إلى جانب
دالة `casts()` تعلّم كل عمود مترجم بالنوع `'array'` (`Service.php:21-30`).

في قاعدة البيانات، حقل مثل `services.title` هو عمود JSON واحد يحمل
`{"ar": "...", "en": "..."}`. الـ cast من نوع `array` في Eloquent يحوّل نص JSON
هذا إلى مصفوفة PHP عند القراءة (`$service->title['en']`)، و`->localized('title')`
تغلّف ذلك باختيار اللغة والرجوع إلى لغة احتياطية (fallback).

## لماذا هو هنا في هذا المشروع تحديدًا؟

`docs/content-reference/mock/services.json:9` يخزّن الترجمات أصلًا بهذا الشكل
تمامًا — `"title": { "en": "Web Development", "ar": "تطوير الويب" }` — لأن
`docs/content-reference/types.ts:3` يعرّف `Localized = { ar: string; en: string }`
كعقد الواجهة الأمامية نفسها. الـ `ServiceSeeder::run()`
(`database/seeders/ServiceSeeder.php:29-31`) ينسخ `$service['title']` مباشرة إلى
العمود `title` دون أي تحويل — شكل JSON في الملف وشكل JSON في العمود متطابقان،
فالـ seeder مجرد ناقل وليس مترجمًا.

هذا مهم تحديدًا لأن متطلب المهمة كان زرع النص ثنائي اللغة *المكتوب فعلًا*، وليس
نصًا مؤقتًا — أعمدة JSON تجعل ذلك نسخًا مباشرًا؛ أي استراتيجية ترجمة أخرى كانت
ستتطلب إعادة تشكيل البيانات أثناء الإدخال.

## ما البديل، ولماذا رُفض؟

البديل الأكاديمي هو جدول `translations` منفصل —
`(translatable_type, translatable_id, locale, field, value)` — وهو النهج الذي
يسمّيه صراحةً مخطط المرحلة 10 الأصلي في `docs/PROJECT-PLAN.md` (§4، "Topics to
write up") ويطلب مقارنته بـ JSON.

رُفض تصميم ذلك الجدول للسبب نفسه الذي يطرحه
`docs/content-reference/mock/posts.json:38` (مقالة المشروع نفسه عن هذه الموازنة
تحديدًا، ويزرعها `PostSeeder` حرفيًا): كل قراءة لعنوان خدمة ستصبح join (أو
استعلامًا ثانيًا لكل لغة)، وكل كتابة ستصبح عمليتَي `INSERT` بدل واحدة، وطبقة
الموديل ستحتاج مجموعة accessors وظيفتها الوحيدة إخفاء ذلك الـ join عن بقية
التطبيق — وهذا بالضبط ما تفعله `HasLocalizedFields::localized()` اليوم، لكن دون
الـ join.

تصميم جدول الترجمات لا يستحق كلفته إلا عندما يحتاج شيءٌ ما أن يفلتر أو يرتّب
*حسب* القيمة المترجمة (`WHERE title->>'en' LIKE ...`) — ولا شيء في مسارات
`/api/v1` لهذا المشروع يفعل ذلك حتى الآن، فـ JSON هو التصميم الأرخص إلى أن
يتغيّر ذلك.

## ماذا ينكسر لو حُذف؟

لو قُسّم `services.title` إلى جدول `translations` منفصل، سينكسر
`ServiceSeeder::run()` فورًا — استدعاؤه الوحيد
`Service::create([...'title' => $service['title']...])`
(`ServiceSeeder.php:22-32`) يفترض أن صفًا واحدًا يحمل زوج `{ar, en}` كاملًا؛
جدول الترجمات سيحتاج عمليتَي `INSERT` لكل حقل في كل سجل، ما يضاعف عدد صفوف كل
seeder تقريبًا ثماني مرات.

أما لو حُذف الـ cast من نوع `'array'` من `casts()` في موديل ما مع بقاء العمود
JSON، فإن `$service->title` سيُرجع *نص* JSON خامًا
(`'{"ar":"...","en":"..."}'`)، وبحث `$value[$locale]` داخل
`HasLocalizedFields::localized()` (`HasLocalizedFields.php:19`) سيفهرس النص بصمت
حسب موضع الحرف بدل مفتاح المصفوفة، و`$service->localized('title', 'ar')` سيُرجع
نصًا فارغًا بدل أن يرمي خطأ — سلوك احتياطي يخفي الخلل بدل أن يكشفه.

## ماذا تقرأ بعد ذلك

- `05-string-primary-keys.md` — القرار الشقيق الذي يُبقي هوية كل موديل محتوى
  مطابقة لهوية الواجهة، بالطريقة نفسها التي يُبقي بها هذا القرار النص المترجم
  مطابقًا
- `07-backed-enums.md` — كيف تُحدَّد أنواع `Project.status` و`TimelineEntry.status`
  بدل أن تكون نصوصًا حرة، في موديلات تستخدم هذا الـ trait أيضًا
