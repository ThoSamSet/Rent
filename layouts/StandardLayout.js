import Footer from '@/components/Footer';
import StandardClientBundle from '@/layouts/StandardClientBundle';

export default function StandardLayout({ children, scripts = [] }) {
  return (
    <>
      {children}
      <Footer />
      <StandardClientBundle scripts={scripts} />
    </>
  );
}
