import SiteShell from '@/components/site-shell';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'FAQ', alternates: { canonical: '/faq/' } };

const faqs = [
  ['What is Lemon Tracking?', 'Lemon Tracking is a local Windows application usage tracker with a desktop collector and a local console.'],
  ['Does Lemon Tracking upload my activity data?', 'No. Activity records are stored locally on the device running the collector.'],
  ['Does Lemon Tracking require an Internet connection?', 'No. Normal activity tracking works locally. The public website and release downloads are separate.'],
  ['What is recorded?', 'Application identity, timing information, activity duration, idle status and user-defined categories.'],
  ['Does it record keyboard input?', 'No. Keyboard contents, clipboard contents, screenshots, webcam, microphone and document contents are not collected.'],
  ['Does Lemon Tracking know whether I am actually paying attention?', 'No. Foreground application activity is not a direct measurement of human attention.'],
  ['Can activity be added manually?', 'Yes. Missing periods can be reconstructed from History > Add Past Activity. The source remains manual or estimated.'],
  ['Can I delete my data?', 'Yes. Settings provides deletion for today, a selected date and all activity data.'],
  ['Which platforms have a download?', 'The current release provides a Windows x64 desktop package. Other platform packages have no release entry.'],
  ['Does the Windows package include ActivityWatch?', 'No. The 0.1.0 collector uses an independent implementation. ActivityWatch appears as an upstream reference in the legal information.'],
  ['Is Lemon Tracking a commercial tracking service?', 'No. Lemon Tracking is a fictional student-built software project created as a joke.'],
];

export default function FaqPage() {
  return <SiteShell current="FAQ"><h1>FAQ</h1><p>Frequently asked questions for the current release.</p><section className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section></SiteShell>;
}
