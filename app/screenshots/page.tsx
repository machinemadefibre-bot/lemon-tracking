import SiteShell from '@/components/site-shell';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Screenshots', alternates: { canonical: '/screenshots/' } };

const shots = [
  ['today', 'Today', 'Daily totals and category bars from the local record set.'],
  ['timeline', 'Timeline', 'Clock-time rows keep device overlap visible.'],
  ['applications', 'Applications', 'Application totals can be reclassified locally.'],
  ['history', 'History', 'Observed sessions and retrospective entries remain separate.'],
  ['add-past-activity', 'Add Past Activity', 'Quick Backfill keeps manually entered timestamps and provenance.'],
  ['settings', 'Settings', 'Data controls, exports and the local-only status.'],
] as const;

export default function ScreenshotsPage() {
  return (
    <SiteShell current="Screenshots">
      <section className="page-title"><p className="eyebrow">SCREENSHOTS</p><h1>Current application screens</h1><p>Captured from the running local console during the 0.1.0 validation pass. The records shown were entered locally for this capture.</p></section>
      <section className="screenshot-grid">{shots.map(([view, title, copy]) => <article className="screenshot-card" key={view}><img className="real-screenshot" src={`/screenshots/${view}.png`} alt={`${title} screen`} /><h3>{title}</h3><p>{copy}</p></article>)}</section>
      <p className="status-text" style={{ marginTop: 22 }}>Open <a href="/app/">the local console</a> to enter records in this browser’s local storage.</p>
    </SiteShell>
  );
}
