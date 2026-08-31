import SiteShell from '@/components/site-shell';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Legal Information', alternates: { canonical: '/legal/' } };

export default function LegalPage() {
  return (
    <SiteShell current="Legal Information">
      <section className="page-title"><p className="eyebrow">LEGAL INFORMATION</p><h1>Legal information</h1><div className="notice"><p><strong>Congratulations. You found the legal information.</strong></p><p>Lemon Tracking is a fictional student-built project created as a joke.</p><p>The application itself is functional and performs local activity tracking, but no historical Lemon Tracking company or commercial tracking service is being represented here.</p><p>Lemon Tracking does not upload your tracked activity.</p></div></section>
      <section className="doc-panel"><h2>Privacy</h2><p>The Windows collector stores process identity, timing, AFK state, category and provenance on the local device. It does not collect passwords, keystrokes, clipboard contents, screenshots, webcam or microphone data, message or document contents, form inputs, banking information or authentication tokens.</p><p>Full window titles are disabled by default because titles can expose document names, conversations, email subjects and searches.</p></section>
      <section className="doc-panel"><h2>Open source software</h2><p>The 0.1.0 Windows collector is an independent implementation and does not bundle ActivityWatch runtime binaries. ActivityWatch was reviewed as an upstream reference for local-first tracking concepts and data boundaries.</p><p>ActivityWatch is an independent open-source project. Lemon Tracking is not affiliated with or endorsed by the ActivityWatch developers.</p><p>See the current ActivityWatch project and its applicable license notices at <a href="https://github.com/ActivityWatch/activitywatch">github.com/ActivityWatch/activitywatch</a>. If a future release incorporates ActivityWatch code or binaries, the corresponding source and MPL-2.0 notices will be shipped with that release.</p></section>
      <section className="doc-panel"><h2>Project status</h2><table className="plain-table"><tbody><tr><th>Project type</th><td>Student-built fictional software project</td></tr><tr><th>Current release</th><td>0.1.0</td></tr><tr><th>Commercial service</th><td>None represented</td></tr><tr><th>Activity upload</th><td>Disabled; no Lemon Tracking activity backend</td></tr></tbody></table></section>
    </SiteShell>
  );
}
