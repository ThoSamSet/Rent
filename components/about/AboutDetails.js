import Link from 'next/link';
import {
  ABOUT_BOOKING_STEPS,
  ABOUT_COMPARISON_ROWS,
  ABOUT_TIMELINE,
  ABOUT_VALUES,
} from '@/lib/about/content';

function BookingStepDescription({ step }) {
  if (step.link) {
    const parts = step.description.split(step.link.label);
    return (
      <>
        {parts[0]}
        <Link href={step.link.href}>{step.link.label}</Link>
        {parts[1]}
      </>
    );
  }

  if (step.emphasis) {
    const parts = step.description.split(step.emphasis);
    return (
      <>
        {parts[0]}
        <strong>{step.emphasis}</strong>
        {parts[1]}
      </>
    );
  }

  return step.description;
}

export default function AboutDetails() {
  return (
    <>
      <section className="about-block about-values about-values--dark home-section" data-reveal aria-label="Phương châm Camp Nhà Thỏ">
        <div className="about-block__header">
          <p className="home-section__label">Phương châm</p>
          <h2 className="home-section__title">Giá trị Camp Nhà Thỏ hướng tới</h2>
          <p className="about-block__intro">Chúng mình mong muốn tạo ra những chuyến đi:</p>
        </div>
        <ul className="about-values__grid">
          {ABOUT_VALUES.map((value, index) => (
            <li
              key={value.text}
              className={`about-values__card about-values__card--hue-${index + 1}`}
              tabIndex={0}
            >
              {value.text}
            </li>
          ))}
        </ul>
      </section>

      <section className="about-block home-section" data-reveal aria-label="So sánh lợi ích">
        <div className="about-block__header">
          <p className="home-section__label">Lợi ích</p>
          <h2 className="home-section__title">So sánh nhanh khi dùng Camp Nhà Thỏ</h2>
          <p className="about-block__intro">So sánh nhanh — cùng một chuyến đi, khác nhau ở mức hỗ trợ.</p>
        </div>
        <p className="table-swipe-hint" aria-hidden="true">
          <span className="table-swipe-hint-icon">↔</span> Vuốt ngang để xem thêm
        </p>
        <div className="about-comparison__wrap">
          <table className="about-comparison" aria-label="Bảng so sánh lợi ích sử dụng Camp Nhà Thỏ">
            <thead>
              <tr>
                <th scope="col">Hạng mục</th>
                <th scope="col">Camp Nhà Thỏ</th>
                <th scope="col">Tự chuẩn bị</th>
              </tr>
            </thead>
            <tbody>
              {ABOUT_COMPARISON_ROWS.map((row) => (
                <tr key={row.feature}>
                  <th scope="row">{row.feature}</th>
                  <td className="about-comparison__with">{row.withService}</td>
                  <td className="about-comparison__without">{row.withoutService}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="about-block home-section" data-reveal aria-label="Cách đặt lịch">
        <div className="about-block__header">
          <p className="home-section__label">Đặt lịch</p>
          <h2 className="home-section__title">Cách đặt lịch</h2>
        </div>
        <ol className="about-steps">
          {ABOUT_BOOKING_STEPS.map((step, index) => (
            <li key={step.title} className="about-steps__item">
              <span className="about-steps__num" aria-hidden="true">
                {index + 1}
              </span>
              <div>
                <h3 className="about-steps__title">{step.title}</h3>
                <p className="about-steps__text">
                  <BookingStepDescription step={step} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="about-block home-section" data-reveal aria-label="Lịch trình 2N1Đ">
        <div className="about-block__header">
          <p className="home-section__label">Lịch trình</p>
          <h2 className="home-section__title">Lịch trình 2N1Đ</h2>
          <p className="about-block__intro">Khung tham khảo với Plan Hạt Bí — giờ giấc linh hoạt theo nhóm.</p>
        </div>
        <ul className="about-timeline">
          {ABOUT_TIMELINE.map((item) => (
            <li key={item.label} className="about-timeline__item">
              <span className="about-timeline__node" aria-hidden="true" />
              <div className="about-timeline__content">
                <strong className="about-timeline__label">{item.label}</strong>
                <p className="about-timeline__text">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
