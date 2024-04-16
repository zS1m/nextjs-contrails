import { CoreContent } from 'pliny/utils/contentlayer';
import { Post } from 'contentlayer/generated';
import dayjs from 'dayjs';
import { truncateSummary } from '@/lib/utils';
import Link from '@/components/Link';

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  month: 'long',
  day: 'numeric'
};

interface Props {
  posts: CoreContent<Post>[]
}
interface YearGroup {
  [key: string | number]: CoreContent<Post>[]
}

export default function AuthorLayout({ posts }: Props) {
  const postsSortedByYear: YearGroup = {};
  posts.forEach((post) => {
    const year = dayjs(post.date).year();
    if (!postsSortedByYear[year]) {
      postsSortedByYear[year] = [];
    }
    postsSortedByYear[year].push(post);
  });
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            友链
          </h1>
        </div>
        <div className="text-center">
          建设中
        </div>
      </div>
    </>
  )
}
