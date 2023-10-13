import { Metadata } from 'next';
import { allAuthors, Author } from 'contentlayer/generated';
import { coreContent } from 'pliny/utils/contentlayer';
import { MDXLayoutRenderer } from '@/components/MDXLayoutRenderer';
import AuthorLayout from '@/layouts/AuthorLayout';

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
  const author = allAuthors.find((p) => p.slug === 'default') as Author;
  const mainContent = coreContent(author)

  return (
    <>
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
    </>
  );
}

