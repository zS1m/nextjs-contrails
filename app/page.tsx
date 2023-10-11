import Main from '@/components/Main';
import { allPosts } from 'contentlayer/generated';
import { sortPosts } from '@/lib/utils';

export const revalidate = 86400;

export default function Home() {
  const sortedPosts = sortPosts(allPosts);
  return <Main posts={sortedPosts} />;
}
