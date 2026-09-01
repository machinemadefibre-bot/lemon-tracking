import { NextRequest, NextResponse } from 'next/server';

const canonicalHost = 'lemontracking.org';
const redirectedHosts = new Set([
  'lemon-tracking.machinemadefibre.chatgpt.site',
  'download.lemontracking.org',
]);

function cacheControlForPath(pathname: string) {
  if (pathname.startsWith('/_next/static/')) {
    return 'public, max-age=31536000, immutable';
  }
  if (pathname.startsWith('/screenshots/') || pathname === '/favicon.svg') {
    return 'public, max-age=604800, stale-while-revalidate=86400';
  }
  return null;
}

export function middleware(request: NextRequest) {
  if (redirectedHosts.has(request.nextUrl.hostname.toLowerCase())) {
    const canonicalUrl = new URL(request.url);
    canonicalUrl.protocol = 'https:';
    canonicalUrl.hostname = canonicalHost;
    canonicalUrl.port = '';
    return NextResponse.redirect(canonicalUrl, 308);
  }

  const response = NextResponse.next();
  const cacheControl = cacheControlForPath(request.nextUrl.pathname);
  if (cacheControl) {
    response.headers.set('Cache-Control', cacheControl);
  }
  return response;
}

export const config = {
  matcher: ['/((?!_next/image).*)'],
};
