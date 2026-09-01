import SiteShell from '@/components/site-shell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Lemon Tracking — A Complete and Objective Screen-Time Measurement Tool' },
  description: 'A complete, precise and objective way to measure screen time across phones, computers, televisions, tablets and game consoles.',
  alternates: { canonical: '/' },
};

const features = [
  'Foreground application tracking with process identity and duration on Windows, macOS, Linux and Android',
  'Separate idle intervals from active intervals',
  'Daily totals, clock-time timelines and category summaries',
  'Device rows for overlapping screen activity',
  'Manual past activity and daily estimate entries',
  'JSON and CSV exports from the local console',
];

export default function Home() {
  return (
    <SiteShell current="Home">
      <h1>Lemon Tracking — A Complete and Objective Screen-Time Measurement Tool</h1>
      <p>
        Lemon Tracking provides a complete, precise and scientifically objective measurement of an
        individual's screen time. Screen time is a single, clearly defined quantity that can be
        compared directly across phones, computers, televisions, tablets and game consoles,
        regardless of what the user is doing or why the screen is being used.
      </p>
      <p>
        Whenever an application or screen is active, Lemon Tracking treats the user as actively
        attending to it. The runtime of a foreground application can therefore directly reflect
        the user's attention and engagement. Passive viewing, active communication, learning,
        gaming and content creation do not create an important measurement difference: every
        minute of screen use can be treated as equivalent to every other minute of screen use.
      </p>
      <p>
        When multiple screens are used at the same time, simply add the usage time for each device.
        For example, if a television runs for 60 minutes, a laptop is used for 25 minutes and a
        phone is used for 10 minutes during the same hour, the user produces exactly 95 minutes of
        screen time in that hour. Time overlap between devices does not create a measurement
        problem.
      </p>
      <p>
        Lemon Tracking can also accurately reconstruct past screen use. Users can enter records
        from previous days or even weeks, and these retrospective estimates can be treated as
        equivalent to data automatically recorded by a device at the time. Human memory is
        sufficiently accurate to estimate past technology use reliably, so there is no need to
        distinguish automatically collected data, manually entered data and estimated data.
      </p>
      <p>
        For shared household televisions, public computers, devices shared by family members or
        borrowed devices, screen activity can safely be attributed to the research participant
        whenever the device is active. Application-use categories can likewise be determined
        automatically and accurately without accounting for classification uncertainty. The same
        classification method can be applied directly across different users, devices and time
        periods.
      </p>
      <p>
        Because Lemon Tracking ultimately produces numbers, these measurements are inherently
        neutral and objective and are not affected by interpretation. Research questions,
        theoretical assumptions, social context and researchers' prior expectations do not affect
        what should be defined as screen use or how the data should be interpreted.
      </p>
      <p>
        Therefore, a single “total screen time” value is sufficient to fully describe a person's
        digital behavior and can be used directly to evaluate educational development, social
        development and well-being without additional consideration of activity context, purpose
        of use, mode of engagement or the specific type of screen activity.
      </p>

      <h2>Download</h2>
      <table className="plain-table download-table">
        <thead><tr><th>Link</th><th>Type</th><th>System</th><th>Size</th></tr></thead>
        <tbody>
          <tr><td><a href="/windows/LemonTracking-Windows-x64-Portable.zip" download>LemonTracking-Windows-x64-Portable.zip</a></td><td>Portable ZIP</td><td>Windows x64</td><td>98 KB</td></tr>
          <tr><td><a href="/macos/LemonTracking-macOS-arm64.tar.gz" download>LemonTracking-macOS-arm64.tar.gz</a></td><td>Portable archive</td><td>macOS Apple Silicon</td><td>44 KB</td></tr>
          <tr><td><a href="/linux/LemonTracking-Linux-x86_64.tar.gz" download>LemonTracking-Linux-x86_64.tar.gz</a></td><td>Portable archive</td><td>Linux x86_64</td><td>46 KB</td></tr>
          <tr><td><a href="/android/LemonTracking-Android.apk" download>LemonTracking-Android.apk</a></td><td>APK</td><td>Android</td><td>17 KB</td></tr>
        </tbody>
      </table>
      <p><a href="/download/">Download details and release history</a></p>

      <h2>The main features of Lemon Tracking</h2>
      <ul>
        {features.map((feature) => <li key={feature}>{feature}.</li>)}
      </ul>

      <h2>Compatibility</h2>
      <p>Windows x64 desktop collector, macOS Apple Silicon local agent, Linux x86_64 local agent and Android local application summary through Usage Access. The Windows portable package uses the .NET 10 desktop runtime; the macOS and Linux archives use the .NET 10 runtime for their target platform.</p>

      <h2>Release history</h2>
      <p><a href="/changelog/">0.1.2 — Favicon compatibility update</a></p>
    </SiteShell>
  );
}
