import FilmLogo from '@/components/brand/FilmLogo';

/** A NAV_LINKS label: the brand wordmark when the link has one, else its text. */
export default function NavLabel({ link }) {
  return link.logo === 'film' ? <FilmLogo /> : link.label;
}
