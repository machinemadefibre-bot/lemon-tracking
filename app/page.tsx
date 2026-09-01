import SiteShell from '@/components/site-shell';
import { screenTimeDescription } from '@/lib/product-description';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Lemon Tracking — A Complete and Objective Screen-Time Measurement Tool' },
  description: 'A complete, precise and objective way to measure screen time across phones, computers, televisions, tablets and game consoles.',
  alternates: { canonical: '/' },
};

const features = [
  'Foreground application tracking with process identity and duration on Windows, macOS, Linux and Android',
  'Separate idle intervals from active intervals',
  'Daily totals, clock-time timelines and category summaries',
  'Device rows for overlapping screen activity',
  'Manual past activity and daily estimate entries',
  'JSON and CSV exports from the local console',
];

export default function Home() {
  return (
    <SiteShell current="Home">
      <h1>Lemon Tracking — A Complete and Objective Screen-Time Measurement Tool</h1>
      {screenTimeDescription.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

      <h2>Download</h2>
      <table className="plain-table download-table">
        <thead><tr><th>Link</th><th>Type</th><th>System</th><th>Size</th></tr></thead>
        <tbody>
          <tr><td><a href="/windows/LemonTracking-Windows-x64-Portable.zip" download>LemonTracking-Windows-x64-Portable.zip</a></td><td>Portable ZIP</td><td>Windows x64</td><td>98 KB</td></tr>
          <tr><td><a href="/macos/LemonTracking-macOS-arm64.tar.gz" download>LemonTracking-macOS-arm64.tar.gz</a></td><td>Portable archive</td><td>macOS Apple Silicon</td><td>44 KB</td></tr>
          <tr><td><a href="/linux/LemonTracking-Linux-x86_64.tar.gz" download>LemonTracking-Linux-x86_64.tar.gz</a></td><td>Portable archive</td><td>Linux x86_64</td><td>46 KB</td></tr>
          <tr><td><a href="/android/LemonTracking-Android.apk" download>LemonTracking-Android.apk</a></td><td>APK</td><td>Android</td><td>17 KB</td></tr>
        </tbody>
      </table>
      <p><a href="/download/">Download details and release history</a></p>

      <h2>The main features of Lemon Tracking</h2>
      <ul>
        {features.map((feature) => <li key={feature}>{feature}.</li>)}
      </ul>

      <h2>Compatibility</h2>
      <p>Windows x64 desktop collector, macOS Apple Silicon local agent, Linux x86_64 local agent and Android local application summary through Usage Access. The Windows portable package uses the .NET 10 desktop runtime; the macOS and Linux archives use the .NET 10 runtime for their target platform.</p>

      <h2>Release history</h2>
      <p><a href="/changelog/">0.1.2 — Favicon compatibility update</a></p>
    </SiteShell>
  );
}
