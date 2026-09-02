import SiteShell from '@/components/site-shell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'Release notes for Lemon Tracking 0.1.2 and earlier versions across Windows, macOS, Linux and Android.',
  alternates: { canonical: '/changelog/' },
};

export default function ChangelogPage() {
  return (
    <SiteShell current="Changelog">
      <h1>Changelog</h1>
      <p>Release history for Lemon Tracking.</p>
      <h2>0.1.2</h2>
      <p className="status-text">2026-09-01 · Favicon compatibility update</p>
      <ul>
        <li>Declared the existing site icon in page metadata.</li>
        <li>Added compatibility redirects for legacy <code>/favicon.ico</code> and <code>/favicon.png</code> requests.</li>
        <li>Refreshed the version metadata across the site and platform packages.</li>
      </ul>
      <h2>0.1.1</h2>
      <p className="status-text">2026-08-30 · Windows header layout update</p>
      <ul>
        <li>Separated the tracking status, Pause and Add past activity controls into a responsive header layout.</li>
        <li>Refreshed the Windows x64 package and platform version metadata.</li>
      </ul>
      <h2>0.1.0</h2>
      <p className="status-text">2026-08-28 · first release</p>
      <ul>
        <li>Windows x64 foreground application collector.</li>
        <li>macOS Apple Silicon and Linux x86_64 local agents.</li>
        <li>Android APK with Usage Access foreground summaries and local JSON output.</li>
        <li>Separate idle / AFK intervals using the system idle timer.</li>
        <li>Local JSON record store with process identity and timing fields.</li>
        <li>Tray pause and resume controls on Windows.</li>
        <li>Today, timeline, applications and history views.</li>
        <li>Manual past activity and daily estimate tools.</li>
        <li>JSON and CSV export, data deletion and local documentation.</li>
      </ul>
      <h2>ActivityWatch upstream reference</h2>
      <p>ActivityWatch v0.14.0b3 records the following upstream changes in its official release notes. This is an attributed reference; Lemon Tracking does not bundle or synchronize ActivityWatch code.</p>
      <ul>
        <li>Improved release-to-release changelog navigation.</li>
        <li>More reliable packaging and continuous-integration tooling.</li>
        <li>Adjusted server insert responses and activity-event transformation behavior.</li>
        <li>Updated notification, indexing and macOS watcher details across the upstream modules.</li>
      </ul>
      <p><a href="https://github.com/ActivityWatch/activitywatch/releases/tag/v0.14.0b3">Read the official ActivityWatch v0.14.0b3 release notes</a></p>
    </SiteShell>
  );
}
