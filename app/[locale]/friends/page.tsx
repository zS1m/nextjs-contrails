import type { Metadata } from 'next';

import friends from '@/friends/friends';
import FriendLayout from '@/layouts/FriendLayout';
import { buildAlternates } from '@/lib/seo';
import { getTranslations } from 'next-intl/server';

export default function Archive() {
  return (
    <FriendLayout friends={friends}></FriendLayout>
  );
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>
}>): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'Friends' });
  const m = await getTranslations({ locale, namespace: 'Meta' });

  return {
    title: `${t('title')} - ${m('title')}`,
    alternates: buildAlternates({
      locale,
      pathname: '/friends',
    }),
  };
}
