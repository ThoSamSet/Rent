import '@/styles/pages/home.css';
import '@/styles/pages/editorial.css';
import '@/styles/pages/booking.css';
import Footer from '@/components/Footer';
import EditorialClientEffects from '@/components/motion/EditorialClientEffects';

export default function BookingLayout({ children }) {
  return (
    <div className="page-editorial page-booking">
      {children}
      <Footer />
      <EditorialClientEffects
        scripts={['/locations-map-sites.js', '/booking-form.js', '/booking-wizard.js']}
      />
    </div>
  );
}
