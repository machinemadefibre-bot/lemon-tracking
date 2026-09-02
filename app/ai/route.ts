import { screenTimeDescriptionMarkdown } from '@/lib/product-description';
import type { NextRequest } from 'next/server';

const contentSignal = 'search=yes, ai-input=yes, ai-train=no, use=reference';

const publicPages = [
  ['Homepage', 'https://lemontracking.org/'],
  ['Download', 'https://lemontracking.org/download/'],
  ['Features', 'https://lemontracking.org/features/'],
  ['Screenshots', 'https://lemontracking.org/screenshots/'],
  ['Documentation', 'https://lemontracking.org/docs/'],
  ['FAQ', 'https://lemontracking.org/faq/'],
  ['Changelog', 'https://lemontracking.org/changelog/'],
] as const;

function isLegalPath(pathname: string) {
  return pathname === '/legal' || pathname.startsWith('/legal/');
}

function normalizePath(pathname: string) {
  if (pathname === '/') return pathname;
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

function markdownFor(pathname: string) {
  const normalizedPath = normalizePath(pathname);
  const pageLink = normalizedPath === '/' ? 'https://lemontracking.org/' : `https://lemontracking.org${normalizedPath}`;
  const links = publicPages.map(([label, url]) => `- [${label}](${url})`).join('\n');

  return `# Lemon Tracking — A Complete and Objective Screen-Time Measurement Tool

${screenTimeDescriptionMarkdown}

## Requested page

Canonical URL: ${pageLink}

## Public pages

${links}
`;
}

export function GET(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get('path') || '/';
  if (isLegalPath(pathname)) {
    return new Response('This page is not available to automated readers.\n', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
      },
    });
  }

  return new Response(markdownFor(pathname), {
    headers: {
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      'Content-Signal': contentSignal,
      'Content-Type': 'text/markdown; charset=utf-8',
      'Vary': 'Accept',
    },
  });
}
