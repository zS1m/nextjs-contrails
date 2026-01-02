import type { Metadata } from 'next';

import { allAuthors, Author } from 'contentlayer/generated';
import { coreContent } from 'pliny/utils/contentlayer';
import { MDXLayoutRenderer } from '@/components/MDXLayoutRenderer';
import AuthorLayout from '@/layouts/AuthorLayout';
import { buildAlternates } from '@/lib/seo';
import { getTranslations } from 'next-intl/server';

interface Props {
  params: {
    locale: string;
  };
}

export default function About({ params }: Props) {
  const { locale } = params;

  const filteredAuthors = allAuthors.filter(author => author.lang === locale);
  const author = filteredAuthors.find((p) => p.slug === `${locale}/default`) as Author;
  const mainContent = coreContent(author)

  return (
    <>
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
    </>
  );
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>
}>): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'About' });
  const m = await getTranslations({ locale, namespace: 'Meta' });

  return {
    title: `${t('title')} - ${m('title')}`,
    alternates: buildAlternates({
      locale,
      pathname: '/about',
    }),
  };
}
