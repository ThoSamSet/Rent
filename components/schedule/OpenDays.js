'use client';

import { useEffect, useState } from 'react';
import { countOpenDays } from '@/lib/schedule/open-days';

/** Number of bookable days that have not passed yet; static count until hydration. */
export default function OpenDays({ fallback }) {
  const [count, setCount] = useState(fallback);

  useEffect(() => {
    const now = new Date();
    const iso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    setCount(countOpenDays(iso));
  }, []);

  return <>{count}</>;
}
