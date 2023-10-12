import Link from 'next/link';
import Image from 'next/image';
import headerNavLinks from '@/assets/headerNavLinks';

export default function Header() {
  return (
    <header className="flex items-center justify-between py-10">
      <Link href="/" className="flex items-center hover:text-cyan-600 select-none transition-colors duration-300">
        <Image alt="凝结尾迹" src="/avatar.svg" width="42" height="42" priority></Image>
        <span className="ml-2 text-3xl font-semibold font-mono">凝结尾迹</span>
      </Link>
      <div className="flex items-center leading-5 space-x-4 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <NavLink
              key={link.title}
              href={link.href}
            >
              {link.title}
            </NavLink>
        ))}
      </div>
    </header>
  );
}

const NavLink = ({ href, children }: { href: string, children: string }) => {
  return (
    <Link
      className="
        hidden sm:block font-medium text-gray-900 dark:text-gray-100
        relative after:absolute after:bg-stone-500
        after:-bottom-0.5 after:left-0 after:h-[2px]
        after:w-full after:origin-bottom-right after:scale-x-0
        hover:after:origin-bottom-left hover:after:scale-x-100
        after:transition-transform after:ease-in-out after:duration-300"
      href={href}
    >
      {children}
    </Link>
  );
}
