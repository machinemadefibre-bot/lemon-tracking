import assetUrl from '../../../assets/downloads/LemonTracking-Linux-x86_64.tar.gz?url';
import { serveDownload } from '../../../lib/download-response';

export async function GET(request: Request, context: { params: Promise<{ filename: string }> }) {
  const { filename } = await context.params;
  if (filename !== 'LemonTracking-Linux-x86_64.tar.gz') {
    return new Response('Not Found', { status: 404 });
  }

  return serveDownload(request, assetUrl, 'application/gzip', filename);
}
