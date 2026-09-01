export function redirectToFavicon(request: Request) {
  return Response.redirect(new URL('/favicon.svg', request.url), 308);
}
