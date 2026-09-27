# نمط الخصائص المشتركة (shared props) في Inertia

## ما هو؟

`app/Http/Middleware/HandleInertiaRequests.php:36-46` هي دالة `share()` تعمل
مع كل طلب، وتُرجع مصفوفة تُدمج داخل `props` كل استجابة صفحة من Inertia، فوق
أي خصائص يمرّرها الـ controller نفسه إلى `Inertia::render()`. حاليًا تشارك
ثلاثة أشياء: `name` (اسم التطبيق)، و`auth.user` (المستخدم المسجّل دخوله أو
`null`)، و`sidebarOpen` (علَم واجهة مأخوذ من cookie يحدد هل الشريط الجانبي في
لوحة الإدارة مطويّ أم لا).

## لماذا هو هنا في هذا المشروع تحديدًا؟

كل مكوّن صفحة تحت `resources/js/pages/` — `welcome.tsx` و`dashboard.tsx`
وصفحات `auth/*` و`settings/*` — يحتاج أن يعرف من المستخدم المسجّل ليعرض شريط
التنقل، أو رابط "Log in" مقابل "Dashboard"
(`resources/js/pages/welcome.tsx:16-24`)، أو الشريط الجانبي للإعدادات. بدون آلية
للخصائص المشتركة، كان على كل controller (`ProfileController` و`SecurityController`
و controllers الدخول والتسجيل الخاصة بـ Fortify) أن يتذكر تمرير
`'auth' => ['user' => $request->user()]` يدويًا في كل استدعاء لـ
`Inertia::render()`. الـ middleware `HandleInertiaRequests` مسجّل مرة واحدة في
`bootstrap/app.php:24-28` كـ middleware عام لمجموعة `web`، فيعمل قبل كل
controller ويتم الدمج تلقائيًا — لا يوجد controller في هذا المشروع يذكر
`auth.user` صراحةً، ومع ذلك يستلمه كل مكوّن صفحة.

## ما البديل، ولماذا رُفض؟

البديل هو ما يفعله تطبيق Laravel عادي (بدون Inertia): تمرير `$user` إلى كل
استدعاء `view()`، أو الاعتماد على الدالة العامة `auth()` داخل قوالب Blade. هذا
لا يصلح هنا لأن مكوّنات صفحات Inertia مكتوبة بـ React وليست Blade — لا توجد دالة
`auth()` في جهة المتصفح، والفكرة الأساسية من Inertia (حسب
`docs/PROJECT-PLAN.md` §0.2 و§12) أن لوحة الإدارة المبنية بـ React لا تتحدث مع
JSON API خاص بها أبدًا. يجب أن تصل الخصائص كبيانات، والخصائص المشتركة هي آلية
Inertia لتمرير "البيانات التي تحتاجها كل صفحة" دون تمريرها يدويًا عبر كل
controller (prop drilling).

## ماذا ينكسر لو حُذف؟

لو حُذف `HandleInertiaRequests::class` من `bootstrap/app.php:26`، فإن استدعاءات
`Inertia::render()` التي تقوم بها controllers الخاصة بـ Fortify (الدخول والتسجيل
— انظر `02-fortify-role.md`) لن تحقن `errors` أيضًا، لأن الدالة الأساسية
`Inertia\Middleware::share()` (التي تستدعيها دالتنا `share()` عبر
`...parent::share($request)` في السطر 39) هي المسؤولة عن وضع أخطاء التحقق
(validation errors) في كل صفحة. وبشكل مباشر أكثر: `usePage().props.auth` سيصبح
`undefined` في كل مكوّن يقرؤه — `resources/js/pages/welcome.tsx:5` و
`resources/js/components/nav-user.tsx` و`resources/js/components/app-header.tsx`
— فلن يعرف الهيدر أبدًا أن هناك مستخدمًا مسجّلًا، وسيعرض دائمًا قائمة التنقل
الخاصة بالزائر.

## ماذا تقرأ بعد ذلك

- `02-fortify-role.md` — الحزمة التي تستدعي controllers الخاصة بها
  `Inertia::render()` وقد دُمجت فيها هذه الخصائص المشتركة مسبقًا
- `04-auth-simplification-decision.md` — لماذا حمولة الخصائص المشتركة هنا أصغر
  من حمولة الـ starter kit الأصلي (بدون حقول 2FA أو passkeys في المستخدم)
