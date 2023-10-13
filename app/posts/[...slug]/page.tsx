import PageTitle from '@/components/PageTitle';
import PostLayout from '@/layouts/PostLayout';
import { MDXLayoutRenderer } from '@/components/MDXLayoutRenderer';
import { allAuthors, allPosts, Author, Post } from 'contentlayer/generated';
import { sortPosts } from '@/lib/utils';
import { allCoreContent, coreContent } from 'pliny/utils/contentlayer';

type Props = {
  params: {
    slug: string[]
  }
}

export async function generateStaticParams() {
  const paths = allPosts.map((post) => ({
    slug: post.slug.split('/')
  }));
  return paths;
}

export default function Page({ params }: Props) {
  const slug = decodeURI(params.slug.join('/'));
  const sortedPosts = allCoreContent(sortPosts(allPosts));
  const postIndex = sortedPosts.findIndex((post) => post.slug === slug);
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
  const post = allPosts.find((post) => post.slug === slug) as Post;

  const authorList = post?.authors || ['default'];
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Author)
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
        <MDXLayoutRenderer code={post.body.code} />
      </PostLayout>
    </>
  );
}
