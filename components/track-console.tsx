'use client';

import { useEffect, useMemo, useState } from 'react';

type Source = 'automatic' | 'manual' | 'estimated' | 'imported';
type Confidence = 'Exact' | 'Approximate' | 'Rough estimate';
type View = 'today' | 'timeline' | 'applications' | 'categories' | 'history' | 'raw' | 'settings';

type Entry = {
  id: string;
  date: string;
  start?: string;
  end?: string;
  durationMinutes: number;
  application: string;
  category: string;
  device: string;
  source: Source;
  confidence?: Confidence;
  afk?: boolean;
  createdAt: string;
  modifiedAt: string;
};

type BackfillRow = {
  id: string;
  date: string;
  start: string;
  end: string;
  device: string;
  application: string;
  category: string;
};

const CATEGORIES = [
  'Education & Learning',
  'Social & Communication',
  'Gaming',
  'Passive Entertainment',
  'Work / Productivity',
  'Other',
];
const DEVICES = ['Desktop', 'Laptop', 'Phone', 'Tablet', 'TV', 'Game Console', 'Other'];
const NAV: Array<[View, string]> = [
  ['today', 'Today'],
  ['timeline', 'Timeline'],
  ['applications', 'Applications'],
  ['categories', 'Categories'],
  ['history', 'History'],
  ['raw', 'Raw Data'],
  ['settings', 'Settings'],
];

