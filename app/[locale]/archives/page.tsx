import type { Metadata } from 'next';

import { allPosts } from 'contentlayer/generated';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import ArchiveLayout from '@/layouts/ArchiveLayout';
import { buildAlternates } from '@/lib/seo';
import { getTranslations } from 'next-intl/server';

interface Props {
  params: {
    locale: string;
  };
}

export default function Archive({ params }: Props) {
  const { locale } = params;

  const filteredPosts = allPosts.filter(post => post.lang === locale);
  const posts = allCoreContent(sortPosts(filteredPosts));

  return <ArchiveLayout posts={posts} />;
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>
}>): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'Archives' });
  const m = await getTranslations({ locale, namespace: 'Meta' });

  return {
    title: `${t('title')} - ${m('title')}`,
    alternates: buildAlternates({
      locale,
      pathname: '/archives',
    }),
  };
}
