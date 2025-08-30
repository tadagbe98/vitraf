import type {Metadata} from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Vitraf Alu - Menuiserie Aluminium de Qualité',
  description:
    'Vitraf Alu, expert en menuiserie aluminium à Abidjan. Nous offrons des solutions sur mesure : fenêtres, portes, et façades. Qualité, prestige et professionnalisme.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="!scroll-smooth">
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
