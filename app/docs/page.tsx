import SiteShell from '@/components/site-shell';

export default function DocsPage() {
  return (
    <SiteShell current="Documentation">
      <section className="page-title"><p className="eyebrow">DOCUMENTATION</p><h1>Operating notes</h1><p>Short documentation for the 0.1.0 Windows collector and local console.</p></section>
      <section className="doc-panel"><h2>First run</h2><ol><li>Launch Lemon Tracking.</li><li>Read the consent screen.</li><li>Select <strong>Start Tracking</strong> to enable collection, or <strong>Exit</strong> to leave it stopped.</li><li>Use the tray menu to pause, resume or reopen the application.</li></ol><p>The collector does not start before consent is stored.</p></section>
      <section className="doc-panel"><h2>Record model</h2><table className="plain-table feature-table"><thead><tr><th>Field</th><th>Meaning</th></tr></thead><tbody><tr><td>application</td><td>Process identity, for example <code>code</code> or <code>chrome</code>.</td></tr><tr><td>start / end</td><td>Local timestamps for observed sessions. Aggregate estimates have no invented timestamps.</td></tr><tr><td>duration</td><td>Seconds or minutes represented by the record.</td></tr><tr><td>afk</td><td>Whether the interval was idle according to the system timer.</td></tr><tr><td>source</td><td><code>automatic</code>, <code>manual</code>, <code>estimated</code> or <code>imported</code>.</td></tr><tr><td>confidence</td><td>Optional confidence for retrospective estimates.</td></tr></tbody></table></section>
      <section className="doc-panel"><h2>Local files on Windows</h2><p>The desktop collector uses the current user’s local application data area:</p><div className="code-block">%LOCALAPPDATA%\LemonTracking\</div><p style={{ marginTop: 12 }}>The folder contains the consent state, activity records and application log. Use Settings &gt; Data to open the folder, export records or delete them.</p></section>
      <section className="doc-panel"><h2>Network behaviour</h2><p>Normal collection is local. The 0.1.0 collector does not send activity records to Lemon Tracking, ActivityWatch, analytics providers or a remote database. The public website is separate from the desktop data path.</p></section>
    </SiteShell>
  );
}
