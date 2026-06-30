import '@/styles/pages/home.css';
import '@/styles/pages/editorial.css';
import Footer from '@/components/Footer';
import EditorialClientEffects from '@/components/motion/EditorialClientEffects';

export default function OptionsLayout({ children }) {
  return (
    <div className="page-editorial page-options">
      {children}
      <Footer />
      <EditorialClientEffects />
    </div>
  );
}
