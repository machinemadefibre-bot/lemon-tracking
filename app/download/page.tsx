import SiteShell from '@/components/site-shell';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Download', alternates: { canonical: '/download/' } };

const portableUrl = '/windows/LemonTracking-Windows-x64-Portable.zip';
const macosUrl = '/macos/LemonTracking-macOS-arm64.tar.gz';
const linuxUrl = '/linux/LemonTracking-Linux-x86_64.tar.gz';
const androidUrl = '/android/LemonTracking-Android.apk';

export default function DownloadPage() {
  return (
    <SiteShell current="Download">
      <h1>Download</h1>
      <p>Download Lemon Tracking 0.1.1 packages for Windows x64, macOS Apple Silicon, Linux x86_64 and Android.</p>
      <table className="plain-table download-table">
        <thead><tr><th>Link</th><th>Type</th><th>System</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><a href={portableUrl} download>LemonTracking-Windows-x64-Portable.zip</a></td><td>Portable ZIP</td><td>Windows x64</td><td>Desktop collector with local records, tray controls and the local console.</td></tr>
          <tr><td><a href={macosUrl} download>LemonTracking-macOS-arm64.tar.gz</a></td><td>Portable archive</td><td>macOS Apple Silicon</td><td>Terminal-controlled .NET 10 local agent with System Events and IOHIDSystem adapters.</td></tr>
          <tr><td><a href={linuxUrl} download>LemonTracking-Linux-x86_64.tar.gz</a></td><td>Portable archive</td><td>Linux x86_64</td><td>Terminal-controlled .NET 10 local agent with X11 process lookup and idle integration.</td></tr>
          <tr><td><a href={androidUrl} download>LemonTracking-Android.apk</a></td><td>APK</td><td>Android</td><td>Local current-day foreground application summary through Usage Access.</td></tr>
        </tbody>
      </table>
      <h2>Checksums</h2>
      <table className="plain-table"><thead><tr><th>File</th><th>Size (bytes)</th><th>SHA-256</th></tr></thead><tbody>
        <tr><td>LemonTracking-Windows-x64-Portable.zip</td><td>98,759</td><td><code>5209D7E36A5ECB64496ADBD04AE3C74A17698413CA52CF0ECCB150DA8D7CC689</code></td></tr>
        <tr><td>LemonTracking-macOS-arm64.tar.gz</td><td>43,749</td><td><code>B230966D7C66EFA0F8F9860BC821F1EC33DF21396A9C50BD46785CFDD90F15A9</code></td></tr>
        <tr><td>LemonTracking-Linux-x86_64.tar.gz</td><td>46,134</td><td><code>5AE3BB31518716B22D474F3FF4E0DD2C47CD5B443AA3D089206FF83755996FCA</code></td></tr>
        <tr><td>LemonTracking-Android.apk</td><td>16,792</td><td><code>9E02FCFD0D5DC9A15FF5AC7DFD7B1EF17975D8D0868F99B63DEBAF0E84478A0A</code></td></tr>
      </tbody></table>
      <h2>Release history</h2>
      <p><strong>0.1.1</strong> · Windows header layout update and refreshed platform package version</p>
      <p><a href="/changelog/">Read the complete 0.1.1 changelog</a></p>
      <h2>Documentation</h2>
      <p><a href="/docs/">Operating notes and record model</a></p>
    </SiteShell>
  );
}
