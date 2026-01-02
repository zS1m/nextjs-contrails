import { MetadataRoute } from 'next';
import { allPosts } from 'contentlayer/generated';
import { routing } from '@/i18n/routing';

const isProduction = process.env.NODE_ENV === 'production';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const locales = routing.locales;

  // 文章
  const blogRoutes = allPosts.filter((post) => !(isProduction && post.draft)).map((post) => {
    const basePath = post.path.split('/')[0];


    return {
      url: `${siteUrl}/${post.lang}/${basePath}/${post.url}`,
      lastModified: post.lastmod || post.date,
    };
  });

  // 导航页
  const routes = locales.flatMap((locale) => {
    const paths = ['', 'posts'];

    return paths.map(path => ({
      url: `${siteUrl}/${locale}/${path}`,
      lastModified: new Date().toISOString(),
    }));
  });

  return [...routes, ...blogRoutes];
}
