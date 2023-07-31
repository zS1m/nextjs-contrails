import Link from 'next/link';
import { getPostsMeta, getPostByName } from '@/lib/posts';
import { notFound } from 'next/navigation';
import dayjs from 'dayjs';
import 'highlight.js/styles/github-dark.css';

export const revalidate = 86400;

type Props = {
  params: {
    postId: string
  }
}

export async function generateStaticParams() {
  const posts = await getPostsMeta();
  if (!posts) {
    return [];
  }

  return posts.map((post) => ({
    postId: post.abbrlink
  }))
}

export async function generateMetadata({ params: { postId } }: Props) {
  const posts = await getPostsMeta();
  if (!posts) {
    return {
      title: 'Post Not Found'
    }
  }
  const selectedPost = posts.filter((post) => post.abbrlink === postId);
  if (!selectedPost.length) {
    return {
      title: 'Post Not Found'
    }
  }
  const post = await getPostByName(`${selectedPost[0].id}.mdx`);

  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }
  return {
    title: post.meta.title
  }
}

export default async function Post({ params: { postId } }: Props) {
  const posts = await getPostsMeta();
  if (!posts) {
    return {
      title: 'Post Not Found'
    }
  }
  const selectedPost = posts.filter((post) => post.abbrlink === postId);
  if (!selectedPost.length) {
    return {
      title: 'Post Not Found'
    }
  }
  const post = await getPostByName(`${selectedPost[0].id}.mdx`);

  if (!post) {
    notFound();
  }
  const { meta, content } = post;

  const pubDate = dayjs(meta.date).format('YYYY-MM-DD');
  const tags = meta.tags.map((tag, i) => (
    <Link key={i} href={`/tags/${tag}`}>{tag}</Link>
  ))

  return (
    <>
      <h2 className="text-3xl mt-4 mb-0">{meta.title}</h2>
      <p className="mt-0 text-sm">
        {pubDate}
      </p>
      <article>
        {content}
      </article>
      <section>
        <h3>Related:</h3>
        <div className="flex flex-row gap-4">
          {tags}
        </div>
      </section>
      <p className="mb-10">
        <Link href="/">← Back to home</Link>
      </p>
    </>
  )
}
