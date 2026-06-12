"use client";

import { useState, useMemo } from "react";
import { useCollection, useFirestore, useMemoFirebase, useUser } from "@/firebase";
import { collection, query, orderBy, limit, where } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Plus, 
  Search, 
  Eye,
  ShieldAlert
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ChildFormDialog } from "@/components/children/child-form-dialog";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { demoChildren } from "@/lib/mock-data";

export default function ChildrenPage() {
  const router = useRouter();
  const db = useFirestore();
  const { centerId, profile } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingChild, setEditingChild] = useState<any>(null);
  const [pageSize, setPageSize] = useState(15);

  const isParent = profile?.role === 'parent';

  const childrenQuery = useMemoFirebase(() => {
    if (!db || !centerId) return null;
    
    let q = collection(db, "centers", centerId, "children");
    
    // إذا كان ولي أمر، نعرض فقط الطفل المرتبط به
    if (isParent && profile?.linkedEntityId) {
      return query(q, where("__name__", "==", profile.linkedEntityId));
    }
    
    return query(q, orderBy("fullName", "asc"), limit(pageSize));
  }, [db, centerId, pageSize, isParent, profile?.linkedEntityId]);

  const { data: dbChildren, loading } = useCollection(childrenQuery);

  const allChildren = useMemo(() => {
    const dbItems = dbChildren || [];
    
    // لولي الأمر: لا نعرض بيانات ديمو عشوائية إلا إذا كانت هي المرتبطة به
    if (isParent) {
      if (dbItems.length > 0) return dbItems;
      return demoChildren.filter(c => c.id === profile?.linkedEntityId);
    }

    if (dbItems.length === 0 && !loading) return demoChildren;
    return [...dbItems, ...demoChildren.slice(0, 5)];
  }, [dbChildren, loading, isParent, profile?.linkedEntityId]);

  const filteredChildren = allChildren.filter(c => 
    c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.diagnosis && c.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-1000" dir="rtl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-1.5">
          <h1 className="text-2xl md:text-4xl font-bold font-headline text-slate-900 leading-tight">
            {isParent ? 'ملف طفلي' : 'إدارة الأطفال'}
          </h1>
          <p className="text-sm md:text-slate-500 font-medium">
            {isParent ? 'متابعة تفاصيل الحالة والتقدم العلاجي لطفلك.' : 'سجل متكامل لمتابعة الحالات والتقدم العلاجي.'}
          </p>
        </div>
        {!isParent && (
          <Button 
            className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 h-12 md:h-14 px-8 rounded-xl md:rounded-2xl font-bold text-base md:text-lg"
            onClick={() => {
              setEditingChild(null);
              setIsFormOpen(true);
            }}
          >
            <Plus className="h-5 w-5 md:h-6 md:w-6" /> إضافة طفل جديد
          </Button>
        )}
      </div>

      {!isParent && (
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-3 md:p-4 rounded-[1.5rem] md:rounded-[2rem] shadow-xl border border-slate-100">
          <div className="flex items-center gap-3 w-full max-lg bg-slate-50 rounded-xl md:rounded-2xl px-4 md:px-5 py-2 md:py-3 border border-slate-100">
            <Search className="h-4 w-4 md:h-5 md:w-5 text-slate-400" />
            <input 
              placeholder="ابحث عن طفل، ولي أمر..." 
              className="flex-1 bg-transparent border-0 focus:outline-none text-xs md:text-sm text-right font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="hidden sm:block text-xs text-slate-400 font-bold uppercase tracking-widest">
              {allChildren.length} طفل مسجل
          </div>
        </div>
      )}

      <div className="rounded-[1.5rem] md:rounded-[2.5rem] border-none bg-white shadow-2xl overflow-x-auto custom-scrollbar">
        <Table className="min-w-[800px]">
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent border-b border-slate-100 h-14 md:h-16">
              <TableHead className="text-right pr-6 md:pr-10 font-bold text-slate-500 text-[10px] md:text-xs uppercase tracking-widest">الاسم الكامل</TableHead>
              <TableHead className="text-right font-bold text-slate-500 text-[10px] md:text-xs uppercase tracking-widest">العمر</TableHead>
              <TableHead className="text-right font-bold text-slate-500 text-[10px] md:text-xs uppercase tracking-widest">التشخيص</TableHead>
              <TableHead className="text-right font-bold text-slate-500 text-[10px] md:text-xs uppercase tracking-widest">ولي الأمر</TableHead>
              <TableHead className="text-right font-bold text-slate-500 text-[10px] md:text-xs uppercase tracking-widest">الحالة</TableHead>
              <TableHead className="text-left pl-6 md:pl-10 font-bold text-slate-500 text-[10px] md:text-xs uppercase tracking-widest">إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && allChildren.length === 0 ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="h-20"><TableCell colSpan={6}><Skeleton className="h-10 w-full rounded-xl" /></TableCell></TableRow>
              ))
            ) : filteredChildren.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-20 text-slate-400 italic">لا توجد سجلات مصرح لك بمشاهدتها.</TableCell></TableRow>
            ) : (
              filteredChildren.map((child) => (
                <TableRow key={child.id} className="h-16 md:h-20 hover:bg-slate-50/50 transition-colors group">
                  <TableCell className="pr-6 md:pr-10 font-bold text-primary cursor-pointer text-sm md:text-base" onClick={() => router.push(`/dashboard/children/${child.id}`)}>
                    {child.fullName} {child.id.startsWith('c') && <span className="text-[9px] font-normal text-slate-300 mr-2">(Demo)</span>}
                  </TableCell>
                  <TableCell className="text-sm">{child.age} سنوات</TableCell>
                  <TableCell className="text-slate-500 text-[11px] md:text-xs truncate max-w-[150px]">{child.diagnosis || "-"}</TableCell>
                  <TableCell className="font-bold text-sm">{child.parentName}</TableCell>
                  <TableCell><Badge className={`rounded-xl text-[10px] md:text-xs ${child.status === 'نشط' ? 'bg-emerald-50 text-emerald-600 border-none' : ''}`}>{child.status}</Badge></TableCell>
                  <TableCell className="pl-6 md:pl-10 text-left">
                     <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.push(`/dashboard/children/${child.id}`)}><Eye className="h-4 w-4 text-slate-400" /></Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {!isParent && <ChildFormDialog open={isFormOpen} onOpenChange={setIsFormOpen} child={editingChild} />}
    </div>
  );
}
