import SiteShell from '@/components/site-shell';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'FAQ', alternates: { canonical: '/faq/' } };

const faqs = [
  ['Does Lemon Tracking upload my activity data?', 'No. Activity records are stored locally on the device running the collector.'],
  ['Does Lemon Tracking require an Internet connection?', 'No. Normal activity tracking works locally. The public website and release downloads are separate.'],
  ['What is recorded?', 'Application identity, timing information, activity duration, idle status and user-defined categories.'],
  ['Does it record keyboard input?', 'No. Keyboard contents, clipboard contents, screenshots, webcam, microphone and document contents are not collected.'],
  ['Does Lemon Tracking know whether I am actually paying attention?', 'No. Foreground application activity is not a direct measurement of human attention.'],
  ['Can activity be added manually?', 'Yes. Missing periods can be reconstructed from History > Add Past Activity. The source remains manual or estimated.'],
  ['Can I delete my data?', 'Yes. Settings provides deletion for today, a selected date and all activity data.'],
];

export default function FaqPage() {
  return <SiteShell current="FAQ"><section className="page-title"><p className="eyebrow">FAQ</p><h1>Frequently asked questions</h1><p>Technical answers for the current release.</p></section><section className="doc-panel faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section></SiteShell>;
}
