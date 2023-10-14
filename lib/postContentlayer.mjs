import { writeFileSync } from 'fs';
import { allPosts } from '../.contentlayer/generated/index.mjs';
import * as GithubSlugger from 'github-slugger';

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Count the occurrences of all tags across blog posts and write to json file
 */
export async function createTagCount() {
  const tagCount = {};
  allPosts.forEach((file) => {
    if (file.tags && (!isProduction || file.draft !== true)) {
      file.tags.forEach((tag) => {
        const formattedTag = GithubSlugger.slug(tag);
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1;
        } else {
          tagCount[formattedTag] = 1;
        }
      })
    }
  })
  writeFileSync('./assets/tag-data.json', JSON.stringify(tagCount));
}

// export async function createSearchIndex() {
//   if (
//       siteMetadata?.search?.provider === 'kbar' &&
//       siteMetadata.search.kbarConfig.searchDocumentsPath
//   ) {
//     writeFileSync(
//         `public/${siteMetadata.search.kbarConfig.searchDocumentsPath}`,
//         JSON.stringify(allCoreContent(sortPosts(allPosts)))
//     )
//     console.log('Local search index generated...')
//   }
// }

async function postContentlayer() {
  await createTagCount();
  // await createSearchIndex()
}

postContentlayer();
