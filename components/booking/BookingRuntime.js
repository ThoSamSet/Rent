'use client';

import { useEffect } from 'react';
import { mountBooking } from '@/lib/booking/mount-booking';

/** Attach price estimate and wizard behavior after the form is painted. */
export default function BookingRuntime() {
  useEffect(() => mountBooking(), []);
  return null;
}
