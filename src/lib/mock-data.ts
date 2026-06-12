export interface Child {
  id: string;
  fullName: string;
  age: number;
  gender: 'ذكر' | 'أنثى';
  parentName: string;
  parentPhone: string;
  diagnosis: string;
  treatmentPlan: string;
  status: 'نشط' | 'قيد الانتظار' | 'مكتمل';
  sessionsPurchased: number;
  sessionsCompleted: number;
  remainingSessions: number;
  paymentStatus: 'مدفوع' | 'مدفوع جزئياً' | 'غير مدفوع';
  amountPaid: number;
  remainingBalance: number;
  totalAmount: number;
  nextSessionDate: string;
  assignedTherapistId: string;
  createdAt: any;
}

export interface Therapist {
  id: string;
  name: string;
  specialization: string;
  availability: 'متاح' | 'في جلسة' | 'غير متصل';
  experienceYears: number;
  email: string;
  phone: string;
  bio: string;
}

export interface Session {
  id: string;
  childId: string;
  therapistId: string;
  date: string;
  time: string;
  type: string;
  status: 'مجدولة' | 'حضر' | 'غاب' | 'اعتذر' | 'مؤجل' | 'مكتملة';
  notes?: string;
}

export interface Report {
  id: string;
  childId: string;
  therapistId: string;
  sessionDate: string;
  evaluation: string;
  notes: string;
  recommendations: string;
  status: 'نشط' | 'مؤرشف';
}

export interface Payment {
  id: string;
  childId: string;
  amount: number;
  date: string;
  method: string;
  notes: string;
}

export const demoTherapists: Therapist[] = [
  {
    id: 't1',
    name: 'د. إلينا مراد',
    specialization: 'نطق وتخاطب',
    availability: 'متاح',
    experienceYears: 8,
    email: 'elena.m@tamaanina.demo',
    phone: '01005592947',
    bio: 'أخصائية نطق وتخاطب معتمدة، خبيرة في علاج حالات التأخر اللغوي وتأتأة الأطفال.'
  },
  {
    id: 't2',
    name: 'د. يوسف زكي',
    specialization: 'علاج وظيفي',
    availability: 'في جلسة',
    experienceYears: 12,
    email: 'youssef.z@tamaanina.demo',
    phone: '01005592947',
    bio: 'خبير في تطوير المهارات الحركية الدقيقة والتكامل الحسي للأطفال ذوي التوحد.'
  },
  {
    id: 't3',
    name: 'أ/ سارة منصور',
    specialization: 'علاج سلوكي',
    availability: 'متاح',
    experienceYears: 5,
    email: 'sarah.m@tamaanina.demo',
    phone: '01005592947',
    bio: 'متخصصة في تعديل السلوك وتعزيز المهارات الاجتماعية للأطفال في مرحلة ما قبل المدرسة.'
  },
  {
    id: 't4',
    name: 'أ/ أحمد زكي',
    specialization: 'تربية خاصة',
    availability: 'غير متصل',
    experienceYears: 7,
    email: 'ahmed.z@tamaanina.demo',
    phone: '01005592947',
    bio: 'خبير في تصميم الخطط التربوية الفردية للأطفال ذوي صعوبات التعلم.'
  }
];

