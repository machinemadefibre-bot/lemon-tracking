import SiteShell from '@/components/site-shell';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Features', alternates: { canonical: '/features/' } };

const features = [
  ['Foreground application tracking', 'Records process identity, start, end and duration. Full window titles are off by default.'],
  ['AFK separation', 'Uses the operating system idle timer and keeps idle periods separate from active totals.'],
  ['Operational categories', 'Education & Learning, Social & Communication, Gaming, Passive Entertainment, Work / Productivity and Other.'],
  ['Device-aware timelines', 'Desktop and laptop events can be reviewed by device row instead of being blindly summed.'],
  ['Manual history', 'Add a past session or a daily estimate for gaps, unsupported devices or time before installation.'],
  ['Provenance preserved', 'Automatic, manual, estimated and imported records remain identifiable in history and exports.'],
  ['Local exports', 'Export JSON and CSV with the event fields and codebook needed to interpret each record.'],
  ['Data deletion', 'Delete today, a selected date or all tracked records from Settings.'],
];

export default function FeaturesPage() {
  return (
    <SiteShell current="Features">
      <section className="page-title"><p className="eyebrow">FEATURES</p><h1>What Lemon Tracking records</h1><p>The first release is deliberately narrow: a Windows collector, a local record model and tools for inspecting the history.</p></section>
      <section className="doc-panel"><div className="info-list">{features.map(([title, copy]) => <div className="info-row" key={title}><strong>{title}</strong><p>{copy}</p></div>)}</div></section>
      <section className="notice"><p><strong>Interpretation note.</strong> Foreground application activity is an observation made by the computer. It is not a direct measurement of attention, productivity or wellbeing.</p></section>
      <section className="doc-panel"><h2>Multi-screening is shown, not hidden</h2><p>When data from more than one device overlaps, Lemon Tracking distinguishes raw device-minutes from clock time containing screen activity.</p><table className="plain-table"><thead><tr><th>Metric</th><th>Example</th><th>Meaning</th></tr></thead><tbody><tr><td>Raw device activity</td><td>95 device-minutes</td><td>Sum of each device interval.</td></tr><tr><td>Clock time with activity</td><td>60 minutes</td><td>Union of overlapping intervals.</td></tr><tr><td>Overlap</td><td>Shown on the timeline</td><td>Concurrent device activity, not extra chronological time.</td></tr></tbody></table></section>
    </SiteShell>
  );
}
