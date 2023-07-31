import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/app/components/Navbar';

export const metadata: Metadata = {
  title: '凝结尾迹',
  description: '专注于日常学习技术分享'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-gray-100">
        <Navbar />
        <main className="px-4 md:px-6 prose prose-xl prose-slate mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
