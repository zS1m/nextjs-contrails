import Main from '@/components/Main';
import { allPosts } from 'contentlayer/generated';

export const revalidate = 86400;

export default function Home() {
  const sortedPosts = allPosts.sort((a, b) => a.date < b.date ? 1 : -1);
  return <Main posts={sortedPosts} />;
}
