import Link from 'next/link';
import dayjs from 'dayjs';

type Props = {
  post: Meta
}
export default function ListItem({ post }: Props) {
  const { title, date, abbrlink } = post;
  const formattedDate = dayjs(date).format('YYYY-MM-DD')
  return (
    <li className="mt-4 text-2xl">
      <Link className="underline hover:text-black/70" href={`/posts/${abbrlink}`}>{title}</Link>
      <br />
      <p className="text-sm mt-1">{formattedDate}</p>
    </li>
  );
}
