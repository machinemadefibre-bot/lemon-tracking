export async function serveDownload(
  request: Request,
  assetUrl: string,
  contentType: string,
  fileName: string,
) {
  const asset = await fetch(new URL(assetUrl, request.url));

  if (!asset.ok) {
    return new Response('Not Found', { status: 404 });
  }

  const headers = new Headers(asset.headers);
  headers.set('Content-Disposition', `attachment; filename="${fileName}"`);
  headers.set('Content-Type', contentType);
  headers.set('Cache-Control', 'public, max-age=3600');

  return new Response(asset.body, {
    status: asset.status,
    statusText: asset.statusText,
    headers,
  });
}
