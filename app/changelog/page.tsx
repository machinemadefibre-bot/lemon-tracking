import SiteShell from '@/components/site-shell';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Changelog', alternates: { canonical: '/changelog/' } };

export default function ChangelogPage() {
  return <SiteShell current="Changelog"><h1>Changelog</h1><p>Release history for Lemon Tracking.</p><h2>0.1.0</h2><p className="status-text">2026-08-31 · first release</p><ul><li>Windows x64 foreground application collector.</li><li>Separate idle / AFK intervals using the system idle timer.</li><li>Local JSON record store with process identity and timing fields.</li><li>Tray pause and resume controls.</li><li>Today, timeline, applications and history views.</li><li>Manual past activity and daily estimate tools.</li><li>JSON and CSV export, data deletion and local documentation.</li></ul></SiteShell>;
}
