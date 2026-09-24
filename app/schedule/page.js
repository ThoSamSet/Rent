import SchedulePageContent from '@/components/pages/SchedulePageContent';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Lịch trống — ngày còn chỗ',
  description:
    'Xem các ngày còn chỗ trong những tháng tới và chạm để mở form đặt lịch với ngày điền sẵn. Không cần cọc.',
  path: '/schedule',
  image: '/images/subBanner-lich-trinh.webp',
});

export default function SchedulePage() {
  return <SchedulePageContent />;
}
