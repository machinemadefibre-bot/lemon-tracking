import AppPreview from '@/components/app-preview';
import SiteShell from '@/components/site-shell';

const shots = [
  ['today', 'Today', 'Daily totals and category bars from the local record set.'],
  ['timeline', 'Timeline', 'Clock-time rows keep device overlap visible.'],
  ['history', 'History', 'Observed sessions and retrospective entries remain separate.'],
  ['settings', 'Settings', 'Data controls, exports and the local-only status.'],
] as const;

export default function ScreenshotsPage() {
  return (
    <SiteShell current="Screenshots">
      <section className="page-title"><p className="eyebrow">SCREENSHOTS</p><h1>Current application screens</h1><p>These views are rendered from the same interface structure used by the local console. The sample values are interface examples, not collected user telemetry.</p></section>
      <section className="screenshot-grid">{shots.map(([view, title, copy]) => <article className="screenshot-card" key={view}><AppPreview view={view} /><h3>{title}</h3><p>{copy}</p></article>)}</section>
      <p className="status-text" style={{ marginTop: 22 }}>Open <a href="/app/">the local console</a> to enter records in this browser’s local storage.</p>
    </SiteShell>
  );
}
