
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Heart, 
  CheckCircle2, 
  Users, 
  CalendarDays, 
  Wallet, 
  FileText, 
  Sparkles, 
  ArrowLeft,
  ShieldCheck,
  MessageSquare,
  Activity,
  Phone,
  Baby,
  Monitor,
  LayoutDashboard,
  Search,
  Star,
  Clock,
  Plus,
  Bell,
  UserCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// مساعد لرسم واجهات توضيحية احترافية تحاكي لقطات الشاشة الحقيقية
const SaaSUIPlaceholder = ({ type }: { type: string }) => {
  if (type === 'main-dashboard') {
    return (
      <div className="w-full h-full bg-slate-50/50 p-4 space-y-4 overflow-hidden">
        <div className="flex justify-between items-center mb-2 px-2">
          <div className="flex items-center gap-3">
             <div className="h-8 w-8 bg-slate-200 rounded-full" />
             <div className="space-y-1">
               <div className="h-2 w-20 bg-slate-200 rounded" />
               <div className="h-1.5 w-12 bg-slate-100 rounded" />
             </div>
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-8 bg-slate-100 rounded-lg" />
            <div className="h-8 w-8 bg-slate-100 rounded-lg" />
          </div>
        </div>
        
        {/* Dark Hero Section - Matches the provided screenshot */}
        <div className="bg-slate-900 rounded-[1.5rem] p-6 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16" />
           <div className="relative z-10 space-y-4 text-right">
              <Badge className="bg-white/10 text-white border-none text-[8px] uppercase">القسم السريري</Badge>
              <h4 className="text-xl font-bold font-headline">متابعة الحالات العلاجية</h4>
              <p className="text-[9px] text-slate-400 max-w-[200px]">هنا تجتمع الرعاية الحانية مع البيانات الذكية لتوفير أفضل بيئة نمو للأطفال.</p>
              <div className="flex gap-2 justify-end pt-2">
                <div className="h-8 w-24 bg-white rounded-lg flex items-center justify-center text-slate-900 text-[9px] font-bold">+ حجز جلسة</div>
                <div className="h-8 w-20 bg-white/10 rounded-lg flex items-center justify-center text-white text-[9px] font-bold">آخر التقارير</div>
              </div>
           </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'الحالات النشطة', val: '24', color: 'blue' },
            { label: 'معدل الرضا', val: '98%', color: 'emerald' },
            { label: 'جلسات اليوم', val: '18', color: 'indigo' },
            { label: 'نسبة التحصيل', val: '82%', color: 'orange' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 space-y-2">
              <div className={`h-6 w-6 bg-${s.color}-50 rounded-lg`} />
              <div className="text-center space-y-1">
                <div className="text-sm font-bold text-slate-800">{s.val}</div>
                <div className="text-[7px] text-slate-400 uppercase">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
             <div className="flex justify-between mb-4">
                <div className="h-3 w-20 bg-slate-100 rounded" />
                <div className="h-3 w-10 bg-slate-50 rounded" />
             </div>
             <div className="space-y-3">
               {[1, 2].map(i => (
                 <div key={i} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 bg-primary/10 rounded" />
                      <div className="h-2 w-24 bg-slate-200 rounded" />
                    </div>
                    <div className="h-4 w-12 bg-emerald-100 rounded-full" />
                 </div>
               ))}
             </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm space-y-3">
             <div className="h-3 w-16 bg-slate-100 rounded" />
             {[1, 2, 3].map(i => (
               <div key={i} className="h-1.5 w-full bg-slate-50 rounded" />
             ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'children') {
    return (
      <div className="w-full h-full bg-slate-50 p-6 space-y-4">
        <div className="flex justify-between items-center">
           <div className="h-6 w-32 bg-slate-200 rounded" />
           <div className="h-9 w-32 bg-primary rounded-lg shadow-lg" />
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
           <div className="h-10 bg-slate-50 border-b flex items-center px-4 gap-4">
              {[1, 2, 3, 4].map(i => <div key={i} className="h-2 w-16 bg-slate-200 rounded" />)}
           </div>
           <div className="divide-y divide-slate-50">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-14 flex items-center px-4 gap-4">
                   <div className="h-8 w-8 bg-slate-100 rounded-full" />
                   <div className="flex-1 h-2 bg-slate-100 rounded" />
                   <div className="h-2 w-20 bg-slate-50 rounded" />
                   <div className="h-5 w-16 bg-emerald-50 rounded-full" />
                </div>
              ))}
           </div>
        </div>
      </div>
    );
  }

  if (type === 'sessions') {
    return (
      <div className="w-full h-full bg-slate-50 p-6 flex flex-col gap-6">
        <div className="grid grid-cols-7 gap-3">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-20 bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-2">
              <div className="h-1.5 w-8 bg-slate-100 rounded" />
              <div className="h-4 w-6 bg-slate-800 rounded text-center text-[10px] font-bold text-white flex items-center justify-center">{20 + i}</div>
            </div>
          ))}
        </div>
        <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
           <div className="flex items-center gap-3">
             <div className="h-10 w-10 bg-accent/10 rounded-xl" />
             <div className="h-4 w-40 bg-slate-100 rounded" />
           </div>
           <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                  <div className="space-y-2">
                    <div className="h-3 w-32 bg-slate-300 rounded" />
                    <div className="h-2 w-20 bg-slate-200 rounded" />
                  </div>
                  <div className="h-8 w-24 bg-accent/20 rounded-lg" />
                </div>
              ))}
           </div>
        </div>
      </div>
    );
  }

  if (type === 'billing') {
    return (
      <div className="w-full h-full bg-slate-50 p-6 space-y-6">
        <div className="grid grid-cols-3 gap-4">
           <div className="h-24 bg-primary rounded-2xl p-4 space-y-2 shadow-xl shadow-primary/20">
              <div className="h-2 w-12 bg-white/20 rounded" />
              <div className="h-6 w-20 bg-white/40 rounded" />
           </div>
           <div className="h-24 bg-white rounded-2xl p-4 space-y-2 shadow-sm border border-slate-100">
              <div className="h-2 w-12 bg-slate-100 rounded" />
              <div className="h-6 w-20 bg-rose-500/10 rounded" />
           </div>
           <div className="h-24 bg-accent rounded-2xl p-4 space-y-2 shadow-xl shadow-accent/20">
              <div className="h-2 w-12 bg-white/20 rounded" />
              <div className="h-6 w-12 bg-white/40 rounded" />
           </div>
        </div>
        <div className="h-40 bg-white rounded-2xl border border-slate-100 p-6 flex items-end gap-3 justify-center">
           <div className="h-[40%] w-8 bg-slate-100 rounded-t-lg" />
           <div className="h-[70%] w-8 bg-primary/40 rounded-t-lg" />
           <div className="h-[55%] w-8 bg-slate-100 rounded-t-lg" />
           <div className="h-[90%] w-8 bg-primary rounded-t-lg" />
           <div className="h-[65%] w-8 bg-slate-100 rounded-t-lg" />
        </div>
      </div>
    );
  }

  if (type === 'therapists') {
    return (
      <div className="w-full h-full bg-slate-50 p-6 grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-3">
             <div className="flex justify-between">
                <div className="h-10 w-10 bg-slate-100 rounded-full" />
                <div className="h-4 w-12 bg-emerald-100 rounded-full" />
             </div>
             <div className="space-y-1.5">
                <div className="h-2.5 w-24 bg-slate-300 rounded" />
                <div className="h-1.5 w-16 bg-slate-200 rounded" />
             </div>
             <div className="h-px w-full bg-slate-50" />
             <div className="h-6 w-full bg-slate-50 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'parent') {
    return (
      <div className="w-full h-full bg-slate-50 p-6 flex flex-col gap-6">
        <div className="bg-accent rounded-[2rem] p-6 text-white shadow-xl shadow-accent/20 relative overflow-hidden">
           <Heart className="absolute -bottom-6 -left-6 h-24 w-24 opacity-10" />
           <div className="space-y-4">
             <div className="flex justify-between items-center">
               <div className="h-10 w-10 bg-white/20 rounded-full" />
               <div className="h-6 w-20 bg-white/10 rounded-full" />
             </div>
             <div className="space-y-1">
               <div className="h-3 w-32 bg-white/40 rounded" />
               <div className="h-6 w-16 bg-white rounded" />
             </div>
           </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-2 text-center">
              <div className="h-2 w-12 bg-slate-100 mx-auto rounded" />
              <div className="h-5 w-10 bg-accent/10 mx-auto rounded" />
           </div>
           <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-2 text-center">
              <div className="h-2 w-12 bg-slate-100 mx-auto rounded" />
              <div className="h-5 w-10 bg-amber-50 mx-auto rounded" />
           </div>
        </div>
        <div className="flex-1 bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
           <div className="h-3 w-24 bg-slate-100 rounded" />
           <div className="space-y-3">
              {[1, 2].map(i => (
                <div key={i} className="flex gap-3 items-center">
                  <div className="h-6 w-6 bg-slate-100 rounded" />
                  <div className="h-2 w-full bg-slate-50 rounded" />
                </div>
              ))}
           </div>
        </div>
      </div>
    );
  }

  return <div className="w-full h-full bg-slate-200" />;
};

