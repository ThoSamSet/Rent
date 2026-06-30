import '@/styles/pages/home.css';
import '@/styles/pages/editorial.css';
import Footer from '@/components/Footer';
import EditorialClientEffects from '@/components/motion/EditorialClientEffects';

export default function ScheduleLayout({ children }) {
  return (
    <div className="page-editorial page-schedule">
      {children}
      <Footer />
      <EditorialClientEffects scripts={['/table-swipe-hint.js', '/booking-calendar.js']} />
    </div>
  );
}
