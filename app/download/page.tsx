import SiteShell from '@/components/site-shell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download',
  description: 'Download Lemon Tracking 0.1.2 for Windows x64, macOS Apple Silicon, Linux x86_64 and Android, with file sizes and SHA-256 checksums.',
  alternates: { canonical: '/download/' },
};

const portableUrl = '/windows/LemonTracking-Windows-x64-Portable.zip';
const macosUrl = '/macos/LemonTracking-macOS-arm64.tar.gz';
const linuxUrl = '/linux/LemonTracking-Linux-x86_64.tar.gz';
const androidUrl = '/android/LemonTracking-Android.apk';

export default function DownloadPage() {
  return (
    <SiteShell current="Download">
      <h1>Download</h1>
      <p>Download Lemon Tracking 0.1.2 packages for Windows x64, macOS Apple Silicon, Linux x86_64 and Android.</p>
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
        <tr><td>LemonTracking-Windows-x64-Portable.zip</td><td>98,769</td><td><code>296C52682952F5D1EEC86D98A9092B5165F0E6950F72C4CCA9DCFD2D305CD5EF</code></td></tr>
        <tr><td>LemonTracking-macOS-arm64.tar.gz</td><td>43,753</td><td><code>4EB0F5AB847584E9B017F772FA0E5FF551327DEA8F85DD983AB43292070752B4</code></td></tr>
        <tr><td>LemonTracking-Linux-x86_64.tar.gz</td><td>46,143</td><td><code>E74B0C45536811D9785759DB1EC1EED4C1E9ABC050851C25EE171A8BE42934D4</code></td></tr>
        <tr><td>LemonTracking-Android.apk</td><td>16,791</td><td><code>2E6060F4CF1E69A25E74A8FFCDD33474FCDCBBF79AC8611D10FE923F5D998B26</code></td></tr>
      </tbody></table>
      <h2>Release history</h2>
      <p><strong>0.1.2</strong> · Favicon compatibility update and refreshed platform package version</p>
      <p><a href="/changelog/">Read the complete 0.1.2 changelog</a></p>
      <h2>Documentation</h2>
      <p><a href="/docs/">Operating notes and record model</a></p>
    </SiteShell>
  );
}
