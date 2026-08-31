import assetUrl from '../../../assets/downloads/LemonTracking-Windows-x64-Portable.zip?url';
import { serveDownload } from '../../../lib/download-response';

export async function GET(request: Request, context: { params: Promise<{ filename: string }> }) {
  const { filename } = await context.params;
  if (filename !== 'LemonTracking-Windows-x64-Portable.zip') {
    return new Response('Not Found', { status: 404 });
  }

  return serveDownload(request, assetUrl, 'application/zip', filename);
}
