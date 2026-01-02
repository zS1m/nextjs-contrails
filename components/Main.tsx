import Image from 'next/image';
import Link from '@/components/Link';
import Tag from '@/components/Tag';
import { formatDate, truncateSummary } from '@/lib/utils';
import { CoreContent } from 'pliny/utils/contentlayer';
import { Post } from 'contentlayer/generated';
import banner from '@/public/images/banner.png';
import { useTranslations, useLocale } from 'next-intl';

type Props = {
  posts: CoreContent<Post>[]
}

const MAX_DISPLAY = 6;

export default function Home({ posts }: Props) {
  const locale = useLocale();

  const t = useTranslations('Meta');
  const m = useTranslations('Main');

  const filteredPosts = posts.filter(post => post.lang === locale);
  const slicedPosts = filteredPosts.slice(0, MAX_DISPLAY);

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <Image src={banner} alt='banner' priority={true} />
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {m('title')}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {t('description')}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!filteredPosts.length && 'No posts found.'}
          {slicedPosts.map((post) => {
            const { slug, date, url, title, summary, tags } = post;
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/posts/${url}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {truncateSummary(summary)}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/posts/${url}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${title}"`}
                        >
                          {m('read_more')} &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
      {filteredPosts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/posts"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            {m('all_posts')} &rarr;
          </Link>
        </div>
      )}
    </>
  );
}
