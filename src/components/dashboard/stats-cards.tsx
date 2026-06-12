"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck, Activity, CalendarCheck, TrendingUp } from "lucide-react";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, where } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

export function StatsCards() {
  const db = useFirestore();

  const activeChildrenQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "children"), where("status", "==", "نشط"));
  }, [db]);

  const { data: activeChildren, loading: loadingActive } = useCollection(activeChildrenQuery);

  // إحصائيات واقعية للعرض التجريبي (Demo)
  const stats = [
    {
      title: "الحالات النشطة",
      value: loadingActive ? "..." : (activeChildren && activeChildren.length > 0 ? activeChildren.length.toString() : "24"),
      icon: Users,
      trend: "+15% هذا الشهر",
      color: "blue",
      loading: false
    },
    {
      title: "معدل الرضا",
      value: "98%",
      icon: TrendingUp,
      trend: "ممتاز",
      color: "emerald",
      loading: false
    },
    {
      title: "جلسات اليوم",
      value: "18",
      icon: CalendarCheck,
      trend: "6 قيد التنفيذ",
      color: "indigo",
      loading: false
    },
    {
      title: "نسبة التحصيل",
      value: "82%",
      icon: Activity,
      trend: "تحسن مالي",
      color: "orange",
      loading: false
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Card key={i} className="rounded-3xl border-none shadow-lg shadow-slate-200/40 overflow-hidden group hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-0">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className={`text-[10px] font-bold px-2 py-1 rounded-full bg-${stat.color}-50 text-${stat.color}-700 border border-${stat.color}-100`}>
                  {stat.trend}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold font-headline text-slate-800">{stat.value}</p>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">{stat.title}</p>
              </div>
            </div>
            <div className={`h-1.5 w-full bg-${stat.color}-500 opacity-20`} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
