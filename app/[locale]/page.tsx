import type { Metadata } from 'next';

import Main from '@/components/Main';
import { allPosts } from 'contentlayer/generated';
import { sortPosts } from '@/lib/utils';
import { allCoreContent } from 'pliny/utils/contentlayer';
import { getTranslations } from 'next-intl/server';
import { buildAlternates } from '@/lib/seo';

export default function Home() {
  const sortedPosts = allCoreContent(sortPosts(allPosts));
  return <Main posts={sortedPosts} />;
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>
}>): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'Home' });
  const m = await getTranslations({ locale, namespace: 'Meta' });

  return {
    title: `${t('title')} - ${m('title')}`,
    alternates: buildAlternates({
      locale,
      pathname: '/',
    }),
  };
}
