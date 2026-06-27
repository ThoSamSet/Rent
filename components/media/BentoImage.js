import SiteImage from '@/components/media/SiteImage';
import { IMAGE_DIMS } from '@/lib/image-sizes';

/** Decorative bento card image — alt empty, dimensions for CLS. */
export default function BentoImage({ src }) {
  return (
    <SiteImage
      src={src}
      alt=""
      decorative
      width={IMAGE_DIMS.gallery.width}
      height={IMAGE_DIMS.gallery.height}
    />
  );
}
