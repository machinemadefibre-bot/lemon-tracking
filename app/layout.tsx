import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Lemon Tracking — Local application usage statistics',
    template: '%s — Lemon Tracking',
  },
  description:
    'A local-first application usage and screen-activity tracker with transparent history and exports.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
