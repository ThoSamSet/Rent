import '@/styles/pages/home.css';
import '@/styles/pages/editorial.css';
import Footer from '@/components/Footer';
import EditorialClientEffects from '@/components/motion/EditorialClientEffects';

export default function BlogLayout({ children }) {
  return (
    <div className="page-editorial page-blog">
      {children}
      <Footer />
      <EditorialClientEffects />
    </div>
  );
}
