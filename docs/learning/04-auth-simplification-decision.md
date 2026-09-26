# لماذا حُذفت المصادقة الثنائية والـ Passkeys نهائيًا، ولم تُعطَّل فقط

## ما هو؟

الـ starter kit الرسمي `laravel/react-starter-kit` يأتي بخمس ميزات مصادقة
اختيارية من Fortify، تُفعَّل عبر سؤال تفاعلي أثناء التثبيت: التسجيل، والتحقق من
البريد، والمصادقة الثنائية (2FA)، والـ passkeys (WebAuthn)، وتأكيد كلمة المرور.
أبقى هذا المشروع ثلاثًا منها (`config/fortify.php:145-149` —
`Features::registration()` و`Features::resetPasswords()` و
`Features::emailVerification()`) وحذف اثنتين بالكامل: 2FA والـ passkeys.

عبارة "حُذفت بالكامل" هي الأساس هنا — لم يكن الأمر ترك
`Features::twoFactorAuthentication()` معلَّقًا كتعليق في المصفوفة. كل ملف لمسته
الميزة حُذف أو عُدّل:

- `app/Models/User.php` لم يعد يطبّق `PasskeyUser` ولا يستخدم
  `PasskeyAuthenticatable` أو `TwoFactorAuthenticatable`
- `database/factories/UserFactory.php` لم يعد يضبط `two_factor_secret` وما شابه،
  ولا يحتوي state باسم `withTwoFactor()`
- الملفات `app/Http/Requests/Settings/TwoFactorAuthenticationRequest.php` و
  `resources/js/components/manage-two-factor.tsx` و`manage-passkeys.tsx` و
  `passkey-verify.tsx` و`passkey-register.tsx` و`passkey-item.tsx` و
  `two-factor-setup-modal.tsx` و`two-factor-recovery-codes.tsx` و
  `resources/js/hooks/use-two-factor-auth.ts` و
  `resources/js/pages/auth/two-factor-challenge.tsx` لم تُنسخ إلى هذا المستودع
  أصلًا
- `routes/settings.php` لا يحتوي مسار `/.well-known/passkey-endpoints` (الـ
  starter kit الأصلي يسجّله في آخر ذلك الملف — قارن مع مسارات
  `php artisan route:list` التسعة والعشرين، ولا يتعلق أيٌّ منها بالـ passkeys
  أو المصادقة الثنائية)
- الـ migrations اللذان كانا سيضيفان `two_factor_secret` و
  `two_factor_recovery_codes` و`two_factor_confirmed_at` إلى `users`، وجدول
  `passkeys` مستقلًا، لم يُنقلا إلى `database/migrations/` — جدول `users` هنا
  فيه بالضبط الأعمدة التي يأتي بها هيكل Laravel الأساسي (انظر
  `database/migrations/0001_01_01_000000_create_users_table.php`)

## لماذا هو هنا في هذا المشروع تحديدًا؟

`docs/PROJECT-PLAN.md` يصف لوحة الإدارة المبنية بـ Inertia (المرحلتان 12-13)
كأداة داخلية صغيرة فيها "roles and policies: admin / editor" — عدد قليل من
الأشخاص المعروفين، وليست منتجًا عامًا بقاعدة مستخدمين واسعة غير موثوقة. 2FA
والـ passkeys موجودة للدفاع ضد هجمات حشو بيانات الدخول (credential stuffing)
والتصيّد على نطاق واسع؛ ونموذج التهديد هذا لا ينطبق بالطريقة نفسها على لوحة
إدارة لوكالة واحدة فيها بضعة حسابات ينشئها صاحب الموقع بنفسه.

