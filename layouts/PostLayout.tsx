import type { Post, Author } from 'contentlayer/generated';

import { ReactNode } from 'react';
import { CoreContent } from 'pliny/utils/contentlayer';
import Link from '@/components/Link';
import PageTitle from '@/components/PageTitle';
import SectionContainer from '@/components/SectionContainer';
import Image from '@/components/Image';
import Tag from '@/components/Tag';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import ProgressBar from '@/components/ProgressBar';
import Comment from '@/components/Comment';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaRegHourglassHalf, FaFire } from 'react-icons/fa6';
import { useTranslations } from 'next-intl';
import { formatDate } from '@/lib/utils';

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

interface LayoutProps {
  content: CoreContent<Post>
  authorDetails: CoreContent<Author>[]
  next?: { path: string; title: string, url: string }
  prev?: { path: string; title: string, url: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const t = useTranslations('PostLayout');

  const { path, date, title, lang, tags, readingTime } = content;
  const basePath = path.split('/')[0];

  return (
    <SectionContainer>
      <ProgressBar />
      <ScrollTopAndComment />
      <article>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <header className="pt-6 pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date} className="inline-flex items-center">
                      <FaRegCalendarAlt className="mr-1.5"/>
                      {formatDate(date, lang, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
              <dl className="space-y-10">
                <div className="flex justify-center gap-x-4">
                  {/* 阅读时长 */}
                  <dt className="sr-only">Reading time</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <span className="inline-flex items-center">
                      <FaRegHourglassHalf className="mr-1.5"/>
                      {readingTime.text}
                    </span>
                  </dd>
                  {/* 阅读量 */}
                  <dt className="sr-only">Page view</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <span className="inline-flex items-center">
                      <FaFire className="mr-1.5"/>
                      <span className="waline-pageview-count">-</span>
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
            {/* 作者 */}
            <dl className="pt-6 xl:pt-4">
              <dt className="sr-only">{t('author')}</dt>
              <dd>
                <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                  {authorDetails.map((author) => (
                      <li className="flex items-center justify-center space-x-2" key={author.name}>
                        {author.avatar && (
                            <Image
                                src={author.avatar}
                                width={38}
                                height={38}
                                alt="avatar"
                                className="h-10 w-10 rounded-full"
                            />
                        )}
                        <dl className="whitespace-nowrap text-sm font-medium leading-5">
                          <dt className="sr-only">Name</dt>
                          <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                          <dt className="sr-only">Github</dt>
                          <dd>
                            {author.github && (
                                <Link
                                    href={author.github}
                                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                >
                                  {author.github.replace('https://github.com/', '@')}
                                </Link>
                            )}
                          </dd>
                        </dl>
                      </li>
                  ))}
                </ul>
              </dd>
            </dl>
          </header>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">{children}</div>
            </div>
            <footer className="pb-6">
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700">
                {tags && (
                  <div className="py-4">
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      {t('tags')}
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                          <Tag key={tag} text={tag}/>
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4">
                    {prev && prev.path && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          {t('prev_article')}
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/posts/${prev.url}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && next.path && (
                    <div>
                      <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        {t('next_article')}
                      </h2>
                      <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                        <Link href={`/posts/${next.url}`}>{next.title}</Link>
                      </div>
                    </div>
                  )}
                </div>
                )}
              </div>
              <div className="pt-4">
                <Link
                  href={`/${basePath}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label={t('back_to_blog')}
                >
                  &larr; {t('back_to_blog')}
                </Link>
              </div>
            </footer>
          </div>
          {process.env.COMMENT_SERVER_URL && (
            <div
              className="pt-8 text-center text-gray-700 dark:text-gray-300"
              id="comment"
            >
              <Comment serverURL={process.env.COMMENT_SERVER_URL} />
            </div>
          )}
        </div>
      </article>
    </SectionContainer>
  );
}
