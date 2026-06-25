export default function Home() {
  const stats = [
    { title: "إجمالي الطلبات", value: "1,248", change: "+12%" },
    { title: "الموظفون", value: "86", change: "+4" },
    { title: "مبيعات الشهر", value: "245,800 ر.س", change: "+18%" },
    { title: "تنبيهات المخزون", value: "14", change: "-3" },
  ];

  const modules = ["الطلبات", "الموارد البشرية", "المخزون", "العملاء", "المالية", "التقارير"];

  return (
    <main dir="rtl" className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex">
        <aside className="w-72 min-h-screen bg-slate-950 text-white p-6">
          <h1 className="text-3xl font-bold mb-10">FlexiSys</h1>
          <nav className="space-y-3">
            {modules.map((item) => (
              <div key={item} className="rounded-xl px-4 py-3 bg-white/5 hover:bg-white/10">
                {item}
              </div>
            ))}
          </nav>
        </aside>

        <section className="flex-1 p-8">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">لوحة التحكم</h2>
              <p className="text-slate-500 mt-1">نظرة عامة على منصة FlexiSys</p>
            </div>
            <div className="bg-white rounded-xl px-5 py-3 shadow">الإدارة الرئيسية</div>
          </header>

          <div className="grid grid-cols-4 gap-5 mb-8">
            {stats.map((stat) => (
              <div key={stat.title} className="bg-white rounded-2xl p-6 shadow">
                <p className="text-slate-500">{stat.title}</p>
                <h3 className="text-3xl font-bold mt-3">{stat.value}</h3>
                <span className="text-emerald-600 text-sm mt-3 block">{stat.change}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2 bg-white rounded-2xl p-6 shadow min-h-80">
              <h3 className="text-xl font-bold mb-4">أداء المبيعات</h3>
              <div className="h-56 flex items-end gap-4 border-b border-slate-200">
                {[40, 70, 55, 90, 65, 80, 100].map((h, i) => (
                  <div key={i} className="flex-1 bg-blue-600 rounded-t-xl" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow">
              <h3 className="text-xl font-bold mb-4">حالة النظام</h3>
              <div className="space-y-4">
                <p>واجهة الويب: ✅ تعمل</p>
                <p>واجهة API: ✅ متصلة</p>
                <p>قاعدة البيانات: قريبًا</p>
                <p>المستخدمون والصلاحيات: قريبًا</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
