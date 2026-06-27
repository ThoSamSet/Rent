import '@/styles/homepage.css';
import '@/styles/motion.css';
import '@/styles/ux.css';
import './globals.css';
import { beVietnamPro } from '@/lib/fonts';
import ClientProviders from '@/components/ux/ClientProviders';

export const metadata = {
  metadataBase: new URL('https://campnhatho.com'),
  title: {
    default: 'Camp Nhà Thỏ',
    template: '%s | Camp Nhà Thỏ',
  },
  description: 'Dịch vụ share và cho thuê đồ cắm trại tại Phú Sĩ, Nhật Bản.',
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
    <html lang="vi">
      <body className={beVietnamPro.className}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
