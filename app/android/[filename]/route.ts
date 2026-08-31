import assetUrl from '../../../assets/downloads/LemonTracking-Android.apk?url';
import { serveDownload } from '../../../lib/download-response';

export async function GET(request: Request, context: { params: Promise<{ filename: string }> }) {
  const { filename } = await context.params;
  if (filename !== 'LemonTracking-Android.apk') {
    return new Response('Not Found', { status: 404 });
  }

  return serveDownload(request, assetUrl, 'application/vnd.android.package-archive', filename);
}
