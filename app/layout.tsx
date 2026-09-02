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

const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://lemontracking.org/#website',
      name: 'Lemon Tracking',
      url: 'https://lemontracking.org/',
      description: 'The official website for Lemon Tracking screen-time measurement software.',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://lemontracking.org/#software',
      name: 'Lemon Tracking',
      url: 'https://lemontracking.org/',
      mainEntityOfPage: { '@id': 'https://lemontracking.org/#website' },
      description: 'A complete, precise and objective way to measure screen time across phones, computers, televisions, tablets and game consoles.',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Windows, macOS, Linux, Android',
      downloadUrl: 'https://lemontracking.org/download/',
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="home" href="https://lemontracking.org/" />
      </head>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }} />
      </body>
    </html>
  );
}
