import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://lemontracking.org'),
  title: {
    default: 'Lemon Tracking — Local Screen Usage Tracker',
    template: '%s — Lemon Tracking',
  },
  description: 'Local application and screen-usage tracking on Windows, macOS, Linux and Android.',
  robots: { index: true, follow: true },
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Lemon Tracking',
  url: 'https://lemontracking.org/',
  description: 'Local application and screen-usage tracking on Windows, macOS, Linux and Android.',
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
