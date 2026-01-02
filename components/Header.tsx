import Link from '@/components/Link';
import Logo from '@/public/logo1.svg';
import headerNavLinks from '@/assets/headerNavLinks';
import ThemeSwitch from '@/components/ThemeSwitch';
import MobileNav from '@/components/MobileNav';
import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('Meta');
  const n = useTranslations('Nav');

  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/" aria-label={t('header_title')}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Logo />
            </div>
            <div className="hidden h-6 text-2xl font-semibold sm:block">
              {t('header_title')}
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center leading-5 space-x-4 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="hidden sm:block font-medium text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400"
            >
              {n(link.title)}
            </Link>
          ))}
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  );
}
