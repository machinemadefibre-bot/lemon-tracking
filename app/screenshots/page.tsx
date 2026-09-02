import SiteShell from '@/components/site-shell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Screenshots',
  description: 'Screenshots of Lemon Tracking daily totals, timelines, application summaries, history tools and local settings.',
  alternates: { canonical: '/screenshots/' },
};

const shots = [
  ['today', 'Today', 'Daily totals and category bars from the local record set.'],
  ['timeline', 'Timeline', 'Clock-time rows keep device overlap visible.'],
  ['applications', 'Applications', 'Application totals can be reclassified locally.'],
  ['history', 'History', 'Observed sessions and retrospective entries remain separate.'],
  ['add-past-activity', 'Add Past Activity', 'Quick Backfill keeps manually entered timestamps and provenance.'],
  ['settings', 'Settings', 'Data controls, exports and the local data status.'],
] as const;

export default function ScreenshotsPage() {
  return (
    <SiteShell current="Screenshots">
      <h1>Screenshots</h1>
      <p>Application screens from the local console. Records shown in the captures were entered locally.</p>
      <section className="screenshot-grid">{shots.map(([view, title, copy]) => <article className="screenshot-card" key={view}><img className="real-screenshot" src={`/screenshots/${view}.png`} alt={`${title} screen`} /><h3>{title}</h3><p>{copy}</p></article>)}</section>
      <p>Open <a href="/app/">the local console</a> to enter records in this browser&apos;s local storage.</p>
    </SiteShell>
  );
}
