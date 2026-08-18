import EditorialGalleryStrip from '@/components/media/EditorialGalleryStrip';
import { GALLERY } from '@/lib/home/content';
import { imageSrc } from '@/lib/media/responsive';
import { IMAGE_DIMS } from '@/lib/image-sizes';

const galleryImages = GALLERY.map(({ baseName, alt }) => ({
  baseName,
  alt,
  src: imageSrc(baseName),
  width: IMAGE_DIMS.gallery.width,
  height: IMAGE_DIMS.gallery.height,
}));

export default function HomeGallerySection() {
  return (
    <section className="home-section home-gallery" id="gallery" data-reveal aria-label="Gallery">
      <div className="home-gallery__header">
        <p className="home-section__label">Gallery</p>
      </div>
      <EditorialGalleryStrip
        images={galleryImages}
        ariaLabel="Ảnh camping Phú Sĩ — vuốt ngang để xem thêm"
      />
    </section>
  );
}
