# مفاتيح أساسية نصية وغير متزايدة في كل موديل محتوى

## ما هو؟

كل موديل محتوى — `app/Models/Service.php:17-19`، ونفس السطرين مكرّرين في
`Category` و`Client` و`Project` و`Testimonial` و`ProcessStep` و`FaqItem` و`Post`
و`TeamMember` و`ValueItem` و`TimelineEntry` — يضبط:

```php
public $incrementing = false;

protected $keyType = 'string';
```

مقرونًا بعمود في الـ migration من نوع `$table->string('id')->primary()`
(`database/migrations/2026_08_18_100002_create_services_table.php:15`) بدل
الافتراضي في Laravel `$table->id()` (أي `BIGINT` بـ `AUTO_INCREMENT`). العمود
`id` يحمل نصًا مختارًا يدويًا يشبه الـ slug — `"svc-backend-laravel"` و
`"client-basma-retail"` و`"milestone-founded"` — منسوخًا حرفيًا من
`docs/content-reference/mock/*.json`، وليس رقمًا تولّده قاعدة البيانات.

## لماذا هو هنا في هذا المشروع تحديدًا؟

بيانات الواجهة الأمامية التجريبية في `docs/content-reference/types.ts` تعرّف
أصلًا `id: string` في كل واجهة محتوى، وكل إشارة متبادلة في تلك البيانات —
`Project.client` و`Project.category` و`Testimonial.clientId` — تشير إلى تلك
المعرّفات النصية نفسها، وليس إلى رقم صف. الـ `ProjectSeeder`
(`database/seeders/ProjectSeeder.php:29` و`:33`) يُدخل `category_id` و
`client_id` مباشرة من حقلي `"category": "web"` و
`"client": "client-ferry-logistics"` في JSON دون أي خطوة بحث.

لو كان `clients.id` عددًا صحيحًا متزايدًا، لاحتاج كل seeder يشير إلى عميل جدول
بحث يحوّل الاسم إلى رقم، ولاحتاجت طبقة API Resources في المرحلة 11 أن تترجم بين
"معرّف الواجهة" و"معرّف قاعدة البيانات" في كل استجابة — خطوة إعادة ترقيم لا
مبرر لها في عقد البيانات لهذا المشروع، لأن تصميم مستودع المحتوى كله في
PROJECT-PLAN.md (`docs/PROJECT-PLAN.md` §0.3) يعتمد على أن تكون تطبيقات الـ mock
والـ API قابلة للتبديل خلف واجهة واحدة.

## ما البديل، ولماذا رُفض؟

البديل هو الافتراضي في Laravel: `$table->id()` كمفتاح أساسي متزايد، مع عمود
`slug` منفصل للمعرّف النصي المطلوب أصلًا في بعض الموديلات (`services.slug` و
`projects.slug` و`posts.slug`). هذا هو النمط الأشيع في Laravel، ورُفض تحديدًا
لأن هذا المشروع ليس فيه معرّف نصي واحد لكل موديل — بعض الصفوف تحتاج slug للرابط
(services وprojects وposts)، و*كلها* تحتاج معرّفًا ثابتًا لمستودع المحتوى يجب أن
يساوي `id` في الواجهة.

الاحتفاظ بالاثنين يعني عمودَي "هوية" متنافسين في كل جدول، وعلى الـ seeders
مزامنتهما، وكل علاقة (`Project::client()`) ستظل تُحلّ مقابل أيهما هو المفتاح
الأجنبي الحقيقي. جعل `id` الواجهة هو المفتاح الأساسي الفعلي في قاعدة البيانات
يعيد الأمر إلى عمود واحد بمعنى واحد.

## ماذا ينكسر لو حُذف؟

إعادة أي موديل محتوى إلى `$table->id()` دون إعادة كتابة كل seeder وكل مفتاح
أجنبي تكسر أمرين فورًا:

1. `ProjectSeeder` و`TestimonialSeeder` سيفشلان عند
   `'client_id' => $project['client']` — هذه القيمة نص مثل
   `"client-ferry-logistics"`، ولن تطابق أي صف في جدول `clients` صار مفتاحه
   الأساسي `1, 2, 3…`، فسيرفض قيد المفتاح الأجنبي المضاف في
   `database/migrations/2026_08_18_100003_create_projects_table.php` كل عملية
   إدخال.
2. على المدى الأبعد: API Resources في المرحلة 11 ستضطر لكشف معرّف *مختلف* عن
   الذي يتوقعه كل مستهلك للـ mock، ما يكسر خاصية "معرّف قاعدة البيانات هو معرّف
   الـ API" التي وُجد هذا القرار لضمانها، وكل اختبار تكامل في الواجهة مكتوب مقابل
   معرّفات الـ mock سيحتاج إعادة كتابة ليطابق الأرقام التي صادف أن أعطتها MySQL
   في عملية seed تلك.

## ماذا تقرأ بعد ذلك

- `06-json-localization-columns.md` — القرار الآخر ذو الشكل JSON الذي يتخذه كل
  موديل من هذه الموديلات، بجوار المفتاح الأساسي مباشرة
- `08-settings-singleton.md` — الجدول الوحيد في هذه المرحلة الذي **لا** يتبع هذا
  النمط عمدًا، ولماذا
