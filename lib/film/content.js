/** Film page — photo albums and behind-the-scenes logs for the Camp Nhà Thỏ YouTube channel. */

import { SOCIAL_BY_ID } from '@/lib/social';

export const YOUTUBE_CHANNEL_URL = SOCIAL_BY_ID.youtube.href;

export const FILM_COVER = {
  kicker: 'Film',
  title: ['Camp Nhà Thỏ', '*film.*'],
  deck: 'Những gì máy ảnh giữ lại sau mỗi chuyến đi — album ảnh theo mùa và nhật ký hậu trường của kênh YouTube Camp Nhà Thỏ.',
  image: { src: '/images/camping-2.webp', alt: 'Lều Camp Nhà Thỏ giữa bãi cỏ' },
};

/** @type {{ slug: string; kicker: string; title: string; lead: string; items: { src: string; alt: string; caption?: string }[] }[]} */
export const FILM_ALBUMS = [
  {
    slug: 'sakura-2026',
    kicker: 'Album · Mùa xuân 2026',
    title: 'Sakura và *những đêm lều.*',
    lead: 'Hoa anh đào ban ngày, đèn lều ban đêm.',
    items: [
      { src: '/blog/campingsakura2026/sakura-hero.jpg', alt: 'Lều dựng dưới tán hoa anh đào', caption: 'Dưới tán sakura' },
      { src: '/blog/campingsakura2026/sakura-season.jpg', alt: 'Hoa anh đào nở rộ cạnh bãi camp', caption: 'Mùa hoa' },
      { src: '/blog/campingsakura2026/sakura-night.jpg', alt: 'Lều sáng đèn vào ban đêm mùa sakura', caption: 'Khi trời tối' },
      { src: '/blog/campingsakura2026/sakura-slow.jpg', alt: 'Khoảnh khắc thư thả bên lều', caption: 'Chậm lại một chút' },
    ],
  },
  {
    slug: 'o-bai',
    kicker: 'Album · Ở bãi',
    title: 'Một ngày *ở bãi.*',
    lead: 'Dựng lều, ngồi xuống, và không làm gì cả.',
    items: [
      { src: '/images/camping-1.webp', alt: 'Khu trại dựng sẵn buổi sáng' },
      { src: '/images/camping-3.webp', alt: 'Bàn ghế camping trước lều' },
      { src: '/images/camping-4.webp', alt: 'Góc thư giãn trong khu trại' },
      { src: '/images/camping-5.webp', alt: 'Lều giữa thiên nhiên' },
      { src: '/images/camping-6.webp', alt: 'Khu trại lúc chiều muộn' },
    ],
  },
  {
    slug: 'bep-ngoai-troi',
    kicker: 'Album · Bếp ngoài trời',
    title: 'Ăn gì *ở bãi?*',
    lead: 'BBQ, lẩu, bữa sáng và một ly gì đó ấm.',
    items: [
      { src: '/images/food-bbq.webp', alt: 'BBQ ngoài trời', caption: 'BBQ' },
      { src: '/images/food-hotpot.webp', alt: 'Nồi lẩu nóng buổi tối', caption: 'Lẩu' },
      { src: '/images/food-breakfast.webp', alt: 'Bữa sáng ở bãi camp', caption: 'Bữa sáng' },
      { src: '/images/food-drink.webp', alt: 'Đồ uống bên lều', caption: 'Đồ uống' },
    ],
  },
];

/**
 * Behind-the-scenes logs — one per YouTube video.
 * TODO: thay `youtubeUrl` bằng link video thật và viết lại nội dung khi có video.
 * @type {{ slug: string; href: string; title: string; excerpt: string; cardImage: string; cardAlt: string; youtubeUrl: string; bodyHtml: string }[]}
 */
export const FILM_LOGS = [
  {
    slug: 'hau-truong-sakura-2026',
    href: '/film/hau-truong-sakura-2026',
    title: 'Hậu trường: quay một đêm camping mùa sakura',
    excerpt: 'Máy nào, góc nào, và vì sao cảnh đẹp nhất lại là lúc tắt đèn.',
    cardImage: '/blog/campingsakura2026/sakura-feel.jpg',
    cardAlt: 'Hậu trường quay video camping mùa sakura',
    youtubeUrl: YOUTUBE_CHANNEL_URL,
    bodyHtml: `<p>Mùa sakura năm nay tụi mình mang máy theo từ lúc dựng lều đến khi tắt đèn. Đây là vài ghi chép nhỏ phía sau video.</p>
<h2>Chuẩn bị</h2>
<p>Một máy chính, một điện thoại quay dọc cho Shorts, và rất nhiều pin dự phòng — trời đêm tháng tư vẫn lạnh, pin tụt nhanh hơn tưởng tượng.</p>
<h2>Cảnh khó nhất</h2>
<p>Quay lều sáng đèn dưới tán hoa: phải chờ trời tối hẳn nhưng vẫn còn chút xanh trên nền trời. Cửa sổ chỉ khoảng mười lăm phút.</p>
<h2>Điều muốn giữ lại</h2>
<p>Không phải cảnh hoa đẹp nhất, mà là những đoạn mọi người ngồi yên, nói chuyện nhỏ, và quên mất máy đang quay.</p>`,
  },
  {
    slug: 'hau-truong-bep-ngoai-troi',
    href: '/film/hau-truong-bep-ngoai-troi',
    title: 'Hậu trường: quay bữa tối ngoài trời',
    excerpt: 'Khói BBQ, ánh đèn vàng và bài toán lấy nét khi mọi người đang đói.',
    cardImage: '/images/food-bbq.webp',
    cardAlt: 'Hậu trường quay bữa tối BBQ ngoài trời',
    youtubeUrl: YOUTUBE_CHANNEL_URL,
    bodyHtml: `<p>Quay đồ ăn ở bãi camp khác hẳn trong bếp: ánh sáng thay đổi liên tục và không ai muốn chờ máy quay.</p>
<h2>Ánh sáng</h2>
<p>Tụi mình dùng chính đèn lều và đèn bàn làm nguồn sáng — ấm, hơi tối, nhưng đúng không khí buổi tối ở bãi.</p>
<h2>Âm thanh</h2>
<p>Tiếng than nổ lách tách và tiếng nói chuyện là phần tụi mình thích nhất, nên hầu như không lồng nhạc ở đoạn này.</p>`,
  },
];

/** @param {string} slug */
export function getFilmLog(slug) {
  return FILM_LOGS.find((log) => log.slug === slug);
}
