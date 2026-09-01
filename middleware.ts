import { NextRequest, NextResponse } from 'next/server';

const canonicalHost = 'lemontracking.org';
const redirectedHosts = new Set([
  'lemon-tracking.machinemadefibre.chatgpt.site',
  'download.lemontracking.org',
]);
const contentSignal = 'search=yes, ai-input=yes, ai-train=no, use=reference';

function cacheControlForPath(pathname: string) {
  if (pathname.startsWith('/_next/static/')) {
    return 'public, max-age=31536000, immutable';
  }
  if (pathname.startsWith('/screenshots/') || pathname === '/favicon.svg') {
    return 'public, max-age=604800, stale-while-revalidate=86400';
  }
  return null;
}

function isLegalPath(pathname: string) {
  return pathname === '/legal' || pathname.startsWith('/legal/');
}

function acceptsMarkdown(request: NextRequest) {
  const accept = request.headers.get('accept')?.toLowerCase() ?? '';
  return accept.split(',').some((entry) => {
    const [mediaType, ...parameters] = entry.trim().split(';').map((part) => part.trim());
    const quality = parameters.find((parameter) => parameter.startsWith('q='))?.slice(2);
    return quality !== '0' && (mediaType === 'text/markdown' || mediaType === 'text/*');
  });
}

function addVary(response: NextResponse, value: string) {
  const vary = response.headers.get('Vary');
  if (!vary) {
    response.headers.set('Vary', value);
  } else if (!vary.toLowerCase().split(',').map((part) => part.trim()).includes(value.toLowerCase())) {
    response.headers.set('Vary', `${vary}, ${value}`);
  }
}

export function middleware(request: NextRequest) {
  if (redirectedHosts.has(request.nextUrl.hostname.toLowerCase())) {
    const canonicalUrl = new URL(request.url);
    canonicalUrl.protocol = 'https:';
    canonicalUrl.hostname = canonicalHost;
    canonicalUrl.port = '';
    return NextResponse.redirect(canonicalUrl, 308);
  }

  const pathname = request.nextUrl.pathname;
  if (isLegalPath(pathname)) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    return response;
  }

  if (pathname !== '/ai' && pathname !== '/llms.txt' && acceptsMarkdown(request)) {
    const markdownUrl = request.nextUrl.clone();
    markdownUrl.pathname = '/ai';
    markdownUrl.search = '';
    markdownUrl.searchParams.set('path', pathname);
    const response = NextResponse.rewrite(markdownUrl);
    response.headers.set('Content-Signal', contentSignal);
    addVary(response, 'Accept');
    return response;
  }

  const response = NextResponse.next();
  response.headers.set('Content-Signal', contentSignal);
  const cacheControl = cacheControlForPath(request.nextUrl.pathname);
  if (cacheControl) {
    response.headers.set('Cache-Control', cacheControl);
  }
  return response;
}

export const config = {
  matcher: ['/((?!_next/image).*)'],
};
