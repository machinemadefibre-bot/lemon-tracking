import SiteShell from '@/components/site-shell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Lemon Tracking — Local Screen Usage Tracker' },
  description: 'Lemon Tracking is a local application and screen-usage tracker.',
  alternates: { canonical: '/' },
};

const measures = [
  ['Foreground application', 'Process identity and duration'],
  ['Idle state', 'Separate AFK intervals'],
  ['Category', 'User-defined operational label'],
  ['Source', 'Automatic, manual, estimated or imported'],
];

export default function Home() {
  return (
    <SiteShell current="Home">
      <section className="home-intro">
        <p className="eyebrow">LOCAL UTILITY SOFTWARE / CURRENT RELEASE 0.1.0</p>
        <h1>Lemon Tracking</h1>
        <p className="lead">Local application usage statistics.</p>
        <p className="intro-copy">
          Lemon Tracking records which applications are active and how long they remain active. It
          provides daily summaries, clock-time timelines and a way to fill gaps in an activity
          history without sending the records anywhere.
        </p>
        <div className="button-row">
          <a className="button button-primary" href="/download/">
            Download for Windows
          </a>
          <a className="button" href="/app/">
            Open local console
          </a>
        </div>
      </section>

      <section className="status-panel" aria-labelledby="status-heading">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">STATUS</p>
            <h2 id="status-heading">A small tracker with a local data boundary</h2>
          </div>
          <span className="status-chip"><span className="status-dot" /> Windows build ready</span>
        </div>
        <p>
          The Windows collector uses the foreground process reported by the operating system and
          the system idle timer. It does not store window titles by default, capture the screen or
          inspect keystrokes.
        </p>
        <table className="plain-table compact-table">
          <thead>
            <tr><th>Measured field</th><th>Stored locally as</th></tr>
          </thead>
          <tbody>
            {measures.map(([name, value]) => <tr key={name}><td>{name}</td><td>{value}</td></tr>)}
          </tbody>
        </table>
      </section>

      <section className="home-grid">
        <div className="copy-block">
          <p className="eyebrow">MEASUREMENT NOTE</p>
          <h2>Foreground activity is not attention</h2>
          <p>
            A foreground application is what the computer reports as active. It is not a reliable
            measurement of whether a person is paying attention. AFK time is shown separately so
            long idle periods do not silently inflate active totals.
          </p>
          <a href="/docs/">Read the data model documentation →</a>
        </div>
        <div className="copy-block">
          <p className="eyebrow">HISTORY</p>
          <h2>Observed and remembered data stay distinct</h2>
          <p>
            Add a past session or a daily estimate when tracking was paused, unavailable or
            installed late. Detailed history and exports preserve the original source and any
            confidence estimate.
          </p>
          <a href="/app/?view=history">Open history tools →</a>
        </div>
      </section>

      <section className="release-strip">
        <div>
          <p className="eyebrow">FIRST RELEASE</p>
          <h2>0.1.0 · Windows x64</h2>
          <p>Foreground process tracking, AFK separation, local JSON storage, manual history and export.</p>
        </div>
        <a href="/changelog/">Read the changelog →</a>
      </section>
    </SiteShell>
  );
}
