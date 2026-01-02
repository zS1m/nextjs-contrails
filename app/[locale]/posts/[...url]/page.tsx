import type { Metadata } from 'next';

import PageTitle from '@/components/PageTitle';
import PostLayout from '@/layouts/PostLayout';
import { MDXLayoutRenderer } from '@/components/MDXLayoutRenderer';
import { allAuthors, allPosts, Author, Post } from 'contentlayer/generated';
import { sortPosts } from '@/lib/utils';
import { allCoreContent, coreContent } from 'pliny/utils/contentlayer';
import siteMetadata from '@/assets/siteMetadata';
import { components } from '@/components/MDXComponents';
import { buildAlternates } from '@/lib/seo';

import '@/assets/css/prism.css';
import 'katex/dist/katex.css';

type Props = {
  params: {
    url: string;
    locale: string;
  }
}

export async function generateStaticParams({
  params,
}: Readonly<{
  params: Promise<{ locale: string; }>
}>) {
  const { locale } = await params;
  const filteredPosts = allPosts.filter(post => post.lang === locale);

  const paths = filteredPosts.map((post) => ({
    url: post.url.split('/')
  }));
  return paths;
}

export default function Page({ params }: Props) {
  const { locale } = params;

  const url = decodeURI(params.url);
  const filteredPosts = allPosts.filter(post => post.lang === locale);
  const sortedPosts = allCoreContent(sortPosts(filteredPosts));
  const postIndex = sortedPosts.findIndex((post) => post.url === url);
  // 未找到该文章
  if (postIndex === -1) {
    return (
      <div className="mt-24 text-center">
        <PageTitle>
          Under Construction{' '}
          <span role="img" aria-label="roadwork sign">
          🚧
        </span>
        </PageTitle>
      </div>
    );
  }

  const prev = sortedPosts[postIndex + 1];
  const next = sortedPosts[postIndex - 1];
  const post = allPosts.find((post) => post.url === url) as Post;

  const authorList = post?.authors || ['default'];
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === `${locale}/${author}`);
    return coreContent(authorResults as Author);
  });
  const mainContent = coreContent(post);
  const jsonLd = post.structuredData;
  jsonLd['author'] = authorDetails.map((author) => {
    return {
      '@type': 'Person',
      name: author.name,
    };
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostLayout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
        <MDXLayoutRenderer code={post.body.code} components={components} />
      </PostLayout>
    </>
  );
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string; url: string; }>
}>): Promise<Metadata | undefined> {
  const { locale, url } = await params;
  const decodedUrl = decodeURI(url);

  const post = allPosts.find((post) => post.url === decodedUrl && post.lang === locale);
  const authorList = post?.authors || ['default'];
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author);
    return coreContent(authorResults as Author);
  })

  if (!post) {
    return;
  }

  const publishedAt = new Date(post.date).toISOString();
  const modifiedAt = new Date(post.lastmod || post.date).toISOString();
  const authors = authorDetails.map((author) => author.name);
  let imageList = [siteMetadata.socialBanner];
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images;
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : process.env.NEXT_PUBLIC_SITE_URL + img,
    };
  })

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
    alternates: buildAlternates({
      locale,
      pathname: `/posts/${url}`,
    }),
  };
}
