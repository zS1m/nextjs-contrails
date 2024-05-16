import friends from '@/friends/friends';
import FriendLayout from '@/layouts/FriendLayout';
import { genPageMetadata } from '@/lib/seo';

export const metadata = genPageMetadata({ title: '友链' })

export default function Archive() {
  return (
    <FriendLayout friends={friends}></FriendLayout>
  );
}

