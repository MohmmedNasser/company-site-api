# حذف صف بمساعدة الـ route model binding: `SubscriberController::destroy`

## ما هو؟

`app/Http/Controllers/Admin/SubscriberController.php:36-43` هو الدالة الوحيدة التي
تحذف مشترك نشرة بريدية:

```php
public function destroy(NewsletterSubscription $subscriber): RedirectResponse
{
    $subscriber->delete();
    Inertia::flash('toast', ['type' => 'success', 'message' => 'Subscriber deleted.']);
    return back();
}
```

لا تستقبل الدالة رقمًا (`$id`) بل كائن `NewsletterSubscription` جاهزًا. هذا هو الـ
**route model binding**: المسار `routes/web.php:41`
(`DELETE /admin/subscribers/{subscriber}`) يحتوي جزءًا اسمه `{subscriber}`، وعندما
يطابق اسمُ متغيّر الدالة (`$subscriber`) اسمَ هذا الجزء، يستدعي Laravel
`NewsletterSubscription::findOrFail($قيمة_الجزء)` نيابةً عنك قبل تنفيذ الدالة.

في الواجهة، `resources/js/pages/admin/subscribers/index.tsx:79` يعيد استخدام
`ConfirmDelete` الموجود (نفس المكوّن الذي تستخدمه صفحة الرسائل) فيفتح نافذة تأكيد
`AlertDialog` قبل إرسال طلب `DELETE`.

## لماذا هو هنا، في هذا المشروع تحديدًا؟

كانت قائمة المشتركين للقراءة فقط، فلا توجد طريقة لإزالة طلب إلغاء اشتراك أو بريد
مزعج أو صف اختبار (ظهر هذا فعليًا: صفوف اختبار المرحلة 14). الدالة تطابق تمامًا
`ContactMessageController::destroy` — نفس التوقيع، ونفس toast، ونفس `back()` — كي
لا يوجد نمطان مختلفان للحذف في اللوحة.

المسار `subscribers/{subscriber}` لا يتعارض مع `subscribers/export`
(`routes/web.php:40`) لأن الأخير `GET` والأول `DELETE`، فلا يلتقطان الطلب نفسه.
الحماية تأتي من مجموعة `['auth', 'verified']` المحيطة (`routes/web.php:26`)، فلا
منطق تفويض جديد: مدير واحد فقط.

## ما البديل ولماذا رُفض؟

- `NewsletterSubscription::destroy($id)` داخل الدالة بعد استقبال `int $id`: يعمل،
  لكنه يتجاهل الصف غير الموجود بصمت (يحذف صفر صفوف ويعيد نجاحًا) بدل أن يعيد 404؛
  الـ binding يعطي 404 تلقائيًا.
- حذف ناعم (`SoftDeletes`) أو حذف جماعي: رُفضا صراحةً — لا يوجد workflow استرجاع في
  أي مكان آخر من اللوحة، والحذف هنا نهائي وصفًّا بصف بقرار مقصود.

## ماذا ينكسر إذا أُزيل؟

بدون الدالة والمسار يعود الجدول للقراءة فقط: زر الحذف في `index.tsx:79` يستدعي
`destroy(subscriber.id)` من ملفات Wayfinder المولّدة، فيفشل البناء
(`@/routes/admin/subscribers` لن يصدّر `destroy`). وبدون الـ binding (لو تحوّل
الوسيط إلى `int $id` بلا فحص) يصبح حذف معرّف غير موجود «ناجحًا» بلا أي أثر.

## ماذا تقرأ بعد ذلك

- `05-string-primary-keys.md` — لماذا موديلات المحتوى الأخرى لها مفاتيح نصية،
  ولماذا يبقى `NewsletterSubscription` بمفتاح رقمي عادي هنا
- `01-inertia-shared-props.md` — كيف تصل رسالة الـ toast (`Inertia::flash`) إلى
  الواجهة بعد إعادة التوجيه
