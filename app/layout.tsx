import '@/assets/css/tailwind.css';

import type { Metadata } from 'next';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { ThemeProviders } from '@/components/ThemeProviders';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
      <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
      <link rel="manifest" href="/static/favicons/site.webmanifest" />
      <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <GoogleAnalytics />
      <body className="bg-white text-black antialiased dark:bg-gray-950 dark:text-white">
        <ThemeProviders>
          <SectionContainer>
            <div className="flex h-screen flex-col justify-between font-sans">
              <Header />
              <main className="mb-auto">{children}</main>
              <Footer />
            </div>
          </SectionContainer>
        </ThemeProviders>
      </body>
    </html>
  );
}
