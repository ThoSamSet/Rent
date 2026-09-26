/** About — model, values, day plan, comparison, booking steps. */

export const ABOUT_COVER = {
  kicker: 'Giới thiệu',
  title: ['Không phải', 'cho thuê.', '*Là chia sẻ.*'],
  deck: 'Tụi mình mang đồ và dựng trại sẵn cho nhóm bạn. Mỗi chuyến chỉ có nhóm của bạn, không ghép với ai khác.',
};

export const ABOUT_STORY = [
  'Camp Nhà Thỏ bắt đầu từ một câu hỏi của bạn bè: "Đi camping ở Nhật thì phải chuẩn bị những gì?" Hoá ra câu trả lời dài lắm. Nào là lều, bếp, túi ngủ, đặt bãi, thuê xe, đọc nội quy bằng tiếng Nhật…',
  'Nên tụi mình gom hết mấy việc đó lại để tự làm. Tụi mình chở đồ, dựng lều và đón bạn tận nơi (với Hạt Bí và Hạt Nho). Còn buổi tối ở trại là thời gian riêng của nhóm bạn. Tụi mình không làm tour ghép.',
];

export const ABOUT_PILLARS = [
  {
    title: 'Đồ và trại',
    text: 'Tụi mình mang đủ đồ, dựng trại trước khi bạn ngồi xuống và dọn dẹp sau khi bạn đứng lên.',
    image: '/images/dung-cu-1.webp',
    alt: 'Dụng cụ camping xếp gọn trên xe',
  },
  {
    title: 'Đường đi',
    text: 'Với Hạt Bí và Hạt Nho, xe đón nhóm bạn ở Tokyo, Saitama hoặc Kanagawa. Cả xe chỉ có nhóm mình.',
    image: '/images/dua-don-1.webp',
    alt: 'Xe đưa đón của Camp Nhà Thỏ',
  },
  {
    title: 'Thời gian của bạn',
    text: 'Ăn gì, chơi gì, ngủ lúc nào là do bạn. Khi nào cần một tấm ảnh đẹp thì cứ gọi tụi mình.',
    image: '/images/chill-chup-anh-1.webp',
    alt: 'Trại dưới gốc anh đào',
  },
];

export const ABOUT_AUDIENCE = {
  title: 'Hợp với *ai*',
  image: '/images/doi-tuong-1.webp',
  alt: 'Nhóm bạn quây quần trong lều bên lửa',
  items: [
    'Người muốn thử camping lần đầu mà chưa có món đồ nào',
    'Đi một mình, đi đôi, nhóm bạn nhỏ hay gia đình, tối đa 5 người (Hạt Bí tối đa 4)',
    'Người bận rộn, chỉ muốn một đêm được nghỉ ngơi thật sự',
  ],
  note: 'Hiện tụi mình chưa nhận trẻ em dưới 6 tuổi.',
};

export const ABOUT_VALUES = ['Thoải mái', 'Gần gũi', 'Không vội', 'Nghỉ ngơi thật sự'];

export const ABOUT_QUOTE = 'Đi xa một chút, mà thấy như *về nhà*.';

export const ABOUT_HOURS = {
  kicker: 'Một chuyến mẫu',
  title: 'Hai ngày, *một đêm*',
  lead: 'Lấy ví dụ plan Hạt Bí. Giờ giấc có thể xê dịch theo nhóm bạn.',
  hours: [
    { time: 'Sáng', title: 'Lên xe', text: 'Tụi mình đón bạn ở Tokyo, Saitama hoặc Kanagawa rồi chạy thẳng ra khỏi thành phố.' },
    { time: 'Chiều', title: 'Dựng trại', text: 'Tới bãi, tụi mình dựng lều và kê bàn ghế. Bạn đi dạo, chụp ảnh hay nằm nghỉ tuỳ thích.' },
    { time: 'Tối', title: 'Bên lửa', text: 'Nấu ăn, nhóm lửa, trò chuyện tới khuya. Muốn xem phim thì dựng thêm màn chiếu.' },
    { time: 'Sáng hôm sau', title: 'Về nhà', text: 'Ăn sáng, uống cà phê. Tụi mình dọn trại rồi đưa bạn về tận nơi.' },
  ],
};

export const ABOUT_TWO_WAYS = {
  alone: {
    title: 'Nếu tự túc',
    items: [
      'Mua hoặc thuê đủ lều, bếp, túi ngủ',
      'Tự tìm bãi, đặt chỗ bằng tiếng Nhật',
      'Lo xe, lo đường, lo chỗ gửi đồ',
      'Tự dựng trại lúc trời đã tối dần',
      'Đi rồi mới biết hết bao nhiêu tiền',
    ],
  },
  withUs: {
    title: 'Nếu đi cùng *tụi mình*',
    items: [
      'Đồ có sẵn, đủ cả, đã vệ sinh sạch sẽ',
      'Tụi mình gợi ý bãi theo mùa và đặt chỗ giúp',
      'Xe đón tận nơi (Hạt Bí, Hạt Nho)',
      'Không phải tự tay dựng hay thu dọn lều',
      'Biết trước tổng chi phí ngay từ lúc đặt',
    ],
  },
};

export const BOOKING_STEPS = [
  {
    title: 'Chọn một ngày',
    description: 'Mở lịch, tìm một ngày còn trống mà bạn thích.',
    link: { href: '/schedule', label: 'Mở lịch' },
  },
  {
    title: 'Điền form',
    description: 'Form tự soạn sẵn tin nhắn và tính luôn chi phí cho cả nhóm.',
    link: { href: '/dat-lich', label: 'Mở form' },
  },
  {
    title: 'Gửi cho tụi mình',
    description: 'Dán tin nhắn vào TikTok hoặc Facebook. Không cần đặt cọc, tụi mình xác nhận trong inbox.',
  },
];
