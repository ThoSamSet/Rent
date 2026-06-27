import '@/styles/pages/home.css';
import Footer from '@/components/Footer';
import HomeClientEffects from '@/components/motion/HomeClientEffects';

export default function HomeLayout({ children }) {
  return (
    <div className="page-home">
      {children}
      <Footer />
      <HomeClientEffects />
    </div>
  );
}