export default function LandingPage() {
  const { user } = useUser();
  const router = useRouter();

  const screenshots = [
    {
      id: 'main-dashboard',
      title: 'لوحة التحكم الرئيسية',
      caption: 'نظرة شاملة على مؤشرات الأداء الحية، رصيد الجلسات، والتنبيهات العاجلة في شاشة واحدة متكاملة.',
      icon: LayoutDashboard,
      color: 'bg-slate-900'
    },
    {
      id: 'children',
      title: 'إدارة سجلات الأطفال',
      caption: 'سجل رقمي متكامل لكل طفل يشمل التاريخ السريري، الخطط العلاجية، وتتبع التطور النمائي بكل دقة.',
      icon: Baby,
      color: 'bg-primary'
    },
    {
      id: 'sessions',
      title: 'الحضور والتقارير',
      caption: 'نظام ذكي للجدولة يمنع التضارب ويسهل رصد الحضور وإصدار التقارير المدعومة بالذكاء الاصطناعي.',
      icon: CalendarDays,
      color: 'bg-accent'
    },
    {
      id: 'billing',
      title: 'الإدارة المالية',
      caption: 'تتبع التدفقات النقدية، الباقات، ومستحقات أولياء الأمور بنظام فوترة آلي متطور وشفاف.',
      icon: Wallet,
      color: 'bg-emerald-500'
    },
    {
      id: 'therapists',
      title: 'دليل الأخصائيين',
      caption: 'إدارة فريق العمل وتوزيع الحالات العلاجية حسب التخصص والخبرة المهنية بكل سهولة.',
      icon: Users,
      color: 'bg-indigo-500'
    },
    {
      id: 'parent',
      title: 'بوابة أولياء الأمور',
      caption: 'نافذة خاصة تمنح الأهل الطمأنينة لمتابعة تقدم أطفالهم واستلام التوصيات المنزلية لحظة بلحظة.',
      icon: Heart,
      color: 'bg-rose-500'
    }
  ];

  const generalWhatsappLink = `https://wa.me/201005592947?text=${encodeURIComponent('مرحباً، أرغب في معرفة المزيد عن نظام طمأنينة لإدارة مراكز التخاطب والعلاج.')}`;

  const handleWhatsApp = (link = generalWhatsappLink) => {
    window.open(link, '_blank');
  };

  const BrowserFrame = ({ children, title }: { children: React.ReactNode, title?: string }) => (
    <div className="flex flex-col w-full bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xl transition-all duration-500 group-hover:shadow-primary/20">
      <div className="h-10 bg-slate-50 border-b flex items-center px-4 gap-2 shrink-0">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-white px-3 py-1 rounded-md border text-[9px] text-slate-400 font-medium truncate max-w-[200px] tracking-tight">
            tamaanina.app / {title}
          </div>
        </div>
      </div>
      <div className="relative aspect-[16/11] bg-white">
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-xl shadow-lg shadow-primary/20">
              <Heart className="h-6 w-6 text-white" fill="white" />
            </div>
            <span className="text-2xl font-bold font-headline text-slate-800 tracking-tighter">طمأنينة</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors">المميزات</a>
            <a href="#product-showcase" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors">جولة في النظام</a>
            <a href="#parent-portal" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors">بوابة الوالدين</a>
            <a href="#pricing" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors">الأسعار</a>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <Button onClick={() => router.push('/dashboard')} className="rounded-xl font-bold px-6">لوحة التحكم</Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => router.push('/login')} className="hidden sm:flex font-bold text-slate-600">تسجيل الدخول</Button>
                <Button onClick={() => router.push('/login')} className="rounded-xl font-bold shadow-lg shadow-primary/20 px-8">ابدأ الآن</Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest">
              <Sparkles className="h-4 w-4" /> منصة الإدارة المتكاملة لمراكز علاج الأطفال
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold font-headline leading-[1.1] tracking-tight">
              رعاية حانية، <span className="text-primary">إدارة ذكية</span> لمستقبل أطفالكم
            </h1>
            <p className="text-lg text-slate-500 max-w-xl leading-relaxed font-medium">
              نظام "طمأنينة" هو الشريك الرقمي الأول لإدارة المراكز العلاجية المتخصصة. نوفر للأخصائيين الأدوات الذكية، وللمديرين الرؤية الكاملة، ولأولياء الأمور نافذة شفافة لمتابعة كل إنجاز.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="h-16 px-10 rounded-2xl text-xl font-bold shadow-2xl shadow-primary/30 gap-3" onClick={() => router.push('/login')}>
                احصل على تجربة مجانية <ArrowLeft className="h-6 w-6" />
              </Button>
              <Button variant="outline" size="lg" className="h-16 px-10 rounded-2xl text-xl font-bold border-slate-200 gap-3" onClick={() => handleWhatsApp()}>
                <MessageSquare className="h-6 w-6 text-green-500" /> اطلب عرضاً توضيحياً
              </Button>
            </div>
          </div>
          <div className="relative animate-in fade-in zoom-in duration-1000">
            <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full -z-10" />
            <BrowserFrame title="Main Center Dashboard">
              <SaaSUIPlaceholder type="main-dashboard" />
            </BrowserFrame>
          </div>
        </div>
      </section>

      {/* Product Showcase Section - The core request update */}
      <section id="product-showcase" className="py-24 bg-slate-50/50 overflow-hidden border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-bold uppercase mb-2">
              <Monitor className="h-4 w-4" /> واجهات نظام طمأنينة المتطورة
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-headline text-slate-900 leading-tight">شاهد النظام أثناء العمل</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">لقطات حقيقية تحاكي واجهات منصة طمأنينة لإدارة المراكز العلاجية ومتابعة الأطفال بدقة متناهية.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {screenshots.map((s) => {
              return (
                <div key={s.id} className="group space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <div className="relative transition-all duration-500 group-hover:-translate-y-2">
                    <BrowserFrame title={s.title}>
                       <SaaSUIPlaceholder type={s.id} />
                    </BrowserFrame>
                    <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl -z-10 group-hover:bg-primary/10 transition-colors" />
                  </div>
                  <div className="text-right pr-2">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl ${s.color} text-white flex items-center justify-center shadow-lg shadow-current/20`}>
                        <s.icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-2xl font-bold font-headline text-slate-800">{s.title}</h3>
                    </div>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{s.caption}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold font-headline text-slate-900">كل ما يحتاجه مركزك في مكان واحد</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">صممنا "طمأنينة" ليغطي كافة الجوانب التشغيلية والعلاجية والمالية لمركزك باحترافية.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "إدارة الجلسات", desc: "جدولة ذكية للمواعيد وتتبع الحضور والغياب لحظياً ومنع تضارب الجداول.", icon: CalendarDays, color: "blue" },
              { title: "ملفات الحالات", desc: "سجل طبي وسلوكي متكامل لكل طفل مع تتبع دقيق للخطط العلاجية الفردية.", icon: Baby, color: "emerald" },
              { title: "الفوترة والاشتراكات", desc: "إدارة الدفعات، الباقات، والمستحقات بالجنيه المصري مع تقارير مالية دقيقة.", icon: Wallet, color: "amber" },
              { title: "التقارير الذكية", desc: "إنشاء تقارير تقدم دورية احترافية مدعومة بالذكاء الاصطناعي وقابلة للطباعة.", icon: FileText, color: "indigo" },
              { title: "بوابة الوالدين", desc: "نافذة خاصة للأهالي لمتابعة نمو أطفالهم واستلام التمارين المنزلية بكل سرية.", icon: Users, color: "rose" },
              { title: "مساعد الذكاء الاصطناعي", desc: "تحليل ملاحظات الجلسات وتحويلها لملخصات حانية ومفهومة بلغة عربية سليمة.", icon: Sparkles, color: "purple" },
              { title: "إدارة الأنشطة", desc: "تكليف الأطفال بمهام علاجية منزلية وتوثيق أدائهم لتعزيز المهارات يومياً.", icon: Activity, color: "teal" },
              { title: "أمان البيانات", desc: "تشفير كامل لكافة البيانات السريرية والشخصية وضمان خصوصية كل مركز.", icon: ShieldCheck, color: "slate" },
            ].map((f, i) => (
              <Card key={i} className="rounded-[2.5rem] border-none shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-all duration-300 group">
                <CardContent className="p-8 space-y-4">
                  <div className={`p-4 rounded-2xl bg-${f.color}-50 text-${f.color}-600 w-fit group-hover:scale-110 transition-transform`}>
                    <f.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold font-headline">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Parent Portal Deep Dive */}
      <section id="parent-portal" className="py-24 px-6 overflow-hidden bg-slate-50/30">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative order-2 lg:order-1 animate-in fade-in slide-in-from-left-8 duration-1000">
             <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full -z-10" />
             <div className="rotate-2 transition-transform hover:rotate-0 duration-700">
                <BrowserFrame title="Parent Portal - Child Progress">
                   <SaaSUIPlaceholder type="parent" />
                </BrowserFrame>
             </div>
          </div>
          <div className="space-y-8 order-1 lg:order-2 text-right">
            <h2 className="text-4xl font-bold font-headline text-slate-900 leading-tight">بوابة أولياء الأمور: <br/><span className="text-accent">شراكة حقيقية في نجاح طفلكم</span></h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              ندرك أن ولي الأمر هو الشريك الأهم في العملية العلاجية. لذا وفرنا بوابة خاصة تمنحهم الراحة التامة وتشركهم بفعالية في رحلة نمو طفلهم.
            </p>
            <div className="space-y-5">
              {[
                "متابعة رصيد الجلسات المتبقي وتلقي تنبيهات التجديد آلياً.",
                "عرض التقارير الدورية فور صدورها من الأخصائي المسؤول.",
                "استلام تمارين منزلية وتوثيق أداء الطفل بالصور والملاحظات.",
                "الاطلاع على موعد الجلسة القادمة وتفاصيل الخطة العلاجية الحالية."
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 justify-start">
                  <div className="p-1 bg-accent/10 rounded-full"><CheckCircle2 className="h-5 w-5 text-accent" /></div>
                  <span className="text-slate-700 font-bold">{text}</span>
                </div>
              ))}
            </div>
            <Button size="lg" className="h-16 px-10 rounded-2xl bg-accent hover:bg-accent/90 shadow-xl shadow-accent/20 font-bold text-lg" onClick={() => handleWhatsApp()}>
              اكتشف ميزات الأهالي الآن
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-4 mb-16">
          <Badge className="bg-amber-100 text-amber-700 border-amber-200 px-4 py-1.5 rounded-full text-xs font-bold mb-4">
            🔥 أسعار الإطلاق الحصرية لفترة محدودة
          </Badge>
          <h2 className="text-4xl font-bold font-headline text-slate-900 leading-tight">باقات تناسب نمو مركزك العلاجي</h2>
          <p className="text-slate-500 max-w-xl mx-auto">اختر الخطة التي تمنحك أفضل الأدوات لخدمة أطفالك وإدارة مركزك بكفاءة عالية.</p>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { 
              name: "الباقة الأساسية", 
              price: "499", 
              features: ["حتى 30 طفل", "حتى 5 أخصائيين", "إدارة الجلسات", "إدارة الحالات", "التقارير الأساسية", "دعم فني عبر البريد"], 
              cta: "ابدأ الآن", 
              primary: false, 
              link: "/login" 
            },
            { 
              name: "الباقة الاحترافية", 
              price: "999", 
              features: ["حتى 100 طفل", "أخصائيون غير محدودين", "إدارة الجلسات والحالات", "التقارير المتقدمة بالذكاء الاصطناعي", "بوابة الوالدين", "إدارة الفواتير", "تنبيهات تلقائية", "دعم فني مخصص"], 
              cta: "الأكثر طلباً", 
              primary: true, 
              link: "/login",
              badge: "الأكثر شعبية"
            },
            { 
              name: "باقة المؤسسات", 
              price: "تواصل معنا", 
              features: ["عدد أطفال غير محدود", "إدارة فروع متعددة", "صلاحيات إدارية متقدمة", "تخصيص كامل للنظام", "تدريب فريق العمل حضورياً", "دعم فني فوري 24/7", "استضافة بيانات خاصة"], 
              cta: "احجز عرضاً تجريبياً", 
              primary: false, 
              link: 'whatsapp' 
            },
          ].map((plan, i) => (
            <Card key={i} className={`rounded-[2.5rem] p-10 flex flex-col items-center text-center space-y-8 transition-all duration-300 relative ${plan.primary ? 'bg-primary text-white shadow-2xl shadow-primary/40 scale-105 border-none' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50'}`}>
              {plan.badge && (
                <Badge className="absolute -top-3 bg-accent text-white px-5 py-1.5 rounded-full text-[10px] font-bold shadow-lg shadow-accent/30">
                  {plan.badge}
                </Badge>
              )}
              <div className="space-y-2">
                <h3 className="text-2xl font-bold font-headline">{plan.name}</h3>
                <div className="text-4xl font-bold">
                  {plan.price !== 'تواصل معنا' ? (
                    <>
                      {plan.price} <span className={`text-sm font-medium ml-1 ${plan.primary ? 'text-white/60' : 'text-slate-400'}`}>جنيه / شهر</span>
                    </>
                  ) : (
                    plan.price
                  )}
                </div>
              </div>
              <div className="w-full h-px bg-current opacity-10" />
              <div className="space-y-4 flex-1 text-right w-full">
                {plan.features.map((f, fi) => (
                  <div key={fi} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className={`h-4 w-4 shrink-0 ${plan.primary ? 'text-white' : 'text-primary'}`} />
                    <span className="leading-snug">{f}</span>
                  </div>
                ))}
              </div>
              <Button 
                size="lg" 
                className={`w-full rounded-2xl font-bold h-16 text-lg ${plan.primary ? 'bg-white text-primary hover:bg-slate-100' : 'bg-primary text-white shadow-lg shadow-primary/20'}`} 
                onClick={() => plan.link === 'whatsapp' ? handleWhatsApp() : router.push(plan.link)}
              >
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/20 blur-[150px] rounded-full -mb-48 -mr-48" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="space-y-8">
            <h2 className="text-5xl font-bold font-headline leading-tight text-white">هل أنت مستعد <br/><span className="text-primary">لرقمنة مركزك العلاجي؟</span></h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              فريق "طمأنينة" موجود دائماً للإجابة على استفساراتكم التقنية والتجارية عبر واتساب. نحن نؤمن بأن التواصل المباشر هو أسرع طريق لنجاح مركزكم وتطور خدماتكم.
            </p>
            <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-sm space-y-6">
              <h4 className="text-xl font-bold font-headline text-primary">لماذا تختار منصة طمأنينة؟</h4>
              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-primary" /> دعم فني مخصص باللغة العربية لكل عميل.</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-primary" /> تدريب كامل لفريق عملكم على كافة خصائص النظام.</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-primary" /> إمكانية طلب ميزات مخصصة لتلبية احتياجات مركزكم الفريدة.</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center gap-10 animate-in fade-in zoom-in duration-1000 delay-300">
            <div className="text-center space-y-3">
              <div className="mx-auto p-6 bg-green-500/20 rounded-full w-fit border border-green-500/30">
                <MessageSquare className="h-16 w-16 text-green-500 fill-green-500/20" />
              </div>
              <h3 className="text-3xl font-bold font-headline mt-4">ابدأ محادثتك معنا الآن</h3>
              <p className="text-slate-400">احصل على تسعير مخصص وعرض مباشر لكافة المميزات.</p>
            </div>
            <Button 
              size="lg" 
              className="h-20 px-12 rounded-[2.5rem] bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-2xl gap-5 shadow-[0_20px_50px_rgba(37,211,102,0.3)] w-full max-w-md group overflow-hidden relative" 
              onClick={() => handleWhatsApp()}
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <Phone className="h-8 w-8 relative z-10" fill="white" />
              <span className="relative z-10">تواصل عبر واتساب</span>
            </Button>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] bg-white/5 px-6 py-2 rounded-full border border-white/10">متاحون للرد من 9 صباحاً وحتى 11 مساءً</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t bg-slate-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-xl">
              <Heart className="h-6 w-6 text-white" fill="white" />
            </div>
            <span className="text-2xl font-bold font-headline text-slate-800 tracking-tighter">طمأنينة</span>
          </div>
          <p className="text-sm text-slate-400 font-medium italic">© {new Date().getFullYear()} طمأنينة لإدارة مراكز رعاية الأطفال. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-8">
             <span className="text-sm text-slate-600 font-bold" dir="ltr">01005592947</span>
             <a href="#" className="text-sm text-slate-400 hover:text-primary transition-colors font-medium">سياسة الخصوصية</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
