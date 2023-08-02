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
    <div>关于</div>
  );
}
