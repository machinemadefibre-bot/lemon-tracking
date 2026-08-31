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
      <p>Download Lemon Tracking 0.1.0 packages for Windows x64, macOS Apple Silicon, Linux x86_64 and Android.</p>
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
        <tr><td>LemonTracking-Windows-x64-Portable.zip</td><td>98,754</td><td><code>AE124D471A880B40C01F4262630A3A398C88B3707416D851588C10BD2DDB574F</code></td></tr>
        <tr><td>LemonTracking-macOS-arm64.tar.gz</td><td>31,984</td><td><code>259CE9AD19CA9CC2907EA8F15B42E445765802136B4BD6EA8E1E4C13CF61DEB7</code></td></tr>
        <tr><td>LemonTracking-Linux-x86_64.tar.gz</td><td>34,331</td><td><code>EC1AF61A3A4C5E7D2E62E23C7A04D53FADFFC31194D5154339013800D95AC1E6</code></td></tr>
        <tr><td>LemonTracking-Android.apk</td><td>16,791</td><td><code>F160E47A1216A2A164C1C626EC4FA7A24FD5D6899F81631850C98A6B6CA6977D</code></td></tr>
      </tbody></table>
      <h2>Release history</h2>
      <p><strong>0.1.0</strong> · Windows x64 collector, macOS Apple Silicon and Linux x86_64 local agents, plus Android APK</p>
      <p><a href="/changelog/">Read the complete 0.1.0 changelog</a></p>
      <h2>Documentation</h2>
      <p><a href="/docs/">Operating notes and record model</a></p>
    </SiteShell>
  );
}
