import '@/styles/pages/home.css';
import '@/styles/pages/editorial.css';
import Footer from '@/components/Footer';
import EditorialClientEffects from '@/components/motion/EditorialClientEffects';

export default function AboutLayout({ children }) {
  return (
    <div className="page-editorial page-about">
      {children}
      <Footer />
      <EditorialClientEffects />
    </div>
  );
}
