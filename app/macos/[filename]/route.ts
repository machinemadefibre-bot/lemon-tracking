import assetUrl from '../../../assets/downloads/LemonTracking-macOS-arm64.tar.gz?url';
import { serveDownload } from '../../../lib/download-response';

export async function GET(request: Request, context: { params: Promise<{ filename: string }> }) {
  const { filename } = await context.params;
  if (filename !== 'LemonTracking-macOS-arm64.tar.gz') {
    return new Response('Not Found', { status: 404 });
  }

  return serveDownload(request, assetUrl, 'application/gzip', filename);
}
