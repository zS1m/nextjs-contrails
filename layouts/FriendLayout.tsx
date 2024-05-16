import Link from '@/components/Link';
import Image from '@/components/Image';
import { Friend } from '@/friends/friends';

interface Props {
  friends: Friend[]
}

const FriendCard = ({ title, link, description, avatar }: Friend) => {
  return (
    <Link href={link}>
      <div className="overflow-hidden bg-white shadow-md rounded-xl h-full">
        <div className="flex items-center gap-x-4 p-4">
          <div>
            {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                width={48}
                height={48}
                className="h-10 w-10 rounded-full"
              />
            )
            }
          </div>
          <section>
            <h3 className="text-lg font-bold text-gray-900">
              {title}
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              {description}
            </p>
          </section>
        </div>
      </div>
    </Link>
  );
}

export default function FriendLayout({ friends }: Props) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1
            className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            友链
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-y-4 sm:gap-x-8 sm:grid-cols-2 lg:grid-cols-3 pt-8 sm:text-left">
          {
            friends.map((friend) => (
              <FriendCard key={friend.link} {...friend} />
            ))
          }
        </div>
      </div>
    </>
  )
}
