import { allPosts } from 'contentlayer/generated';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import FriendLayout from '@/layouts/FriendLayout';
import { genPageMetadata } from '@/lib/seo';

export const metadata = genPageMetadata({ title: '归档' })

export default function Archive() {
  const posts = allCoreContent(sortPosts(allPosts));
  return (
    <>
      <FriendLayout posts={posts}></FriendLayout>
    </>
  );
}

