import SiteShell from '@/components/site-shell';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Downloads', alternates: { canonical: '/download/' } };

const portableUrl = '/windows/LemonTracking-Windows-x64-Portable.zip';
const portableSha256 = '0F396DD5455ED4F1F01CA72600927470EB931FC5BA6FFBCD547929D84B9D082C';

export default function DownloadPage() {
  return (
    <SiteShell current="Download">
      <section className="page-title">
        <p className="eyebrow">DOWNLOAD</p>
        <h1>Download Lemon Tracking</h1>
        <p>Release 0.1.0 is the first Windows x64 build. The native collector is packaged separately from this public documentation site.</p>
      </section>
      <section className="doc-panel">
        <table className="plain-table download-table">
          <thead><tr><th>Platform</th><th>Download</th><th>Architecture</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>Windows</td><td><a href={portableUrl} download>LemonTracking-Windows-x64-Portable.zip</a></td><td>x64</td><td>Portable ZIP. Requires the .NET 10 desktop runtime.</td></tr>
            <tr><td>macOS</td><td className="unavailable">Not currently available.</td><td>—</td><td>Unsigned build not prepared.</td></tr>
            <tr><td>Linux</td><td className="unavailable">Not currently available.</td><td>—</td><td>X11 and Wayland packages not prepared.</td></tr>
            <tr><td>Android</td><td className="unavailable">Not currently available.</td><td>—</td><td>No mobile client in 0.1.0.</td></tr>
            <tr><td>Browser extension</td><td className="unavailable">Not currently available.</td><td>—</td><td>Browser tracking is intentionally deferred.</td></tr>
            <tr><td>iOS</td><td className="unavailable">Not currently available.</td><td>—</td><td>Device-wide tracking is not claimed.</td></tr>
          </tbody>
        </table>
        <p className="status-text" style={{ marginTop: 16 }}>Each listed download is checked into the release package only after a successful build.</p>
        <div className="code-block checksum-block"><strong>SHA-256</strong><br />{portableSha256}  LemonTracking-Windows-x64-Portable.zip</div>
      </section>
      <section className="home-grid">
        <div className="copy-block"><p className="eyebrow">AFTER INSTALLATION</p><h2>Start with consent</h2><p>The Windows application asks before collection begins. Start Tracking enables the local collector; Exit leaves it stopped.</p></div>
        <div className="copy-block"><p className="eyebrow">DATA LOCATION</p><h2>Stored on this device</h2><p>Windows records are stored below the current user’s local application data directory. The application exposes the exact path under Settings.</p></div>
      </section>
    </SiteShell>
  );
}
