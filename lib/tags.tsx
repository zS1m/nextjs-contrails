import * as GithubSlugger from 'github-slugger';
import type { Post } from 'contentlayer/generated';

const isProduction = process.env.NODE_ENV === 'production';

const allTags = (allPosts: Post[]) => {
  const tagCount: Record<string, number> = {}
  allPosts.forEach((post) => {
    if (post.tags && (!isProduction || post.draft !== true)) {
      post.tags.forEach((tag) => {
        const formattedTag = GithubSlugger.slug(tag);
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1;
        } else {
          tagCount[formattedTag] = 1;
        }
      })
    }
  })
  return tagCount;
}

export default allTags;
