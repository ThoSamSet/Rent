'use client';

import { useMemo, useState } from 'react';
import { FAQ_CATEGORIES } from '@/lib/faq/content';
import { compareByRelevance, matchesQuery, tokenizeQuery } from '@/lib/faq/search';
import FaqAnswer from '@/components/faq/FaqAnswer';
import FaqHighlightedText from '@/components/faq/FaqHighlightedText';

const TOTAL_FAQ_COUNT = FAQ_CATEGORIES.reduce((sum, category) => sum + category.items.length, 0);

function FaqAccordionItem({ item, searchTokens, categoryLabel }) {
  return (
    <details
      id={item.id}
      className="faq-accordion__item"
      open={searchTokens.length > 0}
    >
      <summary className="faq-accordion__question">
        <span className="faq-accordion__question-text">
          <FaqHighlightedText text={item.question} searchTokens={searchTokens} />
          {categoryLabel ? <span className="faq-accordion__category">{categoryLabel}</span> : null}
        </span>
      </summary>
      <FaqAnswer html={item.answerHtml} searchTokens={searchTokens} />
    </details>
  );
}

export default function FaqSection() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const trimmedQuery = query.trim();
  const searchTokens = useMemo(() => tokenizeQuery(trimmedQuery), [trimmedQuery]);
  const isSearching = searchTokens.length > 0;

  const filteredCategories = useMemo(() => {
    if (isSearching) return [];
    return FAQ_CATEGORIES.map((category) => ({
      ...category,
      items: category.items.filter((item) => matchesQuery(item, searchTokens)),
    })).filter((category) => category.items.length > 0);
  }, [isSearching, searchTokens]);

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    return FAQ_CATEGORIES.flatMap((category) =>
      category.items.map((item) => ({ ...item, categoryLabel: category.label })),
    )
      .filter((item) => matchesQuery(item, searchTokens))
      .sort((a, b) => compareByRelevance(a, b, searchTokens));
  }, [isSearching, searchTokens]);

  const totalResults = isSearching ? searchResults.length : filteredCategories.reduce((sum, category) => sum + category.items.length, 0);

  const leadText = isSearching
    ? `${totalResults} kết quả cho "${trimmedQuery}"`
    : `${TOTAL_FAQ_COUNT} câu hỏi — dùng ô tìm kiếm hoặc chọn nhóm bên dưới.`;

  const hasResults = isSearching ? searchResults.length > 0 : filteredCategories.length > 0;

  function scrollToCategory(categoryId) {
    setActiveCategory(categoryId);
    const el = document.getElementById(categoryId === 'all' ? 'faq-content' : `faq-${categoryId}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <section className="about-block faq-section home-section" data-reveal aria-label="Danh sách câu hỏi">
      <div className="about-block__header">
        <p className="home-section__label">Hướng dẫn</p>
        <h2 className="home-section__title">Tìm câu trả lời nhanh</h2>
        <p className="faq-section__lead" role="status">
          {leadText}
        </p>
      </div>

      <div
        className={`faq-section__layout${isSearching ? ' faq-section__layout--searching' : ''}`}
        id="faq-content"
      >
        {!isSearching ? (
          <nav className="faq-nav" aria-label="Nhóm câu hỏi">
            <ul className="faq-nav__list">
              <li>
                <button
                  type="button"
                  className={`faq-nav__btn${activeCategory === 'all' ? ' is-active' : ''}`}
                  onClick={() => scrollToCategory('all')}
                  aria-pressed={activeCategory === 'all'}
                >
                  Tất cả
                </button>
              </li>
              {FAQ_CATEGORIES.map((category) => (
                <li key={category.id}>
                  <button
                    type="button"
                    className={`faq-nav__btn${activeCategory === category.id ? ' is-active' : ''}`}
                    onClick={() => scrollToCategory(category.id)}
                    aria-pressed={activeCategory === category.id}
                  >
                    {category.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <div className="faq-main">
          <label className="faq-search" htmlFor="faq-search-input">
            <input
              id="faq-search-input"
              type="search"
              className="faq-search__input"
              placeholder="Tìm câu hỏi… (vd: đặt cọc, WiFi, đồ ăn)"
              aria-label="Tìm câu hỏi"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoComplete="off"
            />
          </label>

          {!hasResults ? (
            <p className="faq-empty" role="status">
              Không tìm thấy câu hỏi phù hợp. Thử từ khóa khác hoặc{' '}
              <button
                type="button"
                className="faq-empty__reset"
                onClick={() => {
                  setQuery('');
                  setActiveCategory('all');
                }}
              >
                xem tất cả
              </button>
              .
            </p>
          ) : isSearching ? (
            <section className="faq-category faq-results" aria-labelledby="faq-heading-results">
              <h3 className="faq-category__title" id="faq-heading-results">
                Kết quả
                <span className="faq-category__count">{searchResults.length}</span>
              </h3>
              <div className="faq-accordion">
                {searchResults.map((item) => (
                  <FaqAccordionItem
                    key={item.id}
                    item={item}
                    searchTokens={searchTokens}
                    categoryLabel={item.categoryLabel}
                  />
                ))}
              </div>
            </section>
          ) : (
            filteredCategories.map((category) => (
              <section
                key={category.id}
                id={`faq-${category.id}`}
                className="faq-category"
                aria-labelledby={`faq-heading-${category.id}`}
              >
                <h3 className="faq-category__title" id={`faq-heading-${category.id}`}>
                  {category.label}
                  <span className="faq-category__count">{category.items.length}</span>
                </h3>
                <div className="faq-accordion">
                  {category.items.map((item) => (
                    <FaqAccordionItem key={item.id} item={item} searchTokens={searchTokens} />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
