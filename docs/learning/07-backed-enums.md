# الـ Backed Enums في PHP 8.1 لـ `Project.status` و`TimelineEntry.status`

## ما هو؟

`app/Enums/ProjectStatus.php:5-9` و`app/Enums/TimelineStatus.php:5-10` هما
**backed enums** في PHP 8.1 — بنية أصلية في اللغة (وليست ميزة من Laravel) تُربط
فيها كل حالة (case) بقيمة بسيطة:

```php
enum ProjectStatus: string
{
    case Shipped = 'shipped';
    case InDevelopment = 'in-development';
}
```

`app/Models/Project.php:26` يربطه بـ Eloquent بتسمية كلاس الـ enum كهدف للـ cast —
`'status' => ProjectStatus::class` — داخل `casts()`. مع وجود هذا الـ cast، لا
يكون `$project->status` نصًا خامًا أبدًا وقت التشغيل؛ بل كائنًا من
`ProjectStatus`، فيُرجع `$project->status->value` القيمة `'shipped'`، وتكون
المقارنة `$project->status === ProjectStatus::Shipped` مقارنة حقيقية مفحوصة
الأنواع. الموديل `TimelineEntry` (`app/Models/TimelineEntry.php:30`) يفعل الشيء
نفسه مع `TimelineStatus`.

## لماذا هو هنا في هذا المشروع تحديدًا؟

`docs/content-reference/types.ts:27` يعرّف `Project.status` كاتحاد
`"shipped" | "in-development"` — يستطيع TypeScript أن يضمن عدم إسناد أي نص آخر
أبدًا. لا يوجد في PHP نوع "اتحاد نصوص حرفية"، فبدون backed enum سيكون
`projects.status` مجرد عمود `string` ولن يمنع شيءٌ
`Project::create(['status' => 'shiped'])` (خطأ إملائي) من النجاح بصمت.

الـ migration
(`database/migrations/2026_08_18_100003_create_projects_table.php:20`، سطر
`$table->enum('status', ['shipped', 'in-development'])`) يقيّد *العمود* أصلًا
بهاتين القيمتين على مستوى MySQL؛ والـ enum في PHP مع الـ cast في Eloquent يمدّان
القيد نفسه إلى كود التطبيق، فيُلتقط الخطأ الإملائي بنظام أنواع PHP (خطأ
`ValueError` قاتل من `ProjectStatus::from('shiped')`) بدل أن يظهر كرفض صامت من
قاعدة البيانات، أو الأسوأ: عمود `enum` في MySQL يحوّل القيمة غير المطابقة بصمت
إلى `''`.

## ما البديل، ولماذا رُفض؟

البديل هو عمود `string` عادي دون cast في PHP — مع التحقق من القيمة في Form
Request قبل كل كتابة، كما ستفعل طبقة الـ API في المرحلة 11 على أي حال لمدخلات
HTTP. رُفض هذا لمسارات الكود *الداخلية* (الـ seeders، وCRUD لوحة الإدارة لاحقًا،
وأي service class) التي لا تمر عبر Form Request أبدًا: لا شيء سيمنع
`TimelineSeeder::run()` من قبول قيمة `status` خاطئة بصمت من
`docs/content-reference/mock/timeline.json` لو انحرف ملف JSON يومًا عن العقد.

الـ backed enum يجعل ذلك الفشل صاخبًا وفوريًا —
`TimelineStatus::from('shipped')` (قيمة ليست من `done`/`in-progress`/`todo`)
يرمي `ValueError` لحظة الـ seed، وليس لغزًا بعد أشهر عندما يبحث شيءٌ ما عن حالة
زُرعت خطأً بهدوء.

## ماذا ينكسر لو حُذف؟

حذف `'status' => ProjectStatus::class` من `Project::casts()` (`Project.php:26`)
مع إبقاء عمود `enum()` في الـ migration لا يكسر الـ seeding —
`ProjectSeeder.php:30` يمرّر النص الخام `$project['status']` في الحالتين — لكنه
يُنزل بصمت كل مستهلك لـ `$project->status` إلى مقارنة نصوص خامة. فأي فحص مستقبلي
مثل `if ($project->status === ProjectStatus::Shipped)` في controller أو صفحة
Inertia سيُقيَّم دائمًا إلى false (مقارنة نص بكائن enum لا تكون `===` أبدًا) دون
رمي أي خطأ إطلاقًا — من نوع الأخطاء التي لا تظهر إلا كـ "فلتر المشاريع المنشورة لا
يعرض شيئًا" أثناء الاختبار اليدوي، وليس كاستثناء.

## ماذا تقرأ بعد ذلك

- `06-json-localization-columns.md` — دالة `casts()` التي تعيش فيها هذه الـ casts
  بجانب غيرها في الموديلات نفسها
- `08-settings-singleton.md` — آخر نمط جديد من هذه المرحلة، في موديل لا يحتوي
  enum ولا حقولًا مترجمة إطلاقًا
