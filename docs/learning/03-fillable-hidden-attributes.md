# الـ Attributes في PHP 8: `#[Fillable]` و`#[Hidden]`

## ما هو؟

`app/Models/User.php:13-14`:

```php
#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable implements MustVerifyEmail
```

`#[Fillable]` و`#[Hidden]` هي attributes أصلية في PHP (صيغة `#[...]`، وليست
تعليقات docblock) يقرؤها Eloquent في Laravel 13 عبر الـ reflection لحظة تهيئة
الموديل. تؤدي بالضبط ما كانت تؤديه الخصائص القديمة `protected $fillable = [...]`
و`protected $hidden = [...]`:

- `$fillable` قائمة بيضاء بالأعمدة التي يُسمح لـ `User::create($data)` و`fill()`
  بتعبئتها دفعة واحدة (mass assignment).
- `$hidden` تحذف هذه المفاتيح عند تحويل الموديل إلى JSON. هذا مهم هنا لأن
  `ProfileController::edit()` وكل استدعاء `Inertia::render()` يتضمن
  `$request->user()` يحوّل الموديل مباشرة إلى props الصفحة المرسلة إلى المتصفح.

## لماذا هو هنا في هذا المشروع تحديدًا؟

هذا ما ولّده `laravel new --react` افتراضيًا عند إنشاء المشروع على Laravel 13
(متحقَّق منه مقابل إصدار الإطار في `composer.json:12`،
`"laravel/framework": "^13.17"`) — ليس قرارًا اتخذه المشروع عمدًا، بل هو ببساطة
شكل تطبيق Laravel 13 الجديد الآن. أهميته هنا تحديدًا أن `password` موجود في
**كلا** الـ attributes: `#[Fillable]` يسمح لـ `CreateNewUser`
(`app/Actions/Fortify/CreateNewUser.php`) و`ResetUserPassword`
(`app/Actions/Fortify/ResetUserPassword.php`) بكتابة كلمة مرور مشفّرة في
الموديل، بينما يضمن `#[Hidden]` ألّا يتسرّب هذا الـ hash نفسه إلى حمولة JSON
الخاصة بصفحة Inertia — الـ attributes يؤديان وظيفتين متعاكستين على الحقل نفسه،
وتدفّق المصادقة في Fortify يعتمد على الاثنين.

## ما البديل، ولماذا رُفض؟

البديل هو أسلوب الخصائص (properties) المستخدم قبل Laravel 13:

```php
protected $fillable = ['name', 'email', 'password'];
protected $hidden = ['password', 'remember_token'];
```

لم يُرفض شيء هنا فعليًا — لم يستخدم أي كود في المشروع أسلوب الخصائص، لأن
`laravel new` ولّد أسلوب الـ attributes من البداية. الشكلان متطابقان وظيفيًا
(الـ trait `HasAttributes` في Eloquent يفحص الـ attribute أولًا، ويرجع إلى
الخاصية إن لم يجد attribute)، فهذه ملاحظة عن "شكل كود Laravel الجديد" وليست
قرارًا معماريًا.

## ماذا ينكسر لو حُذف؟

حذف `#[Fillable(['name', 'email', 'password'])]` من `User.php:13` دون بديل يعني
أن `User::create()` (لا يُستدعى مباشرة في أي مكان، بل عبر الـ action
`CreateNewUser` في Fortify) و`$user->fill()` (المستدعاة في
`ProfileController::update()`) ستتجاهلان كل الحقول بصمت — السلوك الافتراضي
لـ Eloquent عندما لا يوجد `$fillable` ولا `#[Fillable]` إطلاقًا هو منع التعبئة
الجماعية كليًا، فالتسجيل وتحديث الملف الشخصي سيرميان `MassAssignmentException`
عندما يكون `APP_DEBUG=true`، أو لا يفعلان شيئًا بصمت في الإنتاج.

حذف `#[Hidden(['password', ...])]` من السطر 14 يعني أن `$request->user()` —
المشارَك في كل صفحة Inertia عبر `HandleInertiaRequests`
(`01-inertia-shared-props.md`) — سيحوّل hash كلمة المرور (bcrypt) مباشرة داخل
حمولة `<script>` في HTML كل صفحة تتطلب تسجيل دخول.

## ماذا تقرأ بعد ذلك

- `01-inertia-shared-props.md` — أين ينتهي موديل `User` (المخفية حقوله الحساسة
  الآن بشكل صحيح) محوَّلًا إلى JSON مع كل طلب
- `02-fortify-role.md` — الـ actions في Fortify التي تعتمد على سماح
  `#[Fillable]` بكتابة `password` في هذا الموديل
