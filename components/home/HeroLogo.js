import ResponsiveImage from '@/components/media/ResponsiveImage';
import { IMAGE_DIMS } from '@/lib/image-sizes';

export default function HeroLogo({ priority = false }) {
  return (
    <ResponsiveImage
      src="/images/logoTrongSuot1-512x256.png"
      srcSet="/images/logoTrongSuot1-512x256.png 1996w"
      sizes="(min-width: 786px) 280px, 52vw"
      alt="Camp Nhà Thỏ"
      className="home-hero__logo"
      width={IMAGE_DIMS.logoBrand.width}
      height={IMAGE_DIMS.logoBrand.height}
      priority={priority}
    />
  );
}
