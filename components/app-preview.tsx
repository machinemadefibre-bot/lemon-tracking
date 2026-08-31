type PreviewView = 'today' | 'timeline' | 'history' | 'settings';

const barRows = [
  ['Education & Learning', 68, '3h 20m'],
  ['Social & Communication', 31, '1h 04m'],
  ['Passive Entertainment', 46, '1h 31m'],
  ['Gaming', 21, '42m'],
];

export default function AppPreview({ view }: { view: PreviewView }) {
  const title = view === 'timeline' ? 'Timeline' : view === 'history' ? 'History' : view === 'settings' ? 'Settings' : 'Today';
  return (
    <div className="app-preview" aria-label={`${title} application screen preview`}>
      <div className="app-preview-bar"><span>Lemon Tracking</span><span>Tracking active · local</span></div>
      <div className="app-preview-body">
        <div className="app-preview-nav">
          {['Today', 'Timeline', 'Applications', 'Categories', 'History', 'Settings'].map((item) => (
            <div className={(item.toLowerCase() === view) || (view === 'today' && item === 'Today') ? 'active' : ''} key={item}>{item}</div>
          ))}
        </div>
        <div className="app-preview-content">
          <div className="preview-title">{title}</div>
          <div className="preview-sub">Monday, 31 August 2026 · All activity</div>
          {view === 'today' && <>
            <div className="preview-metrics">
              <div className="preview-metric"><span>Screen activity</span><b>6h 37m</b></div>
              <div className="preview-metric"><span>Idle time</span><b>48m</b></div>
              <div className="preview-metric"><span>Applications</span><b>12</b></div>
            </div>
            <div className="preview-bars">
              {barRows.map(([label, width, value]) => <div className="preview-bar-row" key={label}><span>{label}</span><div className="preview-bar-track"><div className="preview-bar-fill" style={{ width: `${width}%` }} /></div><span>{value}</span></div>)}
            </div>
          </>}
          {view === 'timeline' && <div className="preview-bars"><div className="preview-bar-row"><span>Laptop</span><div className="preview-bar-track"><div className="preview-bar-fill" style={{ marginLeft: '8%', width: '56%' }} /></div><span>4h</span></div><div className="preview-bar-row"><span>Phone</span><div className="preview-bar-track"><div className="preview-bar-fill" style={{ marginLeft: '38%', width: '24%', background: '#d5c4d2' }} /></div><span>1h</span></div><div className="preview-bar-row"><span>TV</span><div className="preview-bar-track"><div className="preview-bar-fill" style={{ marginLeft: '66%', width: '26%', background: '#a7bac7' }} /></div><span>1h</span></div></div>}
          {view === 'history' && <div className="preview-bars"><div className="preview-bar-row"><span>28 Aug</span><div className="preview-bar-track"><div className="preview-bar-fill" style={{ width: '72%' }} /></div><span>5h</span></div><div className="preview-bar-row"><span>29 Aug</span><div className="preview-bar-track"><div className="preview-bar-fill" style={{ width: '49%' }} /></div><span>3h</span></div><div className="preview-bar-row"><span>30 Aug</span><div className="preview-bar-track"><div className="preview-bar-fill" style={{ width: '88%' }} /></div><span>6h</span></div></div>}
          {view === 'settings' && <div className="preview-bars"><div className="preview-bar-row"><span>Data location</span><div className="preview-bar-track"><div className="preview-bar-fill" style={{ width: '100%', background: '#a7bac7' }} /></div><span>local</span></div><div className="preview-bar-row"><span>Titles</span><div className="preview-bar-track"><div className="preview-bar-fill" style={{ width: '22%', background: '#d5c4d2' }} /></div><span>off</span></div></div>}
        </div>
      </div>
    </div>
  );
}
