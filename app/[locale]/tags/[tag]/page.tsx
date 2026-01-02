import type { Metadata } from 'next';

import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allPosts } from 'contentlayer/generated'
import { getAllTags } from '@/lib/tags';
import { buildAlternates } from '@/lib/seo';
import { getTranslations } from 'next-intl/server';


export async function generateStaticParams({
  params,
}: Readonly<{
  params: Promise<{ locale: string; tag: string; }>
}>) {
  const { locale } = await params;
  const filteredPosts = allPosts.filter(post => post.lang === locale);
  const allTags = getAllTags(filteredPosts);

  const tagKeys = Object.keys(allTags);
  const paths = tagKeys.map((tag) => ({
    tag: tag,
  }));
  return paths;
}

export default function TagPage({ params }: { params: { tag: string; locale: string } }) {
  const { locale } = params;
  const filteredPosts = allPosts.filter(post => post.lang === locale);

  const tag = decodeURI(params.tag);
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1);
  const filteredByTag = allCoreContent(
    sortPosts(filteredPosts.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag)))
  );
  const allTags = getAllTags(filteredPosts);

  return (
    <ListLayout
      posts={filteredByTag}
      title={title}
      allTags={allTags}
    />
  );
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string; tag: string; }>
}>): Promise<Metadata> {
  const { locale, tag } = await params;
  const decodedTag = decodeURI(tag);

  const m = await getTranslations({ locale, namespace: 'Meta' });

  return {
    title: `${decodedTag} - ${m('title')}`,
    description: `${m('title')} ${tag} tagged content`,
    alternates: buildAlternates({
      locale,
      pathname: `/tags/${tag}`,
    }),
  };
}
