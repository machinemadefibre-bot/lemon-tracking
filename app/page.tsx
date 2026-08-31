import SiteShell from '@/components/site-shell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Lemon Tracking — Local Screen Usage Tracker' },
  description: 'Local Windows application and screen-usage tracking.',
  alternates: { canonical: '/' },
};

const features = [
  'Foreground application tracking with process identity and duration on Windows, macOS and Linux',
  'Separate idle intervals from active intervals',
  'Daily totals, clock-time timelines and category summaries',
  'Device rows for overlapping screen activity',
  'Manual past activity and daily estimate entries',
  'JSON and CSV exports from the local console',
];

export default function Home() {
  return (
    <SiteShell current="Home">
      <h1>Lemon Tracking</h1>
      <p>Local application usage statistics for Windows.</p>
      <p>
        Lemon Tracking records foreground application identity, timing, idle state, category and
        source. The local console provides daily totals, timelines, application summaries,
        history and exports.
      </p>

      <h2>Download</h2>
      <table className="plain-table download-table">
        <thead><tr><th>Link</th><th>Type</th><th>Windows</th><th>Size</th></tr></thead>
        <tbody>
          <tr><td><a href="/windows/LemonTracking-Windows-x64-Portable.zip" download>LemonTracking-Windows-x64-Portable.zip</a></td><td>Portable ZIP</td><td>Windows x64</td><td>98 KB</td></tr>
          <tr><td><a href="/macos/LemonTracking-macOS-arm64.tar.gz" download>LemonTracking-macOS-arm64.tar.gz</a></td><td>Portable archive</td><td>macOS Apple Silicon</td><td>32 KB</td></tr>
          <tr><td><a href="/linux/LemonTracking-Linux-x86_64.tar.gz" download>LemonTracking-Linux-x86_64.tar.gz</a></td><td>Portable archive</td><td>Linux x86_64</td><td>34 KB</td></tr>
        </tbody>
      </table>
      <p><a href="/download/">Download details and release history</a></p>

      <h2>The main features of Lemon Tracking</h2>
      <ul>
        {features.map((feature) => <li key={feature}>{feature}.</li>)}
      </ul>

      <h2>Compatibility</h2>
      <p>Windows x64 desktop collector, macOS Apple Silicon local agent and Linux x86_64 local agent. The Windows portable package uses the .NET 10 desktop runtime; the macOS and Linux archives use the .NET 10 runtime for their target platform.</p>

      <h2>Release history</h2>
      <p><a href="/changelog/">0.1.0 — desktop collectors and local console</a></p>
    </SiteShell>
  );
}