const today = () => {
  const value = new Date();
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;
};
const now = () => new Date().toISOString();
const makeId = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
const timeMinutes = (value?: string) => {
  if (!value) return undefined;
  const [hours, minutes] = value.split(':').map(Number);
  return Number.isFinite(hours) && Number.isFinite(minutes) ? hours * 60 + minutes : undefined;
};
const durationBetween = (start: string, end: string) => {
  const a = timeMinutes(start) ?? 0;
  const b = timeMinutes(end) ?? a;
  return b >= a ? b - a : 1440 - a + b;
};
const formatDuration = (minutes: number) => {
  const rounded = Math.max(0, Math.round(minutes));
  const hours = Math.floor(rounded / 60);
  const rest = rounded % 60;
  return hours ? `${hours}h ${String(rest).padStart(2, '0')}m` : `${rest}m`;
};
const formatDate = (value: string) => new Intl.DateTimeFormat('en-AU', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${value}T12:00:00`));
const labelSource = (source: Source) => source[0].toUpperCase() + source.slice(1);
const emptyBackfill = (): BackfillRow => ({ id: makeId(), date: today(), start: '09:00', end: '10:00', device: 'Laptop', application: '', category: 'Other' });

function SourceChip({ source }: { source: Source }) {
  return <span className={`source-chip source-${source}`}>{labelSource(source)}</span>;
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return <div className="empty-state"><strong>No records for this view</strong><span>Add a past session or start the Windows collector to create local records.</span><div style={{ marginTop: 14 }}><button className="button button-primary button-small" onClick={onAdd}>Add past activity</button></div></div>;
}

export default function TrackConsole() {
  const [hydrated, setHydrated] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [consent, setConsent] = useState(false);
  const [exited, setExited] = useState(false);
  const [paused, setPaused] = useState(false);
  const [view, setView] = useState<View>('today');
  const [sourceFilter, setSourceFilter] = useState<'all' | Source>('all');
  const [selectedDate, setSelectedDate] = useState(today());
  const [modal, setModal] = useState<null | 'backfill' | 'estimate'>(null);
  const [backfillRows, setBackfillRows] = useState<BackfillRow[]>([emptyBackfill()]);
  const [estimateForm, setEstimateForm] = useState({ date: today(), education: '0', social: '0', gaming: '0', entertainment: '0', work: '0', other: '0', device: 'Laptop', confidence: 'Approximate' as Confidence });
  const [toast, setToast] = useState('');

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('lemon-activity-v1');
      const storedConsent = window.localStorage.getItem('lemon-consent-v1');
      const storedPaused = window.localStorage.getItem('lemon-paused-v1');
      if (stored) setEntries(JSON.parse(stored) as Entry[]);
      setConsent(storedConsent === 'accepted');
      setPaused(storedPaused === 'true');
      const requestedView = new URLSearchParams(window.location.search).get('view') as View | null;
      if (requestedView && NAV.some(([key]) => key === requestedView)) setView(requestedView);
    } catch {
      setToast('Local data could not be read; a new empty record set is shown.');
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem('lemon-activity-v1', JSON.stringify(entries));
    window.localStorage.setItem('lemon-consent-v1', consent ? 'accepted' : 'declined');
    window.localStorage.setItem('lemon-paused-v1', paused ? 'true' : 'false');
  }, [consent, entries, hydrated, paused]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const filteredEntries = useMemo(() => sourceFilter === 'all' ? entries : entries.filter((entry) => entry.source === sourceFilter), [entries, sourceFilter]);
  const selectedEntries = useMemo(() => filteredEntries.filter((entry) => entry.date === selectedDate), [filteredEntries, selectedDate]);
  const todayEntries = useMemo(() => filteredEntries.filter((entry) => entry.date === today()), [filteredEntries]);
  const activeEntries = todayEntries.filter((entry) => !entry.afk);
  const activeMinutes = activeEntries.reduce((sum, entry) => sum + entry.durationMinutes, 0);
  const idleMinutes = todayEntries.filter((entry) => entry.afk).reduce((sum, entry) => sum + entry.durationMinutes, 0);
  const appCount = new Set(todayEntries.map((entry) => entry.application).filter(Boolean)).size;
  const longest = todayEntries.reduce((max, entry) => Math.max(max, entry.durationMinutes), 0);

  const categoryTotals = useMemo(() => CATEGORIES.map((category) => ({ category, minutes: selectedEntries.filter((entry) => entry.category === category).reduce((sum, entry) => sum + entry.durationMinutes, 0) })), [selectedEntries]);
  const maxCategory = Math.max(1, ...categoryTotals.map((row) => row.minutes));
  const rawDeviceMinutes = selectedEntries.reduce((sum, entry) => sum + entry.durationMinutes, 0);
  const intervals = selectedEntries.flatMap((entry) => {
    const start = timeMinutes(entry.start);
    const end = timeMinutes(entry.end);
    if (start === undefined || end === undefined || entry.afk) return [];
    return [{ start, end: end >= start ? end : 1440, entry }];
  }).sort((a, b) => a.start - b.start);
  let unionMinutes = 0;
  let unionStart: number | undefined;
  let unionEnd: number | undefined;
  for (const interval of intervals) {
    if (unionStart === undefined || unionEnd === undefined) { unionStart = interval.start; unionEnd = interval.end; continue; }
    if (interval.start > unionEnd) { unionMinutes += unionEnd - unionStart; unionStart = interval.start; unionEnd = interval.end; }
    else unionEnd = Math.max(unionEnd, interval.end);
  }
  if (unionStart !== undefined && unionEnd !== undefined) unionMinutes += unionEnd - unionStart;

  const showToast = (message: string) => setToast(message);
  const acceptConsent = () => { setConsent(true); setExited(false); showToast('Local tracking consent saved.'); };
  const pauseToggle = () => { setPaused((value) => !value); showToast(paused ? 'Tracking resumed.' : 'Tracking paused.'); };
  const updateBackfill = (id: string, key: Exclude<keyof BackfillRow, 'id'>, value: string) => setBackfillRows((rows) => rows.map((row) => row.id === id ? { ...row, [key]: value } : row));
  const saveBackfill = () => {
    const created = backfillRows.filter((row) => row.application.trim() && durationBetween(row.start, row.end) > 0).map((row): Entry => ({ id: makeId(), date: row.date, start: row.start, end: row.end, durationMinutes: durationBetween(row.start, row.end), application: row.application.trim(), category: row.category, device: row.device, source: 'manual', createdAt: now(), modifiedAt: now() }));
    if (!created.length) { showToast('Add an application and a non-zero time range first.'); return; }
    setEntries((current) => [...current, ...created]); setModal(null); setBackfillRows([emptyBackfill()]); showToast(`${created.length} manual record${created.length === 1 ? '' : 's'} saved locally.`);
  };
  const saveEstimate = () => {
    const values: Array<[string, string]> = [['Education & Learning', estimateForm.education], ['Social & Communication', estimateForm.social], ['Gaming', estimateForm.gaming], ['Passive Entertainment', estimateForm.entertainment], ['Work / Productivity', estimateForm.work], ['Other', estimateForm.other]];
    const created = values.filter(([, value]) => Number(value) > 0).map(([category, value]): Entry => ({ id: makeId(), date: estimateForm.date, durationMinutes: Number(value), application: 'Daily estimate', category, device: estimateForm.device, source: 'estimated', confidence: estimateForm.confidence, createdAt: now(), modifiedAt: now() }));
    if (!created.length) { showToast('Enter at least one duration greater than zero.'); return; }
    setEntries((current) => [...current, ...created]); setModal(null); showToast('Estimated durations saved without invented timestamps.');
  };
  const updateApplicationCategory = (application: string, category: string) => { setEntries((current) => current.map((entry) => entry.application === application ? { ...entry, category, modifiedAt: now() } : entry)); showToast(`${application} reclassified.`); };
  const removeEntries = (predicate: (entry: Entry) => boolean, message: string) => { const count = entries.filter(predicate).length; setEntries((current) => current.filter((entry) => !predicate(entry))); showToast(count ? `${count} record${count === 1 ? '' : 's'} deleted.` : message); };
  const exportJson = () => { downloadFile(`lemon-tracking-${today()}.json`, JSON.stringify({ codebook: { source: 'automatic | manual | estimated | imported', timestamps: 'local session timestamps; estimated aggregates omit timestamps' }, events: entries }, null, 2), 'application/json'); showToast('JSON export prepared locally.'); };
  const exportCsv = () => { const header = 'event_id,date,device_type,application,category,start,end,duration_minutes,afk,source,confidence,created_at,modified_at'; const rows = entries.map((entry) => [entry.id, entry.date, entry.device, entry.application, entry.category, entry.start ?? '', entry.end ?? '', entry.durationMinutes, entry.afk ? 'true' : 'false', entry.source, entry.confidence ?? '', entry.createdAt, entry.modifiedAt].map(csvCell).join(',')); downloadFile(`lemon-tracking-${today()}.csv`, [header, ...rows].join('\n'), 'text/csv'); showToast('CSV export prepared locally.'); };
  const downloadFile = (name: string, content: string, type: string) => { const blob = new Blob([content], { type }); const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = name; anchor.click(); URL.revokeObjectURL(url); };
  const csvCell = (value: unknown) => { const text = String(value ?? ''); return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text; };

  const title = NAV.find(([key]) => key === view)?.[1] ?? 'Today';
  const visibleApps = Array.from(new Set(selectedEntries.map((entry) => entry.application).filter(Boolean))).map((application) => ({ application, minutes: selectedEntries.filter((entry) => entry.application === application).reduce((sum, entry) => sum + entry.durationMinutes, 0), category: selectedEntries.find((entry) => entry.application === application)?.category ?? 'Other' })).sort((a, b) => b.minutes - a.minutes);
  const byDate = Array.from(new Set(filteredEntries.map((entry) => entry.date))).sort().reverse();

  const renderHeaderActions = () => <div className="console-actions"><button className="button button-primary" onClick={() => { setBackfillRows([emptyBackfill()]); setModal('backfill'); }}>Add past activity</button><button className="button" onClick={() => setModal('estimate')}>Daily estimate</button>{view === 'today' && <button className="button" onClick={pauseToggle}>{paused ? 'Resume tracking' : 'Pause tracking'}</button>}</div>;
  const renderFilter = () => <div className="filter-row"><label className="field-inline">Data source<select value={sourceFilter} onChange={(event) => setSourceFilter(event.target.value as 'all' | Source)}><option value="all">All Activity</option><option value="automatic">Automatically Tracked</option><option value="manual">Manually Added</option><option value="estimated">Estimated</option><option value="imported">Imported</option></select></label><span className="status-text">{selectedEntries.length} record{selectedEntries.length === 1 ? '' : 's'} in view</span></div>;
  const renderToday = () => <>
    <div className="local-banner"><strong>Local record set.</strong> This console uses browser-local storage for entries created here. The Windows collector stores its own records on the device and never uploads them.</div>
    <div className="metric-grid"><div className="metric-card"><span>Screen activity</span><strong>{formatDuration(activeMinutes)}</strong><small>AFK excluded</small></div><div className="metric-card"><span>Idle time</span><strong>{formatDuration(idleMinutes)}</strong><small>separate from active</small></div><div className="metric-card"><span>Longest session</span><strong>{formatDuration(longest)}</strong><small>observed or entered</small></div><div className="metric-card"><span>Applications</span><strong>{appCount}</strong><small>today</small></div></div>
    <section className="console-section"><h2>Categories</h2><div className="category-list">{categoryTotals.map(({ category, minutes }) => <div className="category-row" key={category}><span>{category}</span><div className="category-track"><div className="category-fill" style={{ width: `${Math.round((minutes / maxCategory) * 100)}%` }} /></div><span>{formatDuration(minutes)}</span></div>)}</div></section>
    <section className="console-section"><h2>Recent activity</h2>{renderFilter()}{todayEntries.length ? <table className="plain-table console-table"><thead><tr><th>Time</th><th>Application</th><th>Device</th><th>Duration</th><th>Source</th></tr></thead><tbody>{todayEntries.slice().sort((a, b) => (b.start ?? '').localeCompare(a.start ?? '')).slice(0, 12).map((entry) => <tr key={entry.id}><td>{entry.start ? `${entry.start}–${entry.end}` : 'Aggregate'}</td><td>{entry.application}</td><td>{entry.device}</td><td>{formatDuration(entry.durationMinutes)}</td><td><SourceChip source={entry.source} /></td></tr>)}</tbody></table> : <EmptyState onAdd={() => { setBackfillRows([emptyBackfill()]); setModal('backfill'); }} />}</section>
  </>;

  const renderTimeline = () => {
    const devices = Array.from(new Set(selectedEntries.map((entry) => entry.device)));
    return <><div className="filter-row"><label className="field-inline">Date<input type="date" value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)} /></label>{renderFilter()}</div><div className="metric-grid"><div className="metric-card"><span>Raw device activity</span><strong>{formatDuration(rawDeviceMinutes)}</strong><small>sum of device intervals</small></div><div className="metric-card"><span>Clock time with activity</span><strong>{formatDuration(unionMinutes)}</strong><small>overlap counted once</small></div><div className="metric-card"><span>Overlap</span><strong>{formatDuration(Math.max(0, rawDeviceMinutes - unionMinutes))}</strong><small>shown by device row</small></div></div><section className="console-section"><h2>Clock-time timeline</h2>{devices.length ? <div className="timeline">{devices.map((device) => <div className="timeline-row" key={device}><span className="timeline-label">{device}</span><div className="timeline-track">{selectedEntries.filter((entry) => entry.device === device && entry.start && entry.end && !entry.afk).map((entry) => { const start = timeMinutes(entry.start) ?? 0; const width = Math.max(1, entry.durationMinutes) / 1440 * 100; return <div className={`timeline-event ${entry.source === 'manual' ? 'manual' : entry.source === 'estimated' ? 'estimate' : ''}`} key={entry.id} style={{ left: `${start / 1440 * 100}%`, width: `${width}%` }} title={`${entry.application} · ${formatDuration(entry.durationMinutes)} · ${labelSource(entry.source)}`}>{entry.application}</div>; })}</div></div>)}</div> : <EmptyState onAdd={() => { setBackfillRows([emptyBackfill()]); setModal('backfill'); }} />}</section><p className="status-text" style={{ marginTop: 15 }}>Timeline scale: 00:00 · 04:48 · 09:36 · 14:24 · 19:12 · 24:00. Aggregate estimates appear in history without fabricated clock positions.</p></>;
  };

  const renderApplications = () => <><div className="console-section"><h2>Applications</h2>{renderFilter()}{visibleApps.length ? <div className="app-list">{visibleApps.map((item) => <div className="app-list-row" key={item.application}><strong>{item.application}</strong><span>{formatDuration(item.minutes)}</span><select value={item.category} onChange={(event) => updateApplicationCategory(item.application, event.target.value)} aria-label={`Category for ${item.application}`}>{CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select></div>)}</div> : <EmptyState onAdd={() => { setBackfillRows([emptyBackfill()]); setModal('backfill'); }} />}</div></>;
  const renderCategories = () => <><div className="console-section"><h2>Categories</h2>{renderFilter()}<div className="category-list">{categoryTotals.map(({ category, minutes }) => <div className="category-row" key={category}><span>{category}</span><div className="category-track"><div className="category-fill" style={{ width: `${Math.round((minutes / maxCategory) * 100)}%` }} /></div><span>{formatDuration(minutes)}</span></div>)}</div></div><div className="notice"><p>Categories are operational classifications chosen by the user. They are not objective properties of an application.</p></div></>;
  const renderHistory = () => <><div className="console-section"><h2>History</h2>{renderFilter()}{byDate.length ? <table className="plain-table console-table"><thead><tr><th>Date</th><th>Activity</th><th>Clock time</th><th>Sources</th></tr></thead><tbody>{byDate.map((date) => { const dayEntries = filteredEntries.filter((entry) => entry.date === date); const clock = dayEntries.filter((entry) => entry.start).reduce((sum, entry) => sum + entry.durationMinutes, 0); return <tr key={date}><td><button className="button button-small" onClick={() => { setSelectedDate(date); setView('timeline'); }}>{formatDate(date)}</button></td><td>{formatDuration(dayEntries.reduce((sum, entry) => sum + entry.durationMinutes, 0))}</td><td>{clock ? formatDuration(clock) : 'Aggregate only'}</td><td><div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>{Array.from(new Set(dayEntries.map((entry) => entry.source))).map((source) => <SourceChip source={source} key={source} />)}</div></td></tr>; })}</tbody></table> : <EmptyState onAdd={() => { setBackfillRows([emptyBackfill()]); setModal('backfill'); }} />}</div></>;
  const renderRaw = () => <><div className="console-section"><h2>Raw data</h2><p className="muted">Exports preserve record source, confidence and the absence of timestamps for aggregate estimates.</p><div className="code-block">{JSON.stringify(entries, null, 2) || '[]'}</div></div></>;
  const renderSettings = () => <><div className="console-section"><h2>Data</h2><div className="settings-list"><div className="settings-item"><div><strong>Export JSON</strong><p>Complete local record set plus codebook.</p></div><button className="button button-small" onClick={exportJson}>Export JSON</button></div><div className="settings-item"><div><strong>Export CSV</strong><p>One row per record; aggregate estimates omit timestamps.</p></div><button className="button button-small" onClick={exportCsv}>Export CSV</button></div><div className="settings-item"><div><strong>Delete selected date</strong><p>Current selection: {formatDate(selectedDate)}.</p></div><button className="button button-danger button-small" onClick={() => removeEntries((entry) => entry.date === selectedDate, 'No records on selected date.')}>Delete date</button></div><div className="settings-item"><div><strong>Delete all activity data</strong><p>Removes entries from this browser-local console.</p></div><button className="button button-danger button-small" onClick={() => removeEntries(() => true, 'No local records to delete.')}>Delete all</button></div></div></div><div className="console-section"><h2>Collection</h2><div className="local-banner"><strong>{consent ? 'Consent recorded.' : 'Consent required.'}</strong> {paused ? 'Tracking is paused.' : 'The Windows collector can be started from the desktop application.'} Window titles are off by default.</div></div></>;

  return <div className="console-page">
    <header className="console-topbar"><a href="/" className="console-brand">Lemon Tracking <span className="status-text" style={{ color: '#cbd7dc' }}>local console</span></a><div className="console-top-actions"><button className="button" onClick={exportJson}>Export JSON</button><button className="button" onClick={pauseToggle}>{paused ? 'Resume' : 'Pause'}</button><a className="button" href="/docs/">Documentation</a></div></header>
    <div className="console-layout"><aside className="console-sidebar"><h2>LEMON TRACKING</h2><nav className="console-nav" aria-label="Console navigation">{NAV.map(([key, label]) => <button key={key} className={view === key ? 'active' : ''} onClick={() => setView(key)}>{label}</button>)}</nav><div className="console-nav-sep" /><button className="button button-primary button-small" style={{ width: 'calc(100% - 14px)', margin: '0 7px' }} onClick={() => { setBackfillRows([emptyBackfill()]); setModal('backfill'); }}>Add past activity</button><p className="console-side-note">Records remain in this device’s local storage. No account is required.</p></aside><main className="console-content"><div className="console-content-header"><div><h1>{title}</h1><p>{view === 'today' ? `${formatDate(today())} · ${paused ? 'tracking paused' : 'tracking ready'}` : 'Local record inspection'}</p></div>{renderHeaderActions()}</div>{view === 'today' ? renderToday() : view === 'timeline' ? renderTimeline() : view === 'applications' ? renderApplications() : view === 'categories' ? renderCategories() : view === 'history' ? renderHistory() : view === 'raw' ? renderRaw() : renderSettings()}</main></div>
    {!hydrated && <div className="consent-overlay"><div className="consent-card"><h1>Loading local records</h1><p>Reading this browser’s local record set.</p></div></div>}
    {hydrated && !consent && <div className="consent-overlay"><div className="consent-card"><p className="eyebrow">FIRST RUN</p><h1>Before tracking begins</h1><p>Lemon Tracking records which applications are active and how long they remain active.</p><ul><li>Activity information is stored locally on this device.</li><li>Lemon Tracking does not upload your activity history.</li><li>Window titles, keyboard input and screen contents are not collected by default.</li></ul>{exited && <p className="notice"><strong>Tracking is stopped.</strong> You can close this tab or start the local console later.</p>}<div className="consent-actions"><button className="button" onClick={() => setExited(true)}>Exit</button><button className="button button-primary" onClick={acceptConsent}>Start Tracking</button></div></div></div>}
    {modal && <div className="modal-backdrop"><div className="modal-card"><div className="modal-header"><h2>{modal === 'backfill' ? 'Add Past Activity · Quick Backfill' : 'Add Daily Estimate'}</h2><button className="icon-button" onClick={() => setModal(null)} aria-label="Close">×</button></div>{modal === 'backfill' ? <><p className="muted">Add activity you remember from before Lemon Tracking was running. These entries are marked Manual and keep their own timestamps.</p><table className="plain-table console-table"><thead><tr><th>Date</th><th>Start</th><th>End</th><th>Device</th><th>Application</th><th>Category</th><th /></tr></thead><tbody>{backfillRows.map((row) => <tr key={row.id}><td><input type="date" value={row.date} onInput={(event) => updateBackfill(row.id, 'date', event.currentTarget.value)} onChange={(event) => updateBackfill(row.id, 'date', event.target.value)} /></td><td><input type="time" value={row.start} onInput={(event) => updateBackfill(row.id, 'start', event.currentTarget.value)} onChange={(event) => updateBackfill(row.id, 'start', event.target.value)} /></td><td><input type="time" value={row.end} onInput={(event) => updateBackfill(row.id, 'end', event.currentTarget.value)} onChange={(event) => updateBackfill(row.id, 'end', event.target.value)} /></td><td><select value={row.device} onChange={(event) => updateBackfill(row.id, 'device', event.target.value)}>{DEVICES.map((device) => <option key={device}>{device}</option>)}</select></td><td><input placeholder="e.g. Canvas" value={row.application} onChange={(event) => updateBackfill(row.id, 'application', event.target.value)} /></td><td><select value={row.category} onChange={(event) => updateBackfill(row.id, 'category', event.target.value)}>{CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select></td><td><button className="button button-danger button-small" onClick={() => setBackfillRows((rows) => rows.length === 1 ? rows : rows.filter((candidate) => candidate.id !== row.id))}>Remove</button></td></tr>)}</tbody></table><div className="form-actions"><button className="button button-small" onClick={() => setBackfillRows((rows) => [...rows, emptyBackfill()])}>Add row</button><button className="button button-small" onClick={() => setBackfillRows((rows) => [...rows, { ...(rows[rows.length - 1] ?? emptyBackfill()), id: makeId() }])}>Duplicate last row</button><button className="button button-primary button-small" onClick={saveBackfill}>Save day</button></div></> : <><p className="muted">Use durations when exact timestamps are not known. Lemon Tracking stores these as aggregate Estimated records and does not invent a clock position.</p><div className="form-grid"><div className="form-field"><label>Date<input type="date" value={estimateForm.date} onInput={(event) => setEstimateForm({ ...estimateForm, date: event.currentTarget.value })} onChange={(event) => setEstimateForm({ ...estimateForm, date: event.target.value })} /></label></div><div className="form-field"><label>Optional device estimate<select value={estimateForm.device} onChange={(event) => setEstimateForm({ ...estimateForm, device: event.target.value })}>{DEVICES.map((device) => <option key={device}>{device}</option>)}</select></label></div>{[['education', 'Education & Learning'], ['social', 'Social & Communication'], ['gaming', 'Gaming'], ['entertainment', 'Passive Entertainment'], ['work', 'Work / Productivity'], ['other', 'Other']].map(([key, label]) => <div className="form-field" key={key}><label>{label}<input type="number" min="0" step="1" value={estimateForm[key as keyof typeof estimateForm] as string} onChange={(event) => setEstimateForm({ ...estimateForm, [key]: event.target.value })} placeholder="minutes" /></label></div>)}<div className="form-field"><label>Confidence<select value={estimateForm.confidence} onChange={(event) => setEstimateForm({ ...estimateForm, confidence: event.target.value as Confidence })}><option>Exact</option><option>Approximate</option><option>Rough estimate</option></select></label></div></div><div className="form-actions"><button className="button button-primary button-small" onClick={saveEstimate}>Save estimate</button></div></>}</div></div>}
    {toast && <div className="toast" role="status">{toast}</div>}
  </div>;
}
