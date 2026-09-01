import { redirectToFavicon } from '@/lib/favicon-redirect';

export function GET(request: Request) {
  return redirectToFavicon(request);
}

export function HEAD(request: Request) {
  return redirectToFavicon(request);
}
