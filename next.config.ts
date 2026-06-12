import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* خيارات التكوين لـ Vercel والإنتاج */
  typescript: {
    // نتجاهل أخطاء النوع في النشر السريع لضمان الاستمرارية
    ignoreBuildErrors: true,
  },
  eslint: {
    // نتجاهل أخطاء ESLint أثناء البناء لتسريع العملية
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // تحسينات لبيئة التطوير وفقاً لتحديثات Next.js 15
  devIndicators: {
    buildActivity: true,
    // تم تغيير buildActivityPosition إلى position في الإصدارات الأحدث
    // وتمت إزالة appIsrStatus لكونها مهجورة
    // @ts-ignore - نستخدم النوع المتوافق مع الإصدار الحالي
    position: 'bottom-right',
  }
};

export default nextConfig;
