import '@/styles/pages/home.css';
import '@/styles/pages/editorial.css';
import Footer from '@/components/Footer';
import EditorialClientEffects from '@/components/motion/EditorialClientEffects';

export default function EquipmentLayout({ children }) {
  return (
    <div className="page-editorial page-equipment">
      {children}
      <Footer />
      <EditorialClientEffects />
    </div>
  );
}
