import Link from 'next/link';
import { getPostsMeta } from '@/lib/posts';
import ListItem from '@/app/components/ListItem';

export const revalidate = 86400;

type Props = {
  params: {
    tag: string
  }
}

export async function generateStaticParams() {
  const posts = await getPostsMeta();
  if (!posts) {
    return [];
  }
  const tags = new Set(posts.map((post) => post.tags).flat());
  return Array.from(tags).map((tag) => ({ tag }));
}

export async function generateMetadata({ params: { tag } }: Props) {
  return {
    title: `${tag} | 凝结尾迹`
  };
}

export default async function TagPostList({ params: { tag } }: Props) {
  const posts = await getPostsMeta();
  if (!posts) {
    return <p className="mt-10 text-center">无文章</p>
  }
  const tagPosts = posts.filter((post) => post.tags.includes(tag));
  if (!tagPosts.length) {
    return (
      <div className="text-center">
        <p>无相关文章</p>
        <Link href="/">Back to Home</Link>
      </div>
    );
  }
  return (
    <>
      <h2 className="text-3xl mt-4 mb-0">#{tag}</h2>
      <section className="mt-6 mx-auto max-w-2xl">
        <ul className="w-full list-none p-0">
          {tagPosts.map((post) => <ListItem key={post.id} post={post} />)}
        </ul>
      </section>
    </>
  );
}