export const demoChildren: Child[] = [
  {
    id: 'c1',
    fullName: 'أحمد محمد علي',
    age: 6,
    gender: 'ذكر',
    parentName: 'إيمان محمد',
    parentPhone: '01005592947',
    diagnosis: 'تأخر نمو لغوي ناتج عن حرمان بيئي',
    treatmentPlan: 'خطة مكثفة لزيادة الحصيلة اللغوية وبناء جمل من 3 كلمات.',
    status: 'نشط',
    sessionsPurchased: 12,
    sessionsCompleted: 9,
    remainingSessions: 3,
    paymentStatus: 'مدفوع',
    amountPaid: 2400,
    remainingBalance: 0,
    totalAmount: 2400,
    nextSessionDate: 'غداً، 10:00 صباحاً',
    assignedTherapistId: 't1',
    createdAt: { seconds: 1704067200 }
  },
  {
    id: 'c2',
    fullName: 'ليلى إبراهيم داوود',
    age: 4,
    gender: 'أنثى',
    parentName: 'داوود إبراهيم',
    parentPhone: '01005592947',
    diagnosis: 'اضطراب طيف توحد (درجة بسيطة)',
    treatmentPlan: 'برنامج للتكامل الحسي وتحسين التواصل البصري مع الأقران.',
    status: 'نشط',
    sessionsPurchased: 20,
    sessionsCompleted: 4,
    remainingSessions: 16,
    paymentStatus: 'مدفوع جزئياً',
    amountPaid: 1500,
    remainingBalance: 2500,
    totalAmount: 4000,
    nextSessionDate: 'الأربعاء، 11:30 صباحاً',
    assignedTherapistId: 't2',
    createdAt: { seconds: 1706745600 }
  },
  {
    id: 'c3',
    fullName: 'عمر علي بن حسن',
    age: 7,
    gender: 'ذكر',
    parentName: 'علي بن حسن',
    parentPhone: '01005592947',
    diagnosis: 'فرط حركة وتشتت انتباه (ADHD)',
    treatmentPlan: 'تمارين لزيادة مدة التركيز والجلوس الهادف وتعديل السلوك الاندفاعي.',
    status: 'نشط',
    sessionsPurchased: 10,
    sessionsCompleted: 8,
    remainingSessions: 2,
    paymentStatus: 'مدفوع',
    amountPaid: 2000,
    remainingBalance: 0,
    totalAmount: 2000,
    nextSessionDate: 'اليوم، 04:00 مساءً',
    assignedTherapistId: 't3',
    createdAt: { seconds: 1709251200 }
  },
  {
    id: 'c4',
    fullName: 'سارة خالد محمود',
    age: 8,
    gender: 'أنثى',
    parentName: 'صوفيا خالد',
    parentPhone: '01005592947',
    diagnosis: 'صعوبات تعلم نمائية (عسر قراءة)',
    treatmentPlan: 'برنامج لتقوية المهارات المعرفية والوعي الفونولوجي.',
    status: 'مكتمل',
    sessionsPurchased: 15,
    sessionsCompleted: 15,
    remainingSessions: 0,
    paymentStatus: 'مدفوع',
    amountPaid: 3000,
    remainingBalance: 0,
    totalAmount: 3000,
    nextSessionDate: 'منتهي',
    assignedTherapistId: 't4',
    createdAt: { seconds: 1711929600 }
  },
  {
    id: 'c5',
    fullName: 'ياسين محمود حسن',
    age: 5,
    gender: 'ذكر',
    parentName: 'محمود حسن',
    parentPhone: '01005592947',
    diagnosis: 'لدغات كلامية وتأتأة بسيطة',
    treatmentPlan: 'تصحيح مخارج الحروف (س، ش، ر) وتمارين تنفس.',
    status: 'نشط',
    sessionsPurchased: 8,
    sessionsCompleted: 2,
    remainingSessions: 6,
    paymentStatus: 'غير مدفوع',
    amountPaid: 0,
    remainingBalance: 1600,
    totalAmount: 1600,
    nextSessionDate: 'الخميس، 01:00 ظهراً',
    assignedTherapistId: 't1',
    createdAt: { seconds: 1714521600 }
  }
];

export const demoSessions: Session[] = [
  {
    id: 's1',
    childId: 'c1',
    therapistId: 't1',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    type: 'نطق وتخاطب',
    status: 'مجدولة',
    notes: 'سيتم العمل على حرف "الراء" وتكوين جملة من 3 كلمات.'
  },
  {
    id: 's2',
    childId: 'c3',
    therapistId: 't3',
    date: new Date().toISOString().split('T')[0],
    time: '12:00',
    type: 'علاج سلوكي',
    status: 'مكتملة',
    notes: 'تحسن ملحوظ في الهدوء والجلوس لمدة 10 دقائق متواصلة.'
  },
  {
    id: 's3',
    childId: 'c2',
    therapistId: 't2',
    date: new Date().toISOString().split('T')[0],
    time: '02:30',
    type: 'علاج وظيفي',
    status: 'حضر',
    notes: 'تمرينات التكامل الحسي واللمس العميق.'
  }
];

export const demoReports: Report[] = [
  {
    id: 'r1',
    childId: 'c1',
    therapistId: 't1',
    sessionDate: '2024-05-10',
    evaluation: 'تقدم ملحوظ',
    notes: 'أظهر أحمد استجابة رائعة لتمارين مخارج الحروف. بدأ باستخدام كلمات الربط بشكل صحيح.',
    recommendations: 'الاستمرار في قراءة القصص القصيرة مع الطفل في المنزل وتكرار تمرين النفس.',
    status: 'نشط'
  },
  {
    id: 'r2',
    childId: 'c2',
    therapistId: 't2',
    sessionDate: '2024-05-12',
    evaluation: 'مستقر',
    notes: 'ليلى هادئة اليوم، تفاعلت مع الألعاب الحسية الخشنة بشكل أفضل من المرة السابقة.',
    recommendations: 'تقليل المشتتات البصرية في غرفتها ومتابعة جدول الروتين اليومي.',
    status: 'نشط'
  }
];

export const demoPayments: Payment[] = [
  {
    id: 'p1',
    childId: 'c1',
    amount: 1200,
    date: '2024-05-01',
    method: 'نقدي',
    notes: 'دفعة شهر مايو بالكامل'
  },
  {
    id: 'p2',
    childId: 'c2',
    amount: 1500,
    date: '2024-05-05',
    method: 'تحويل بنكي',
    notes: 'مقدم حجز باقة 20 جلسة'
  }
];
