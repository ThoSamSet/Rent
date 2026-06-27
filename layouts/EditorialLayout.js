import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EditorialClientBundle from '@/layouts/EditorialClientBundle';

export default function EditorialLayout({
  children,
  page,
  currentPath,
  gsapHomeVersion = '20260625m',
  mapScripts = false,
}) {
  return (
    <>
      <AnnouncementBar />
      <Navbar currentPath={currentPath} />
      {children}
      <Footer />
      <EditorialClientBundle
        page={page}
        gsapHomeVersion={gsapHomeVersion}
        mapScripts={mapScripts}
      />
    </>
  );
}
