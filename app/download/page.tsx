import SiteShell from '@/components/site-shell';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Download', alternates: { canonical: '/download/' } };

const portableUrl = '/windows/LemonTracking-Windows-x64-Portable.zip';

export default function DownloadPage() {
  return (
    <SiteShell current="Download">
      <h1>Download</h1>
      <p>Download Lemon Tracking 0.1.0 for Windows x64.</p>
      <table className="plain-table download-table">
        <thead><tr><th>Link</th><th>Type</th><th>System</th><th>Description</th></tr></thead>
        <tbody><tr><td><a href={portableUrl} download>LemonTracking-Windows-x64-Portable.zip</a></td><td>Portable ZIP</td><td>Windows x64</td><td>Desktop collector with local records, tray controls and the local console.</td></tr></tbody>
      </table>
      <h2>Release history</h2>
      <p><strong>0.1.0</strong> · Windows x64 collector and local console</p>
      <p><a href="/changelog/">Read the complete 0.1.0 changelog</a></p>
      <h2>Documentation</h2>
      <p><a href="/docs/">Operating notes and record model</a></p>
    </SiteShell>
  );
}
