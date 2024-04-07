import { MetadataRoute } from 'next';
import { allPosts } from 'contentlayer/generated';
import siteMetadata from '@/assets/siteMetadata';

const isProduction = process.env.NODE_ENV === 'production';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl;

  // 文章
  const blogRoutes = allPosts.filter((post) => !(isProduction && post.draft)).map((post) => {
    const basePath = post.path.split('/')[0];
    return {
      url: `${siteUrl}/${basePath}/${post.url}`,
      lastModified: post.lastmod || post.date
    };
  });

  // 导航页
  const routes = ['', 'posts'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date(siteMetadata.buildTime).toISOString()
  }))

  return [...routes, ...blogRoutes];
}
