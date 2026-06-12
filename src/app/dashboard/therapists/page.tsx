"use client";

import { useState, useMemo } from "react";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, deleteDoc, doc, limit } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Mail, 
  Users, 
  Edit, 
  Trash2,
  Phone,
  Search,
  Eye,
  Briefcase
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { TherapistFormDialog } from "@/components/therapists/therapist-form-dialog";
import { useRouter } from "next/navigation";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";
import { Skeleton } from "@/components/ui/skeleton";
import { demoTherapists } from "@/lib/mock-data";

export default function TherapistsPage() {
  const router = useRouter();
  const db = useFirestore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTherapist, setEditingTherapist] = useState<any>(null);

  const therapistsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "therapists"), orderBy("name", "asc"), limit(24));
  }, [db]);

  const { data: dbTherapists, loading } = useCollection(therapistsQuery);

  const allTherapists = useMemo(() => {
    const items = dbTherapists || [];
    if (items.length === 0 && !loading) return demoTherapists;
    return [...items, ...demoTherapists.slice(0, 2)];
  }, [dbTherapists, loading]);

  const filtered = allTherapists.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">دليل الأخصائيين</h1>
          <p className="text-muted-foreground">إدارة فريق العمل وتوزيع الحالات العلاجية.</p>
        </div>
        <Button 
          className="gap-2 bg-primary hover:bg-primary/90 shadow-md"
          onClick={() => {
            setEditingTherapist(null);
            setIsFormOpen(true);
          }}
        >
          <Plus className="h-4 w-4" /> إضافة أخصائي جديد
        </Button>
      </div>

      <div className="flex items-center gap-2 max-w-sm rounded-lg border bg-card px-3 py-1 shadow-sm focus-within:ring-1 focus-within:ring-primary/30 transition-all">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="تصفية بالاسم أو التخصص..." 
          className="border-0 focus-visible:ring-0 shadow-none bg-transparent h-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading && allTherapists.length === 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-2xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-xl bg-muted/20">
          <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
          <p className="text-muted-foreground font-medium">لم يتم العثور على أخصائيين.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((t) => (
            <Card key={t.id} className="overflow-hidden group hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <CardHeader className="bg-secondary/30 pb-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-lg text-primary group-hover:text-primary/80">
                      {t.name} {t.id.startsWith('t') && <span className="text-[8px] font-normal opacity-30">(Demo)</span>}
                    </CardTitle>
                    <Badge variant="outline" className="text-[10px] font-semibold text-muted-foreground bg-white/50">
                      {t.specialization}
                    </Badge>
                  </div>
                  <Badge className={`text-[10px] ${t.availability === 'متاح' ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                    {t.availability}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex flex-col gap-2.5 text-sm">
                  <div className="flex items-center gap-2.5 text-slate-600">
                    <Mail className="h-3.5 w-3.5 text-primary/60" />
                    <span className="truncate">{t.email}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-600">
                    <Briefcase className="h-3.5 w-3.5 text-primary/60" />
                    <span>{t.experienceYears} سنوات خبرة مهنية</span>
                  </div>
                </div>
                
                <div className="pt-4 flex items-center justify-between border-t gap-2 mt-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full h-9 gap-2 border-primary/20 hover:border-primary hover:bg-primary/5"
                    onClick={() => router.push(`/dashboard/therapists/${t.id}`)}
                  >
                    <Eye className="h-3.5 w-3.5" /> عرض الملف الشخصي
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <TherapistFormDialog 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        therapist={editingTherapist} 
      />
    </div>
  );
}
