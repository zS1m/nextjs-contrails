import '@/assets/css/tailwind.css';

import type { Metadata } from 'next';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import Header from '@/components/Header';
import SectionContainer from '@/components/SectionContainer';

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
    <html lang="zh-CN" className="scroll-smooth" suppressHydrationWarning>
      <GoogleAnalytics />
      <body className="bg-white text-black antialiased dark:bg-gray-950 dark:text-white">
        <SectionContainer>
          <div className="flex h-screen flex-col justify-between font-sans">
            <Header />
            <main className="mb-auto">{children}</main>
          </div>
        </SectionContainer>
      </body>
    </html>
  );
}
