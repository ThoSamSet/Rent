/** Home — cover, letter, spread, a night hour by hour, notices, gallery. */

export const HOME_COVER = {
  kicker: 'Camping share',
  title: ['Cùng đi –', '*Cùng chill*'],
  deck: 'Một đêm thật chậm ngoài trời: ngồi bên lửa, ngắm núi đổi màu, nói chuyện tới khuya. Không cần lên kế hoạch cầu kỳ, không cần tốn sức. Bạn chỉ việc đến và tận hưởng.',
  image: { src: '/images/hero-camping.webp', alt: 'Trại camping dựng sẵn dưới tán cây, đèn vừa bật' },
};

export const HOME_LETTER = {
  greeting: 'Gửi bạn, người chưa từng ngủ ngoài trời ở Nhật,',
  paragraphs: [
    'Tụi mình biết cảm giác đó. Muốn đi lắm, nhưng lều thì không có, xe cũng không, còn bãi thì toàn tiếng Nhật. Rồi cứ thế, mùa lá đỏ trôi qua, mùa hoa anh đào cũng trôi qua.',
    'Nên tụi mình lo phần mất công: đồ đạc, chỗ ngủ, đường đi. Còn buổi tối bên lửa là của riêng nhóm bạn.',
  ],
  signature: 'Camp Nhà Thỏ',
};

export const HOME_SPREAD = {
  kicker: 'Ba plan · 2 ngày 1 đêm',
  title: 'Chọn cách *bạn muốn đi*',
  essay: 'Có nhóm thích tự lái, có nhóm muốn được đón tận nơi, có nhóm cứ nghe trời mưa là ngại. Nên tụi mình làm ba plan cho ba kiểu người.',
};

/** Hour-by-hour sketch of a Hạt Bí trip. Times are indicative. */
export const HOME_HOURS = {
  kicker: 'Một đêm ở trại',
  title: 'Từ lúc xe đón *tới khi trời sáng*',
  lead: 'Giờ giấc chỉ để tham khảo. Nhóm nào cũng có nhịp riêng, tụi mình đi theo nhịp của bạn.',
  hours: [
    { time: '09:00', title: 'Xe tới cửa', text: 'Tụi mình đón ở Tokyo, Saitama hoặc Kanagawa. Đồ đạc đã nằm gọn phía sau xe.' },
    { time: '13:00', title: 'Tới bãi', text: 'Trong lúc bạn đi dạo quanh bãi, lều đã dựng xong, ghế đã kê quay về phía núi.' },
    { time: '17:30', title: 'Hoàng hôn', text: 'Núi đổi màu. Ai cũng tự nhiên im lặng mấy phút, rồi rút điện thoại ra chụp.' },
    { time: '20:00', title: 'Lửa và bữa tối', text: 'Củi nổ lách tách, bếp đỏ lửa, món bạn mang theo bắt đầu thơm. Câu chuyện cũng bắt đầu kéo dài.' },
    { time: '23:00', title: 'Trời sao', text: 'Tắt bớt đèn, ngả lưng ra ghế. Ở đây trời tối hơn Tokyo nhiều lắm.' },
    { time: '06:00', title: 'Sương sớm', text: 'Cà phê nóng, sương còn đọng trên mái lều. Dọn trại để tụi mình lo.' },
  ],
};

/** Newest first. date = dd/mm/yyyy display; dateTime = ISO for <time>. */
export const HOME_NOTICES = [
  {
    date: '17/08/2026',
    dateTime: '2026-08-17',
    text: 'Bắt đầu có chiếu phim ngoài trời, máy chiếu dựng ngay trước lều.',
    href: '/options#opt-movie',
    linkLabel: 'Xem option',
  },
];

export const GALLERY = [
  { src: '/images/camping-1.webp', alt: 'Núi Phú Sĩ nhìn từ bãi camping', caption: 'Buổi chiều, núi hiện ra' },
  { src: '/images/camping-2.webp', alt: 'Lều trong rừng, lửa trại và võng', caption: 'Võng mắc giữa hai thân cây' },
  { src: '/images/camping-3.webp', alt: 'Góc bếp với gia vị và nồi niêu ở trại', caption: 'Góc bếp nhỏ' },
  { src: '/images/camping-4.webp', alt: 'Màn chiếu phim trước lều', caption: 'Rạp phim giữa rừng' },
  { src: '/images/camping-5.webp', alt: 'Núi Phú Sĩ dưới trời sao, trại sáng đèn phía dưới', caption: 'Phú Sĩ lúc nửa đêm' },
  { src: '/images/camping-6.webp', alt: 'Bên trong lều lớn với đèn dây ấm áp', caption: 'Trong lều, đèn vàng' },
];
