import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '关于',
  description: '关于凝结尾迹',
  alternates: {
    canonical: `/about`
  }
}

export default function About() {
  return (
    <>
      <div className="p-4 text-center">网站监修中...</div>
    </>
  );
}
