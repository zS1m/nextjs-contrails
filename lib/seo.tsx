import { routing } from '@/i18n/routing';

export const buildAlternates = ({
  locale,
  pathname,
}: {
  locale: string;
  pathname: string;
}) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return {
    canonical: `${siteUrl}/${locale}${pathname}`,
    languages: Object.fromEntries(
      routing.locales.map(l => [l, `${siteUrl}/${l}${pathname}`])
    ),
  };
}
