import { defineDocumentType, makeSource, ComputedFields } from 'contentlayer2/source-files';
import siteMetadata from './assets/siteMetadata';
import rehypePrismPlus from 'rehype-prism-plus';
import { remarkCodeTitles, remarkExtractFrontmatter, remarkImgToJsx } from 'pliny/mdx-plugins/index.js';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePresetMinify from 'rehype-preset-minify';
import rehypeKatex from 'rehype-katex';
import { countWords } from './lib/utils';

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => countWords(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
  },
  path: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath,
  },
  filePath: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFilePath,
  },
  lang: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.split('/')[1],
  },
};

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/{zh,en}/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    url: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    images: { type: 'json' },
    authors: { type: 'list', of: { type: 'string' } },
    layout: { type: 'string' },
    bibliography: { type: 'string' },
    canonicalUrl: { type: 'string' }
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: 'json',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/${doc._raw.flattenedPath}`
      }),
    }
  },
}))

export const Author = defineDocumentType(() => ({
  name: 'Author',
  filePathPattern: 'authors/{zh,en}/**/*.mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    avatar: { type: 'string' },
    occupation: { type: 'string' },
    company: { type: 'string' },
    email: { type: 'string' },
    twitter: { type: 'string' },
    linkedin: { type: 'string' },
    github: { type: 'string' },
    layout: { type: 'string' }
  },
  computedFields
}))

export default makeSource({
  contentDirPath: '.',
  contentDirInclude: ['posts', 'authors'],
  documentTypes: [Post, Author],
  mdx: {
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypeKatex,
      [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true, showLineNumbers: true }],
      rehypePresetMinify
    ]
  }
})
