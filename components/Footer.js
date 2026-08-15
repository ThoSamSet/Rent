import { SOCIAL_LINKS } from '@/lib/social';
import { SOCIAL_ICONS } from '@/components/icons/SocialIcons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <nav className="footer-social" aria-label="Mạng xã hội">
          {SOCIAL_LINKS.map((item) => {
            const Icon = SOCIAL_ICONS[item.id];
            return (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
              >
                <Icon />
              </a>
            );
          })}
        </nav>
        <p>&copy; 2026 Camp Nhà Thỏ. All rights reserved.</p>
      </div>
    </footer>
  );
}
