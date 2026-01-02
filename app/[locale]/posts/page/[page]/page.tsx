import type { Metadata } from 'next';

import { getAllTags } from '@/lib/tags';
import ListLayout from '@/layouts/ListLayoutWithTags';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import { allPosts } from 'contentlayer/generated';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildAlternates } from '@/lib/seo';

const POSTS_PER_PAGE = 6

export async function generateStaticParams({
  params,
}: Readonly<{
  params: Promise<{ locale: string; }>
}>) {
  const { locale } = await params;

  const filteredPosts = allPosts.filter(post => post.lang === locale);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

  return paths;
}

export default function Page({ params }: { params: { page: string; locale: string; } }) {
  const { locale } = params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations('ListLayout');

  const filteredPosts = allPosts.filter(post => post.lang === locale);
  const posts = allCoreContent(sortPosts(filteredPosts));

  const allTags = getAllTags(filteredPosts);

  const pageNumber = parseInt(params.page as string)
  const initialDisplayPosts = posts.slice(
      POSTS_PER_PAGE * (pageNumber - 1),
      POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={t('all_posts')}
      allTags={allTags}
    />
  )
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string; page: string; }>
}>): Promise<Metadata> {
  const { locale, page } = await params;

  const t = await getTranslations({ locale, namespace: 'Blog' });
  const m = await getTranslations({ locale, namespace: 'Meta' });

  return {
    title: `${t('title')} - ${m('title')}`,
    alternates: buildAlternates({
      locale,
      pathname: `/posts/page/${page}`,
    }),
  };
}
