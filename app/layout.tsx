import './globals.css';
import type { Metadata } from 'next';
import { GoogleAnalytics } from '@/app/components/GoogleAnalytics';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.SITE_URL}` || 'http://localhost:3000'),
  title: {
    default: `zS1m's Blog | 凝结尾迹`,
    template: '%s | 凝结尾迹'
  },
  description: '专注于日常学习技术分享',
  openGraph: {
    title: {
      default: `zS1m's Blog | 凝结尾迹`,
      template: '%s | 凝结尾迹'
    },
    description: '专注于日常学习技术分享',
    url: `${process.env.SITE_URL}`,
    siteName: '凝结尾迹',
    type: 'website'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <GoogleAnalytics />
      <body>
        <div className="relative min-h-screen">
          <Navbar />
          <main className="px-4 md:px-6 pb-32 prose prose-xl prose-slate mx-auto">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
