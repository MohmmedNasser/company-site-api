# دور Fortify: مصادقة في الخلفية دون فرض واجهة

## ما هو؟

`laravel/fortify` (`composer.json:11`) هو backend مصادقة بلا واجهة (headless) —
يسجّل المسارات (`GET /login` و`POST /login` و`GET /register` وغيرها، انظر ناتج
`php artisan route:list`)، ويتحقق من بيانات الدخول، ويستدعي الـ Facade
`Auth` في Laravel لتسجيل الجلسة أو إنهائها. لا يأتي **بأي views ولا بأي
واجهة أمامية** خاصة به. الملف `app/Providers/FortifyServiceProvider.php:49-74`
هو المكان الذي يخبر فيه هذا التطبيقُ Fortify أيّ مكوّن صفحة Inertia يعرض لكل
مسار من تلك المسارات — مثلًا السطر 51،
`Fortify::loginView(fn ($request) => Inertia::render('auth/login', [...]))`،
يوجّه مسار `/login` إلى `resources/js/pages/auth/login.tsx` بدل Blade view.

## لماذا هو هنا في هذا المشروع تحديدًا؟

المرحلة 12 في `docs/PROJECT-PLAN.md` تسمّي Fortify صراحةً (عبر preset الخاص بـ
`laravel/breeze` لـ React+Inertia، والذي حلّ محله لاحقًا
`laravel/react-starter-kit` الرسمي، وهو نفسه يعتمد على Fortify) كـ backend
المصادقة للوحة الإدارة المبنية بـ Inertia — نفس لوحة الإدارة التي يحميها
`routes/web.php` بـ `Route::middleware(['auth', 'verified'])` حول `dashboard`.
الملف `config/fortify.php:145-149` هو المكان الذي فعّل فيه هذا المشروع أجزاء
وعطّل أخرى: `Features::registration()` و`Features::resetPasswords()`
و`Features::emailVerification()` مفعّلة؛ أما `Features::twoFactorAuthentication()`
و`Features::passkeys()` — الموجودة في إعدادات الـ starter kit الأصلي — فقد
حُذفت تمامًا (انظر `04-auth-simplification-decision.md`).

## ما البديل، ولماذا رُفض؟

البديلان الواقعيان كانا: (1) كتابة `AuthenticatedSessionController` و
`RegisteredUserController` من الصفر يدويًا، و(2) scaffolding الكلاسيكي من
Laravel Breeze (بدون Fortify)، والذي يولّد تلك الـ controllers مباشرة داخل
`app/Http/Controllers/Auth/` لتمتلكها وتعدّلها بنفسك. رُفض كلاهما للسبب نفسه:
هدف المرحلة 12 في هذا المشروع هو تعلّم نمط لوحة الإدارة بـ Inertia+React، وليس
إعادة اشتقاق منطق تشفير كلمات المرور وتحديد معدل الطلبات (rate limiting) ورموز
التحقق من البريد، وهو منطق يتقنه Fortify أصلًا
(`app/Providers/FortifyServiceProvider.php:82-87` يضبط محدِّد معدل الدخول في
أربعة أسطر بدل ربط `RateLimiter::for()` يدويًا من الصفر). الـ controllers
المكتوبة يدويًا تعني أيضًا أن كل ميزة مصادقة مستقبلية (تأكيد كلمة المرور،
التحقق من البريد) تحتاج controller واختبارًا خاصين بها من الصفر، بدل إضافة
عنصر في مصفوفة `Features::`.

## ماذا ينكسر لو حُذف؟

حذف `laravel/fortify` من `composer.json:11` و`FortifyServiceProvider::class` من
`bootstrap/providers.php:8` سيحذف كل مسار يسجّله Fortify — `/login` و
`/register` و`/forgot-password` و`/reset-password/{token}` و
`/email/verify/{id}/{hash}` و`/user/confirm-password` كلها تختفي من
`php artisan route:list`. مكوّنات صفحات `Login` و`Register` وغيرها تحت
`resources/js/pages/auth/` ستبقى موجودة كملفات، لكن لن يوجد ما يعرضها أو يعالج
إرسال نماذجها — زيارة `/login` ستُرجع 404، و`app/Actions/Fortify/CreateNewUser.php`
و`ResetUserPassword.php` (اللذان يستدعيهما Fortify عبر `Fortify::createUsersUsing()`
في `FortifyServiceProvider.php:43`) سيصبحان كودًا ميتًا بلا مستدعٍ.

## ماذا تقرأ بعد ذلك

- `01-inertia-shared-props.md` — كيف تستلم الصفحات التي يعرضها Fortify
  `auth.user` دون أن يمرره كل controller صراحةً
- `04-auth-simplification-decision.md` — أي ميزات Fortify عطّلها هذا المشروع،
  ولماذا
