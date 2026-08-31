import SiteShell from '@/components/site-shell';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Documentation', alternates: { canonical: '/docs/' } };

export default function DocsPage() {
  return (
    <SiteShell current="Documentation">
      <h1>Documentation</h1>
      <p>Operating notes for the 0.1.0 desktop collectors and local console.</p>
      <h2>First run</h2>
      <ol><li>Launch Lemon Tracking.</li><li>Read the consent screen.</li><li>Select <strong>Start Tracking</strong> to enable collection, or <strong>Exit</strong> to leave it stopped.</li><li>Use the tray menu to pause, resume or reopen the application.</li></ol>
      <p>The collector begins after consent is stored.</p>
      <h2>Record model</h2>
      <table className="plain-table feature-table"><thead><tr><th>Field</th><th>Meaning</th></tr></thead><tbody><tr><td>application</td><td>Process identity, for example <code>code</code> or <code>chrome</code>.</td></tr><tr><td>start / end</td><td>Local timestamps for observed sessions. Aggregate estimates use duration without start/end timestamps.</td></tr><tr><td>duration</td><td>Seconds or minutes represented by the record.</td></tr><tr><td>afk</td><td>Idle state from the system timer.</td></tr><tr><td>source</td><td><code>automatic</code>, <code>manual</code>, <code>estimated</code> or <code>imported</code>.</td></tr><tr><td>confidence</td><td>Optional confidence for retrospective estimates.</td></tr></tbody></table>
      <h2>Platform collectors</h2>
      <table className="plain-table feature-table"><thead><tr><th>Platform</th><th>Collector</th><th>Foreground adapter</th><th>Idle adapter</th></tr></thead><tbody><tr><td>Windows x64</td><td>Desktop collector</td><td>Win32 foreground window and process identity</td><td>Windows last-input timer</td></tr><tr><td>macOS Apple Silicon</td><td>Local agent</td><td>System Events through osascript</td><td>IOHIDSystem through ioreg</td></tr><tr><td>Linux x86_64</td><td>Local agent</td><td>X11 xprop</td><td>xprintidle when installed</td></tr></tbody></table>
      <h2>Local files</h2>
      <p>Each collector uses the current user&apos;s local application-data area:</p><div className="plain-code">LemonTracking/</div><p style={{ marginTop: 12 }}>The folder contains consent state and activity records. Windows Settings opens the folder; the macOS and Linux agent prints the path at startup.</p>
      <h2>Data path</h2>
      <p>The collectors and the public documentation site use separate paths. The record model and local storage details appear above; data boundary questions appear in the <a href="/faq/">FAQ</a>.</p>
    </SiteShell>
  );
}
