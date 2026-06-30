import SchedulePageContent from '@/components/pages/SchedulePageContent';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Lịch trình Camping',
  description:
    'Lịch trình camping mới nhất tại Camp Nhà Thỏ. Theo dõi lịch trống, lịch plan và ngày hoạt động trong các tháng sắp tới.',
  path: '/schedule',
  image: '/images/camping-2.webp',
});

export default function SchedulePage() {
  return <SchedulePageContent />;
}
