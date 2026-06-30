import OptionGalleryStrip from '@/components/options/OptionGalleryStrip';
import { OPTION_CATEGORIES, OPTIONS_INTRO } from '@/lib/options/content';

function OptionStatusBadge({ status, label }) {
  const statusClass =
    status === 'open' ? 'option-status option-status--open' : 'option-status option-status--paused';

  return <span className={statusClass}>{label}</span>;
}

export default function OptionCategories() {
  return (
    <>
      <section className="about-block option-intro home-section" data-reveal aria-label="Giới thiệu option">
        <div className="about-block__header">
          <p className="home-section__label">{OPTIONS_INTRO.label}</p>
          <h2 className="home-section__title">{OPTIONS_INTRO.title}</h2>
          <p className="about-block__intro">{OPTIONS_INTRO.text}</p>
        </div>
      </section>

      {OPTION_CATEGORIES.map((category) => (
        <section
          key={category.id}
          className="about-block option-category home-section"
          data-reveal
          aria-labelledby={category.id}
        >
          <div className="about-block__header">
            <p className="home-section__label">Option</p>
            <h2 className="home-section__title" id={category.id}>
              {category.title}
            </h2>
            <OptionStatusBadge status={category.status} label={category.statusLabel} />
            <p className="about-block__intro">{category.description}</p>
          </div>
          <OptionGalleryStrip
            items={category.items}
            ariaLabel={`Option ${category.title} — vuốt ngang để xem thêm`}
          />
          {category.footnote ? (
            <p className="option-category__footnote">{category.footnote}</p>
          ) : null}
        </section>
      ))}
    </>
  );
}
