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

export function truncateSummary(text?: string, maxLength = 160) {
  if (!text) {
    return '';
  } else if (text.length <= maxLength) {
    return text;
  } else {
    return text.slice(0, maxLength) + '...';
  }
}
