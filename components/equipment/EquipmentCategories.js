import Link from 'next/link';
import EquipmentGalleryStrip from '@/components/equipment/EquipmentGalleryStrip';
import {
  EQUIPMENT_BRING,
  EQUIPMENT_CATEGORIES,
  EQUIPMENT_FOOTNOTES,
  EQUIPMENT_INTRO,
} from '@/lib/equipment/content';

export default function EquipmentCategories() {
  return (
    <>
      <section className="about-block equipment-intro home-section" data-reveal aria-label="Giới thiệu dụng cụ">
        <div className="about-block__header">
          <p className="home-section__label">{EQUIPMENT_INTRO.label}</p>
          <h2 className="home-section__title">{EQUIPMENT_INTRO.title}</h2>
          <p className="about-block__intro">{EQUIPMENT_INTRO.text}</p>
        </div>
      </section>

      {EQUIPMENT_CATEGORIES.map((category) => (
        <section
          key={category.id}
          className="about-block equipment-category home-section"
          data-reveal
          aria-labelledby={category.id}
        >
          <div className="about-block__header">
            <p className="home-section__label">Danh mục</p>
            <h2 className="home-section__title" id={category.id}>
              {category.title}
            </h2>
          </div>
          <EquipmentGalleryStrip
            images={category.images}
            ariaLabel={`Ảnh ${category.title} — vuốt ngang để xem thêm`}
          />
        </section>
      ))}

      <section className="about-block equipment-bring home-section" data-reveal aria-label="Đồ cá nhân gợi ý">
        <div className="about-block__header">
          <p className="home-section__label">{EQUIPMENT_BRING.label}</p>
          <h2 className="home-section__title">{EQUIPMENT_BRING.title}</h2>
          <p className="about-block__intro">{EQUIPMENT_BRING.text}</p>
          <p className="equipment-bring__link">
            <Link href={EQUIPMENT_BRING.link.href}>{EQUIPMENT_BRING.link.label}</Link>
          </p>
        </div>
      </section>

      <p className="equipment-footnotes">{EQUIPMENT_FOOTNOTES}</p>
    </>
  );
}
