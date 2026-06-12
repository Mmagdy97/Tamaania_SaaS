'use client';

import { useMemo, useState, useEffect } from "react";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  CalendarCheck, 
  UserX, 
  UserMinus, 
  ArrowLeft,
  Baby,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from "recharts";
import { Badge } from "@/components/ui/badge";

export default function AttendanceReportsPage() {
  const router = useRouter();
  const db = useFirestore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Load all sessions for attendance analysis
  const sessionsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "sessions"), orderBy("date", "desc"), limit(500));
  }, [db]);
  const { data: sessions, loading } = useCollection(sessionsQuery);

  const childrenQuery = useMemoFirebase(() => db ? collection(db, "children") : null, [db]);
  const { data: children } = useCollection(childrenQuery);

  const getChildName = (id: string) => children?.find(c => c.id === id)?.fullName || "ملف تجريبي";

  const stats = useMemo(() => {
    if (!sessions || sessions.length === 0) {
       return { attended: 142, absent: 12, excused: 8, total: 162 };
    }
    const attended = sessions.filter(s => s.status === 'حضر' || s.status === 'مكتملة').length;
    const absent = sessions.filter(s => s.status === 'غاب').length;
    const excused = sessions.filter(s => s.status === 'اعتذر').length;
    return { attended, absent, excused, total: sessions.length };
  }, [sessions]);

  const chartData = [
    { name: 'حضر/مكتمل', value: stats.attended, color: '#10b981' },
    { name: 'غاب', value: stats.absent, color: '#f43f5e' },
    { name: 'اعتذر', value: stats.excused, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700" dir="rtl">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold font-headline text-slate-900 tracking-tight">تقارير الحضور والغياب</h1>
        <p className="text-slate-500 font-medium">تحليل انضباط الأطفال ومتابعة حالات الغياب المتكرر بنظرة واحدة.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="rounded-3xl border-none shadow-lg bg-white p-6 text-center space-y-2">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-fit mx-auto"><CalendarCheck className="h-6 w-6" /></div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">إجمالي الحضور</p>
          <p className="text-3xl font-bold text-emerald-600">{stats.attended}</p>
        </Card>
        <Card className="rounded-3xl border-none shadow-lg bg-white p-6 text-center space-y-2">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl w-fit mx-auto"><UserX className="h-6 w-6" /></div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">إجمالي الغياب</p>
          <p className="text-3xl font-bold text-rose-600">{stats.absent}</p>
        </Card>
        <Card className="rounded-3xl border-none shadow-lg bg-white p-6 text-center space-y-2">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl w-fit mx-auto"><UserMinus className="h-6 w-6" /></div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">إجمالي الاعتذارات</p>
          <p className="text-3xl font-bold text-amber-600">{stats.excused}</p>
        </Card>
        <Card className="rounded-3xl border-none shadow-lg bg-primary text-white p-6 text-center space-y-2">
          <div className="p-3 bg-white/20 rounded-2xl w-fit mx-auto"><BarChart3 className="h-6 w-6" /></div>
          <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest">نسبة الالتزام</p>
          <p className="text-3xl font-bold">{stats.total ? Math.round((stats.attended / stats.total) * 100) : 0}%</p>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-1 rounded-[2rem] border-none shadow-xl bg-white p-8">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-xl font-bold font-headline">تحليل توزيع الحضور</CardTitle>
          </CardHeader>
          <div className="h-[300px] w-full">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend layout="horizontal" align="center" verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center italic text-slate-400 text-xs">جاري تجهيز الرسم البياني...</div>
            )}
          </div>
        </Card>

        <Card className="lg:col-span-2 rounded-[2rem] border-none shadow-xl bg-white overflow-hidden">
          <CardHeader className="p-8 border-b bg-slate-50/50 flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Users className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl font-bold font-headline">سجل الحضور الأخير</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
               <div className="p-8 space-y-4">
                 {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16 w-full rounded-2xl" />)}
               </div>
            ) : !sessions?.length ? (
              <div className="p-12 text-center text-slate-400 italic">لا توجد سجلات حضور نشطة في الوقت الحالي. سيتم عرض بيانات الديمو في الإحصائيات أعلاه.</div>
            ) : (
              <div className="divide-y divide-slate-50">
                {sessions.map(session => (
                  <div key={session.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-all cursor-pointer group" onClick={() => router.push(`/dashboard/sessions/${session.id}`)}>
                    <div className="flex items-center gap-4">
                       <div className="p-3 bg-slate-100 rounded-2xl text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                         <Baby className="h-5 w-5" />
                       </div>
                       <div className="space-y-0.5">
                         <p className="font-bold text-slate-800">{getChildName(session.childId)}</p>
                         <p className="text-[10px] text-slate-400 font-medium">جلسة {session.type} - {session.date}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <Badge className={`rounded-xl px-4 py-1 font-bold text-[10px] ${
                         session.status === 'مكتملة' || session.status === 'حضر' ? 'bg-emerald-50 text-emerald-600 border-none' :
                         session.status === 'غاب' ? 'bg-rose-50 text-rose-600 border-none' :
                         session.status === 'اعتذر' ? 'bg-amber-50 text-amber-600 border-none' :
                         'bg-slate-100 text-slate-500 border-none'
                       }`}>
                         {session.status}
                       </Badge>
                       <ArrowLeft className="h-4 w-4 text-slate-300 group-hover:translate-x-[-4px] transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
