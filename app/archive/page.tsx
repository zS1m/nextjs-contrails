import { allPosts } from 'contentlayer/generated';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import ArchiveLayout from '@/layouts/ArchiveLayout';
import { genPageMetadata } from '@/lib/seo';

export const metadata = genPageMetadata({ title: '归档' })

export default function Archive() {
  const posts = allCoreContent(sortPosts(allPosts));
  return (
    <>
      <ArchiveLayout posts={posts}></ArchiveLayout>
    </>
  );
}

