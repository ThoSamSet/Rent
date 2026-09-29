'use client';

import { useEffect, useState } from 'react';
import Mosaic from '@/components/mag/Mosaic';

/** @template T @param {T[]} list @returns {T[]} */
function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Mosaic that shows a random selection of `count` photos on every visit.
 * Renders the first `count` items on the server, then reshuffles after hydration.
 * @param {{ pool: { src: string; alt: string; caption?: string }[]; fallback?: { src: string; alt: string; caption?: string }[]; count?: number; label: string }} props
 */
export default function RandomMosaic({ pool, fallback = [], count = 6, label }) {
  const [items, setItems] = useState(() => [...pool, ...fallback].slice(0, count));

  useEffect(() => {
    // Primary pool first (shuffled); top up from fallback only if the pool is short.
    const picked = shuffle(pool);
    const extra = shuffle(fallback.filter((item) => !pool.some((p) => p.src === item.src)));
    setItems(shuffle([...picked, ...extra].slice(0, count)));
  }, [pool, fallback, count]);

  return <Mosaic items={items} label={label} />;
}
