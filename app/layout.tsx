import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Nexus Care - Portal Clínico',
  description: 'High-fidelity clinical portal for patient management, appointment scheduling, and analytics at Nexus Care.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-PT" className={`${inter.variable}`}>
      <body className="antialiased bg-slate-50 text-slate-900" suppressHydrationWarning>{children}</body>
    </html>
  );
}
