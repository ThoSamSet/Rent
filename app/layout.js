import './globals.css';
import '@/styles/mag/tokens.css';
import '@/styles/mag/base.css';
import '@/styles/mag/chrome.css';
import '@/styles/mag/blocks.css';
import '@/styles/mag/pages.css';
import '@/styles/mag/schedule.css';
import '@/styles/mag/faq.css';
import '@/styles/mag/article.css';
import '@/styles/mag/booking.css';
import '@/styles/mag/art.css';
import { beVietnamPro, fraunces } from '@/lib/fonts';
import ClientProviders from '@/components/ux/ClientProviders';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import Masthead from '@/components/mag/Masthead';
import Colophon from '@/components/mag/Colophon';

export const metadata = {
  metadataBase: new URL('https://campnhatho.com'),
  title: {
    default: 'Camp Nhà Thỏ',
    template: '%s | Camp Nhà Thỏ',
  },
  description: 'Share đồ camping, đưa đón và setup trại quanh Kanto, Nhật Bản.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: '6Jb7Q150HqA8yTBqcR8_sUdWY2mwKTpTIoPTJhN8iVY',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} ${fraunces.variable}`}>
      <body>
        <ClientProviders>
          <Masthead />
          <div className="site-main" id="noi-dung">
            {children}
          </div>
          <Colophon />
        </ClientProviders>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
