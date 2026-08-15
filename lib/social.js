/** Official Camp Nhà Thỏ social profiles — shared by footer and booking CTAs. */

export const SOCIAL_LINKS = [
  {
    id: 'facebook',
    href: 'https://www.facebook.com/share/15VaMf4oUvn/?mibextid=wwXIfr',
    label: 'Facebook',
  },
  {
    id: 'tiktok',
    href: 'https://www.tiktok.com/@camp.nha.tho',
    label: 'TikTok',
  },
  {
    id: 'youtube',
    href: 'https://www.youtube.com/@CampNhaTho',
    label: 'YouTube',
  },
  {
    id: 'instagram',
    href: 'https://www.instagram.com/camp.nha.tho/',
    label: 'Instagram',
  },
];

export const SOCIAL_BY_ID = Object.fromEntries(SOCIAL_LINKS.map((item) => [item.id, item]));
