import type { Post } from 'contentlayer/generated';

export function formatDate(date: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return new Date(date).toLocaleDateString('zh-CN', options);
}

export function sortPosts(posts: Post[]) {
  return posts.sort((a, b) => a.date < b.date ? 1 : -1);
}
