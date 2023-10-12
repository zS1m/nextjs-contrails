import Main from '@/components/Main';
import { allPosts } from 'contentlayer/generated';
import { sortPosts } from '@/lib/utils';

export default function Home() {
  const sortedPosts = sortPosts(allPosts);
  return <Main posts={sortedPosts} />;
}
