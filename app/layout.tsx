import './globals.css';
import Navbar from '@/app/components/Navbar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '凝结尾迹',
  description: '专注于日常学习技术分享',
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
        {children}
      </body>
    </html>
  )
}
