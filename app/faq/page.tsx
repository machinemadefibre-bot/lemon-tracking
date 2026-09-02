import SiteShell from '@/components/site-shell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Measurement and Platform FAQ',
  description: 'Measurement boundaries, privacy details and platform notes for Lemon Tracking.',
  alternates: { canonical: '/faq/' },
};

const faqs = [
  ['What does Lemon Tracking measure?', 'Lemon Tracking records active foreground application time and device-level screen activity using the collector available on each supported platform.'],
  ['Does foreground application time prove attention?', 'No. Foreground activity is a consistent device-use signal, not a direct observation of attention, intent, comprehension or engagement.'],
  ['How are overlapping screens counted?', 'Each device is recorded independently. A 60-minute television session, 25 laptop minutes and 10 phone minutes produce 95 device-minutes, while the elapsed clock period remains 60 minutes.'],
  ['Are manual and estimated records identical to automatic records?', 'No. They can appear in the same timeline, but Lemon Tracking retains their source and confidence labels so they can be distinguished during analysis.'],
  ['Can shared-device activity be attributed automatically?', 'No. An active shared screen does not identify the person using or watching it. Shared-device records require user attribution.'],
  ['Are application categories always correct?', 'No. Categories are labels applied to activity records and should be reviewed when an application is ambiguous or changes purpose.'],
  ['Does a numerical result remove the need for interpretation?', 'No. A defined counting rule can be applied consistently, while conclusions still depend on the research question, activity context and data quality.'],
  ['Can total screen time alone evaluate education, social development or well-being?', 'No. Total screen time is a usage summary, not an assessment or diagnosis. Those questions require activity context and other evidence.'],
  ['Does Lemon Tracking upload activity data?', 'No. Activity records are stored locally on the device running the collector.'],
  ['Does tracking require an Internet connection?', 'No. Normal activity tracking works locally. The public website and release downloads are separate.'],
  ['What fields are recorded?', 'Application identity, timing information, activity duration, idle status, category, record source and optional confidence.'],
  ['Does Lemon Tracking record keyboard input or screen contents?', 'No. Keyboard contents, clipboard contents, screenshots, webcam, microphone and document contents are not collected.'],
  ['Can activity be added manually?', 'Yes. History > Add Past Activity creates manual records, while a daily estimate creates estimated records. Both retain their source.'],
  ['Can local data be deleted?', 'Yes. Settings provides deletion for today, a selected date and all activity data.'],
  ['Which platforms have a download?', 'Release 0.1.2 provides a Windows x64 desktop package, a macOS Apple Silicon terminal agent, a Linux x86_64 terminal agent and an Android APK.'],
  ['How does the macOS package work?', 'The macOS Apple Silicon agent uses System Events for the foreground application and IOHIDSystem for idle time. The first run may require Accessibility permission in System Settings.'],
  ['How does the Linux package work?', 'The Linux x86_64 agent uses xprop for X11 foreground application lookup and xprintidle when installed. Wayland sessions require compositor-specific foreground integration.'],
  ['How does the Android package work?', 'The Android APK uses Usage Access to read the current-day foreground application summary. It has no Internet permission and writes local JSON records.'],
  ['Why can Android show a restricted-setting message?', 'Android 15 and some device versions require a sideloaded APK to be confirmed in App info before Usage Access can be enabled.'],
  ['Are browser-extension or iOS packages available?', 'No. Release 0.1.2 does not include a browser extension or an iOS package.'],
  ['Does the Windows package include ActivityWatch?', 'No. Release 0.1.2 uses an independent collector implementation. ActivityWatch appears only as an attributed upstream reference.'],
];

export default function FaqPage() {
  return (
    <SiteShell current="FAQ">
      <h1>FAQ</h1>
      <p>Measurement boundaries, privacy details and platform notes for the current release. The primary product overview and downloads are on the <a href="/">Lemon Tracking homepage</a>.</p>
      <section className="faq-list">
        {faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
      </section>
    </SiteShell>
  );
}
