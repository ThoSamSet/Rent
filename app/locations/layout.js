import '@/styles/pages/home.css';
import '@/styles/pages/editorial.css';
import '@/styles/pages/locations.css';
import EditorialClientEffects from '@/components/motion/EditorialClientEffects';
import LocationsMapInit from '@/components/locations/LocationsMapInit';

export default function LocationsLayout({ children }) {
  return (
    <div className="page-editorial page-locations">
      {children}
      <LocationsMapInit />
      <EditorialClientEffects />
    </div>
  );
}
