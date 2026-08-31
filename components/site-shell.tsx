import type { ReactNode } from 'react';

const links = [
  ['Home', '/'],
  ['Download', '/download/'],
  ['Features', '/features/'],
  ['Screenshots', '/screenshots/'],
  ['Documentation', '/docs/'],
  ['FAQ', '/faq/'],
  ['Changelog', '/changelog/'],
] as const;

export default function SiteShell({ children, current }: { children: ReactNode; current?: string }) {
  return (
    <div className="site-frame">
      <header className="site-header">
        <div className="site-header-inner">
          <a className="brand" href="/" aria-label="Lemon Tracking home">
            <span className="brand-name">Lemon Tracking</span>
          </a>
          <nav className="site-nav" aria-label="Primary navigation">
            {links.map(([label, href]) => (
              <a key={label} href={href} aria-current={current === label ? 'page' : undefined}>
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <div className="site-footer-inner">
          <p>Lemon Tracking · local application usage statistics · 0.1.0</p>
          <div className="footer-links">
            <a href="/download/">Download</a>
            <a href="/docs/">Documentation</a>
            <a href="/legal/">Legal Information</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
