import SiteShell from '@/components/site-shell';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Legal Information', alternates: { canonical: '/legal/' } };

export default function LegalPage() {
  return (
    <SiteShell current="Legal Information">
      <section className="page-title"><p className="eyebrow">LEGAL INFORMATION</p><h1>Legal information</h1><div className="notice"><p><strong>Release 0.1.0</strong></p><p>The public site publishes the Lemon Tracking desktop collectors, Android package and local console documentation.</p><p>Local records use the application-data area of the device running each collector. Settings provides JSON and CSV export plus deletion for today, a selected date or all activity data.</p></div></section>
      <section className="doc-panel"><h2>Privacy</h2><p>Recorded fields include process identity, timing, duration, AFK state, category and provenance. The current packages keep passwords, keystrokes, clipboard contents, screenshots, webcam and microphone data, message and document contents, form inputs, banking information and authentication tokens outside the record model.</p><p>Full window titles remain disabled by default. The local console displays the record source and confidence for manual, estimated and imported entries.</p></section>
      <section className="doc-panel"><h2>Open source software</h2><p>Release 0.1.0 packages independent Windows, macOS, Linux and Android collector implementations. ActivityWatch appears as an upstream reference for local-first tracking concepts and data boundaries.</p><p>See the current ActivityWatch project and applicable license notices at <a href="https://github.com/ActivityWatch/activitywatch">github.com/ActivityWatch</a>. Future releases that include ActivityWatch code or binaries will ship the corresponding source and MPL-2.0 notices.</p></section>
    </SiteShell>
  );
}
