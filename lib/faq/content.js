/** FAQ page — structured content (migrated from legacy faq.json). */

export const FAQ_INTRO = {
  label: 'FAQ',
  title: 'Câu hỏi thường gặp',
  subtitle:
    'Giải đáp về dịch vụ, đặt lịch, di chuyển và trải nghiệm tại Camp Nhà Thỏ.',
};

/** @type {{ id: string; label: string; items: { id: string; question: string; answerHtml: string }[] }[]} */
export const FAQ_CATEGORIES = [
  {
    "id": "service",
    "label": "Dịch vụ & ai phù hợp",
    "items": [
      {
        "id": "tour-or-rent",
        "question": "Camp Nhà Thỏ là dịch vụ cho thuê hay tour ghép?",
        "answerHtml": "<p>Camp Nhà Thỏ <strong>không phải tour ghép</strong> và cũng không đơn thuần là cho thuê.</p>\n                    <p>Mô hình hoạt động là <strong>chia sẻ đồ camping</strong> kết hợp đưa đón và hỗ trợ setup cho chuyến đi của bạn.</p>\n                    <p>Bạn và nhóm của mình <strong>đi riêng</strong>, không ghép chung với khách khác.</p>"
      },
      {
        "id": "solo-small-group",
        "question": "Tôi đi một mình hoặc nhóm nhỏ có được không?",
        "answerHtml": "<p>Hoàn toàn được.</p>\n                    <p>Camp Nhà Thỏ phù hợp cho:</p>\n                    <ul>\n                        <li>Đi một mình</li>\n                        <li>Couple</li>\n                        <li>Nhóm bạn nhỏ, gia đình ít người (tối đa 4 người)</li>\n                    </ul>\n                    <p>Lịch trình linh hoạt theo nhu cầu của bạn.</p>"
      },
      {
        "id": "max-people",
        "question": "Có thể đi tối đa bao nhiêu người?",
        "answerHtml": "<p>Tối đa <strong>4 người</strong>. Nếu trên 4 người, vui lòng liên hệ để được tư vấn thêm.</p>\n                    <p>Hiện tại <strong>không nhận trẻ em dưới 6 tuổi</strong> để đảm bảo an toàn.</p>"
      },
      {
        "id": "short-stay-tourists",
        "question": "Khách du lịch chỉ ở Nhật trong thời gian ngắn có sử dụng được dịch vụ Camp Nhà Thỏ không?",
        "answerHtml": "<p>Có.</p>\n                    <p><span class=\"no-break\">Camp Nhà Thỏ</span> vẫn hỗ trợ khách du lịch ngắn ngày tại Nhật Bản.</p>\n                    <p>Bạn chỉ cần cho chúng mình biết thời gian lưu trú và ngày mong muốn đi camping, <span class=\"no-break\">Camp Nhà Thỏ</span> sẽ tư vấn lịch trình phù hợp và hỗ trợ từ đưa đón, chuẩn bị đồ camp đến trải nghiệm camping cùng tụi mình.</p>"
      },
      {
        "id": "pickup-areas",
        "question": "Camp Nhà Thỏ nhận đón trả khách ở khu vực nào?",
        "answerHtml": "<p>Hiện tại, tụi mình nhận khách tại:</p>\n                    <ul>\n                        <li>Tokyo</li>\n                        <li>Saitama</li>\n                        <li>Kanagawa</li>\n                    </ul>\n                    <p>Nếu bạn ở khu vực khác, vui lòng liên hệ để được tư vấn thêm.</p>"
      },
      {
        "id": "privacy",
        "question": "Tính riêng tư trong lúc camping được đảm bảo như thế nào?",
        "answerHtml": "<p>Vì lý do an toàn và đúng tinh thần <em>camping share</em>,<br />tụi mình sẽ tham gia <strong>một số hoạt động chung</strong><br />(như ăn uống, sinh hoạt, đốt lửa…).</p>\n                    <p>Tuy nhiên, Camp Nhà Thỏ cam kết:</p>\n                    <ul>\n                        <li>Không quay/chụp khi chưa được đồng ý</li>\n                        <li>Không đăng hình, video nếu bạn không cho phép</li>\n                        <li>Không chia sẻ thông tin cho bên thứ ba</li>\n                    </ul>\n                    <p>Sự thoải mái và quyền riêng tư của bạn luôn được tôn trọng.</p>"
      },
      {
        "id": "first-time-camping",
        "question": "Tôi chưa từng đi camping, có phù hợp không?",
        "answerHtml": "<p>Rất phù hợp.</p>\n                    <p>Tụi mình sẽ:</p>\n                    <ul>\n                        <li>Chuẩn bị đầy đủ đồ</li>\n                        <li>Hướng dẫn dựng lều</li>\n                        <li>Chỉ cách dùng bếp, đèn, thiết bị</li>\n                    </ul>\n                    <p>Bạn không cần kinh nghiệm trước.</p>"
      },
      {
        "id": "whats-included",
        "question": "Dịch vụ bao gồm những gì?",
        "answerHtml": "<p>Gói cơ bản gồm:</p>\n                    <ul>\n                        <li>Đưa đón bằng xe</li>\n                        <li>Lều 2 room và thiết bị liên quan</li>\n                        <li>Hỗ trợ setup</li>\n                    </ul>\n                    <p>Ngoài ra có thể dùng thêm:</p>\n                    <ul>\n                        <li>Nintendo Switch</li>\n                        <li>Máy ảnh Fujifilm X-T5</li>\n                    </ul>"
      }
    ]
  },
  {
    "id": "booking",
    "label": "Đặt lịch & thanh toán",
    "items": [
      {
        "id": "cancel-reschedule",
        "question": "Nếu tôi muốn đổi ngày hoặc huỷ chuyến thì sao?",
        "answerHtml": "<p>Bạn có thể điều chỉnh lịch trình nếu thông báo trước ít nhất 1 tuần và lịch mới vẫn còn khả dụng.</p>\n                    <p>Đội ngũ Camp Nhà Thỏ luôn cố gắng hỗ trợ linh hoạt để chuyến đi của bạn được diễn ra trọn vẹn nhất.</p>\n                    <p>Trong trường hợp cần huỷ chuyến, một khoản phí chuẩn bị dịch vụ <strong>1m5</strong> sẽ được áp dụng, do các hạng mục chuẩn bị và giữ chỗ đã được sắp xếp từ trước.</p>"
      },
      {
        "id": "how-to-book",
        "question": "Cách đặt lịch như thế nào?",
        "answerHtml": "<p>Bạn có thể:</p>\n                    <ul>\n                        <li><span class=\"faq-emoji\">📩</span> Nhắn tin fanpage Facebook / Tiktok</li>\n                    </ul>"
      },
      {
        "id": "deposit",
        "question": "Có cần đặt cọc không?",
        "answerHtml": "<p>Không cần đặt cọc.</p>\n                    <p>Chỉ cần cung cấp link Facebook cá nhân của các thành viên.</p>"
      },
      {
        "id": "payment-timing",
        "question": "Thời gian thanh toán?",
        "answerHtml": "<p>Thanh toán <strong>bằng tiền mặt trước khi khởi hành</strong>.</p>"
      },
      {
        "id": "book-early",
        "question": "Tôi cần đặt lịch trước bao lâu?",
        "answerHtml": "<p>Bạn nên <strong>liên hệ càng sớm càng tốt</strong> để:</p>\n                    <ul>\n                        <li>Giữ được bãi đẹp</li>\n                        <li>Chủ động lịch trình</li>\n                        <li>Tránh tình trạng hết chỗ</li>\n                    </ul>\n                    <p>Đặc biệt vào mùa cao điểm,<br />việc đặt sớm là rất cần thiết.</p>"
      }
    ]
  },
  {
    "id": "travel",
    "label": "Di chuyển & xe",
    "items": [
      {
        "id": "car-charging",
        "question": "Có thể sạc thiết bị trên xe không?",
        "answerHtml": "<p>Có.</p>\n                    <p>Tụi mình có <strong>sạc trên xe</strong> để:</p>\n                    <ul>\n                        <li>Sạc điện thoại</li>\n                        <li>Máy ảnh</li>\n                        <li>Đèn chiếu sáng</li>\n                    </ul>"
      },
      {
        "id": "car-amenities",
        "question": "Trong lúc di chuyển, trên xe có những tiện nghi gì?",
        "answerHtml": "<p>Camp Nhà Thỏ sử dụng xe hơi với <strong>nội thất cao cấp</strong>, bao gồm:</p>\n                    <ul>\n                        <li>Ghế da cao cấp</li>\n                        <li>Sưởi ghế tất cả các vị trí</li>\n                        <li>Cửa sổ trời panorama toàn cảnh</li>\n                        <li>Hệ thống âm thanh vòm 13 loa công suất lớn</li>\n                        <li>Tự do mở nhạc theo yêu cầu<br />(qua màn hình tablet hoặc Bluetooth)</li>\n                        <li>Cổng sạc Type-C & Lightning</li>\n                        <li>Nước uống và đồ ăn vặt miễn phí</li>\n                    </ul>\n                    <p>Mang đến trải nghiệm di chuyển <strong>thoải mái và thư giãn</strong>.</p>"
      },
      {
        "id": "highway-vs-local",
        "question": "Di chuyển bằng đường thường hay cao tốc?",
        "answerHtml": "<p>Mặc định, các gói dịch vụ <strong>đã bao gồm phí cao tốc</strong> để tiết kiệm thời gian di chuyển.</p>\n                    <p>Nếu khách muốn tiết kiệm chi phí, có thể chọn <strong>option đi đường thường</strong> để được giảm 5000y/chuyến.</p>\n                    <p>Tham khảo thêm tại <a href=\"/options\">trang Option</a>.</p>"
      },
      {
        "id": "luggage-rules",
        "question": "Có quy định về hành lý mang theo không?",
        "answerHtml": "<p>Có.</p>\n                    <p>Để đảm bảo không gian thoải mái, Camp Nhà Thỏ quy định:</p>\n                    <ul>\n                        <li><span class=\"faq-emoji\">🎒</span> Chỉ mang <strong>balo kích thước vừa phải</strong></li>\n                        <li><span class=\"faq-emoji\">❌</span> <strong>Không sử dụng vali</strong></li>\n                    </ul>\n                    <p>Điều này giúp:</p>\n                    <ul>\n                        <li>Sắp xếp gọn gàng</li>\n                        <li>Di chuyển thuận tiện</li>\n                        <li>Sinh hoạt thoải mái hơn</li>\n                    </ul>\n                    <p><strong>Lưu ý về đồ ăn:</strong></p>\n                    <p>Nếu bạn <strong>không chọn option đồ ăn</strong>,<br />vui lòng báo trước số lượng đồ mang theo.</p>"
      },
      {
        "id": "no-carpool",
        "question": "Camp Nhà Thỏ có nhận ghép xe hoặc ghép chuyến không?",
        "answerHtml": "<p>Hiện tại, Camp Nhà Thỏ <strong>chưa hỗ trợ ghép xe hoặc nối chuyến</strong><br />(ví dụ: bạn tự đi xe riêng rồi tập trung tại bãi camp).</p>\n                    <p>Lý do:</p>\n                    <ul>\n                        <li>Số lượng đồ camping chỉ phục vụ tối đa <strong>4 người</strong></li>\n                        <li>Bãi cắm trại có <strong>quy định giới hạn số người, số xe</strong></li>\n                        <li>Đảm bảo chất lượng trải nghiệm cho từng nhóm</li>\n                    </ul>"
      }
    ]
  },
  {
    "id": "camp",
    "label": "Tại bãi camp",
    "items": [
      {
        "id": "rabbit-sleep",
        "question": "Thỏ có ngủ chung lều với tụi mình không?",
        "answerHtml": "<p>Không.</p>\n                    <p>Các bạn sẽ ngủ trong <strong>lều riêng</strong>, còn tụi mình sẽ <strong>ngủ trên xe</strong>.</p>\n                    <p>Mỗi bên có không gian nghỉ ngơi riêng để đảm bảo sự thoải mái.</p>"
      },
      {
        "id": "evening-activities",
        "question": "Buổi tối có hoạt động gì?",
        "answerHtml": "<p>Tuỳ sở thích của nhóm, ví dụ:</p>\n                    <ul>\n                        <li><span class=\"faq-emoji\">🔥</span> Đốt lửa, ăn uống</li>\n                        <li><span class=\"faq-emoji\">🎮</span> Chơi Nintendo Switch</li>\n                        <li><span class=\"faq-emoji\">📸</span> Chụp ảnh đêm</li>\n                        <li><span class=\"faq-emoji\">🎶</span> Nghe nhạc, trò chuyện</li>\n                    </ul>"
      },
      {
        "id": "photo-support",
        "question": "Có hỗ trợ chụp ảnh không?",
        "answerHtml": "<p>Có.</p>\n                    <p>Camp Nhà Thỏ sử dụng <strong>Fujifilm X-T5</strong> để:</p>\n                    <ul>\n                        <li>Chụp ảnh kỷ niệm</li>\n                        <li>Ảnh couple</li>\n                        <li>Ảnh nhóm</li>\n                    </ul>\n                    <p><em>*Lưu ý: tụi mình không nhận retouch hoặc chỉnh màu.</em></p>"
      },
      {
        "id": "hours-rules",
        "question": "Có quy định về giờ giấc không?",
        "answerHtml": "<p><strong>Giờ di chuyển:</strong></p>\n                    <p>Không quá cứng nhắc, linh hoạt theo nhóm nhưng vẫn đảm bảo an toàn.</p>\n                    <p><strong>Giờ sinh hoạt tại bãi camp:</strong></p>\n                    <p>Tuỳ quy định từng bãi,<br />Camp Nhà Thỏ xin phép quy định <strong>tắt lửa lúc 22:00</strong>.</p>"
      },
      {
        "id": "night-temperature",
        "question": "Nhiệt độ ban đêm tại bãi camp thường khoảng bao nhiêu?",
        "answerHtml": "<p>Ban đêm tại bãi camp thường <strong>rất lạnh</strong>, có thể xuống quanh mức <strong>0°C</strong><br />hoặc thấp hơn tuỳ thời điểm.</p>\n                    <p>Để giữ ấm, Camp Nhà Thỏ đã chuẩn bị đầy đủ:</p>\n                    <ul>\n                        <li>Lò sưởi dầu công suất lớn (6kW)</li>\n                        <li>Bếp củi</li>\n                        <li>Túi ngủ</li>\n                        <li>Chăn lông</li>\n                    </ul>\n                    <p>Bạn có thể yên tâm nghỉ ngơi thoải mái.</p>"
      },
      {
        "id": "tent-temperature",
        "question": "Nhiệt độ bên trong lều khoảng bao nhiêu?",
        "answerHtml": "<p>Khi nhiệt độ ngoài trời ở mức âm, nhiệt độ trong lều vẫn duy trì <strong>ổn định khoảng 10°C</strong>,<br />đủ ấm để nghỉ ngơi nhờ các thiết bị giữ nhiệt.</p>"
      },
      {
        "id": "shower-onsen",
        "question": "Tại bãi camp có chỗ tắm không?",
        "answerHtml": "<p>Tuỳ bãi camp sẽ <strong>có hoặc không có khu tắm</strong>.</p>\n                    <p>Ngoài ra, bạn có thể lựa chọn đi <strong>onsen</strong> gần khu vực camping.</p>\n                    <p>Camp Nhà Thỏ sẽ <strong>đưa bạn đi miễn phí</strong>,<br />chi phí onsen bạn tự thanh toán riêng.</p>"
      },
      {
        "id": "firewood",
        "question": "Tôi có cần chuẩn bị củi không?",
        "answerHtml": "<p>Không cần.</p>\n                    <p>Camp Nhà Thỏ đã chuẩn bị sẵn <strong>khoảng 1 bó củi</strong>.</p>\n                    <p>Chi phí củi đã <strong>bao gồm trong phí dịch vụ cơ bản</strong>.</p>"
      },
      {
        "id": "grill-rules",
        "question": "Tôi có được nướng đồ ăn trên bếp củi không?",
        "answerHtml": "<p>Có.</p>\n                    <p>Tuy nhiên, vì lý do sức khoẻ, bạn vui lòng:</p>\n                    <ul>\n                        <li>Chỉ nướng khi <strong>có than hồng</strong></li>\n                        <li><strong>Không nướng trực tiếp khi còn củi cháy</strong><br />(vì khói nhiều, không tốt cho sức khoẻ)</li>\n                    </ul>"
      },
      {
        "id": "wifi",
        "question": "Có internet/WiFi không?",
        "answerHtml": "<p>Có.</p>\n                    <p>Camp Nhà Thỏ cung cấp <strong>WiFi miễn phí</strong> trong suốt hành trình.</p>\n                    <p>Tuy nhiên, do bãi camp thường nằm trên núi,<br /><strong>tốc độ mạng có thể chậm</strong> hơn bình thường.</p>"
      },
      {
        "id": "sports",
        "question": "Tôi có thể chơi các môn thể thao như cầu lông, đá cầu không?",
        "answerHtml": "<p>Được.</p>\n                    <p>Tuy nhiên, bạn vui lòng <strong>tự mang theo dụng cụ</strong>.</p>"
      },
      {
        "id": "tent-setup",
        "question": "Tôi có cần tham gia dựng và thu dọn lều không?",
        "answerHtml": "<p>Có.</p>\n                    <p>Để đúng tinh thần <strong>trải nghiệm camping</strong>,<br />Camp Nhà Thỏ mong muốn bạn <strong>cùng tham gia</strong>:</p>\n                    <ul>\n                        <li>Dựng lều</li>\n                        <li>Tháo lều</li>\n                        <li>Thu dọn đồ</li>\n                    </ul>\n                    <p>Tụi mình sẽ <strong>hỗ trợ và hướng dẫn đầy đủ</strong>,<br />bạn có thể yên tâm.</p>"
      },
      {
        "id": "equipment-rules",
        "question": "Có quy định về sử dụng đồ không?",
        "answerHtml": "<p>Có:</p>\n                    <ul>\n                        <li>Sử dụng cẩn thận</li>\n                        <li>Không làm hư hỏng</li>\n                        <li>Báo ngay nếu có sự cố</li>\n                    </ul>"
      },
      {
        "id": "special-setup",
        "question": "Có hỗ trợ setup đặc biệt không?",
        "answerHtml": "<p>Hiện tại <strong>chưa hỗ trợ setup đặc biệt</strong>,</p>\n                    <p>nhưng bạn có thể liên hệ để được tư vấn thêm.</p>"
      },
      {
        "id": "damage-policy",
        "question": "Nếu lỡ làm bẩn hoặc hỏng đồ thì sao?",
        "answerHtml": "<p>Trong trường hợp xảy ra sự cố,<br />bạn vui lòng <strong>liên hệ với tụi mình sớm nhất</strong> để kiểm tra tình trạng.</p>\n                    <ul>\n                        <li>Nếu hư hỏng nhẹ → xử lý nội bộ</li>\n                        <li>Nếu hư hỏng nặng, <strong>chi phí sửa chữa trên 5,000 yên</strong><br />→ bạn vui lòng <strong>bồi thường toàn bộ chi phí sửa chữa</strong></li>\n                    </ul>\n                    <p>Mọi trường hợp sẽ được trao đổi rõ ràng, minh bạch.</p>"
      }
    ]
  },
  {
    "id": "food",
    "label": "Đồ ăn & mang theo",
    "items": [
      {
        "id": "own-gear",
        "question": "Tôi có thể mang đồ camping riêng không?",
        "answerHtml": "<p>Có, để tránh bị thất lạc đồ, vui lòng liên hệ đồ bạn muốn mang cho tụi mình trước.</p>"
      },
      {
        "id": "kitchen-without-food",
        "question": "Nếu tôi không đặt option đồ ăn thì có được sử dụng bếp và dụng cụ nấu ăn không?",
        "answerHtml": "<p>Có.</p>\n                    <p>Option đồ ăn <strong>chỉ bao gồm nguyên liệu</strong>.</p>\n                    <p>Toàn bộ <strong>dụng cụ nấu ăn (bếp gas, nồi, chảo...)</strong><br />đã được bao gồm trong gói dịch vụ cơ bản.</p>"
      },
      {
        "id": "supermarket-stop",
        "question": "Tôi không chọn option đồ ăn, trên đường đi có thể ghé siêu thị mua đồ không?",
        "answerHtml": "<p>Được.</p>\n                    <p>Camp Nhà Thỏ luôn <strong>hỗ trợ dừng siêu thị</strong> để bạn mua đồ theo nhu cầu.</p>"
      },
      {
        "id": "what-to-bring",
        "question": "Tôi cần tự chuẩn bị những gì?",
        "answerHtml": "<p>Bạn chỉ cần mang:</p>\n                    <ul>\n                        <li>Quần áo cá nhân</li>\n                        <li>Đồ ăn, thức uống nhẹ</li>\n                        <li>Đồ dùng cá nhân</li>\n                    </ul>\n                    <p>Mọi đồ camping đã có sẵn.</p>"
      }
    ]
  },
  {
    "id": "other",
    "label": "Khác",
    "items": [
      {
        "id": "trip-duration",
        "question": "Thời gian đi trong bao lâu?",
        "answerHtml": "<p>Tuỳ lịch hẹn:</p>\n                    <ul>\n                        <li>Đi trong ngày</li>\n                        <li>1 đêm 2 ngày</li>\n                        <li>Hoặc theo yêu cầu</li>\n                    </ul>"
      },
      {
        "id": "bad-weather",
        "question": "Thời tiết xấu có đi được không?",
        "answerHtml": "<p>Nếu mưa nhỏ vẫn có thể đi.</p>\n                    <p>Nếu thời tiết xấu, tụi mình sẽ:</p>\n                    <ul>\n                        <li>Tư vấn đổi lịch</li>\n                        <li>Hoàn tiền / dời lịch theo thoả thuận</li>\n                    </ul>\n                    <p>An toàn luôn được ưu tiên.</p>"
      },
      {
        "id": "sightseeing",
        "question": "Có đưa đi tham quan, chụp ảnh quanh khu vực camp không?",
        "answerHtml": "<p>Tuỳ thời gian và thời tiết,</p>\n                    <p>tụi mình có thể dẫn bạn đi tham quan gần đó.</p>"
      },
      {
        "id": "outside-fuji",
        "question": "Camp Nhà Thỏ có nhận camping ngoài khu vực núi Phú Sĩ không?",
        "answerHtml": "<p>Hoàn toàn có thể.</p>\n                    <p>Hiện tại, tụi mình hỗ trợ camping tại:</p>\n                    <ul>\n                        <li>Kanagawa</li>\n                        <li>Saitama</li>\n                        <li>Tây Tokyo</li>\n                        <li>Chiba</li>\n                        <li>Gunma</li>\n                        <li>Và các khu vực lân cận khác</li>\n                    </ul>\n                    <p>Bạn chỉ cần nhắn địa điểm mong muốn,<br />tụi mình sẽ tư vấn chi tiết.</p>"
      },
      {
        "id": "social-media-photos",
        "question": "Khách có được sử dụng hình ảnh của Camp Nhà Thỏ để đăng lên mạng xã hội không?",
        "answerHtml": "<p>Có. Khách được phép sử dụng hình ảnh chụp trong quá trình sử dụng dịch vụ của Camp Nhà Thỏ để đăng lên mạng xã hội.</p>\n                    <p>Tuy nhiên, vui lòng che mặt, biển số xe và các thông tin nhạy cảm như lịch trình di chuyển, vị trí chính xác hoặc thông tin cá nhân của người khác để đảm bảo quyền riêng tư và an toàn cho tất cả mọi người.</p>"
      }
    ]
  }
];

/** Flat list for search. */
export const FAQ_ALL_ITEMS = FAQ_CATEGORIES.flatMap((category) =>
  category.items.map((item) => ({ ...item, categoryId: category.id, categoryLabel: category.label })),
);
