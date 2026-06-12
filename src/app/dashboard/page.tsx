'use client';

import { StatsCards } from "@/components/dashboard/stats-cards";
import { GrowthChart } from "@/components/dashboard/growth-chart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Sparkles, Calendar, ArrowLeft, Bell, CalendarDays, Plus, Baby, UserCheck, AlertCircle, MessageSquare, ShieldCheck, Heart } from "lucide-react";
import { useUser, useCollection, useFirestore, useMemoFirebase, useDoc } from "@/firebase";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { collection, query, where, orderBy, limit, doc } from "firebase/firestore";
import { Progress } from "@/components/ui/progress";
import { demoSessions, demoChildren } from "@/lib/mock-data";

export default function DashboardPage() {
  const { profile, loading } = useUser();
  const router = useRouter();
  const db = useFirestore();

  const isAdmin = profile?.role === 'center_admin' || profile?.role === 'super_admin';
  const isTherapist = profile?.role === 'therapist';
  const isParent = profile?.role === 'parent';

  // Load today's sessions (Filtered for Parents)
  const todayStr = new Date().toISOString().split('T')[0];
  const todaySessionsQuery = useMemoFirebase(() => {
    if (!db) return null;
    let q = collection(db, "sessions");
    if (isParent && profile?.linkedEntityId) {
      return query(q, where("date", "==", todayStr), where("childId", "==", profile.linkedEntityId), orderBy("time", "asc"));
    }
    return query(q, where("date", "==", todayStr), orderBy("time", "asc"), limit(10));
  }, [db, todayStr, isParent, profile?.linkedEntityId]);
  
  const { data: dbSessions } = useCollection(todaySessionsQuery);

  // Parent Specific: Child doc
  const childDocRef = useMemoFirebase(() => {
    if (!db || !isParent || !profile?.linkedEntityId) return null;
    return doc(db, "children", profile.linkedEntityId);
  }, [db, isParent, profile?.linkedEntityId]);
  const { data: dbChild } = useDoc(childDocRef);

  const displaySessions = dbSessions && dbSessions.length > 0 ? dbSessions : (isParent ? [] : demoSessions);
  const displayChild = dbChild || (isParent ? demoChildren.find(c => c.id === profile?.linkedEntityId) : null);

  const handleSupportContact = () => {
    const whatsappLink = `https://wa.me/201005592947?text=${encodeURIComponent('مرحباً فريق دعم طمأنينة، أحتاج للمساعدة بخصوص مركزي.')}`;
    window.open(whatsappLink, '_blank');
  };

  if (loading) return null;

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000" dir="rtl">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-slate-900 p-6 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/20 rounded-full blur-[80px] md:blur-[120px] -mr-20 md:-mr-40 -mt-20 md:-mt-40" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8">
          <div className="space-y-3 md:space-y-4">
            <Badge className="bg-white/10 text-white border-white/20 px-3 md:px-4 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest backdrop-blur-md">
              {isAdmin ? 'مدير المركز' : isTherapist ? 'القسم السريري' : 'بوابة الوالدين الآمنة'}
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold font-headline leading-tight">
               {isAdmin ? 'نظرة شاملة على المركز' : isTherapist ? 'متابعة الحالات العلاجية' : `رحلة ${displayChild?.fullName || 'طفلك'} نحو التميز`}
            </h1>
            <p className="text-slate-300 max-w-2xl text-sm md:text-lg font-medium leading-relaxed">
              {isParent ? 'مرحباً بكم في نافذتكم الخاصة. نضمن لكم خصوصية تامة لمتابعة كل خطوة نمو وإنجاز لطفلكم.' : 'هنا تجتمع الرعاية الحانية مع البيانات الذكية لتوفير أفضل بيئة نمو للأطفال.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            {!isParent && (
              <Button size="lg" className="flex-1 md:flex-none rounded-xl md:rounded-2xl h-12 md:h-14 px-6 md:px-8 bg-white text-slate-900 hover:bg-slate-100 font-bold gap-2 shadow-2xl text-sm" onClick={() => router.push('/dashboard/sessions')}>
                <Plus className="h-4 w-4 md:h-5 md:w-5" /> حجز جلسة
              </Button>
            )}
            <Button size="lg" variant="outline" className="flex-1 md:flex-none rounded-xl md:rounded-2xl h-12 md:h-14 px-6 md:px-8 bg-white/5 border-white/10 text-white hover:bg-white/10 font-bold text-sm" onClick={() => router.push('/dashboard/reports')}>
              {isParent ? 'تقارير طفلي' : 'آخر التقارير'}
            </Button>
          </div>
        </div>
      </div>

      {!isParent && <StatsCards />}

      <div className="grid gap-8 md:gap-10 lg:grid-cols-3">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8 md:space-y-10">
          
          {/* Today's Schedule Card (Only if there are sessions) */}
          {(displaySessions.length > 0 || !isParent) && (
            <Card className="rounded-[2rem] md:rounded-[2.5rem] border-none shadow-2xl shadow-slate-200/50 bg-white overflow-hidden">
              <CardHeader className="p-6 md:p-10 border-b bg-slate-50/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-xl md:text-2xl font-bold font-headline flex items-center gap-3">
                    <Calendar className="h-6 w-6 md:h-7 md:w-7 text-primary" /> {isParent ? 'جدول جلسات طفلي اليوم' : 'جدول جلسات اليوم'}
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm mt-1">المواعيد النشطة والمجدولة لليوم {todayStr}</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="rounded-xl h-9 md:h-11 gap-2 text-primary font-bold hover:bg-primary/5 text-xs md:text-sm" onClick={() => router.push('/dashboard/sessions')}>
                   عرض الجدول الكامل <ArrowLeft className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-50">
                  {displaySessions.length === 0 ? (
                    <div className="p-20 text-center text-slate-400 italic">لا توجد جلسات مجدولة لهذا اليوم.</div>
                  ) : displaySessions.map(session => (
                    <div key={session.id} className="flex items-center justify-between p-5 md:p-8 group hover:bg-slate-50/80 transition-all cursor-pointer" onClick={() => router.push(`/dashboard/sessions/${session.id}`)}>
                      <div className="flex items-center gap-4 md:gap-6">
                        <div className="p-2.5 md:p-4 bg-primary/10 rounded-xl md:rounded-2xl text-primary font-bold text-base md:text-lg min-w-[60px] md:min-w-[80px] text-center">
                          {session.time}
                        </div>
                        <div className="space-y-0.5 md:space-y-1">
                          <p className="text-sm md:text-lg font-bold text-slate-800 leading-tight">جلسة {session.type}</p>
                          <div className="flex items-center gap-2 text-slate-400 font-medium text-[10px] md:text-xs">
                             <Baby className="h-3 w-3 md:h-3.5 md:w-3.5" /> 
                             <span>{isParent ? displayChild?.fullName : (demoChildren.find(c => c.id === session.childId)?.fullName || "ملف الطفل")}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={`rounded-lg md:rounded-xl px-3 md:px-5 py-1 md:py-2 font-bold text-[10px] md:text-sm ${
                        session.status === 'مجدولة' ? 'bg-blue-50 text-blue-600 border-none' :
                        session.status === 'مكتملة' ? 'bg-emerald-50 text-emerald-600 border-none' : 'bg-rose-50 text-rose-600 border-none'
                      }`}>
                        {session.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {isParent && displayChild && (
            <div className="grid gap-6 md:gap-8 md:grid-cols-2">
              <Card className="rounded-[2rem] md:rounded-[2.5rem] border-none shadow-2xl shadow-primary/20 bg-primary text-white p-6 md:p-10 relative overflow-hidden group">
                <Sparkles className="h-32 md:h-48 w-32 md:w-48 absolute -bottom-10 -left-10 opacity-10 group-hover:rotate-12 transition-transform duration-700" />
                <div className="relative z-10 space-y-4 md:space-y-6">
                  <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-80">
                    <Clock className="h-4 w-4 md:h-5 md:w-5" /> رصيد الجلسات المتبقي
                  </div>
                  <div className="space-y-1">
                    <p className="text-4xl md:text-6xl font-bold">{displayChild.remainingSessions || 0} <span className="text-base md:text-xl opacity-60 font-headline">جلسة</span></p>
                    <p className="text-xs md:text-sm opacity-70">من إجمالي {displayChild.sessionsPurchased || 0} جلسة في باقتكم</p>
                  </div>
                  <div className="space-y-2">
                    <Progress value={((displayChild.sessionsCompleted || 0) / (displayChild.sessionsPurchased || 1)) * 100} className="h-2 md:h-3 bg-white/20" />
                    <div className="flex justify-between text-[9px] md:text-[10px] font-bold opacity-60">
                      <span>{displayChild.sessionsCompleted || 0} مكتملة</span>
                      <span>{displayChild.remainingSessions || 0} متبقية</span>
                    </div>
                  </div>
                  <Button variant="secondary" className="w-full font-bold h-12 md:h-14 rounded-xl md:rounded-2xl shadow-xl shadow-black/10 text-xs md:text-sm" onClick={() => router.push(`/dashboard/children/${displayChild.id}`)}>
                    تفاصيل الاشتراك والفوترة
                  </Button>
                </div>
              </Card>

              <Card className="rounded-[2rem] md:rounded-[2.5rem] border-none shadow-2xl shadow-slate-200/50 bg-white p-6 md:p-10 flex flex-col justify-between">
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="p-3 md:p-4 bg-accent/10 rounded-xl md:rounded-2xl text-accent">
                      <Calendar className="h-6 w-6 md:h-8 md:w-8" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-800 font-headline">الجلسة القادمة</h3>
                      <p className="text-[10px] md:text-xs text-slate-400">يسعدنا استقبالكم في الموعد</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 md:p-6 rounded-2xl md:rounded-3xl text-center space-y-1 border border-slate-100">
                    <p className="text-xl md:text-2xl font-bold text-slate-800">{displayChild.nextSessionDate || "سيتم التنسيق قريباً"}</p>
                    <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest">الموعد المحدد</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full h-12 md:h-14 rounded-xl md:rounded-2xl font-bold mt-4 md:mt-6 border-slate-100 text-xs md:text-sm" onClick={() => router.push('/dashboard/sessions')}>
                  جدولي الزمني الكامل
                </Button>
              </Card>
            </div>
          )}

          <GrowthChart />
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8 md:space-y-10">
          <Card className="rounded-[2rem] md:rounded-[2.5rem] border-none shadow-2xl shadow-slate-200/50 bg-white p-6 md:p-8">
            <CardHeader className="p-0 mb-6 md:mb-8 flex flex-row items-center justify-between">
              <CardTitle className="text-lg md:text-xl font-bold font-headline flex items-center gap-3">
                <Bell className="h-5 w-5 md:h-6 md:w-6 text-accent" /> التنبيهات
              </CardTitle>
            </CardHeader>
            <div className="space-y-3 md:space-y-4">
               <div className="p-4 md:p-5 bg-slate-50 rounded-xl md:rounded-2xl border-r-4 border-r-primary group hover:bg-slate-100 transition-colors">
                 <p className="text-xs md:text-sm font-bold text-slate-800 leading-snug">تم تحديث الخطة العلاجية للأسبوع الحالي</p>
                 <p className="text-[9px] md:text-[10px] text-slate-400 mt-2 font-bold uppercase">منذ ساعتين</p>
               </div>
               <div className="p-4 md:p-5 bg-slate-50 rounded-xl md:rounded-2xl border-r-4 border-r-accent group hover:bg-slate-100 transition-colors">
                 <p className="text-xs md:text-sm font-bold text-slate-800 leading-snug">تقرير تقييم جديد متاح للمراجعة</p>
                 <p className="text-[9px] md:text-[10px] text-slate-400 mt-2 font-bold uppercase">منذ يوم واحد</p>
               </div>
            </div>
          </Card>

          <Card className="rounded-[2rem] md:rounded-[2.5rem] bg-emerald-50 p-6 md:p-8 border border-emerald-100">
             <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
                <div className="p-3 md:p-4 bg-white rounded-2xl shadow-xl">
                  <ShieldCheck className="h-6 w-6 md:h-8 md:w-8 text-emerald-600" />
                </div>
                <h4 className="text-base md:text-lg font-bold text-slate-800 font-headline">خصوصية بياناتكم أولوية</h4>
                <p className="text-[10px] md:text-xs text-slate-500 leading-relaxed">كافة السجلات الطبية والتقارير في طمأنينة محمية بتشفير عالي المستوى ومتاحة فقط للأشخاص المخولين.</p>
                <Button className="w-full rounded-xl bg-emerald-600 text-white font-bold h-10 md:h-11 gap-2 text-xs" onClick={() => router.push('/dashboard/children')}>
                  إعدادات الخصوصية
                </Button>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