الاحتفاظ بالكود رغم ذلك — حتى لو "معطّلًا" — يعني أن كل قارئ مستقبلي لـ
`User.php` عليه أن يفهم `PasskeyAuthenticatable` و`TwoFactorAuthenticatable`
ليعرف أنهما بلا أثر، وأن كل تعديل على `security.tsx` عليه أن يلتف حول JSX ميت
مثل `<ManageTwoFactor>` و`<ManagePasskeys>`، وأن كل أداة تدقيق للاعتماديات
ستعلّم `web-auth/webauthn-lib` و`pragmarx/google2fa` (وكلاهما يُسحب ضمنيًا عبر
`laravel/fortify` بغض النظر عن أعلام الميزات — انظر أدناه) كسطح هجوم لميزة لا
يستطيع أحد الوصول إليها.

## ما البديل، ولماذا رُفض؟

البديل — وهو المطابق حرفيًا للطلب الأصلي — كان ترك عناصر
`Features::twoFactorAuthentication([...])` و`Features::passkeys([...])` في
مصفوفة `config/fortify.php` لكن معلّقة كتعليقات، وترك مكوّنات React في
`resources/js/components/` دون استخدام. رُفض هذا صراحةً (حسب تعليمات المهمة:
"do not keep them disabled but present, strip them out cleanly")، ورفضه هو
الخيار الهندسي الأسلم بغض النظر عن التعليمات: سطر إعدادات معلّق وملف مكوّن
يتيم كلاهما يتعفّن بصمت — لا شيء ينكسر عندما يعدّل أحدهم `User.php` بطريقة كانت
ستكسر 2FA، لأنه لا شيء يمرّ بذلك المسار، فيبقى الكسر غير مرئي حتى يعيد أحدهم
تفعيل الميزة بعد أشهر على قاعدة كود ابتعدت عنها بهدوء وصارت غير متوافقة.

## ماذا ينكسر لو حُذف؟

هذا القسم غير معتاد في هذا القرار: لا شيء ينكسر بغياب 2FA والـ passkeys —
`php artisan route:list` يُظهر أن المسارات التسعة والعشرين المتبقية تعمل بسلام،
و`tsc --noEmit` و`eslint .` ينجحان على شجرة المكوّنات بعد التنظيف (لا توجد
imports معلّقة)، و`php artisan migrate` يبني بالضبط شكل جدول `users` الذي
يتوقعه تدفق التسجيل والدخول في Fortify.

الشيء الوحيد الذي يستحق التنبيه كـ *عدم حذف*: `laravel/fortify` يشترط
`laravel/passkeys` بشكل صارم في `composer.json` الخاص به
(`"require": {"laravel/passkeys": "^0.2.0", ...}`، وليس `"suggest"`)، لذا تبقى
تلك الحزمة في `vendor/laravel/passkeys/` ويُسجَّل الـ service provider الخاص
بها تلقائيًا (ظاهر في `bootstrap/cache/packages.php`، وهو ملف ناتج بناء يعيد
`composer install` توليده، وليس ملفًا يُعدّل يدويًا). لا يمكن استبعادها دون
التخلّي عن Fortify كليًا — لكن لا شيء في `app/` أو `routes/` أو `resources/js/`
يستدعيها، فهي وزن خامل في `vendor` وليست كود تطبيق قابلًا للوصول.

إن احتاجت مرحلة مستقبلية إعادة 2FA أو الـ passkeys، فالطريق الأنظف هو إعادة
تشغيل مثبّت الـ starter kit على مجلد تجريبي (كما فعلت هذه المهمة) ودمج
النتيجة، وليس إزالة تعليقات قديمة، لأن نسخة القالب الأصلي ستكون قد تغيّرت
حينها على أي حال.

## ماذا تقرأ بعد ذلك

- `02-fortify-role.md` — ما الذي تتحكم فيه فعليًا مصفوفة أعلام الميزات في
  Fortify (`config/fortify.php`)
- `docs/design-decisions.md` §8 — القرار نفسه مسجَّلًا من جهة نظام التصميم، بما
  فيه الفجوة في الخصائص المشتركة لـ `HandleInertiaRequests` التي كشفتها هذه
  المهمة أيضًا
