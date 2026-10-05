'use client';

import { useEffect, useState } from 'react';

/** Shows today's date as the schedule update date; falls back to the static date before hydration. */
export default function UpdatedKicker({ fallback }) {
  const [label, setLabel] = useState(fallback);

  useEffect(() => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    setLabel(`Cập nhật ${now.getFullYear()}/${month}/${day}`);
  }, []);

  return <>{label}</>;
}
