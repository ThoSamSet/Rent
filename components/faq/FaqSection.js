'use client';

import { useMemo, useState } from 'react';
import { FAQ_CATEGORIES } from '@/lib/faq/content';
import { compareByRelevance, matchesQuery, tokenizeQuery } from '@/lib/faq/search';
import FaqAnswer from '@/components/faq/FaqAnswer';
import FaqHighlightedText from '@/components/faq/FaqHighlightedText';

const TOTAL_FAQ_COUNT = FAQ_CATEGORIES.reduce((sum, category) => sum + category.items.length, 0);

function FaqItem({ item, searchTokens, categoryLabel }) {
  return (
    <details id={item.id} className="faq-item" open={searchTokens.length > 0}>
      <summary className="faq-item__q">
        <span className="faq-item__text">
          <FaqHighlightedText text={item.question} searchTokens={searchTokens} />
        </span>
        {categoryLabel ? <span className="faq-item__cat">{categoryLabel}</span> : null}
        <span className="faq-item__toggle" aria-hidden="true" />
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

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    return FAQ_CATEGORIES.flatMap((category) => category.items.map((item) => ({ ...item, categoryLabel: category.label })))
      .filter((item) => matchesQuery(item, searchTokens))
      .sort((a, b) => compareByRelevance(a, b, searchTokens));
  }, [isSearching, searchTokens]);

  const leadText = isSearching
    ? `${searchResults.length} kết quả cho “${trimmedQuery}”`
    : `${TOTAL_FAQ_COUNT} câu hỏi trong ${FAQ_CATEGORIES.length} nhóm`;

  function scrollToCategory(categoryId) {
    setActiveCategory(categoryId);
    const el = document.getElementById(categoryId === 'all' ? 'faq-content' : `faq-${categoryId}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="faq wrap" id="faq-content">
      <aside className="faq__rail">
        <label className="faq-search" htmlFor="faq-search-input">
          <span className="kicker">Tìm nhanh</span>
          <input
            id="faq-search-input"
            type="search"
            className="faq-search__input"
            placeholder="vd: đặt cọc, WiFi, đồ ăn"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
          />
        </label>
        <p className="faq__lead" role="status">
          {leadText}
        </p>
        {!isSearching ? (
          <nav className="faq-nav" aria-label="Nhóm câu hỏi">
            <ol>
              {FAQ_CATEGORIES.map((category, index) => (
                <li key={category.id}>
                  <button
                    type="button"
                    className="faq-nav__btn"
                    aria-pressed={activeCategory === category.id}
                    onClick={() => scrollToCategory(category.id)}
                  >
                    <span className="faq-nav__no">{String(index + 1).padStart(2, '0')}</span>
                    <span>{category.label}</span>
                    <span className="faq-nav__count">{category.items.length}</span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
      </aside>

      <div className="faq__main">
        {isSearching && searchResults.length === 0 ? (
          <p className="faq-empty" role="status">
            Chưa có câu hỏi khớp. Thử từ khoá khác, hoặc{' '}
            <button
              type="button"
              className="faq-empty__reset text-link"
              onClick={() => {
                setQuery('');
                setActiveCategory('all');
              }}
            >
              xem tất cả
            </button>
            .
          </p>
        ) : null}

        {isSearching && searchResults.length > 0 ? (
          <section className="faq-group" aria-labelledby="faq-heading-results">
            <h2 className="faq-group__title" id="faq-heading-results">
              Kết quả
            </h2>
            {searchResults.map((item) => (
              <FaqItem key={item.id} item={item} searchTokens={searchTokens} categoryLabel={item.categoryLabel} />
            ))}
          </section>
        ) : null}

        {!isSearching
          ? FAQ_CATEGORIES.map((category) => (
              <section
                key={category.id}
                id={`faq-${category.id}`}
                className="faq-group"
                aria-labelledby={`faq-heading-${category.id}`}
              >
                <p className="kicker">{category.items.length} câu hỏi</p>
                <h2 className="faq-group__title" id={`faq-heading-${category.id}`}>
                  {category.label}
                </h2>
                {category.items.map((item) => (
                  <FaqItem key={item.id} item={item} searchTokens={searchTokens} />
                ))}
              </section>
            ))
          : null}
      </div>
    </div>
  );
}
