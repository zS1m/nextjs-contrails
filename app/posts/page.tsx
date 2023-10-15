import '@/assets/css/prism.css';

import ListLayout from '@/layouts/ListLayoutWithTags';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import { allPosts } from 'contentlayer/generated';
import { genPageMetadata } from '@/lib/seo';

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: '文章' });

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allPosts));
  const pageNumber = 1
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="全部文章"
    />
  )
}
