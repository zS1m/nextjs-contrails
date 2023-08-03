import { getPostsMeta } from '@/lib/posts';
import ListItem from '@/app/components/ListItem';

export default async function Posts() {
  const posts = await getPostsMeta();
  if (!posts) {
    return <p>这里暂时没有文章 QAQ</p>
  }
  return (
    <section className="mt-6 mx-auto max-w-2xl">
      <ul className="w-full list-none p-0">
        {posts.map((post) => <ListItem key={post.id} post={post} />)}
      </ul>
    </section>
  )
}
