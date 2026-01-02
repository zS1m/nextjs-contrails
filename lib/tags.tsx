import type { Post } from 'contentlayer/generated';

import { slug } from 'github-slugger';

const isProduction = process.env.NODE_ENV === 'production';

export function getAllTags(allPosts: Post[]) {
  const tagCount: Record<string, number> = {};
  allPosts.forEach((post) => {
    if (post.tags && !(isProduction && post.draft)) {
      post.tags.forEach((tag) => {
        const formattedTag = slug(tag);
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1;
        } else {
          tagCount[formattedTag] = 1;
        }
      });
    }
  });
  return tagCount;
}
