import SiteShell from '@/components/site-shell';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Changelog', alternates: { canonical: '/changelog/' } };

export default function ChangelogPage() {
  return <SiteShell current="Changelog"><section className="page-title"><p className="eyebrow">CHANGELOG</p><h1>Release history</h1><p>Only releases that exist are listed here.</p></section><section className="doc-panel"><h2>0.1.0</h2><p className="status-text">2026-08-31 · first release</p><ul><li>Windows x64 foreground application collector.</li><li>Separate idle / AFK intervals using the system idle timer.</li><li>Local JSON record store with no window titles by default.</li><li>Tray pause and resume controls.</li><li>Today, timeline, applications and history views.</li><li>Manual past activity and daily estimate tools.</li><li>JSON and CSV export, data deletion and local-only documentation.</li></ul></section></SiteShell>;
}
