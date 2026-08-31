import SiteShell from '@/components/site-shell';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Features', alternates: { canonical: '/features/' } };

const features = [
  ['Foreground application tracking', 'Records process identity, start, end and duration.'],
  ['AFK separation', 'Uses the operating system idle timer and keeps idle periods separate from active totals.'],
  ['Operational categories', 'Education & Learning, Social & Communication, Gaming, Passive Entertainment, Work / Productivity and Other.'],
  ['Device-aware timelines', 'Desktop and laptop events appear by device row with clock-time overlap.'],
  ['Manual history', 'Add a past session or a daily estimate with source and confidence fields.'],
  ['Provenance preserved', 'Automatic, manual, estimated and imported records remain identifiable in history and exports.'],
  ['Local exports', 'Export JSON and CSV with the event fields and codebook needed to interpret each record.'],
  ['Data deletion', 'Delete today, a selected date or all tracked records from Settings.'],
];

export default function FeaturesPage() {
  return (
    <SiteShell current="Features">
      <h1>Features</h1>
      <p>Foreground application records, summaries, timelines and local history tools for Windows, macOS and Linux.</p>
      <h2>The main features of Lemon Tracking</h2>
      <ul className="feature-list">{features.map(([title, copy]) => <li key={title}><strong>{title}.</strong> {copy}</li>)}</ul>
      <h2>Timeline data</h2>
      <table className="plain-table">
        <thead><tr><th>Metric</th><th>Example</th><th>Meaning</th></tr></thead>
        <tbody>
          <tr><td>Raw device activity</td><td>95 device-minutes</td><td>Sum of each device interval.</td></tr>
          <tr><td>Clock time with activity</td><td>60 minutes</td><td>Union of overlapping intervals.</td></tr>
          <tr><td>Overlap</td><td>Timeline event rows</td><td>Concurrent device activity across devices.</td></tr>
        </tbody>
      </table>
    </SiteShell>
  );
}
