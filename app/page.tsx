import Main from '@/components/Main';
import { allPosts } from 'contentlayer/generated';
import { sortPosts } from '@/lib/utils';
import {allCoreContent} from "pliny/utils/contentlayer";

export default function Home() {
  const sortedPosts = allCoreContent(sortPosts(allPosts));
  return <Main posts={sortedPosts} />;
}
