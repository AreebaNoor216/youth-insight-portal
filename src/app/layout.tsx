export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Youth Insight Portal & Platform | Empowering University Leaders Nationwide',
  description: 'National multi-university chapter directory, leadership archive, flagship events catalog, and President governance portal.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-brand-500 selection:text-white dark:bg-slate-950 dark:text-slate-100 flex flex-col justify-between">
        {children}
      </body>
    </html>
  );
}
