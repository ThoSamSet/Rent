/** Film page — photo grid and behind-the-scenes logs for the Camp Nhà Thỏ YouTube channel. */

import { SOCIAL_BY_ID } from '@/lib/social';

export const YOUTUBE_CHANNEL_URL = SOCIAL_BY_ID.youtube.href;

export const FILM_TITLE = 'Camp Nhà Thỏ film';

/**
 * Photo grid — each photo shows with its caption underneath.
 * TODO: ảnh tạm để xem thử bố cục; thay bằng ảnh và chú thích thật.
 * @type {{ src: string; alt: string; caption: string }[]}
 */
export const FILM_PHOTOS = [
  {
    src: '/blog/campingsakura2026/sakura-night.jpg',
    alt: 'Lều và xe cắm trại dưới hàng hoa anh đào nở rộ',
    caption: 'Mùa sakura — dựng lều giữa hàng anh đào nở rộ.',
  },
  {
    src: '/images/food-bbq.webp',
    alt: 'Than hồng và đồ nướng trên bếp BBQ',
    caption: 'Bếp than đỏ lửa, bữa tối bắt đầu.',
  },
  {
    src: '/images/equipment-light.webp',
    alt: 'Bếp sưởi dầu và ấm nước giữa bàn ăn ngoài trời',
    caption: 'Bếp sưởi nhỏ giữa bàn — ấm cả bữa tối ngoài trời.',
  },
  {
    src: '/images/food-hotpot.webp',
    alt: 'Nồi lẩu nóng bốc khói',
    caption: 'Lẩu nóng cho những tối trời se lạnh.',
  },
  {
    src: '/blog/campingsakura2026/sakura-slow.jpg',
    alt: 'Cành anh đào rủ hoa trước bãi cắm trại',
    caption: 'Không cần làm gì cả — chỉ ngồi và nhìn hoa rơi.',
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
