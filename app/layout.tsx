import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://lemontracking.org'),
  title: {
    default: 'Lemon Tracking — A Complete and Objective Screen-Time Measurement Tool',
    template: '%s — Lemon Tracking',
  },
  description: 'A complete, precise and objective way to measure screen time across phones, computers, televisions, tablets and game consoles.',
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Lemon Tracking',
  url: 'https://lemontracking.org/',
  description: 'A complete, precise and objective way to measure screen time across phones, computers, televisions, tablets and game consoles.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Windows, macOS, Linux, Android',
  downloadUrl: 'https://lemontracking.org/download/',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      </body>
    </html>
  );
}
