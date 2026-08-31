import SiteShell from '@/components/site-shell';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'FAQ', alternates: { canonical: '/faq/' } };

const faqs = [
  ['What is Lemon Tracking?', 'Lemon Tracking is a local application usage tracker with desktop collectors, an Android application and a local console.'],
  ['Does Lemon Tracking upload my activity data?', 'No. Activity records are stored locally on the device running the collector.'],
  ['Does Lemon Tracking require an Internet connection?', 'No. Normal activity tracking works locally. The public website and release downloads are separate.'],
  ['What is recorded?', 'Application identity, timing information, activity duration, idle status and user-defined categories.'],
  ['Does it record keyboard input?', 'No. Keyboard contents, clipboard contents, screenshots, webcam, microphone and document contents are not collected.'],
  ['Does Lemon Tracking know whether I am actually paying attention?', 'No. Foreground application activity is not a direct measurement of human attention.'],
  ['Can activity be added manually?', 'Yes. Missing periods can be reconstructed from History > Add Past Activity. The source remains manual or estimated.'],
  ['Can I delete my data?', 'Yes. Settings provides deletion for today, a selected date and all activity data.'],
  ['Which platforms have a download?', 'The current release provides a Windows x64 desktop package, a macOS Apple Silicon terminal agent, a Linux x86_64 terminal agent and an Android APK.'],
  ['How does the macOS package work?', 'The macOS Apple Silicon agent uses System Events for the foreground application and IOHIDSystem for idle time. The first run may require Accessibility permission in System Settings.'],
  ['How does the Linux package work?', 'The Linux x86_64 agent uses xprop for X11 foreground application lookup and xprintidle when installed. Wayland sessions are identified separately and use a compositor-specific foreground integration.'],
  ['How does the Android package work?', 'The Android APK uses the system Usage Access permission to read aggregate foreground application time for the current day. It has no Internet permission and writes local JSON records.'],
  ['Are there browser extension or iOS packages?', 'There is no browser extension or iOS package in the 0.1.0 release.'],
  ['Does the Windows package include ActivityWatch?', 'No. The 0.1.0 collector uses an independent implementation. ActivityWatch appears as an upstream reference in the legal information.'],
  ['Is Lemon Tracking a commercial tracking service?', 'Lemon Tracking is distributed as local software packages and a documentation website rather than as a hosted tracking service.'],
];

export default function FaqPage() {
  return <SiteShell current="FAQ"><h1>FAQ</h1><p>Frequently asked questions for the current release.</p><section className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section></SiteShell>;
}
