import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '关于',
  description: '关于凝结尾迹',
  alternates: {
    canonical: `/about`
  },
  openGraph: {
    title: '关于',
    description: '关于凝结尾迹',
    url: `/about`,
    siteName: '凝结尾迹',
    type: 'website'
  }
}

export default function About() {
  return (
    <>
      <div className="p-6 text-center text-2xl text-indigo-400">网站监修中...</div>
    </>
  );
}
