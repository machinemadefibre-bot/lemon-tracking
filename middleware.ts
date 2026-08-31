import { NextRequest, NextResponse } from 'next/server';

const canonicalHost = 'lemontracking.org';
const redirectedHosts = new Set([
  'lemon-tracking.machinemadefibre.chatgpt.site',
  'download.lemontracking.org',
]);

export function middleware(request: NextRequest) {
  if (!redirectedHosts.has(request.nextUrl.hostname.toLowerCase())) {
    return NextResponse.next();
  }

  const canonicalUrl = new URL(request.url);
  canonicalUrl.protocol = 'https:';
  canonicalUrl.hostname = canonicalHost;
  canonicalUrl.port = '';
  return NextResponse.redirect(canonicalUrl, 308);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
