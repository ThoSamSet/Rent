import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StandardClientBundle from '@/layouts/StandardClientBundle';

export default function StandardLayout({
  children,
  currentPath,
  motion = true,
  scripts = [],
}) {
  return (
    <>
      <AnnouncementBar />
      <Navbar currentPath={currentPath} />
      {children}
      <Footer />
      <StandardClientBundle motion={motion} scripts={scripts} />
    </>
  );
}
